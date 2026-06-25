"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef("");
  const scrollMilestones = useRef({ p25: false, p50: false, p75: false, p100: false });

  // Initialize Session ID
  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = sessionStorage.getItem("uniq_analytics_session");
      if (!id) {
        id = "session_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem("uniq_analytics_session", id);
      }
      sessionIdRef.current = id;

      // Send initial landing pageview or heartbeat
      sendEvent("heartbeat", { page: window.location.pathname });

      // Start periodic heartbeat every 45 seconds to keep session alive
      const interval = setInterval(() => {
        sendEvent("heartbeat", { page: window.location.pathname });
      }, 45000);

      return () => clearInterval(interval);
    }
  }, []);

  // Send Event helper
  const sendEvent = (event, data = {}) => {
    if (!sessionIdRef.current) return;
    
    const payload = JSON.stringify({
      sessionId: sessionIdRef.current,
      event,
      path: pathname,
      timestamp: new Date().toISOString(),
      ...data
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/events", payload);
      } else {
        fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {
      console.warn("Analytics failed to dispatch event", e);
    }
  };

  // Track Pageview on path change
  useEffect(() => {
    // Reset scroll milestones for new page
    scrollMilestones.current = { p25: false, p50: false, p75: false, p100: false };
    
    sendEvent("pageview");
  }, [pathname]);

  // Global Click and Scroll listeners
  useEffect(() => {
    // 1. Click Listener
    const handleGlobalClick = (e) => {
      let targetElement = e.target;
      // Walk up the DOM to find an <a> tag
      while (targetElement && targetElement.tagName !== "A") {
        targetElement = targetElement.parentElement;
      }

      if (!targetElement) return;

      const href = targetElement.getAttribute("href") || "";
      const text = targetElement.innerText || targetElement.getAttribute("aria-label") || "";

      // Check for specific CTAs
      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        sendEvent("click", { target: "whatsapp", label: text, href });
      } else if (href.startsWith("tel:")) {
        sendEvent("click", { target: "phone", label: text, href });
      } else if (href.includes("showroom") || href.includes("showroom-visit") || href.includes("#section-showroom")) {
        sendEvent("click", { target: "showroom_cta", label: text, href });
      } else {
        // Log general external link or category click
        sendEvent("click", { target: "general_link", label: text.substring(0, 30), href });
      }
    };

    // 2. Scroll Listener
    const handleGlobalScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;

      const percentage = Math.round((scrollTop / scrollHeight) * 100);

      const milestones = scrollMilestones.current;
      if (percentage >= 25 && !milestones.p25) {
        milestones.p25 = true;
        sendEvent("scroll", { target: "25%" });
      }
      if (percentage >= 50 && !milestones.p50) {
        milestones.p50 = true;
        sendEvent("scroll", { target: "50%" });
      }
      if (percentage >= 75 && !milestones.p75) {
        milestones.p75 = true;
        sendEvent("scroll", { target: "75%" });
      }
      if (percentage >= 95 && !milestones.p100) {
        // Use 95% to safely capture bottom scrolling
        milestones.p100 = true;
        sendEvent("scroll", { target: "100%" });
      }
    };

    document.addEventListener("click", handleGlobalClick);
    window.addEventListener("scroll", handleGlobalScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, [pathname]);

  return null;
}

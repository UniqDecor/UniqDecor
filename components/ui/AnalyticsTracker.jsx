"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef("");
  const sessionStartRef = useRef(Date.now());
  const pageStartRef = useRef(Date.now());
  const scrollMilestones = useRef({ p25: false, p50: false, p75: false, p100: false });
  const heartbeatIntervalRef = useRef(null);
  const [referrer, setReferrer] = useState("");
  const [deviceInfo, setDeviceInfo] = useState({});

  // Initialize session on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Session ID
    let id = sessionStorage.getItem("uniq_analytics_session");
    if (!id) {
      id = "session_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("uniq_analytics_session", id);
    }
    sessionIdRef.current = id;
    sessionStartRef.current = Date.now();

    // Referrer
    const ref = document.referrer || "";
    setReferrer(ref);

    // Device / Browser info
    const info = {
      userAgent: navigator.userAgent?.substring(0, 200) || "",
      screenWidth: window.screen?.width || 0,
      screenHeight: window.screen?.height || 0,
      language: navigator.language || "",
      platform: navigator.platform || "",
      isTouchDevice: "ontouchstart" in window || navigator.maxTouchPoints > 0
    };
    setDeviceInfo(info);

    // Send initial heartbeat with referrer + device
    sendEvent("heartbeat", { page: window.location.pathname, referrer: ref, device: info });

    // Periodic heartbeat
    heartbeatIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      sendEvent("heartbeat", { page: window.location.pathname, sessionDuration: elapsed });
    }, 45000);

    // Send session_end on beforeunload
    const handleBeforeUnload = () => {
      const duration = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      const lastPageTime = Math.floor((Date.now() - pageStartRef.current) / 1000);
      sendEvent("session_end", { duration, lastPageTime, path: pathname });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(heartbeatIntervalRef.current);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Send Event
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

  // Track pageview + page_time on path change
  useEffect(() => {
    const prevPageTime = Math.floor((Date.now() - pageStartRef.current) / 1000);
    if (prevPageTime > 2) {
      sendEvent("page_time", { seconds: prevPageTime, previousPath: window.__previousPath || "" });
    }
    window.__previousPath = pathname;
    pageStartRef.current = Date.now();

    scrollMilestones.current = { p25: false, p50: false, p75: false, p100: false };

    // Track if this is a 404
    const is404 = document.title?.includes("404") || document.querySelector('[data-testid="not-found"]');
    sendEvent("pageview", { 
      is404: !!is404, 
      referrer: document.referrer || "",
      pageLoadTime: Math.round(performance.now())
    });
  }, [pathname]);

  // Global Click, Scroll, Form Submit, Error listeners
  useEffect(() => {
    // Click listener
    const handleGlobalClick = (e) => {
      let targetElement = e.target;
      while (targetElement && targetElement.tagName !== "A" && targetElement.tagName !== "BUTTON") {
        targetElement = targetElement.parentElement;
      }
      if (!targetElement) return;

      const tagName = targetElement.tagName;
      const href = targetElement.getAttribute("href") || "";
      const text = (targetElement.innerText || targetElement.getAttribute("aria-label") || "").substring(0, 50);

      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        sendEvent("click", { target: "whatsapp", label: text, href, tagName });
      } else if (href.startsWith("tel:")) {
        sendEvent("click", { target: "phone", label: text, href, tagName });
      } else if (href.includes("showroom") || href.includes("#section-showroom")) {
        sendEvent("click", { target: "showroom_cta", label: text, href, tagName });
      } else if (href.startsWith("mailto:")) {
        sendEvent("click", { target: "email", label: text, href, tagName });
      } else if (href.startsWith("/") || href.startsWith("https://uniqdecorfurniture.in")) {
        sendEvent("click", { target: "internal_link", label: text, href, tagName });
      } else if (href.startsWith("http")) {
        sendEvent("click", { target: "external_link", label: text, href, tagName });
      } else {
        sendEvent("click", { target: "button_click", label: text, href, tagName });
      }
    };

    // Scroll listener with finer granularity
    const handleGlobalScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;

      const percentage = Math.round((scrollTop / scrollHeight) * 100);
      const ms = scrollMilestones.current;

      if (percentage >= 25 && !ms.p25) { ms.p25 = true; sendEvent("scroll", { target: "25%" }); }
      if (percentage >= 50 && !ms.p50) { ms.p50 = true; sendEvent("scroll", { target: "50%" }); }
      if (percentage >= 75 && !ms.p75) { ms.p75 = true; sendEvent("scroll", { target: "75%" }); }
      if (percentage >= 95 && !ms.p100) { ms.p100 = true; sendEvent("scroll", { target: "100%" }); }
    };

    // Form submission tracking
    const handleFormSubmit = (e) => {
      const form = e.target;
      const formId = form.id || form.getAttribute("name") || "unknown_form";
      const formAction = form.action || "";
      sendEvent("form_submit", { formId, formAction, fieldCount: form.elements?.length || 0 });
    };

    // Track JavaScript errors
    const handleError = (event) => {
      sendEvent("error", { 
        type: "js_error", 
        message: (event.message || "").substring(0, 200),
        source: event.filename || "",
        line: event.lineno || 0
      });
    };

    document.addEventListener("click", handleGlobalClick);
    window.addEventListener("scroll", handleGlobalScroll, { passive: true });
    document.addEventListener("submit", handleFormSubmit);
    window.addEventListener("error", handleError);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("scroll", handleGlobalScroll);
      document.removeEventListener("submit", handleFormSubmit);
      window.removeEventListener("error", handleError);
    };
  }, [pathname]);

  return null;
}

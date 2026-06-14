"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.classList.remove("cursor-none-all");
      return;
    }

    // Add class to hide default cursor
    document.body.classList.add("cursor-none-all");

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Setup initial state
    gsap.set(cursor, { scale: 0, opacity: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3" });

    let revealed = false;

    const onMouseMove = (e) => {
      if (!revealed) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        revealed = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
      revealed = false;
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      revealed = true;
    };

    // Event delegation for hover states (e.g. buttons, links, custom classes)
    const onMouseOver = (e) => {
      const target = e.target;
      const hoverTarget = target.closest("a, button, .cursor-hover");
      if (hoverTarget) {
        gsap.to(cursor, {
          scale: 2.5,
          opacity: 0.5,
          backgroundColor: "#ffffff",
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const hoverTarget = target.closest("a, button, .cursor-hover");
      if (hoverTarget) {
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          backgroundColor: "#ffffff",
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 pointer-events-none hidden md:block"
      id="custom-cursor"
    />
  );
}

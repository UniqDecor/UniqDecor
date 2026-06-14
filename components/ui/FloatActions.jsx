"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MapPin } from "lucide-react";

export default function FloatActions() {
  const containerRef = useRef(null);

  useEffect(() => {
    const buttons = containerRef.current.querySelectorAll(".floating-btn-v3");
    gsap.set(buttons, { opacity: 0, x: 30 });
    gsap.to(buttons, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "back.out(1.7)",
      delay: 1.8,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-[99999] pointer-events-none md:bottom-8 md:right-8"
      id="uniqFloatingActionsV3"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatBlink {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.35; transform: translateY(-50%) scale(0.95); }
        }
        .animate-float-blink {
          animation: floatBlink 1.8s infinite ease-in-out;
        }
      `}} />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor,%20I'd%20like%20to%20inquire%20about%20your%20luxury%20furniture%20and%20fabrics."
        className="floating-btn-v3 pointer-events-auto relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white bg-gradient-to-br from-green-400 to-green-600 shadow-lg border border-white/15 transition-all hover:scale-108 hover:-translate-y-1 hover:shadow-xl group"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Uniq Decor on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 group-hover:rotate-6" fill="currentColor">
          <path d="M12.031 2a9.967 9.967 0 0 0-9.953 9.953c0 1.938.55 3.75 1.503 5.303L2 22l4.903-1.284a9.902 9.902 0 0 0 5.128 1.403 9.967 9.967 0 0 0 9.953-9.953A9.967 9.967 0 0 0 12.031 2Zm5.847 13.906c-.234.662-1.378 1.284-1.903 1.344-.475.059-.95.122-2.906-.662-2.5-1.003-4.103-3.563-4.225-3.725-.125-.162-.975-1.3-1.12-2.613-.146-1.312.535-1.962.775-2.225.241-.262.53-.328.706-.328.175 0 .35 0 .506.012.169.006.394-.062.619.488.225.55.775 1.887.844 2.025.069.138.112.3.018.487-.093.188-.137.3-.281.469-.144.169-.306.375-.438.506-.15.15-.306.312-.131.612.175.3 1.056 1.744 1.769 2.381.919.819 1.688 1.075 2 1.213.313.137.494.112.675-.094.181-.206.775-.9.981-1.206.206-.306.413-.256.688-.15.281.106 1.775.838 2.081.994.306.156.506.231.581.362.075.131.075.762-.159 1.424Z" />
        </svg>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/90 text-[#FAF9F6] text-xs font-semibold px-3 py-1.5 rounded-md border border-white/10 shadow-md whitespace-nowrap opacity-0 transition-all pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 hidden md:block">
          Chat on WhatsApp
        </span>
      </a>

      {/* Google Maps Button */}
      <a
        href="https://www.google.com/maps/dir//2nd+floor,+Uniq+Decor+%26+Furniture,+Gokul+Tower,+F+Block,+Sector+14,+Hiran+Magri,+Udaipur,+Gordhan+Vilas+Rural,+Rajasthan+313001"
        className="floating-btn-v3 pointer-events-auto relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg border border-white/15 transition-all hover:scale-108 hover:-translate-y-1 hover:shadow-xl group"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Uniq Decor Store on Google Maps"
      >
        <MapPin className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 group-hover:rotate-6" />
        <span className="absolute right-14 md:right-16 top-1/2 bg-[#C9A227] text-white text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border border-white/15 shadow-md whitespace-nowrap animate-float-blink pointer-events-none">
          Visit Us
        </span>
      </a>
    </div>
  );
}

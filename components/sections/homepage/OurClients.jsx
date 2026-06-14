"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const LOGOS = [
  {
    name: "Taj Hotels and Resorts",
    lines: [
      { text: "TAJ", font: "Times New Roman, Georgia, serif", size: 28, weight: "bold", y: 40, spacing: 4 },
      { text: "HOTELS & RESORTS", font: "Inter, sans-serif", size: 9, weight: "600", y: 54, spacing: 2 }
    ]
  },
  {
    name: "Radisson Hotels",
    lines: [
      { text: "Radisson", font: "Inter, sans-serif", size: 26, weight: "900", y: 36, spacing: 1 },
      { text: "HOTELS & RESORTS", font: "Inter, sans-serif", size: 8, weight: "500", y: 50, spacing: 3 }
    ]
  },
  {
    name: "The Oberoi Group",
    lines: [
      { text: "Oberoi", font: "Times New Roman, Georgia, serif", size: 28, weight: "bold", italic: true, y: 38, spacing: 2 },
      { text: "HOTELS & RESORTS", font: "Inter, sans-serif", size: 8, weight: "600", y: 52, spacing: 4 }
    ]
  },
  {
    name: "Ananta Resorts",
    lines: [
      { text: "ANANTA", font: "Times New Roman, Georgia, serif", size: 24, weight: "bold", y: 38, spacing: 3 },
      { text: "LUXURY RESORTS", font: "Inter, sans-serif", size: 8, weight: "500", y: 52, spacing: 3 }
    ]
  },
  {
    name: "HRH Group Udaipur",
    lines: [
      { text: "HRH GROUP", font: "Times New Roman, Georgia, serif", size: 22, weight: "bold", y: 36, spacing: 2 },
      { text: "UDAIPUR", font: "Inter, sans-serif", size: 9, weight: "700", y: 50, spacing: 3 }
    ]
  },
  {
    name: "Geeken Corporate Furniture",
    lines: [
      { text: "GEEKEN", font: "Arial Black, sans-serif", size: 30, weight: "900", y: 38, spacing: 0 },
      { text: "OFFICE FURNITURE", font: "Inter, sans-serif", size: 8, weight: "600", y: 52, spacing: 2 }
    ]
  },
  {
    name: "D'Decor Fabrics",
    lines: [
      { text: "D'DECOR", font: "Times New Roman, Georgia, serif", size: 28, weight: "bold", y: 38, spacing: 3 },
      { text: "HOME FABRICS", font: "Inter, sans-serif", size: 8, weight: "500", y: 52, spacing: 2 }
    ]
  },
  {
    name: "Roserro Luxury Linens",
    lines: [
      { text: "Roserro", font: "Georgia, serif", size: 26, weight: "bold", italic: true, y: 38, spacing: 3 },
      { text: "LUXURY BED LINENS", font: "Inter, sans-serif", size: 8, weight: "600", y: 52, spacing: 2 }
    ]
  },
  {
    name: "LaxRee Hospitality",
    lines: [
      { text: "LAXREE", font: "Inter, sans-serif", size: 28, weight: "900", y: 38, spacing: 1 },
      { text: "AMENITIES & DOMES", font: "Inter, sans-serif", size: 8, weight: "500", y: 52, spacing: 2 }
    ]
  },
  {
    name: "Fortis Healthcare",
    lines: [
      { text: "Fortis", font: "Inter, sans-serif", size: 24, weight: "bold", y: 36, spacing: 1 },
      { text: "HEALTHCARE SYSTEMS", font: "Inter, sans-serif", size: 8, weight: "600", y: 50, spacing: 2 }
    ]
  }
];

export default function OurClients() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    // Section reveal animations
    gsap.from(".clients-header-el", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".clients-marquee-wrapper-v3", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
      y: 25,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: "power3.out",
    });

    // Infinite Marquee Setup
    const track = trackRef.current;
    if (!track) return;

    const itemsCount = LOGOS.length;
    const itemWidth = 220 + 32; // width + gap (2rem = 32px)
    const totalWidth = itemWidth * itemsCount;
    const speed = 30; // pixels per second

    const timeline = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / speed,
      repeat: -1,
      ease: "none"
    });

    timelineRef.current = timeline;
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <section ref={containerRef} className="uniq-clients-v3 py-16 px-[4%] scroll-mt-[90px] border-b border-[var(--color-accent-gold)]/10 bg-[#FAF9F6] relative overflow-hidden" id="our-clients" aria-labelledby="clients-heading">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-clients-v3::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .clients-marquee-wrapper-v3 {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1.5rem 0;
        }

        .clients-marquee-wrapper-v3::before,
        .clients-marquee-wrapper-v3::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .clients-marquee-wrapper-v3::before {
          left: 0;
          background: linear-gradient(to right, #FAF9F6 0%, transparent 100%);
        }

        .clients-marquee-wrapper-v3::after {
          right: 0;
          background: linear-gradient(to left, #FAF9F6 0%, transparent 100%);
        }

        .clients-ticker-track-v3 {
          display: flex;
          gap: 2rem;
          width: max-content;
          will-change: transform;
        }

        .client-logo-box-v3 {
          width: 220px;
          height: 100px;
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-shadow: 0 8px 25px rgba(15, 29, 44, 0.04);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          cursor: pointer;
          flex-shrink: 0;
        }

        .client-logo-box-v3 svg {
          width: 100%;
          height: 100%;
          max-height: 50px;
          fill: #3B4D61;
          opacity: 0.65;
          transition: all 0.4s ease;
        }

        .client-logo-box-v3:hover {
          transform: translateY(-5px) scale(1.03);
          border-color: #C5A059;
          box-shadow: 0 15px 40px rgba(197, 160, 89, 0.12);
        }

        .client-logo-box-v3:hover svg {
          fill: #C5A059;
          opacity: 1;
          filter: drop-shadow(0 4px 10px rgba(197, 160, 89, 0.25));
        }

        @media (max-width: 768px) {
          .uniq-clients-v3 {
            padding: 3.5rem 5%;
          }

          .clients-marquee-wrapper-v3::before,
          .clients-marquee-wrapper-v3::after {
            width: 60px;
          }

          .client-logo-box-v3 {
            width: 180px;
            height: 90px;
            padding: 1.2rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="clients-header-v3 clients-header-el text-center max-w-[800px] mx-auto mb-12 relative z-10">
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(197,160,89,0.08)] border border-[rgba(197,160,89,0.2)] text-[#C5A059] rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
          ✨ Trust & Collaboration
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0F1D2C] leading-tight mb-4">
          Brands That Trust <span className="italic text-[#C5A059] font-medium font-serif">Uniq Decor</span>
        </h2>
        <p className="text-[#3B4D61] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          We are the authoritative curation and delivery partner for elite hotel resorts, high-density corporate offices, and premium residential spaces across Udaipur and Rajasthan.
        </p>
      </div>

      {/* INFINITE RUNNING CAROUSEL */}
      <div 
        className="clients-marquee-wrapper-v3 relative z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="clients-ticker-track-v3" id="clientsTickerTrack">
          {/* Double list for seamless looping */}
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <div 
              key={`${logo.name}-${idx}`} 
              className="client-logo-box-v3" 
              tabIndex={0} 
              aria-label={logo.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                }
              }}
            >
              <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                {logo.lines.map((line, lineIdx) => (
                  <text
                    key={lineIdx}
                    x="50%"
                    y={line.y}
                    fontFamily={line.font}
                    fontWeight={line.weight}
                    fontStyle={line.italic ? "italic" : "normal"}
                    fontSize={line.size}
                    textAnchor="middle"
                    letterSpacing={line.spacing}
                  >
                    {line.text}
                  </text>
                ))}
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

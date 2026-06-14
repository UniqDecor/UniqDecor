"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const STEPS = [
  {
    num: "01",
    phase: "Phase 01 — Conception",
    title: "Private Consultation",
    desc: "Meet our chief showroom consultants. We map your design blueprint, layout specs, and select premium brand aesthetics.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    num: "02",
    phase: "Phase 02 — Curation",
    title: "3D Space Curation",
    desc: "See your blueprint in real-time. We customize 3D space mockups, fine-tuning fabrics, seating contours, and layouts.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    num: "03",
    phase: "Phase 03 — Production",
    title: "Elite Craftsmanship",
    desc: "Artisans assemble custom orders—combining premium Roserro frames, D'Decor fabric covers, and Geeken desk structures.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.32832 19.47 6.09633 19.3879 6.49503 18.9056L8 17.0807C8.50654 16.4673 9.40794 16.3683 10.027 16.8589C10.6094 17.3204 11.2829 17.6582 12 17.8427C12.553 17.9851 13 18.4419 13 19.0142V21.4645C13 21.8483 12.5597 22.0626 12.2471 21.8219L12 22Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="11.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"/></svg>
    ),
  },
  {
    num: "04",
    phase: "Phase 04 — Deployment",
    title: "White-Glove Delivery",
    desc: "Complete institutional shipping and professional layout setup in your residency, hotel suite, or corporate complex.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="7.5 4.21 12 6.81 16.5 4.21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="7.5 19.79 7.5 14.6 3 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="21 12 16.5 14.6 16.5 19.79" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3.27 17.04 12 12.01 20.73 17.04" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

export default function Journey() {
  const [activeStep, setActiveStep] = useState(null);
  const containerRef = useRef(null);
  const desktopPathRef = useRef(null);
  const mobilePathRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Desktop Horizontal Path Drawing
    if (desktopPathRef.current) {
      gsap.fromTo(desktopPathRef.current, 
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".journey-grid-v9",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.8,
          }
        }
      );
    }

    // 2. Mobile Vertical Path Drawing
    if (mobilePathRef.current) {
      gsap.fromTo(mobilePathRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".journey-grid-v9",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.8,
          }
        }
      );
    }

    // 3. Card reveal entrance
    gsap.from(".journey-card-v9", {
      scrollTrigger: {
        trigger: ".journey-grid-v9",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const handleStepClick = (idx) => {
    setActiveStep(idx);
  };

  return (
    <section ref={containerRef} className="uniq-journey-v9 py-[7.5rem] px-[4%] bg-[#FAF9F6] relative overflow-hidden" id="design-journey" aria-labelledby="journey-heading-v9">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-journey-v9::before {
          content: '';
          position: absolute;
          top: 50%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(201, 162, 39, 0.02) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-journey-v9 > * {
          position: relative;
          z-index: 2;
        }

        .journey-header-v9 {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 5rem;
        }

        .journey-timeline-wrapper-v9 {
          position: relative;
          max-width: 1450px;
          margin: 0 auto;
          padding: 2.5rem 0;
        }

        .timeline-svg-container-v9 {
          position: absolute;
          top: 96px;
          left: 12.5%;
          right: 12.5%;
          height: 10px;
          z-index: 1;
          pointer-events: none;
          display: block;
        }

        .timeline-svg-container-v9 svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .path-bg-v9 {
          stroke: rgba(27, 67, 50, 0.06);
          stroke-width: 4;
          stroke-linecap: round;
          fill: none;
        }

        .path-glow-v9 {
          stroke: #C9A227;
          stroke-width: 5;
          stroke-linecap: round;
          fill: none;
          filter: drop-shadow(0 0 8px rgba(201, 162, 39, 0.45));
          transform-origin: left center;
        }

        .timeline-svg-mobile-v9 {
          display: none;
          position: absolute;
          top: 4.5rem;
          bottom: 4.5rem;
          left: 42px;
          width: 10px;
          z-index: 1;
          pointer-events: none;
        }

        .timeline-svg-mobile-v9 svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .path-glow-mobile-v9 {
          stroke: #C9A227;
          stroke-width: 5;
          stroke-linecap: round;
          fill: none;
          filter: drop-shadow(0 0 8px rgba(201, 162, 39, 0.45));
          transform-origin: top center;
        }

        .journey-grid-v9 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.2rem;
          position: relative;
          z-index: 2;
        }

        .journey-card-v9 {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          outline: none;
        }

        .journey-node-v9 {
          width: 64px;
          height: 64px;
          background: white;
          border: 3px solid rgba(27, 67, 50, 0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 800;
          color: #888888;
          position: relative;
          z-index: 5;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 4px 15px rgba(27, 67, 50, 0.02);
          margin-bottom: 2.5rem;
        }

        .journey-card-v9:hover .journey-node-v9 {
          border-color: #C9A227;
          color: #C9A227;
          transform: scale(1.12);
          box-shadow: 0 0 25px rgba(201, 162, 39, 0.45);
        }

        .journey-details-v9 {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(27, 67, 50, 0.05);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 24px;
          padding: 2.2rem 2rem;
          box-shadow: 0 12px 35px rgba(27, 67, 50, 0.04);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .journey-card-v9:hover .journey-details-v9 {
          transform: translateY(-8px);
          border-color: rgba(201, 162, 39, 0.22);
          box-shadow: 0 25px 60px rgba(27, 67, 50, 0.12);
        }

        .journey-details-v9::before {
          content: '';
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 10px 16px 10px;
          border-style: solid;
          border-color: transparent transparent rgba(27, 67, 50, 0.05) transparent;
          transition: all 0.4s ease;
        }

        .journey-card-v9:hover .journey-details-v9::before {
          border-color: transparent transparent rgba(201, 162, 39, 0.22) transparent;
        }

        .journey-icon-v9 {
          width: 50px;
          height: 50px;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A227;
          margin-bottom: 1.5rem;
          transition: all 0.4s ease;
        }

        .journey-card-v9:hover .journey-icon-v9 {
          background: #1B4332;
          border-color: #1B4332;
          color: white;
          transform: scale(1.06) rotate(3deg);
        }

        .journey-icon-v9 svg {
          width: 24px;
          height: 24px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
        }

        .journey-step-tag-v9 {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #C9A227;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .journey-details-v9 h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .journey-details-v9 p {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.55;
          margin: 0;
        }

        .journey-card-v9.active-step-v9 .journey-node-v9 {
          border-color: #C9A227;
          color: #C9A227;
          transform: scale(1.15);
          box-shadow: 0 0 25px rgba(201, 162, 39, 0.45);
        }

        .journey-card-v9.active-step-v9 .journey-details-v9 {
          border-color: #C9A227;
          box-shadow: 0 25px 60px rgba(27, 67, 50, 0.12);
          background: white;
        }

        @media (max-width: 1024px) {
          .journey-grid-v9 {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem 2rem;
          }
          .timeline-svg-container-v9 {
            display: none;
          }
          .journey-node-v9 {
            margin-bottom: 1.8rem;
          }
          .journey-details-v9::before {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .uniq-journey-v9 {
            padding: 5rem 6%;
          }

          .journey-grid-v9 {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            position: relative;
          }

          .timeline-svg-mobile-v9 {
            display: block;
          }

          .journey-card-v9 {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            width: 100%;
          }

          .journey-node-v9 {
            margin-bottom: 0;
            margin-right: 2rem;
            flex-shrink: 0;
            width: 52px;
            height: 52px;
            font-size: 1rem;
          }

          .timeline-svg-mobile-v9 {
            left: 26px;
          }

          .journey-details-v9 {
            align-items: flex-start;
            padding: 2rem;
          }

          .journey-details-v9::before {
            display: block;
            top: 18px;
            left: -16px;
            transform: translateY(0);
            border-width: 10px 16px 10px 0;
            border-color: transparent rgba(27, 67, 50, 0.05) transparent transparent;
          }

          .journey-card-v9:hover .journey-details-v9::before {
            border-color: transparent rgba(201, 162, 39, 0.22) transparent transparent;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="journey-header-v9">
        <h2 id="journey-heading-v9" className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          Our Bespoke <span className="italic text-[#C9A227] font-serif font-medium">Design Journey</span>
        </h2>
        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
          How we collaborate with you to transform empty rooms, custom offices, and luxury resorts into signature brand environments
        </p>
      </div>

      {/* TIMELINE WRAPPER */}
      <div className="journey-timeline-wrapper-v9">
        {/* DESKTOP SVG LASER CONNECTORS */}
        <div className="timeline-svg-container-v9" aria-hidden="true">
          <svg viewBox="0 0 1000 10" preserveAspectRatio="none">
            <path d="M 0 5 L 1000 5" className="path-bg-v9" />
            <path ref={desktopPathRef} d="M 0 5 L 1000 5" className="path-glow-v9" />
          </svg>
        </div>

        {/* MOBILE SVG LASER CONNECTORS */}
        <div className="timeline-svg-mobile-v9" aria-hidden="true">
          <svg viewBox="0 0 10 1000" preserveAspectRatio="none">
            <path d="M 5 0 L 5 1000" className="path-bg-v9" />
            <path ref={mobilePathRef} d="M 5 0 L 5 1000" className="path-glow-mobile-v9" />
          </svg>
        </div>

        {/* JOURNEY GRID CARDS */}
        <div className="journey-grid-v9">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`journey-card-v9 cursor-hover ${activeStep === idx ? "active-step-v9" : ""}`}
              tabIndex={0}
              role="group"
              aria-label={`Step ${idx + 1}: ${step.title}`}
              onClick={() => handleStepClick(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleStepClick(idx);
                }
              }}
            >
              <div className="journey-node-v9">{step.num}</div>
              <div className="journey-details-v9">
                <div className="journey-icon-v9" aria-hidden="true">
                  {step.icon}
                </div>
                <span className="journey-step-tag-v9">{step.phase}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

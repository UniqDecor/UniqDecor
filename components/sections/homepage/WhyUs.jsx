"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function WhyUs() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const infoBarRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup for entrance animations
    gsap.set(".glass-info-bar-v3", { y: 35, opacity: 0 });

    if (window.innerWidth <= 768) {
      // Direct opacity set for mobile
      gsap.set(".trust-card-v3", { opacity: 1, y: 0 });
    } else {
      gsap.set(".trust-card-v3", { y: 40, opacity: 0 });

      // Stagger card entrance
      gsap.to(".trust-card-v3", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });
    }

    // Info bar entrance
    gsap.to(".glass-info-bar-v3", {
      scrollTrigger: {
        trigger: ".glass-info-bar-v3",
        start: "top 85%",
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    });

    // CTA entrance
    gsap.from(".trust-cta-v3", {
      scrollTrigger: {
        trigger: ".trust-cta-v3",
        start: "top 90%",
        once: true,
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    // 3D Tilt Effect on Cards (only for desktop)
    if (window.innerWidth > 768) {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const onMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const normX = (x / rect.width) - 0.5;
          const normY = (y / rect.height) - 0.5;

          const tiltX = -(normY * 14);
          const tiltY = (normX * 14);

          gsap.to(card, {
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.35,
            overwrite: "auto",
          });

          const glow = card.querySelector(".card-glow-v3");
          if (glow) {
            gsap.to(glow, {
              background: `radial-gradient(circle at ${x}px ${y}px, rgba(201, 162, 39, 0.08) 0%, transparent 65%)`,
              duration: 0.1,
              overwrite: "auto",
            });
          }
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            ease: "power3.out",
            duration: 0.7,
            overwrite: "auto",
          });
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);

        return () => {
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });

      // Info Bar Gentle Tilt
      const infoBar = infoBarRef.current;
      if (infoBar) {
        const onMouseMove = (e) => {
          const rect = infoBar.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const normX = (x / rect.width) - 0.5;
          const normY = (y / rect.height) - 0.5;

          const tiltX = -(normY * 6);
          const tiltY = (normX * 6);

          gsap.to(infoBar, {
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1200,
            ease: "power1.out",
            duration: 0.4,
            overwrite: "auto",
          });
        };

        const onMouseLeave = () => {
          gsap.to(infoBar, {
            rotateX: 0,
            rotateY: 0,
            ease: "power3.out",
            duration: 0.8,
            overwrite: "auto",
          });
        };

        infoBar.addEventListener("mousemove", onMouseMove);
        infoBar.addEventListener("mouseleave", onMouseLeave);

        return () => {
          infoBar.removeEventListener("mousemove", onMouseMove);
          infoBar.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="uniq-trust-v3 py-[7rem] px-[4%] bg-[#FAF9F6] relative overflow-hidden" id="why-us" aria-labelledby="trust-heading-v3">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-trust-v3::before {
          content: '';
          position: absolute;
          top: -15%;
          left: -10%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(27, 67, 50, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-trust-v3::after {
          content: '';
          position: absolute;
          bottom: -15%;
          right: -10%;
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, rgba(201, 162, 39, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-trust-v3 > * {
          position: relative;
          z-index: 1;
        }

        .trust-header-v3 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4rem;
        }

        .trust-badge-v3 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(27, 67, 50, 0.08);
          border: 1px solid rgba(27, 67, 50, 0.15);
          color: #1B4332;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .trust-grid-v3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          perspective: 1000px;
        }

        .trust-card-v3 {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 2.8rem 2.2rem;
          border: 1px solid rgba(27, 67, 50, 0.08);
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.04);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          will-change: transform;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .trust-card-v3:hover {
          border-color: rgba(201, 162, 39, 0.25);
          box-shadow: 0 35px 70px rgba(27, 67, 50, 0.15);
        }

        .card-glow-v3 {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(201, 162, 39, 0.04) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }

        .trust-card-v3:hover .card-glow-v3 {
          opacity: 1;
        }

        .card-icon-wrapper-v3 {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(27, 67, 50, 0.05);
          border: 1px solid rgba(27, 67, 50, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1B4332;
          margin-bottom: 1.8rem;
          transition: all 0.4s ease;
          transform: translateZ(25px);
        }

        .trust-card-v3:hover .card-icon-wrapper-v3 {
          background: #1B4332;
          color: white;
          transform: translateZ(35px) scale(1.05);
        }

        .card-icon-wrapper-v3 svg {
          width: 28px;
          height: 28px;
          stroke-width: 1.8;
        }

        .trust-card-v3 h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.8rem;
          transform: translateZ(20px);
        }

        .card-divider-v3 {
          width: 40px;
          height: 2px;
          background: #C9A227;
          margin-bottom: 1.2rem;
          transition: width 0.3s ease;
          transform: translateZ(15px);
        }

        .trust-card-v3:hover .card-divider-v3 {
          width: 70px;
        }

        .trust-card-v3 p {
          font-size: 0.9rem;
          color: #4A4A4A;
          line-height: 1.6;
          margin: 0;
          transform: translateZ(10px);
        }

        .trust-highlight-v3 {
          color: #1B4332;
          font-weight: 700;
          font-size: 0.95rem;
          display: block;
          margin-bottom: 0.4rem;
        }

        .card-corner-v3 {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(201, 162, 39, 0.08) 50%);
          border-radius: 0 0 24px 0;
          transition: all 0.4s ease;
          z-index: 1;
        }

        .trust-card-v3:hover .card-corner-v3 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, transparent 50%, rgba(201, 162, 39, 0.16) 50%);
        }

        .glass-info-bar-v3 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 5rem auto 0;
          padding: 2.5rem 1.5rem;
          background: linear-gradient(135deg, rgba(27, 67, 50, 0.96) 0%, rgba(10, 31, 22, 0.98) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 162, 39, 0.25);
          border-radius: 28px;
          box-shadow: 0 30px 70px rgba(10, 31, 22, 0.35), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.15),
                      0 0 50px rgba(201, 162, 39, 0.05);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          cursor: pointer;
        }

        .glass-info-bar-v3::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba(255, 255, 255, 0.05) 48%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0.05) 52%,
            transparent 55%
          );
          pointer-events: none;
          z-index: 1;
          transition: transform 0.8s ease;
        }

        .glass-info-bar-v3:hover::after {
          transform: translate(15%, 15%);
        }

        .glass-info-bar-v3::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .info-column-v3 {
          text-align: center;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2.2rem 1.2rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 2;
          transform: translateZ(20px);
        }

        .info-column-v3:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(201, 162, 39, 0.22);
          transform: translateZ(35px) translateY(-6px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        }

        .info-icon-wrapper-v3 {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A227;
          margin-bottom: 1.1rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .info-column-v3:hover .info-icon-wrapper-v3 {
          background: #C9A227;
          color: #1B4332;
          transform: scale(1.1) rotate(6deg);
          box-shadow: 0 0 20px rgba(201, 162, 39, 0.4);
        }

        .info-icon-wrapper-v3 svg {
          width: 20px;
          height: 20px;
          stroke-width: 2.2;
        }

        .info-column-v3 h4 {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .info-column-v3 p {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.55;
          margin: 0;
        }

        .info-column-v3 a {
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
          transition: color 0.3s ease;
          display: block;
          margin-bottom: 2px;
        }

        .info-column-v3 a:hover {
          color: #C9A227;
        }

        .info-column-v3 a.wa-link-v3 {
          color: #25D366;
          font-weight: 600;
        }

        .info-column-v3 a.wa-link-v3:hover {
          color: #1da851;
        }

        .info-column-underline-v3 {
          width: 0;
          height: 2px;
          background: #C9A227;
          margin-top: 1rem;
          transition: width 0.35s ease;
        }

        .info-column-v3:hover .info-column-underline-v3 {
          width: 50px;
        }

        .trust-cta-v3 {
          text-align: center;
          margin-top: 4.5rem;
        }

        .btn-whatsapp-trust-v3 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          background: linear-gradient(135deg, #25D366 0%, #1c9c4b 100%);
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 50px;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-whatsapp-trust-v3:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5);
        }

        .btn-whatsapp-trust-v3 svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        @media (max-width: 1024px) {
          .trust-grid-v3 {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .glass-info-bar-v3 {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .uniq-trust-v3 {
            padding: 4rem 4%;
          }

          .trust-grid-v3 {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .trust-card-v3 {
            padding: 1.4rem 1.2rem;
            border-radius: 18px;
            transform: none !important;
          }

          .card-icon-wrapper-v3 {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            margin-bottom: 1rem;
            transform: none !important;
          }

          .card-icon-wrapper-v3 svg {
            width: 22px;
            height: 22px;
          }

          .trust-card-v3 h3 {
            font-size: 1.05rem;
            margin-bottom: 0.5rem;
            transform: none !important;
          }

          .card-divider-v3 {
            margin-bottom: 0.8rem;
            transform: none !important;
          }

          .trust-card-v3 p {
            font-size: 0.78rem;
            line-height: 1.55;
            transform: none !important;
          }

          .trust-card-v3 .trust-desc-v3 {
            display: none !important;
          }

          .trust-highlight-v3 {
            font-size: 0.82rem;
            margin-bottom: 0.25rem;
          }

          .glass-info-bar-v3 {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 1.6rem 0.8rem;
            margin-top: 3rem;
            border-radius: 24px;
            background: linear-gradient(135deg, rgba(27, 67, 50, 0.98) 0%, rgba(8, 26, 18, 0.99) 100%);
          }

          .info-column-v3 {
            padding: 1.5rem 0.8rem;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.04);
          }

          .info-icon-wrapper-v3 {
            width: 42px;
            height: 42px;
            margin-bottom: 0.75rem;
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.15);
          }

          .info-icon-wrapper-v3 svg {
            width: 17px;
            height: 17px;
            stroke-width: 2;
          }

          .info-column-v3 h4 {
            font-size: 0.8rem;
            letter-spacing: 0.06em;
            margin-bottom: 0.4rem;
          }

          .info-column-v3 p,
          .info-column-v3 a {
            font-size: 0.74rem;
            line-height: 1.45;
          }

          .info-column-underline-v3 {
            display: none;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="trust-header-v3">
        <span className="trust-badge-v3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Credibility & Trust
        </span>
        <h2 id="trust-heading-v3" className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          Why Choose <span className="italic text-[#C9A227] font-serif font-medium">Uniq Decor</span>?
        </h2>
        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
          Udaipur's trusted destination for premium furniture, bedding, and hospitality fabrics since 2010
        </p>
      </div>

      {/* 3D FLOATING CARDS GRID */}
      <div className="trust-grid-v3">
        {/* Card 1: GST Registered */}
        <div ref={(el) => (cardRefs.current[0] = el)} className="trust-card-v3 cursor-hover" tabIndex={0}>
          <div className="card-glow-v3"></div>
          <div className="card-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <h3>GST Registered</h3>
          <div className="card-divider-v3"></div>
          <span className="trust-highlight-v3">GST: 08ABCPG1457G2ZX</span>
          <p className="trust-desc-v3">Transparent billing, tax invoices, and B2B compliance for corporate, retail, and hotel clients.</p>
          <div className="card-corner-v3"></div>
        </div>

        {/* Card 2: Hospitality Experts */}
        <div ref={(el) => (cardRefs.current[1] = el)} className="trust-card-v3 cursor-hover" tabIndex={0}>
          <div className="card-glow-v3"></div>
          <div className="card-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="10" width="18" height="12" rx="2"/>
              <path d="M7 10V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6"/>
              <path d="M12 14v4"/>
              <path d="M8 14v.01"/>
              <path d="M16 14v.01"/>
            </svg>
          </div>
          <h3>Hospitality Specialists</h3>
          <div className="card-divider-v3"></div>
          <span className="trust-highlight-v3">500+ Projects Delivered</span>
          <p className="trust-desc-v3">Trusted by 5-star hotels, resorts, and premium offices across India and Rajasthan.</p>
          <div className="card-corner-v3"></div>
        </div>

        {/* Card 3: All-India Delivery */}
        <div ref={(el) => (cardRefs.current[2] = el)} className="trust-card-v3 cursor-hover" tabIndex={0}>
          <div className="card-glow-v3"></div>
          <div className="card-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <h3>All-India Delivery</h3>
          <div className="card-divider-v3"></div>
          <span className="trust-highlight-v3">PAN India Logistical Network</span>
          <p className="trust-desc-v3">Seamless safe packing, fully insured transit, and professional on-site installation anywhere.</p>
          <div className="card-corner-v3"></div>
        </div>

        {/* Card 4: Dedicated Support */}
        <div ref={(el) => (cardRefs.current[3] = el)} className="trust-card-v3 cursor-hover" tabIndex={0}>
          <div className="card-glow-v3"></div>
          <div className="card-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3>After-Sales Support</h3>
          <div className="card-divider-v3"></div>
          <span className="trust-highlight-v3">Dedicated Service Team</span>
          <p className="trust-desc-v3">Post-installation maintenance, active warranty handling, and long-term customer relationship care.</p>
          <div className="card-corner-v3"></div>
        </div>

        {/* Card 5: Showroom Storefront */}
        <div ref={(el) => (cardRefs.current[4] = el)} className="trust-card-v3 cursor-hover" tabIndex={0}>
          <div className="card-glow-v3"></div>
          <div className="card-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h3>Udaipur Showroom</h3>
          <div className="card-divider-v3"></div>
          <span className="trust-highlight-v3">F-Block, Sector 14 Hiran Magri</span>
          <p className="trust-desc-v3">Visit us Mon–Sat, 10AM–7PM. Experience the touch, feel, and materials of our premium collections.</p>
          <div className="card-corner-v3"></div>
        </div>

        {/* Card 6: Support */}
        <div ref={(el) => (cardRefs.current[5] = el)} className="trust-card-v3 cursor-hover" tabIndex={0}>
          <div className="card-glow-v3"></div>
          <div className="card-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
          </div>
          <h3>Instant Support</h3>
          <div className="card-divider-v3"></div>
          <span className="trust-highlight-v3">+91 99822 19222</span>
          <p className="trust-desc-v3">Get instant digital quotes, material catalogues, and high-res photos within minutes.</p>
          <div className="card-corner-v3"></div>
        </div>
      </div>

      {/* UPGRADED GLASSMORPHIC 3D CONTACT STRIP */}
      <div 
        ref={infoBarRef}
        className="glass-info-bar-v3" 
        tabIndex={0} 
        aria-label="Business contact details"
      >
        {/* Column 1: Address */}
        <div className="info-column-v3" tabIndex={0}>
          <div className="info-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h4>Visit Us</h4>
          <p>F-Block, Sector 14<br/>Hiran Magri, Udaipur<br/>Rajasthan 313001</p>
          <div className="info-column-underline-v3"></div>
        </div>

        {/* Column 2: Telephone/WA */}
        <div className="info-column-v3" tabIndex={0}>
          <div className="info-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h4>Contact</h4>
          <p>
            <a href="tel:+919982219222" className="cursor-hover">+91 99822 19222</a>
            <a href="https://wa.me/919982219222" className="wa-link-v3 cursor-hover" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
          </p>
          <div className="info-column-underline-v3"></div>
        </div>

        {/* Column 3: Email */}
        <div className="info-column-v3" tabIndex={0}>
          <div className="info-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h4>Email Us</h4>
          <p>
            <a href="mailto:contact@uniqdecorfurniture.in" className="cursor-hover">contact@uniqdecor...</a>
          </p>
          <div className="info-column-underline-v3"></div>
        </div>

        {/* Column 4: Hours */}
        <div className="info-column-v3" tabIndex={0}>
          <div className="info-icon-wrapper-v3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h4>Office Hours</h4>
          <p>Mon – Sat: 10AM – 7PM<br/>Sunday: Closed</p>
          <div className="info-column-underline-v3"></div>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className="trust-cta-v3">
        <p className="text-[#4A4A4A]">Have a commercial, corporate, or custom home project in mind?</p>
        <a href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20👋%20I%20visited%20your%20website%20and%20want%20to%20discuss%20a%20furniture%20or%20fabrics%20project.%20Please%20connect%20me%20with%20your%20support%20team." 
           className="btn-whatsapp-trust-v3 cursor-hover" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="Start WhatsApp conversation for your project">
          <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Start Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}

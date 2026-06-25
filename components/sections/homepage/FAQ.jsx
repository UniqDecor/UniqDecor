"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FAQ_ITEMS = [
  {
    question: "Can I customize furniture sizing and fabric selections at the Udaipur showroom?",
    answer: (
      <>
        <p>Absolutely. Custom tailoring is our absolute signature. Every sofa or lounge suite from <strong>Roserro Furniture</strong> can be dimensionally customized in size to match your room blueprint.</p>
        <p>Additionally, we house Udaipur's largest physical material library representing <strong>D'Decor Premium Fabrics</strong>, allowing you to select bespoke drapery sheer panels, cushion skins, and hotel headboards directly from premium fabric catalogs.</p>
      </>
    ),
  },
  {
    question: "Which authorized premium brands are on active display in the gallery?",
    answer: (
      <>
        <p>Our Udaipur flagship gallery exhibits designated design blocks for our four authorized national brand partners:</p>
        <p>
          • <strong>ROSERRO</strong> — Premium living room sofas, carved wooden lounge consoles, and luxury structural beds.<br/>
          • <strong>D'DECOR</strong> — Authorized catalogs of high-rub curtains, sheers, wallpapers, and cushion fabrics.<br/>
          • <strong>GEEKEN</strong> — Ergonomic corporate task chairs, active executive tables, and modular office partition spaces.<br/>
          • <strong>LAXREE</strong> — Highly luxurious 400TC bedding linens, bath towels, and institutional hotel mattresses.
        </p>
      </>
    ),
  },
  {
    question: "What warranty and quality protection is covered on custom items?",
    answer: (
      <>
        <p>Uncompromising material stability is guaranteed. Custom solid-wood furniture structures from <strong>Roserro</strong> include comprehensive warranty protection against teak framing defects.</p>
        <p>Office seating assets from <strong>Geeken Ergonomics</strong> include official brand warranty covers on high-performance gas lift mechanisms, base shells, and nylon castors. All textiles utilize high rub-count parameters for maximum wear resistance.</p>
      </>
    ),
  },
  {
    question: "Do you provide full-scale site measurements for homes and offices?",
    answer: (
      <>
        <p>Yes. For multi-room residences, entire luxury resort suites, and corporate workplace layouts in Udaipur, our technical experts perform high-accuracy laser site measurements.</p>
        <p>This guarantees that curtains are stitched to match perfect ceiling heights and ergonomic modular desks align with structural columns and power channels on the floor plan.</p>
      </>
    ),
  },
  {
    question: "What is the expected delivery and setup timeline for Udaipur?",
    answer: (
      <>
        <p>Standard retail orders, ready-made ergonomic chairs, and in-stock hospitality bath linens are dispatched within <strong>3 to 5 business days</strong>.</p>
        <p>Bespoke living suites, tailor-stitched D'Decor motorized curtains, and wholesale corporate workspaces require approximately <strong>15 to 25 business days</strong>. This permits customized structure milling, hand-stitching, inspection, and white-glove site installation.</p>
      </>
    ),
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const containerRef = useRef(null);
  const accordionRefs = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup
    gsap.set(".faq-reveal-el", { opacity: 0, y: 25 });

    // Grid columns reveal
    gsap.to(".faq-reveal-el", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const toggleAccordion = (idx) => {
    if (openIdx === idx) {
      // Close
      const wrapper = accordionRefs.current[idx];
      gsap.to(wrapper, {
        height: 0,
        duration: 0.38,
        ease: "power2.inOut",
        onComplete: () => setOpenIdx(null),
      });
    } else {
      // Close open one first
      if (openIdx !== null) {
        const currentWrapper = accordionRefs.current[openIdx];
        gsap.to(currentWrapper, {
          height: 0,
          duration: 0.38,
          ease: "power2.inOut",
        });
      }

      // Open new one
      setOpenIdx(idx);
      const nextWrapper = accordionRefs.current[idx];
      // Temporarily set height auto to measure scrollHeight
      gsap.fromTo(nextWrapper,
        { height: 0 },
        {
          height: nextWrapper.scrollHeight,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            nextWrapper.style.height = "auto";
          }
        }
      );
    }
  };

  return (
    <section ref={containerRef} className="uniq-faq-v10 py-[7.5rem] px-[4%] bg-[#FAF9F6] relative overflow-hidden" id="faq-accordions" aria-labelledby="faq-heading-v10">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-faq-v10::before {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(27, 67, 50, 0.02) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-faq-v10 > * {
          position: relative;
          z-index: 2;
        }

        .faq-header-v10 {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 5rem;
        }

        .faq-layout-grid-v10 {
          display: grid;
          grid-template-columns: 1.1fr 1.4fr;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
          align-items: start;
        }

        .faq-image-wrapper-v10 {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(27, 67, 50, 0.06);
          border: 1px solid rgba(201, 162, 39, 0.22);
          aspect-ratio: 4 / 5;
          min-height: 600px;
        }

        .faq-image-bg-v10 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/photos/HOMEPAGE IMAGE/DESIGNR CURTAINS AND DRAPES.webp');
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .faq-image-wrapper-v10:hover .faq-image-bg-v10 {
          transform: scale(1.05);
        }

        .faq-image-overlay-v10 {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13, 30, 22, 0.82) 0%, rgba(20, 20, 20, 0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3rem 2.5rem;
          color: white;
        }

        .faq-image-tag-v10 {
          display: inline-block;
          align-self: flex-start;
          padding: 3px 9px;
          background: rgba(201, 162, 39, 0.2);
          border: 1px solid #C9A227;
          color: #C9A227;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .faq-image-overlay-v10 h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }

        .faq-image-overlay-v10 p {
          font-size: 0.95rem;
          color: #e0e0e0;
          line-height: 1.5;
          margin: 0;
        }

        .faq-content-wrapper-v10 {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .faq-concierge-card-v10 {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(27, 67, 50, 0.05);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 24px;
          padding: 2.2rem;
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.03);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .concierge-text-v10 {
          max-width: 60%;
        }

        .concierge-text-v10 h4 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.4rem;
        }

        .concierge-text-v10 p {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.5;
          margin: 0;
        }

        .btn-concierge-whatsapp-v10 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 22px;
          background: #C9A227;
          color: white;
          font-weight: 700;
          font-size: 0.88rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 162, 39, 0.2);
          flex-shrink: 0;
        }

        .btn-concierge-whatsapp-v10:hover {
          background: #b08d1f;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 39, 0.35);
        }

        .btn-concierge-whatsapp-v10 svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .faq-accordion-stack-v10 {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .faq-item-v10 {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(27, 67, 50, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.03);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .faq-item-v10:hover {
          border-color: rgba(201, 162, 39, 0.22);
          box-shadow: 0 22px 50px rgba(27, 67, 50, 0.1);
          transform: translateY(-2px);
        }

        .faq-item-v10.is-open-v10 {
          background: white;
          border-color: rgba(201, 162, 39, 0.22);
          box-shadow: 0 22px 50px rgba(27, 67, 50, 0.1);
        }

        .faq-summary-v10 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.6rem 2rem;
          cursor: pointer;
          user-select: none;
        }

        .faq-summary-v10 h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1A1A1A;
          line-height: 1.4;
          margin: 0;
          transition: color 0.3s ease;
          padding-right: 1.5rem;
        }

        .faq-item-v10:hover .faq-summary-v10 h3 {
          color: #1B4332;
        }

        .faq-item-v10.is-open-v10 .faq-summary-v10 h3 {
          color: #C9A227;
        }

        .faq-chevron-wrapper-v10 {
          width: 36px;
          height: 36px;
          background: rgba(201, 162, 39, 0.05);
          border: 1px solid rgba(201, 162, 39, 0.15);
          color: #C9A227;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .faq-item-v10:hover .faq-chevron-wrapper-v10 {
          background: #1B4332;
          border-color: #1B4332;
          color: white;
        }

        .faq-item-v10.is-open-v10 .faq-chevron-wrapper-v10 {
          transform: rotate(180deg);
          background: #C9A227;
          border-color: #C9A227;
          color: white;
          box-shadow: 0 0 12px rgba(201, 162, 39, 0.3);
        }

        .faq-chevron-wrapper-v10 svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }

        .faq-answer-wrapper-v10 {
          overflow: hidden;
          height: 0px;
        }

        .faq-answer-content-v10 {
          padding: 0 2rem 1.8rem;
          border-top: 1px solid rgba(27, 67, 50, 0.04);
          font-size: 0.92rem;
          color: #4A4A4A;
          line-height: 1.6;
        }

        .faq-answer-content-v10 p {
          margin: 0.8rem 0 0;
        }

        .faq-answer-content-v10 p:first-child {
          margin-top: 1rem;
        }

        .faq-answer-content-v10 strong {
          color: #1B4332;
          font-weight: 700;
        }

        @media (max-width: 1150px) {
          .faq-layout-grid-v10 {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .faq-image-wrapper-v10 {
            aspect-ratio: 16 / 9;
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .uniq-faq-v10 {
            padding: 5rem 6%;
          }
          .faq-image-wrapper-v10 {
            min-height: 300px;
            border-radius: 20px;
          }
          .faq-image-overlay-v10 {
            padding: 2rem 1.5rem;
          }
          .faq-image-overlay-v10 h3 {
            font-size: 1.6rem;
          }
          .faq-concierge-card-v10 {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 1.5rem;
            border-radius: 20px;
          }
          .concierge-text-v10 {
            max-width: 100%;
          }
          .btn-concierge-whatsapp-v10 {
            width: 100%;
            justify-content: center;
          }
          .faq-summary-v10 {
            padding: 1.4rem;
          }
          .faq-summary-v10 h3 {
            font-size: 1rem;
          }
          .faq-answer-content-v10 {
            padding: 0 1.4rem 1.4rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="faq-header-v10">
        <h2 id="faq-heading-v10" className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          Architectural <span className="italic text-[#C9A227] font-serif font-medium">Expert Support</span>
        </h2>
        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
          Definitive answers about custom sizing layouts, premium brand selections, and showrooms
        </p>
      </div>

      <div className="faq-layout-grid-v10">
        {/* LEFT COLUMN: PORTRAIT IMAGE */}
        <div className="faq-image-wrapper-v10 faq-reveal-el">
          <div className="faq-image-bg-v10" aria-hidden="true"></div>
          <div className="faq-image-overlay-v10">
            <span className="faq-image-tag-v10">Signature Showroom</span>
            <h3>Bring Your Blueprints</h3>
            <p>Step inside our physical Udaipur showroom and visualize motorized curtains, custom living sofas, and corporate desks next to each other.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQS */}
        <div className="faq-content-wrapper-v10">
          {/* CONCIERGE CARD */}
          <div className="faq-concierge-card-v10 faq-reveal-el">
            <div className="concierge-text-v10">
              <h4>Need Custom Sizing?</h4>
              <p>Our chief consultants are available to map custom yardages and ergonomic workspaces directly from your blueprint.</p>
            </div>
            <a 
              href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20👋%20I%20would%20like%20to%20consult%20with%20an%20interior%20design%20expert." 
              className="btn-concierge-whatsapp-v10 cursor-hover" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Launch WhatsApp to talk with a design consultant"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current mr-2">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Consultant
            </a>
          </div>

          {/* ACCORDION STACK */}
          <div className="faq-accordion-stack-v10 faq-reveal-el">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className={`faq-item-v10 ${openIdx === idx ? "is-open-v10" : ""}`}
              >
                <button 
                  className="faq-summary-v10"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={openIdx === idx}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-button-${idx}`}
                >
                  <h3>{item.question}</h3>
                  <div className="faq-chevron-wrapper-v10" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </button>
                <div 
                  ref={(el) => (accordionRefs.current[idx] = el)} 
                  className="faq-answer-wrapper-v10"
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-button-${idx}`}
                >
                  <div className="faq-answer-content-v10">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

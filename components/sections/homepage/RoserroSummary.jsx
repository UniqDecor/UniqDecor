"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const PRODUCTS = [
  {
    num: "01",
    badge: "Roserro",
    title: "Luxury Bed Linens",
    desc: "Satin-stripe duvet sets, hotel-grade down pillows, and Egyptian cotton bedsheets with high-tensile durability",
    image: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
    alt: "Roserro luxury 300 thread count hotel bed sheets and pillows supplier Udaipur",
    anchor: "#products-section",
  },
  {
    num: "02",
    badge: "Roserro",
    title: "Premium Bath Linens",
    desc: "Ultra-absorbent 600+ GSM combed cotton bath sheets, hand towels, and comfortable hotel-standard spa robes",
    image: "/photos/HOMEPAGE IMAGE/BATH AND SPA LINEN ROSERRO.jpg",
    alt: "Roserro high-gsm hotel bath towels, bathrobes, and spa linens supplier Udaipur Rajasthan",
    anchor: "#products-section",
  },
  {
    num: "03",
    badge: "Roserro",
    title: "Elegant Banquet Linens",
    desc: "Spandex chair covers, high-grade restaurant table covers, napkins, and customized event banquet drapes",
    image: "/photos/HOMEPAGE IMAGE/BANQUET LINEN ROSERRO.jpg",
    alt: "Roserro luxury wedding banquet tablecloths and hotel restaurant linens Udaipur",
    anchor: "#products-section",
  },
  {
    num: "04",
    badge: "Roserro",
    title: "Bespoke Teak Sofas",
    desc: "Handcrafted luxury sofa sets, carved solid teak structures, and premium custom upholstery for elite residential lounges",
    image: "/photos/rr01 (2).webp",
    alt: "Roserro custom handcrafted teakwood sofa and luxury living room furniture Udaipur Rajasthan",
    anchor: "#products-section",
  },
  {
    num: "05",
    badge: "Roserro",
    title: "Bespoke Structural Beds",
    desc: "Teakwood structural bed frames, luxury deep-button tufted headboards, and hotel-grade heavy-duty platform bases",
    image: "/photos/bedspread.webp",
    alt: "Roserro premium structural designer beds and luxury wooden headboards showroom Udaipur",
    anchor: "#products-section",
  },
];

export default function RoserroSummary() {
  const router = useRouter();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from(".roserro-header-el", {
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

    const track = trackRef.current;
    if (!track) return;

    // Calculate dimensions
    const items = track.querySelectorAll(".roserro-card");
    const itemWidth = 340 + 24; // width + gap
    const originalItemsCount = PRODUCTS.length;
    const totalWidth = itemWidth * originalItemsCount;
    const speed = 35; // px per second

    const timeline = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / speed,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % totalWidth;
        }),
      },
    });

    timelineRef.current = timeline;
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      gsap.to(trackRef.current, { timeScale: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      gsap.to(trackRef.current, { timeScale: 1, duration: 0.3 });
    }
  };

  const handleCardClick = (e, anchor) => {
    if (e.target.closest("a")) return;
    router.push(`/roserro${anchor}`);
  };

  return (
    <section ref={containerRef} className="uniq-roserro-v3 scroll-mt-[90px] py-16 px-[4%] bg-[#E9EFEA] relative overflow-hidden" id="roserro-summary" aria-labelledby="roserro-heading">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-roserro-v3::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-roserro-v3::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(28, 63, 48, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .roserro-header-v3 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .roserro-logo-container-v3 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .roserro-logo-placeholder-v3 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(28, 63, 48, 0.04);
          border: 1px dashed rgba(28, 63, 48, 0.3);
          border-radius: 8px;
          color: #1C3F30;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .roserro-logo-placeholder-v3:hover {
          background: rgba(28, 63, 48, 0.08);
          border-color: #1C3F30;
        }

        .roserro-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
        }

        .roserro-carousel-wrapper::before,
        .roserro-carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .roserro-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #E9EFEA 0%, transparent 100%);
        }

        .roserro-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #E9EFEA 0%, transparent 100%);
        }

        .roserro-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
        }

        .roserro-card {
          width: 340px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(28, 63, 48, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.15);
          transition: all 0.5s ease;
          cursor: pointer;
          position: relative;
        }

        .roserro-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(28, 63, 48, 0.15);
        }

        .roserro-card-img {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .roserro-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }

        .roserro-card:hover .roserro-card-img img {
          transform: scale(1.08);
        }

        .roserro-card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0F1E19;
          z-index: 2;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .roserro-card:hover .roserro-card-badge {
          background: #1C3F30;
          color: white;
        }

        .roserro-card-number {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(212, 175, 55, 0.12);
          line-height: 1;
        }

        .roserro-card-content {
          padding: 1.6rem;
        }

        .roserro-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #0F1E19;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .roserro-card-arrow {
          font-size: 1.2rem;
          color: #627A70;
          transition: transform 0.3s ease;
        }

        .roserro-card:hover .roserro-card-arrow {
          transform: translateX(4px);
          color: #D4AF37;
        }

        .roserro-card-desc {
          font-size: 0.88rem;
          color: #354F44;
          line-height: 1.5;
          margin-bottom: 1rem;
          min-height: 4.5rem;
        }

        .roserro-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1C3F30;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }

        .roserro-card-link:hover {
          color: #D4AF37;
        }

        .roserro-card-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(212, 175, 55, 0.08) 50%);
          border-radius: 0 0 20px 0;
          transition: all 0.4s ease;
        }

        .roserro-card:hover .roserro-card-corner {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, transparent 50%, rgba(212, 175, 55, 0.15) 50%);
        }

        .roserro-cta-action-v3 {
          text-align: center;
          margin-top: 3.5rem;
          position: relative;
          z-index: 10;
        }

        .btn-roserro-dynamic-v3 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #1C3F30 0%, #0F1E19 100%);
          color: #FAF9F6 !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(28, 63, 48, 0.2);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-roserro-dynamic-v3:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(28, 63, 48, 0.35);
          background: linear-gradient(135deg, #D4AF37 0%, #1C3F30 100%);
        }

        @media (max-width: 768px) {
          .uniq-roserro-v3 {
            padding: 3rem 0;
          }
          .roserro-carousel-wrapper::before,
          .roserro-carousel-wrapper::after {
            width: 60px;
          }
          .roserro-card {
            width: 280px;
          }
          .roserro-card-img {
            height: 220px;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="roserro-header-v3 roserro-header-el">
        <div className="roserro-logo-container-v3">
          <Link href="/roserro" className="roserro-logo-placeholder-v3 cursor-hover" style={{ border: 'none', background: 'transparent', padding: 0 }}>
            <Image
              src="/logos/roserro-logo-1.png"
              alt="Roserro Logo"
              width={160}
              height={45}
              className="object-contain"
            />
          </Link>
        </div>
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(28,63,48,0.1)] border border-[rgba(28,63,48,0.2)] text-[#1C3F30] rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
          🏨 Hotel Linen & Luxury Living
        </span>
        <h2 id="roserro-heading" className="font-serif text-3xl md:text-5xl font-bold text-[#0F1E19] leading-tight mb-4">
          Roserro <span className="italic text-[#D4AF37] font-serif font-bold">Hospitality</span> & Premium Living
        </h2>
        <p className="text-[#354F44] text-sm md:text-base leading-relaxed">
          5-Star hotel linens, spa-grade bath sets, and masterfully tailored bespoke structural wooden furniture for elite lifestyles.
        </p>
      </div>

      {/* PRODUCTS CAROUSEL */}
      <div 
        className="roserro-carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="roserro-carousel-track" id="roserroTrack">
          {[...PRODUCTS, ...PRODUCTS.slice(0, 5)].map((prod, idx) => (
            <div 
              key={`${prod.title}-${idx}`} 
              className="roserro-card cursor-hover"
              tabIndex={0}
              onClick={(e) => handleCardClick(e, prod.anchor)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/roserro${prod.anchor}`);
                }
              }}
            >
              <div className="roserro-card-img">
                <Image
                  src={prod.image}
                  alt={prod.alt}
                  width={340}
                  height={240}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="roserro-card-badge">{prod.badge}</span>
                <span className="roserro-card-number">{prod.num}</span>
              </div>
              <div className="roserro-card-content">
                <h3 className="roserro-card-title">
                  {prod.title} <span className="roserro-card-arrow">→</span>
                </h3>
                <p className="roserro-card-desc">{prod.desc}</p>
                <Link href={`/roserro${prod.anchor}`} className="roserro-card-link cursor-hover">
                  Explore
                </Link>
                <div className="roserro-card-corner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC CTA BUTTON */}
      <div className="roserro-cta-action-v3">
        <a 
          href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20👋%20I'm%20setting%20up%20a%20hotel%2Fhospitality%20property%20or%20luxury%20villa%20and%20interested%20in%20Roserro%20luxury%20linens%20and%20bespoke%20furniture.%20Please%20share%20bulk%20estimates." 
          className="btn-roserro-dynamic-v3 cursor-hover" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center w-6 h-6 bg-white/15 rounded-full mr-3 text-white transition-all">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </span>
          <span>Get Hospitality Bulk Estimate</span>
          <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}

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
    badge: "DDecor",
    title: "Designer Curtains & Drapes",
    desc: "Premium fabrics, blackout options, sheer panels, and custom measurements for living rooms and bedrooms",
    image: "/photos/DDECOR/LINEN DRAPES,CURTAINS.webp",
    alt: "DDecor designer curtains and window drapes at Uniq Decor showroom Udaipur",
    anchor: "#curtains-section",
  },
  {
    num: "02",
    badge: "DDecor",
    title: "Upholstery & Sofa Fabrics",
    desc: "Velvet, linen, jacquard, and printed fabrics for sofa covers, cushion covers, and chair reupholstery",
    image: "/photos/DDECOR/SOFA FABRICS.webp",
    alt: "DDecor upholstery sofa fabric in velvet and linen at Uniq Decor Udaipur",
    anchor: "#upholstery-section",
  },
  {
    num: "03",
    badge: "DDecor",
    title: "Luxury Bed Linen",
    desc: "Egyptian cotton bedsheets, duvet sets, pillow covers, and comforter sets for master and guest bedrooms",
    image: "/photos/DDECOR/SATIN BEDSHEET.webp",
    alt: "DDecor luxury Egyptian cotton bedsheets and bedding sets supplier Udaipur Rajasthan",
    anchor: "#bedding-section",
  },
  {
    num: "04",
    badge: "DDecor",
    title: "Bath Linen & Accessories",
    desc: "Plush towels, bath mats, shower curtains, and coordinated bathroom accessory sets",
    image: "/photos/DDECOR/BATH TOWELS.webp",
    alt: "DDecor premium bath linen, towels, and bathroom accessories showroom Udaipur",
    anchor: "#bath-section",
  },
  {
    num: "05",
    badge: "DDecor",
    title: "Decorative Cushions & Throws",
    desc: "Accent cushions, throw pillows, bed runners, and cozy throws to complete your interior look",
    image: "/photos/DDECOR/EMBRALED CUSHION.webp",
    alt: "DDecor decorative cushions, throw pillows, and runners for home decor Udaipur",
    anchor: "#mixer-section",
  },
];

export default function DdecorSummary() {
  const router = useRouter();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from(".ddecor-header-el", {
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

    // Calculate carousel widths and handle orientation/resizes dynamically
    const updateTimeline = () => {
      const firstItem = track.querySelector(".home-card");
      if (!firstItem) return;

      const computed = window.getComputedStyle(firstItem);
      const width = parseFloat(computed.width) || 340;
      const computedTrack = window.getComputedStyle(track);
      const gap = parseFloat(computedTrack.gap) || 24;
      const itemWidth = width + gap;
      const originalItemsCount = PRODUCTS.length;
      const totalWidth = itemWidth * originalItemsCount;
      const speed = 35; // px per second

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.to(track, {
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
    };

    updateTimeline();
    window.addEventListener("resize", updateTimeline);
    return () => {
      window.removeEventListener("resize", updateTimeline);
    };
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
    // Allow natural navigation for anchor links
    if (e.target.closest("a")) return;
    router.push(`/ddecor${anchor}`);
  };

  return (
    <section ref={containerRef} className="uniq-home-v3 scroll-mt-[90px] py-16 px-[4%] bg-[#F5F0E8] relative overflow-hidden" id="home" aria-labelledby="home-heading">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-home-v3::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(184, 134, 11, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-home-v3::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 69, 19, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .home-header-v3 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .brand-logo-container-v3 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .brand-logo-placeholder-v3 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(139, 69, 19, 0.04);
          border: 1px dashed rgba(139, 69, 19, 0.3);
          border-radius: 8px;
          color: #8B4513;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .brand-logo-placeholder-v3:hover {
          background: rgba(139, 69, 19, 0.08);
          border-color: #8B4513;
        }

        .home-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
        }

        .home-carousel-wrapper::before,
        .home-carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .home-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #F5F0E8 0%, transparent 100%);
        }

        .home-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #F5F0E8 0%, transparent 100%);
        }

        .home-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
        }

        .home-card {
          width: 340px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(139, 69, 19, 0.08);
          border: 1px solid rgba(139, 69, 19, 0.12);
          transition: all 0.5s ease;
          cursor: pointer;
          position: relative;
        }

        .home-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(139, 69, 19, 0.15);
        }

        .home-card-img {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .home-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }

        .home-card:hover .home-card-img img {
          transform: scale(1.08);
        }

        .home-card-badge {
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
          color: #2D2A26;
          z-index: 2;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .home-card:hover .home-card-badge {
          background: #8B4513;
          color: white;
        }

        .home-card-number {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(139, 69, 19, 0.08);
          line-height: 1;
        }

        .home-card-content {
          padding: 1.6rem;
        }

        .home-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #2D2A26;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .home-card-arrow {
          font-size: 1.2rem;
          color: #8B8680;
          transition: transform 0.3s ease;
        }

        .home-card:hover .home-card-arrow {
          transform: translateX(4px);
          color: #B8860B;
        }

        .home-card-desc {
          font-size: 0.88rem;
          color: #6B6560;
          line-height: 1.5;
          margin-bottom: 1rem;
          min-height: 4.5rem;
        }

        .home-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #8B4513;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }

        .home-card-link:hover {
          color: #B8860B;
        }

        .home-card-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(139, 69, 19, 0.08) 50%);
          border-radius: 0 0 20px 0;
          transition: all 0.4s ease;
        }

        .home-card:hover .home-card-corner {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%);
        }

        .home-cta-action-v3 {
          text-align: center;
          margin-top: 3.5rem;
          position: relative;
          z-index: 10;
        }

        .btn-whatsapp-dynamic-v3 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #8B4513 0%, #5E2F0C 100%);
          color: #FAF6F0 !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(139, 69, 19, 0.2);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-whatsapp-dynamic-v3:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(139, 69, 19, 0.35);
          background: linear-gradient(135deg, #B8860B 0%, #8B4513 100%);
        }

        @media (max-width: 768px) {
          .uniq-home-v3 {
            padding: 3rem 5%;
          }
          .home-carousel-wrapper::before,
          .home-carousel-wrapper::after {
            width: 20px;
          }
          .home-carousel-track {
            gap: 12px;
          }
          .home-card {
            width: calc(50vw - 18px);
            min-width: 145px;
            max-width: 280px;
          }
          .home-card-img {
            height: 130px;
          }
          .home-card-badge {
            top: 0.5rem;
            left: 0.5rem;
            padding: 3px 8px;
            font-size: 0.6rem;
          }
          .home-card-number {
            top: 0.25rem;
            right: 0.5rem;
            font-size: 2rem;
          }
          .home-card-content {
            padding: 0.8rem;
          }
          .home-card-title {
            font-size: 0.95rem;
            line-height: 1.25;
            margin-bottom: 0.35rem;
          }
          .home-card-arrow {
            font-size: 0.95rem;
          }
          .home-card-desc {
            font-size: 0.72rem;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            min-height: auto;
          }
          .home-card-link {
            font-size: 0.72rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="home-header-v3 ddecor-header-el">
        <div className="brand-logo-container-v3">
          <Link href="/ddecor" className="brand-logo-placeholder-v3 cursor-hover" style={{ border: 'none', background: 'transparent', padding: 0 }}>
            <Image
              src="/logos/DDecor-logo.png"
              alt="DDecor Logo"
              width={160}
              height={45}
              className="object-contain"
            />
          </Link>
        </div>
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(139,69,19,0.12)] border border-[rgba(139,69,19,0.2)] text-[#8B4513] rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
          🏠 Residential Interiors
        </span>
        <h2 id="home-heading" className="font-serif text-3xl md:text-5xl font-bold text-[#2D2A26] leading-tight mb-4">
          Home Fabrics & <span className="italic text-[#B8860B] font-serif font-bold">Linens</span> in Udaipur
        </h2>
        <p className="text-[#6B6560] text-sm md:text-base leading-relaxed">
          Transform your living spaces with India's finest home fabrics, curtains, and linens. Premium quality for modern homes across Rajasthan.
        </p>
      </div>

      {/* PRODUCTS CAROUSEL */}
      <div 
        className="home-carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="home-carousel-track" id="homeTrack">
          {[...PRODUCTS, ...PRODUCTS.slice(0, 5)].map((prod, idx) => (
            <div 
              key={`${prod.title}-${idx}`} 
              className="home-card cursor-hover" 
              tabIndex={0}
              onClick={(e) => handleCardClick(e, prod.anchor)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/ddecor${prod.anchor}`);
                }
              }}
            >
              <div className="home-card-img">
                <Image
                  src={prod.image}
                  alt={prod.alt}
                  width={340}
                  height={240}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="home-card-badge">{prod.badge}</span>
                <span className="home-card-number">{prod.num}</span>
              </div>
              <div className="home-card-content">
                <h3 className="home-card-title">
                  {prod.title} <span className="home-card-arrow">→</span>
                </h3>
                <p className="home-card-desc">{prod.desc}</p>
                <Link href={`/ddecor${prod.anchor}`} className="home-card-link cursor-hover">
                  Explore
                </Link>
                <div className="home-card-corner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC CTA BUTTON */}
      <div className="home-cta-action-v3">
        <a 
          href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I'm%20planning%20to%20redesign%20my%20home%20in%20Udaipur%20and%20need%20help%20with%20curtains%2C%20fabrics%2C%20and%20furniture.%20Can%20I%20visit%20your%20showroom%20for%20a%20consultation%3F" 
          className="btn-whatsapp-dynamic-v3 cursor-hover" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center w-6 h-6 bg-white/15 rounded-full mr-3 text-white transition-all group-hover:rotate-12">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </span>
          <span>Book Free Home Consultation</span>
          <span className="ml-2 font-bold select-none">→</span>
        </a>
      </div>
    </section>
  );
}

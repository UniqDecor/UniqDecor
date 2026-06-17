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
    badge: "Geeken",
    title: "Ergonomic Chairs",
    desc: "Executive chairs, mesh-back task chairs, and visitor seating with advanced lumbar support",
    image: "/photos/HOMEPAGE IMAGE/Ergonomic Chairs.webp",
    alt: "Geeken ergonomic office chair with lumbar support at Uniq Decor showroom Udaipur",
    anchor: "#products-section",
  },
  {
    num: "02",
    badge: "Geeken",
    title: "Modular Workstations",
    desc: "Customizable desk systems, cubicles, and benching for modern open-plan offices",
    image: "/photos/HOMEPAGE IMAGE/MODULAR WORKSTATION.webp",
    alt: "Geeken modular workstation desk system for corporate offices in Udaipur",
    anchor: "#products-section",
  },
  {
    num: "03",
    badge: "Geeken",
    title: "Steel Storage",
    desc: "Heavy-duty filing cabinets, lockers, cupboards with digital locking options",
    image: "/photos/HOMEPAGE IMAGE/STEEL STORAGE.webp",
    alt: "Geeken steel storage cabinet and security lockers supplier Udaipur Rajasthan",
    anchor: "#products-section",
  },
  {
    num: "04",
    badge: "Geeken",
    title: "Hospital Furniture",
    desc: "ICU beds, stretchers, bedside tables, IV stands for healthcare facilities",
    image: "/photos/HOMEPAGE IMAGE/HOSPITAL FURITURE.webp",
    alt: "Geeken hospital bed and medical patient furniture dealer Rajasthan",
    anchor: "#products-section",
  },
  {
    num: "05",
    badge: "Geeken",
    title: "Reception Sofas",
    desc: "Premium leather and fabric sofas, lounge chairs for corporate lobbies",
    image: "/photos/HOMEPAGE IMAGE/RECEPTION SOFA.webp",
    alt: "Geeken office sofa and corporate lobby waiting chairs showroom Udaipur",
    anchor: "#products-section",
  },
  {
    num: "06",
    badge: "Geeken",
    title: "Conference Tables",
    desc: "Executive boardroom tables with cable management and modular setups",
    image: "/photos/HOMEPAGE IMAGE/CONFERENCE TABLE.webp",
    alt: "Geeken conference table and boardroom meeting tables Udaipur",
    anchor: "#products-section",
  },
  {
    num: "07",
    badge: "Geeken",
    title: "Executive Desks",
    desc: "Premium wood and metal desks with integrated cable management and storage",
    image: "/photos/HOMEPAGE IMAGE/MODULAR WORKSTATION.webp",
    alt: "Geeken executive desk with storage cabinets and drawers Udaipur",
    anchor: "#products-section",
  },
  {
    num: "08",
    badge: "Geeken",
    title: "Waiting Area Seating",
    desc: "Comfortable benches and chairs for hospital lobbies and clinic waiting rooms",
    image: "/photos/HOMEPAGE IMAGE/LOBBY AND RECEPTION FURNITURE.webp",
    alt: "Geeken waiting area seating and benches for clinics and hospitals Udaipur",
    anchor: "#products-section",
  },
  {
    num: "09",
    badge: "Geeken",
    title: "Office Partitions",
    desc: "Acoustic panels, glass partitions, and privacy screens for modern workspaces",
    image: "/photos/HOMEPAGE IMAGE/CONFERENCE AND MEETING.webp",
    alt: "Geeken office partition and aluminum privacy screens Udaipur",
    anchor: "#products-section",
  },
  {
    num: "10",
    badge: "Geeken",
    title: "Lab & Medical Furniture",
    desc: "Sterile workstations, medical carts, and specialized healthcare furniture",
    image: "/photos/HOMEPAGE IMAGE/CONFERENCE TABLE.webp",
    alt: "Geeken laboratory and specialized medical research furniture Rajasthan",
    anchor: "#products-section",
  },
];

export default function GeekenSummary() {
  const router = useRouter();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from(".geeken-header-el", {
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
      const firstItem = track.querySelector(".office-card");
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
    if (e.target.closest("a")) return;
    router.push(`/geeken${anchor}`);
  };

  return (
    <section ref={containerRef} className="uniq-office-v3 scroll-mt-[90px] py-16 bg-[#F8F9FA] relative overflow-hidden" id="office" aria-labelledby="office-heading">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-office-v3 {
          padding-left: 0;
          padding-right: 0;
        }

        .uniq-office-v3::before {
          content: '';
          position: absolute;
          top: 30%;
          right: 10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(44, 82, 130, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .office-header-v3 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
          padding: 0 5%;
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
          background: rgba(44, 82, 130, 0.04);
          border: 1px dashed rgba(44, 82, 130, 0.3);
          border-radius: 8px;
          color: #2C5282;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .brand-logo-placeholder-v3:hover {
          background: rgba(44, 82, 130, 0.08);
          border-color: #2C5282;
        }

        .office-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
        }

        .office-carousel-wrapper::before,
        .office-carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 5;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .office-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #F8F9FA 0%, transparent 100%);
        }

        .office-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #F8F9FA 0%, transparent 100%);
        }

        .office-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
        }

        .office-card {
          width: 340px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
          transition: all 0.5s ease;
          cursor: pointer;
          position: relative;
        }

        .office-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
        }

        .office-card-img {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .office-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }

        .office-card:hover .office-card-img img {
          transform: scale(1.08);
        }

        .office-card-badge {
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
          color: #1A202C;
          z-index: 2;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .office-card:hover .office-card-badge {
          background: #2C5282;
          color: white;
        }

        .office-card-number {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(44, 82, 130, 0.08);
          line-height: 1;
        }

        .office-card-content {
          padding: 1.6rem;
        }

        .office-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #1A202C;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .office-card-arrow {
          font-size: 1.2rem;
          color: #718096;
          transition: transform 0.3s ease;
        }

        .office-card:hover .office-card-arrow {
          transform: translateX(4px);
          color: var(--color-accent-gold, #C9A227);
        }

        .office-card-desc {
          font-size: 0.88rem;
          color: #4A5568;
          line-height: 1.5;
          margin-bottom: 1rem;
          min-height: 3rem;
        }

        .office-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #2C5282;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }

        .office-card-link:hover {
          color: var(--color-accent-gold, #C9A227);
        }

        .office-card-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(201,162,39,0.1) 50%);
          border-radius: 0 0 20px 0;
          transition: all 0.4s ease;
        }

        .office-card:hover .office-card-corner {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, transparent 50%, rgba(201,162,39,0.18) 50%);
        }

        .office-cta-action-v3 {
          text-align: center;
          margin-top: 3.5rem;
          position: relative;
          z-index: 10;
        }

        .btn-office-dynamic-v3 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #2C5282 0%, #1A365D 100%);
          color: #FAF9F6 !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(44, 82, 130, 0.2);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-office-dynamic-v3:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(44, 82, 130, 0.35);
          background: linear-gradient(135deg, var(--color-accent-gold, #C9A227) 0%, #2C5282 100%);
        }

        @media (max-width: 768px) {
          .uniq-office-v3 {
            padding: 3rem 0;
          }
          .office-carousel-wrapper::before,
          .office-carousel-wrapper::after {
            width: 20px;
          }
          .office-carousel-track {
            gap: 12px;
          }
          .office-card {
            width: calc(50vw - 18px);
            min-width: 145px;
            max-width: 280px;
          }
          .office-card-img {
            height: 130px;
          }
          .office-card-badge {
            top: 0.5rem;
            left: 0.5rem;
            padding: 3px 8px;
            font-size: 0.6rem;
          }
          .office-card-number {
            top: 0.25rem;
            right: 0.5rem;
            font-size: 2rem;
          }
          .office-card-content {
            padding: 0.8rem;
          }
          .office-card-title {
            font-size: 0.95rem;
            line-height: 1.25;
            margin-bottom: 0.35rem;
          }
          .office-card-arrow {
            font-size: 0.95rem;
          }
          .office-card-desc {
            font-size: 0.72rem;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            min-height: auto;
          }
          .office-card-link {
            font-size: 0.72rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="office-header-v3 geeken-header-el">
        <div className="brand-logo-container-v3">
          <Link href="/geeken" className="brand-logo-placeholder-v3 cursor-hover" style={{ border: 'none', background: 'transparent', padding: 0 }}>
            <Image
              src="/logos/geeken-logo.png"
              alt="Geeken Logo"
              width={160}
              height={45}
              className="object-contain"
            />
          </Link>
        </div>
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(44,82,130,0.1)] border border-[rgba(44,82,130,0.2)] text-[#2C5282] rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
          🏢 Corporate & Healthcare
        </span>
        <h2 id="office-heading" className="font-serif text-3xl md:text-5xl font-bold text-[#1A202C] leading-tight mb-4">
          Office & <span className="italic text-[var(--color-accent-gold,##C9A227)] font-serif font-bold">Institutional</span> Furniture
        </h2>
        <p className="text-[#4A5568] text-sm md:text-base leading-relaxed">
          Ergonomic, durable, and professional solutions for offices, hospitals, and institutions across Rajasthan and India.
        </p>
      </div>

      {/* CAROUSEL */}
      <div 
        className="office-carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="office-carousel-track" id="officeTrack">
          {[...PRODUCTS, ...PRODUCTS.slice(0, 5)].map((prod, idx) => (
            <div 
              key={`${prod.title}-${idx}`} 
              className="office-card cursor-hover"
              tabIndex={0}
              onClick={(e) => handleCardClick(e, prod.anchor)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/geeken${prod.anchor}`);
                }
              }}
            >
              <div className="office-card-img">
                <Image
                  src={prod.image}
                  alt={prod.alt}
                  width={340}
                  height={260}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="office-card-badge">{prod.badge}</span>
                <span className="office-card-number">{prod.num}</span>
              </div>
              <div className="office-card-content">
                <h3 className="office-card-title">
                  {prod.title} <span className="office-card-arrow">→</span>
                </h3>
                <p className="office-card-desc">{prod.desc}</p>
                <Link href={`/geeken${prod.anchor}`} className="office-card-link cursor-hover">
                  Explore
                </Link>
                <div className="office-card-corner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC CTA BUTTON */}
      <div className="office-cta-action-v3">
        <a 
          href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I'm%20setting%20up%20an%20office%2Fhospital%20and%20need%20a%20complete%20furniture%20quote." 
          className="btn-office-dynamic-v3 cursor-hover" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center w-6 h-6 bg-white/15 rounded-full mr-3 text-white transition-all">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </span>
          <span>Get Project Furniture Quote</span>
          <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}

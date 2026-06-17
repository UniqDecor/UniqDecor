"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const PRODUCTS = [
  {
    num: "01",
    badge: "LaxRee",
    title: "Hotel Lobby Lounges",
    desc: "Bespoke heavy-traffic reception sofas, luxury lounge suites, and elegant wingback armchairs.",
    image: "/photos/laxree 1.webp",
    alt: "LaxRee hotel lobby lounges and luxury resort reception seating in Udaipur",
    anchor: "#lobby-section",
  },
  {
    num: "02",
    badge: "LaxRee",
    title: "Outdoor & Poolsides",
    desc: "All-weather synthetic wicker sunbeds, poolside gazebos, and terrace lounge settings.",
    image: "/photos/1101-scaled.webp",
    alt: "LaxRee all-weather outdoor patio chairs and resort poolside lounge furniture Udaipur Rajasthan",
    anchor: "#outdoor-section",
  },
  {
    num: "03",
    badge: "LaxRee",
    title: "Glamping Space Pods",
    desc: "Futuristic insulated glamping capsules and luxury resort domes for modern hospitality spaces.",
    image: "/photos/600-x-800pix_176208.webp",
    alt: "LaxRee prefabricated luxury glamping space pod capsule for luxury resorts in Rajasthan",
    anchor: "#pods-section",
  },
  {
    num: "04",
    badge: "LaxRee",
    title: "In-Room Amenities",
    desc: "Hotel luggage racks, smart safes, noiseless minibars, and premium guest room essentials.",
    image: "/photos/1191-scaled.webp",
    alt: "LaxRee silent hotel room minibar fridge and smart digital safebox amenities Udaipur Rajasthan",
    anchor: "#amenities-section",
  },
  {
    num: "05",
    badge: "LaxRee",
    title: "Bespoke Conference Systems",
    desc: "Stackable banquet chairs, folding event desks, and modular conference systems.",
    image: "/photos/lxslideb1.webp",
    alt: "LaxRee conference room seating and banquet furniture layouts for hotel events Udaipur Rajasthan",
    anchor: "#conference-section",
  },
];

export default function LaxreeSummary() {
  const router = useRouter();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from(".laxree-header-el", {
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
      const firstItem = track.querySelector(".laxree-card");
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
    router.push(`/laxree${anchor}`);
  };

  return (
    <section ref={containerRef} className="uniq-laxree-v3 scroll-mt-[90px] py-20 px-[4%] bg-[#EAEFF2] relative overflow-hidden" id="laxree-section" aria-labelledby="laxree-heading">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-laxree-v3::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-laxree-v3::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(30, 58, 95, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .laxree-header-v3 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .laxree-logo-container-v3 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .laxree-logo-placeholder-v3 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          background: rgba(30, 58, 95, 0.04);
          border: 1px dashed rgba(30, 58, 95, 0.3);
          border-radius: 12px;
        }

        .laxree-logo-placeholder-v3 img {
          max-width: 170px;
          height: auto;
          display: block;
        }

        .laxree-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
        }

        .laxree-carousel-wrapper::before,
        .laxree-carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .laxree-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #EAEFF2 0%, transparent 100%);
        }

        .laxree-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #EAEFF2 0%, transparent 100%);
        }

        .laxree-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
        }

        .laxree-card {
          width: 340px;
          flex-shrink: 0;
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(30, 58, 95, 0.06);
          border: 1px solid rgba(30, 58, 95, 0.15);
          transition: all 0.5s ease;
          cursor: pointer;
          position: relative;
        }

        .laxree-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(30, 58, 95, 0.12);
        }

        .laxree-card-img {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .laxree-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }

        .laxree-card:hover .laxree-card-img img {
          transform: scale(1.08);
        }

        .laxree-card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 6px 16px;
          background: rgba(255,255,255,0.95);
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0F1D2C;
          z-index: 2;
        }

        .laxree-card-number {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(197,160,89,0.12);
          line-height: 1;
        }

        .laxree-card-content {
          padding: 1.6rem;
        }

        .laxree-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #0F1D2C;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .laxree-card-arrow {
          font-size: 1.2rem;
          color: #6C7F93;
          transition: transform 0.3s ease;
        }

        .laxree-card:hover .laxree-card-arrow {
          transform: translateX(4px);
          color: #C5A059;
        }

        .laxree-card-desc {
          font-size: 0.88rem;
          color: #3B4D61;
          line-height: 1.5;
          margin-bottom: 1rem;
          min-height: 4.5rem;
        }

        .laxree-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1E3A5F;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }

        .laxree-card-link:hover {
          color: #C5A059;
        }

        .laxree-card-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(197, 160, 89, 0.08) 50%);
          border-radius: 0 0 20px 0;
          transition: all 0.4s ease;
        }

        .laxree-card:hover .laxree-card-corner {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, transparent 50%, rgba(197, 160, 89, 0.15) 50%);
        }

        .laxree-cta-action-v3 {
          text-align: center;
          margin-top: 3.5rem;
        }

        .btn-laxree-dynamic-v3 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #1E3A5F 0%, #0A1624 100%);
          color: #FAF9F6 !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(30, 58, 95, 0.2);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-laxree-dynamic-v3:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(30, 58, 95, 0.35);
          background: linear-gradient(135deg, #C5A059 0%, #1E3A5F 100%);
        }

        @media (max-width: 768px) {
          .uniq-laxree-v3 {
            padding: 3rem 5%;
          }
          .laxree-carousel-wrapper::before,
          .laxree-carousel-wrapper::after {
            width: 20px;
          }
          .laxree-carousel-track {
            gap: 12px;
          }
          .laxree-card {
            width: calc(50vw - 18px);
            min-width: 145px;
            max-width: 280px;
          }
          .laxree-card-img {
            height: 130px;
          }
          .laxree-card-badge {
            top: 0.5rem;
            left: 0.5rem;
            padding: 3px 8px;
            font-size: 0.6rem;
          }
          .laxree-card-number {
            top: 0.25rem;
            right: 0.5rem;
            font-size: 2rem;
          }
          .laxree-card-content {
            padding: 0.8rem;
          }
          .laxree-card-title {
            font-size: 0.95rem;
            line-height: 1.25;
            margin-bottom: 0.35rem;
          }
          .laxree-card-arrow {
            font-size: 0.95rem;
          }
          .laxree-card-desc {
            font-size: 0.72rem;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            min-height: auto;
          }
          .laxree-card-link {
            font-size: 0.72rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="laxree-header-v3 laxree-header-el">
        <div className="laxree-logo-container-v3">
          <Link href="/laxree" className="laxree-logo-placeholder-v3 cursor-hover" style={{ border: 'none', background: 'transparent', padding: 0 }}>
            <Image
              src="/logos/laxree-logo.png"
              alt="LaxRee Logo"
              width={170}
              height={45}
              className="object-contain"
            />
          </Link>
        </div>

        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(30,58,95,0.1)] border border-[rgba(30,58,95,0.2)] text-[#1E3A5F] rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
          🛋️ Commercial &amp; Hospitality Supplies
        </span>

        <h2 id="laxree-heading" className="font-serif text-3xl md:text-5xl font-bold text-[#0F1D2C] leading-tight mb-4">
          LaxRee <em className="italic text-[#C5A059] font-serif font-medium not-italic">Hospitality</em> &amp; Commercial Lounges
        </h2>

        <p className="text-[#3B4D61] text-sm md:text-base leading-relaxed">
          Premium high-traffic lobby furniture, sophisticated all-weather poolside lounges,
          glamping domes, and executive conference installations.
        </p>
      </div>

      {/* PRODUCTS CAROUSEL */}
      <div 
        className="laxree-carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="laxree-carousel-track" id="laxreeTrack">
          {[...PRODUCTS, ...PRODUCTS.slice(0, 5)].map((prod, idx) => (
            <div 
              key={`${prod.title}-${idx}`} 
              className="laxree-card cursor-hover" 
              tabIndex={0}
              onClick={(e) => handleCardClick(e, prod.anchor)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/laxree${prod.anchor}`);
                }
              }}
            >
              <div className="laxree-card-img">
                <Image
                  src={prod.image}
                  alt={prod.alt}
                  width={340}
                  height={260}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="laxree-card-badge">{prod.badge}</span>
                <span className="laxree-card-number">{prod.num}</span>
              </div>
              <div className="laxree-card-content">
                <h3 className="laxree-card-title">
                  {prod.title} <span className="laxree-card-arrow">→</span>
                </h3>
                <p className="laxree-card-desc">{prod.desc}</p>
                <Link href={`/laxree${prod.anchor}`} className="laxree-card-link cursor-hover">
                  Explore
                </Link>
                <div className="laxree-card-corner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC CTA BUTTON */}
      <div className="laxree-cta-action-v3">
        <a 
          href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I%20am%20interested%20in%20LaxRee%20Hospitality%20and%20Commercial%20supplies%20(lobby%20sofas%2Fpoolside%20lounges%2Fglamping%20capsules).%20Could%20you%20please%20share%20contract%20pricing%3F" 
          className="btn-laxree-dynamic-v3 cursor-hover" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <span>Get B2B Contract Pricing</span>
          <span className="ml-2 font-bold select-none">→</span>
        </a>
      </div>
    </section>
  );
}

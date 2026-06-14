"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const CARDS = [
  {
    num: "01",
    brand: "LaxRee",
    title: "Lobby & Reception Furniture",
    desc: "Luxury sofas, coffee tables, concierge desks, and designer luggage trolleys",
    image: "/photos/HOMEPAGE IMAGE/LOBBY AND RECEPTION FURNITURE.webp",
    alt: "LaxRee hotel lobby lounges and luxury resort reception seating in Udaipur",
    href: "/laxree-amenities",
  },
  {
    num: "02",
    brand: "Roserro",
    title: "Luxury Bed Linen",
    desc: "Egyptian cotton bedsheets, duvet covers, pillowcases for 5-star comfort",
    image: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
    alt: "Roserro luxury 300 thread count hotel bed sheets and bedding supplier Udaipur",
    href: "/roserro",
  },
  {
    num: "03",
    brand: "LaxRee",
    title: "Outdoor & Poolside",
    desc: "Weather-resistant loungers, umbrellas, poolside dining sets",
    image: "/photos/HOMEPAGE IMAGE/OUTDOOR AND POOLSIDE.webp",
    alt: "LaxRee all-weather outdoor patio chairs and resort poolside lounge furniture Rajasthan",
    href: "/laxree-amenities",
  },
  {
    num: "04",
    brand: "Roserro",
    title: "Bath & Spa Linen",
    desc: "Plush towels, bathrobes, spa essentials in premium cotton",
    image: "/photos/HOMEPAGE IMAGE/BATH AND SPA LINEN ROSERRO.jpg",
    alt: "Roserro high-gsm hotel bath towels and luxury spa robes supplier Udaipur",
    href: "/roserro",
  },
  {
    num: "05",
    brand: "LaxRee",
    title: "Space Pods & Domes",
    desc: "Unique transparent domes and luxury pods for rooftop experiences",
    image: "/photos/HOMEPAGE IMAGE/SPACE PODS AND DOMS.webp",
    alt: "LaxRee prefabricated luxury glamping space pod capsule for luxury resorts in Rajasthan",
    href: "/laxree-amenities",
  },
  {
    num: "06",
    brand: "Roserro",
    title: "Banquet & Event Linen",
    desc: "Tablecloths, napkins, chair covers for weddings & conferences",
    image: "/photos/HOMEPAGE IMAGE/BANQUET LINEN ROSERRO.jpg",
    alt: "Roserro wedding banquet and hotel restaurant table linens Udaipur",
    href: "/roserro",
  },
  {
    num: "07",
    brand: "LaxRee",
    title: "In-Room Amenities",
    desc: "Premium toiletries, minibars, safes, and guest room essentials",
    image: "/photos/HOMEPAGE IMAGE/IN-ROOM AMENITIES.webp",
    alt: "LaxRee silent hotel room minibar fridge and smart digital safebox amenities Udaipur",
    href: "/laxree-amenities",
  },
  {
    num: "08",
    brand: "Roserro",
    title: "Restaurant Linen",
    desc: "Table runners, placemats, napkins for fine dining experiences",
    image: "/photos/HOMEPAGE IMAGE/RESTAURANT LINEN.webp",
    alt: "Roserro fine dining restaurant table linens and runners supplier Rajasthan",
    href: "/roserro",
  },
  {
    num: "09",
    brand: "LaxRee",
    title: "Conference & Meeting",
    desc: "Boardroom tables, ergonomic chairs, AV furniture setups",
    image: "/photos/HOMEPAGE IMAGE/CONFERENCE AND MEETING.webp",
    alt: "LaxRee conference room seating and banquet furniture layouts Udaipur",
    href: "/laxree-amenities",
  },
  {
    num: "10",
    brand: "Roserro",
    title: "Kitchen & Chef Linen",
    desc: "Chef coats, aprons, kitchen towels, and staff uniforms",
    image: "/photos/HOMEPAGE IMAGE/CONFERENCE TABLE.webp",
    alt: "Roserro kitchen towels, chef coats, and hospitality staff uniforms Udaipur",
    href: "/roserro",
  }
];

export default function Hospitality() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from(".hospitality-header-el", {
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

    // Calculate carousel widths
    const items = track.querySelectorAll(".carousel-item-v3");
    const itemWidth = 340 + 24; // width + gap (1.5rem = 24px)
    const originalItemsCount = CARDS.length;
    const totalWidth = itemWidth * originalItemsCount;
    const speed = 40; // pixels per second

    const timeline = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / speed,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % totalWidth;
        })
      }
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

  return (
    <section ref={containerRef} className="uniq-hospitality-v3 scroll-mt-[90px] py-16 bg-[#F8F5F0] relative overflow-hidden" id="hospitality">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-hospitality-v3 {
          padding-left: 0;
          padding-right: 0;
        }

        .hospitality-header-v3 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
          padding: 0 5%;
        }

        .carousel-wrapper-v3 {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
        }

        .carousel-wrapper-v3::before,
        .carousel-wrapper-v3::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 5;
          pointer-events: none;
        }

        .carousel-wrapper-v3::before {
          left: 0;
          background: linear-gradient(to right, #F8F5F0 0%, transparent 100%);
        }

        .carousel-wrapper-v3::after {
          right: 0;
          background: linear-gradient(to left, #F8F5F0 0%, transparent 100%);
        }

        .carousel-track-v3 {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
        }

        .carousel-item-v3 {
          width: 340px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E0D8;
          transition: all 0.5s ease;
          cursor: pointer;
        }

        .carousel-item-v3:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        .item-img-v3 {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .item-img-v3 img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }

        .carousel-item-v3:hover .item-img-v3 img {
          transform: scale(1.08);
        }

        .item-badge-v3 {
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
          color: #1A1A1A;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .carousel-item-v3:hover .item-badge-v3 {
          background: var(--color-accent-primary);
          color: white;
        }

        .item-number-v3 {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(27, 67, 50, 0.08);
          line-height: 1;
        }

        .item-content-v3 {
          padding: 1.6rem;
        }

        .item-title-v3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }

        .item-desc-v3 {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .item-link-v3 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-accent-primary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }

        .item-link-v3:hover {
          color: var(--color-accent-gold, #C9A227);
        }

        .item-link-v3:hover svg {
          transform: translateX(4px);
        }

        .hospitality-cta-v3 {
          text-align: center;
          margin-top: 2.5rem;
          padding: 0 5%;
        }

        .btn-cta-golden {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: transparent;
          color: var(--color-accent-gold, #C5A059);
          border: 2px solid var(--color-accent-gold, #C5A059);
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .btn-cta-golden:hover {
          background: var(--color-accent-gold, #C5A059);
          color: #F8F5F0;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .uniq-hospitality-v3 { padding: 3rem 0; }
          .carousel-item-v3 { width: 280px; }
          .item-img-v3 { height: 220px; }
          .carousel-wrapper-v3::before,
          .carousel-wrapper-v3::after { width: 60px; }
        }
      `}} />

      {/* HEADER */}
      <div className="hospitality-header-v3 hospitality-header-el">
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(27,67,50,0.1)] border border-[rgba(27,67,50,0.2)] text-[var(--color-accent-primary)] rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
          🏨 Hotels & Resorts
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          Complete <span className="italic text-[var(--color-accent-gold,##C5A059)] font-serif font-bold">Hospitality</span> Solutions
        </h2>
        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
          From lobby to rooftop — premium furniture, linen, and amenities for hotels, resorts, and guesthouses across Rajasthan and India
        </p>
      </div>

      {/* CAROUSEL */}
      <div 
        className="carousel-wrapper-v3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="carousel-track-v3" id="hospitalityTrack">
          {/* Render cards and duplicate first 5 for smooth loops */}
          {[...CARDS, ...CARDS.slice(0, 5)].map((card, idx) => (
            <div key={`${card.title}-${idx}`} className="carousel-item-v3">
              <div className="item-img-v3">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={340}
                  height={260}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="item-badge-v3">{card.brand}</span>
                <span className="item-number-v3">{card.num}</span>
              </div>
              <div className="item-content-v3">
                <h3 className="item-title-v3">{card.title}</h3>
                <p className="item-desc-v3">{card.desc}</p>
                <Link href={card.href} className="item-link-v3 cursor-hover">
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="hospitality-cta-v3">
        <p className="text-[#4A4A4A] text-sm mb-6 font-medium">Planning a Hotel or Resort Project in Rajasthan?</p>
        <a 
          href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I'm%20planning%20a%20hotel%2Fresort%20project%20and%20need%20a%20complete%20hospitality%20solution%20quote." 
          className="btn-cta-golden cursor-hover" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Get Project Quote →
        </a>
      </div>
    </section>
  );
}

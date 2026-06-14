"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const BRANDS = [
  {
    id: "brand-ddecor-title",
    name: "DDecor",
    badge: "Home Fabrics",
    num: "01",
    tagline: "India's premium curtains, bedding & bath linen collection crafted for elegant residential interiors.",
    image: "/photos/bedding-2 (2).webp",
    alt: "DDecor luxury bedding and designer curtains showroom at Uniq Decor Udaipur",
    href: "/ddecor",
  },
  {
    id: "brand-geeken-title",
    name: "Geeken",
    badge: "Office & Healthcare",
    num: "02",
    tagline: "Ergonomic office chairs, modular workstations & healthcare furniture solutions.",
    image: "/photos/Gemini_Generated_Image_ksdm8sksdm8sksdm.webp",
    alt: "Geeken ergonomic office furniture, chairs, and modular workstations showroom Udaipur",
    href: "/geeken",
  },
  {
    id: "brand-roserro-title",
    name: "Roserro",
    badge: "Hotel Linen",
    num: "03",
    tagline: "Luxury hotel, spa & banquet linen crafted for premium hospitality experiences.",
    image: "/photos/rr01 (2).webp",
    alt: "Roserro luxury hotel bed linen, bedsheets, and spa towels supplier Udaipur Rajasthan",
    href: "/roserro",
  },
  {
    id: "brand-laxree-title",
    name: "LaxRee",
    badge: "Hospitality Pro",
    num: "04",
    tagline: "Lobby furniture, outdoor hospitality products & premium hotel amenities.",
    image: "/photos/lxslideb1.webp",
    alt: "LaxRee premium hotel furniture and hospitality amenities showroom Udaipur Rajasthan",
    href: "/laxree-amenities",
  },
];

export default function BrandHub() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const rowRef = useRef(null);

  useGSAP(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    if (window.innerWidth <= 768) {
      // Ensure elements are fully visible on mobile/tablet
      gsap.set(".brands-header-el > *", { opacity: 1, y: 0 });
      gsap.set(".brand-card-el", { opacity: 1, y: 0 });
      return;
    }

    // Set initial state
    gsap.set(".brands-header-el > *", { opacity: 0, y: 28 });
    gsap.set(".brand-card-el", { opacity: 0, y: 50 });

    gsap.to(".brands-header-el > *", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 88%",
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.to(".brand-card-el", {
      scrollTrigger: {
        trigger: rowRef.current,
        start: "top 88%",
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  // Keyboard navigation
  const handleKeyDown = (e, index, href) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(href);
    }

    const cards = rowRef.current.querySelectorAll(".brand-card-el");
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextCard = cards[(index + 1) % cards.length];
      if (nextCard) nextCard.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevCard = cards[(index - 1 + cards.length) % cards.length];
      if (prevCard) prevCard.focus();
    }
  };

  return (
    <section ref={sectionRef} className="uniq-brands-v3 scroll-mt-[90px] relative overflow-hidden py-16 md:py-24 bg-white" id="brands" aria-labelledby="brands-heading">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-brands-v3::before {
          content: '';
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 120%;
          background: radial-gradient(ellipse at center, rgba(201,162,39,.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-brands-v3 {
          padding-left: 4%;
          padding-right: 4%;
        }

        .brands-header-v3 {
          text-align: center;
          max-width: 850px;
          margin: 0 auto 4rem;
          position: relative;
          z-index: 2;
        }

        .brands-row-v3 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
          max-width: 1450px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        .brand-card-v3 {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,.06);
          transition: 0.6s cubic-bezier(.25,1,.5,1);
          border: 1px solid #ececec;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .brand-card-v3:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 70px rgba(0,0,0,.15);
        }

        .brand-img-v3 {
          position: relative;
          width: 100%;
          height: 340px;
          padding: 18px;
          background: #f4f1ea;
          box-sizing: border-box;
        }

        .brand-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(0,0,0,.06);
          box-shadow: 0 10px 30px rgba(0,0,0,.08), inset 0 0 0 1px rgba(255,255,255,.5);
        }

        .brand-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .7s ease;
          display: block;
        }

        .brand-card-v3:hover .brand-frame img {
          transform: scale(1.08);
        }

        .brand-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.18), transparent 45%);
          pointer-events: none;
        }

        .brand-number-v3 {
          position: absolute;
          top: 28px;
          right: 28px;
          font-size: 2.8rem;
          font-family: var(--font-serif);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.25);
          z-index: 3;
          pointer-events: none;
          user-select: none;
        }

        .brand-badge-v3 {
          position: absolute;
          top: 28px;
          left: 28px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: .7rem;
          letter-spacing: .12em;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 3;
          transition: all .3s ease;
          color: #1A1A1A;
        }

        .brand-card-v3:hover .brand-badge-v3 {
          background: var(--color-accent-primary);
          color: #ffffff;
        }

        .brand-content-v3 {
          padding: 1.8rem;
          background: #ffffff;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .brand-name-v3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: .5rem;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: .6rem;
          color: var(--color-text-primary);
          font-weight: 700;
        }

        .brand-arrow-v3 {
          transition: .3s ease;
          color: #E5E5E5;
          flex-shrink: 0;
        }

        .brand-card-v3:hover .brand-arrow-v3 {
          transform: translateX(5px);
          color: var(--color-accent-gold, #C9A227);
        }

        .brand-tagline-v3 {
          font-size: .92rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: 1.3rem;
          min-height: 3rem;
        }

        .brand-link-v3 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--color-accent-primary);
          font-size: .82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .08em;
          position: relative;
          padding-bottom: 4px;
          width: fit-content;
        }

        .brand-link-v3::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: var(--color-accent-gold, #C9A227);
          transform: scaleX(0);
          transform-origin: left;
          transition: .4s ease;
        }

        .brand-link-v3:hover::after {
          transform: scaleX(1);
        }

        .brand-link-v3:hover {
          color: var(--color-accent-gold, #C9A227);
        }

        @media (max-width: 1200px) {
          .brands-row-v3 {
            grid-template-columns: repeat(2, 1fr);
          }
          .brand-img-v3 {
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .uniq-brands-v3 {
            padding: 3rem 4%;
          }

          .brands-header-v3 {
            margin-bottom: 2rem;
          }

          .brands-header-v3 h2 {
            font-size: clamp(1.7rem, 5.5vw, 2.2rem);
          }

          .brands-row-v3 {
            grid-template-columns: repeat(2, 1fr);
            gap: .85rem;
          }

          .brand-img-v3 {
            height: 220px;
            padding: 0;
            background: transparent;
          }

          .brand-frame {
            border-radius: 0;
            border: none;
            box-shadow: none;
          }

          .brand-number-v3 {
            font-size: 2rem;
            top: 14px;
            right: 14px;
          }

          .brand-badge-v3 {
            top: 14px;
            left: 14px;
            font-size: .6rem;
            padding: 5px 11px;
            letter-spacing: .07em;
          }

          .brand-content-v3 {
            padding: 1rem 1rem .9rem;
          }

          .brand-name-v3 {
            font-size: 1.05rem;
            margin-bottom: .35rem;
          }

          .brand-tagline-v3 {
            font-size: .78rem;
            line-height: 1.5;
            margin-bottom: 0;
            min-height: auto;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .brand-link-v3 {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .brands-row-v3 {
            gap: .65rem;
          }

          .brand-img-v3 {
            height: 190px;
          }

          .brand-content-v3 {
            padding: .85rem .85rem .75rem;
          }

          .brand-name-v3 {
            font-size: .95rem;
          }

          .brand-tagline-v3 {
            font-size: .74rem;
          }

          .brand-badge-v3 {
            font-size: .56rem;
            padding: 4px 9px;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="brands-header-v3 brands-header-el">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#717171] mb-4 block">
          Our Portfolio
        </span>

        <h2 id="brands-heading" className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          Four Premium <span className="italic text-[var(--color-accent-primary)] font-serif font-bold">Brands</span>, One Destination
        </h2>

        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Discover India's finest furniture, fabrics and hospitality solutions for luxury homes, hotels and modern commercial spaces.
        </p>
      </div>

      {/* GRID */}
      <div ref={rowRef} className="brands-row-v3" role="list" aria-label="Our brand collection">
        {BRANDS.map((brand, idx) => (
          <article
            key={brand.name}
            className="brand-card-v3 brand-card-el"
            role="listitem"
            tabIndex={0}
            aria-labelledby={brand.id}
            onClick={() => router.push(brand.href)}
            onKeyDown={(e) => handleKeyDown(e, idx, brand.href)}
          >
            <div className="brand-img-v3">
              <div className="brand-frame">
                <Image
                  src={brand.image}
                  alt={brand.alt}
                  width={360}
                  height={300}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="brand-number-v3" aria-hidden="true">
                {brand.num}
              </span>
              <span className="brand-badge-v3">
                {brand.badge}
              </span>
            </div>

            <div className="brand-content-v3">
              <h3 className="brand-name-v3" id={brand.id}>
                {brand.name}
                <span className="brand-arrow-v3" aria-hidden="true">
                  →
                </span>
              </h3>
              <p className="brand-tagline-v3">
                {brand.tagline}
              </p>
              <Link href={brand.href} className="brand-link-v3 cursor-hover" aria-label={`View ${brand.name} collection`}>
                View Collection →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

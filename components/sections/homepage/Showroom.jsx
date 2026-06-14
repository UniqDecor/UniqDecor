"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const CATEGORIES = [
  { id: "all", label: "All Galleries" },
  { id: "roserro", label: "ROSERRO" },
  { id: "ddecor", label: "D'DECOR" },
  { id: "geeken", label: "GEEKEN" },
  { id: "laxree", label: "LAXREE" },
];

const CARDS_DATA = [
  {
    cat: "roserro",
    tag: "ROSERRO LINENS & LIVING",
    title: "Luxury Linens & Teak Living",
    desc: "Egyptian cotton sheets, bath towels, and handcrafted teakwood living furniture customized for luxury spaces.",
    slides: [
      "/photos/HOMEPAGE IMAGE/UPHOLSTRY AND SOFA FABRICS.webp",
      "/photos/HOMEPAGE IMAGE/DECORATIVE CUSHION & THROWS.webp",
      "/photos/HOMEPAGE IMAGE/DESIGNR CURTAINS AND DRAPES.webp",
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M19 10v4c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-4c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4zM3 10c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zm18 0c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zM6 18v2c0 .55.45 1 1 1s1-.45 1-1v-2H6zm10 0v2c0 .55.45 1 1 1s1-.45 1-1v-2h-2z" fill="currentColor"/></svg>
    ),
  },
  {
    cat: "ddecor",
    tag: "D'DECOR FABRICS",
    title: "Royal Drapery & Fabrics",
    desc: "Udaipur's widest selection of premium curtain sheets, sheer drapery, and motorized custom fabrics.",
    slides: [
      "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN DDECOR.webp",
      "/photos/HOMEPAGE IMAGE/IN-ROOM AMENITIES.webp",
      "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H6zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" fill="currentColor"/></svg>
    ),
  },
  {
    cat: "geeken",
    tag: "GEEKEN ERGONOMICS",
    title: "Executive Corporate Office",
    desc: "Premium ergonomic chairs, conference desks, and organizational spacing layouts for workspaces.",
    slides: [
      "/photos/HOMEPAGE IMAGE/Ergonomic Chairs.webp",
      "/photos/HOMEPAGE IMAGE/MODULAR WORKSTATION.webp",
      "/photos/HOMEPAGE IMAGE/STEEL STORAGE.webp",
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5v3H5v2h14v-2h-2V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 1 1 6 0v3H9zm-5 4h16v6H4v-6zm2 2v2h12v-2H6z" fill="currentColor"/></svg>
    ),
  },
  {
    cat: "laxree",
    tag: "LAXREE AMENITIES & ROOFING",
    title: "Amenities & Resort Roofing",
    desc: "High-end hotel room guest supplies, silent minibars, and premium architectural roofing tiles & thatch shingles.",
    slides: [
      "/photos/HOMEPAGE IMAGE/DESIGNR CURTAINS AND DRAPES.webp",
      "/photos/HOMEPAGE IMAGE/BATH AND SPA LINEN ROSERRO.jpg",
      "/photos/HOMEPAGE IMAGE/IN-ROOM AMENITIES.webp",
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="currentColor"/></svg>
    ),
  },
];

// Inner Carousel Component to handle individual card interval state
function CardCarousel({ slides, title, desc, tag, icon }) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="card-img-wrapper-v8">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`card-slide-v8 ${idx === slideIdx ? "active-slide-v8" : ""}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      
      {/* Slide Indicator Dots */}
      <div className="card-dots-v8" aria-hidden="true">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot-v8 ${idx === slideIdx ? "active-dot-v8" : ""}`}
          />
        ))}
      </div>

      <div className="card-placeholder-graphics-v8" aria-hidden="true">
        {icon}
      </div>
      
      <div className="card-info-v8">
        <span className="card-tag-v8">{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function Showroom() {
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.innerWidth <= 768) {
      gsap.set(".gallery-card-v8", { opacity: 1, scale: 1 });
    } else {
      // Entrance reveal trigger
      gsap.from(".gallery-card-v8", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }

  }, { scope: containerRef });

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);

    const cards = containerRef.current.querySelectorAll(".gallery-card-v8");

    gsap.to(cards, {
      opacity: 0,
      scale: 0.92,
      duration: 0.22,
      onComplete: () => {
        cards.forEach((card) => {
          const cardCat = card.getAttribute("data-card-cat");
          if (catId === "all" || cardCat === catId) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });

        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <section ref={containerRef} className="uniq-showroom-v8 py-[7rem] px-[4%] bg-[#FAF9F6] relative overflow-hidden" id="showroom" aria-labelledby="showroom-heading-v8">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-showroom-v8::before {
          content: '';
          position: absolute;
          top: 20%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(201, 162, 39, 0.03) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-showroom-v8 > * {
          position: relative;
          z-index: 1;
        }

        .showroom-header-v8 {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3.5rem;
        }

        .filter-container-v8 {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 3.5rem;
        }

        .filter-btn-v8 {
          padding: 10px 24px;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.05);
          color: #4A4A4A;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(27, 67, 50, 0.02);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-transform: uppercase;
        }

        .filter-btn-v8:hover {
          border-color: #C9A227;
          color: #C9A227;
          transform: translateY(-2px);
        }

        .filter-btn-v8.active-v8 {
          background: #1B4332;
          border-color: #1B4332;
          color: white;
          box-shadow: 0 8px 20px rgba(27, 67, 50, 0.15);
        }

        .gallery-grid-v8 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          max-width: 1450px;
          margin: 0 auto 5.5rem;
          align-items: stretch;
        }

        .gallery-card-v8 {
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.05);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.03);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          aspect-ratio: 3 / 4;
          cursor: pointer;
          width: 100%;
          align-self: start;
        }

        .gallery-card-v8:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 55px rgba(27, 67, 50, 0.12);
          border-color: rgba(201, 162, 39, 0.22);
        }

        .card-img-wrapper-v8 {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #13241b 0%, #171717 50%, #2b2513 100%);
        }

        .card-slide-v8 {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          z-index: 0;
        }

        .card-slide-v8.active-slide-v8 {
          opacity: 1;
          z-index: 1;
        }

        .card-img-wrapper-v8::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, 
            rgba(10, 10, 10, 0.82) 0%, 
            rgba(10, 10, 10, 0.22) 40%, 
            transparent 100%
          );
          z-index: 2;
          transition: all 0.4s ease;
        }

        .gallery-card-v8:hover .card-img-wrapper-v8::before {
          background: linear-gradient(to top, 
            rgba(10, 10, 10, 0.94) 0%, 
            rgba(10, 10, 10, 0.45) 55%, 
            transparent 100%
          );
        }

        .card-placeholder-graphics-v8 {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.06;
          transition: all 0.4s ease;
          z-index: 3;
          pointer-events: none;
        }

        .gallery-card-v8:hover .card-placeholder-graphics-v8 {
          transform: translate(-50%, -50%) scale(1.08) rotate(3deg);
          opacity: 0.12;
        }

        .card-placeholder-graphics-v8 svg {
          width: 90px;
          height: 90px;
          fill: none;
          stroke: #C9A227;
          stroke-width: 1.2;
        }

        .card-info-v8 {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.2rem 2rem;
          z-index: 4;
          color: white;
        }

        .card-tag-v8 {
          display: inline-block;
          padding: 3px 10px;
          background: rgba(201, 162, 39, 0.2);
          border: 1px solid #C9A227;
          color: #C9A227;
          border-radius: 4px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }

        .card-info-v8 h3 {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }

        .card-info-v8 p {
          font-size: 0.84rem;
          color: #dddddd;
          line-height: 1.5;
          margin: 0;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        .gallery-card-v8:hover .card-info-v8 p {
          opacity: 1;
          transform: translateY(0);
        }

        .card-dots-v8 {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          display: flex;
          gap: 5px;
          z-index: 4;
        }

        .dot-v8 {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.35);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .dot-v8.active-dot-v8 {
          background: #C9A227;
          width: 12px;
          border-radius: 3px;
        }

        .showroom-booking-plate-v8 {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 3.5rem;
          max-width: 1200px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.05);
          border-radius: 28px;
          padding: 4.5rem;
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.03);
        }

        .booking-info-col-v8 h3 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: #1A1A1A;
          margin-bottom: 1.2rem;
          font-weight: 700;
        }

        .booking-info-col-v8 p.subtitle-v8 {
          color: #4A4A4A;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .showroom-detail-item-v8 {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .detail-icon-wrapper-v8 {
          width: 44px;
          height: 44px;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A227;
          flex-shrink: 0;
        }

        .detail-text-v8 h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.3rem;
        }

        .detail-text-v8 p {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.45;
          margin: 0;
        }

        .btn-directions-v8 {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #1B4332;
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 10px;
          margin-top: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(27, 67, 50, 0.12);
        }

        .btn-directions-v8:hover {
          background: #142d22;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(27, 67, 50, 0.25);
        }

        .booking-form-card-v8 {
          background: #FAF9F6;
          border: 1px solid rgba(201, 162, 39, 0.22);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          box-shadow: inset 0 2px 8px rgba(27, 67, 50, 0.02);
          position: relative;
          overflow: hidden;
        }

        .booking-form-card-v8 h4 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: #1A1A1A;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .form-group-v8 {
          margin-bottom: 1.4rem;
        }

        .form-label-v8 {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #4A4A4A;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .form-input-v8,
        .form-select-v8 {
          width: 100%;
          padding: 12px 16px;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.08);
          border-radius: 8px;
          font-size: 0.92rem;
          color: #1A1A1A;
          transition: all 0.3s ease;
        }

        .form-input-v8:focus,
        .form-select-v8:focus {
          outline: none;
          border-color: #C9A227;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.12);
        }

        .btn-submit-booking-v8 {
          width: 100%;
          padding: 15px;
          background: #C9A227;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 162, 39, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.5rem;
        }

        .btn-submit-booking-v8:hover {
          background: #b08d1f;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 39, 0.35);
        }

        .booking-success-v8 {
          position: absolute;
          inset: 0;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          opacity: 0;
          pointer-events: none;
          z-index: 10;
          transition: all 0.4s ease;
          transform: scale(0.95);
        }

        .booking-success-v8.active-success-v8 {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }

        .success-icon-v8 {
          width: 64px;
          height: 64px;
          background: rgba(37, 211, 102, 0.08);
          border: 2px solid #25D366;
          color: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .success-icon-v8 svg {
          width: 32px;
          height: 32px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.5;
        }

        .booking-success-v8 h5 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #1A1A1A;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }

        .booking-success-v8 p {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.5;
          margin-bottom: 2rem;
          max-width: 300px;
        }

        .btn-whatsapp-confirm-v8 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
          transition: all 0.3s ease;
        }

        .btn-whatsapp-confirm-v8:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35);
        }

        .btn-whatsapp-confirm-v8 svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        @media (max-width: 1200px) {
          .gallery-grid-v8 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .showroom-booking-plate-v8 {
            grid-template-columns: 1fr;
            padding: 3rem;
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .uniq-showroom-v8 {
            padding: 5rem 0 5rem 4%;
          }

          .showroom-header-v8 {
            padding-right: 4%;
          }

          .filter-container-v8 {
            padding-right: 4%;
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            margin-bottom: 2.5rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .filter-container-v8::-webkit-scrollbar {
            display: none;
          }
          .filter-btn-v8 {
            flex-shrink: 0;
          }

          .gallery-grid-v8 {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 1.2rem;
            padding: 0.5rem 4% 2rem 0;
            margin: 0 0 3.5rem;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .gallery-grid-v8::-webkit-scrollbar {
            display: none;
          }

          .gallery-card-v8 {
            flex: 0 0 85%;
            scroll-snap-align: start;
            transform: none !important;
            opacity: 1 !important;
            transition: none !important;
          }

          .showroom-booking-plate-v8 {
            padding: 2rem 1.5rem;
            border-radius: 20px;
            margin-right: 4%;
          }

          .booking-info-col-v8 h3 {
            font-size: 1.8rem;
          }

          .booking-form-card-v8 {
            padding: 2rem 1.5rem;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="showroom-header-v8">
        <h2 id="showroom-heading-v8" className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          Experience The <span className="italic text-[#C9A227] font-serif font-medium">Luxury Showroom</span>
        </h2>
        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
          Step inside Udaipur's grandest showroom and interact with the finest premium fabrics, executive seating layouts, and hotel linens
        </p>
      </div>

      {/* CATEGORIES FILTER STRIP */}
      <div className="filter-container-v8" role="tablist" aria-label="Showroom brand categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn-v8 cursor-hover ${activeCategory === cat.id ? "active-v8" : ""}`}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* GALLERY CARDS GRID */}
      <div ref={gridRef} className="gallery-grid-v8">
        {CARDS_DATA.map((card, idx) => (
          <div
            key={idx}
            className="gallery-card-v8 cursor-hover"
            data-card-cat={card.cat}
            tabIndex={0}
          >
            <CardCarousel
              slides={card.slides}
              title={card.title}
              desc={card.desc}
              tag={card.tag}
              icon={card.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

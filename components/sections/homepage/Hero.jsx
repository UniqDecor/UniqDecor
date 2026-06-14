"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const BRANDS = [
  {
    name: "DDecor",
    tagline: "India's #1 Home Fabrics",
    image: "/photos/rr01 (2).webp",
    alt: "DDecor designer curtains and luxury home fabrics",
    whatsappMsg: "Hi Uniq Decor! 👋 I'm interested in DDecor home fabrics & curtains. Could you share your catalog and pricing for Udaipur?"
  },
  {
    name: "Geeken",
    tagline: "Office & Institutional Furniture",
    image: "/photos/Gemini_Generated_Image_ksdm8sksdm8sksdm.webp",
    alt: "Geeken ergonomic office chairs, desks and workstations",
    whatsappMsg: "Hi Uniq Decor! 👋 I'd like to know more about Geeken office furniture for my workspace. Please share details and pricing."
  },
  {
    name: "Roserro",
    tagline: "Hotel & Spa Linen",
    image: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
    alt: "Roserro luxury hotel bed sheets, towels and spa linen",
    whatsappMsg: "Hi Uniq Decor! 👋 I'm interested in Roserro hotel linen for my property. Could you send your product catalog and bulk pricing?"
  },
  {
    name: "LaxRee",
    tagline: "Hospitality Supplies",
    image: "/photos/bedding-2 (2).webp",
    alt: "LaxRee hotel lobby furniture, amenities and hospitality solutions",
    whatsappMsg: "Hi Uniq Decor! 👋 I need LaxRee hospitality supplies for my hotel. Please share your range and quotation for Rajasthan."
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const autoPlayRef = useRef(null);

  const containerRef = useRef(null);
  const mainImgRef = useRef(null);
  const brandNameRef = useRef(null);
  const brandTaglineRef = useRef(null);

  const intervalTime = 5000;
  const whatsappBase = "919982219222";

  // Stagger reveal entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-label-el", { x: -30, opacity: 0, duration: 0.6 })
      .from(".hero-headline-el", { x: -25, opacity: 0, duration: 0.7 }, "-=0.45")
      .from(".hero-sub-el", { x: -20, opacity: 0, duration: 0.6 }, "-=0.45")
      .from(".btn-hero-el", { 
        y: 15, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "back.out(1.4)",
        clearProps: "opacity,transform"
      }, "-=0.35")
      .from(".hero-gst-el", { 
        opacity: 0, 
        duration: 0.4,
        clearProps: "opacity"
      }, "-=0.2");

    tl.from(".hero-visual-col", { 
      x: 40, 
      opacity: 0, 
      duration: 0.9,
      ease: "power2.out"
    }, 0.1);

    tl.from(".brand-pill-el", {
      y: -12,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "back.out(1.7)"
    }, 0.6);

    tl.from(mainImgRef.current, {
      scale: 1.08,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, 0.3);

    // Continuous floating animation
    gsap.to(mainImgRef.current, {
      y: 3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5
    });
  }, { scope: containerRef });

  // Autoplay handler
  useEffect(() => {
    if (!isUserInteracting) {
      autoPlayRef.current = setInterval(() => {
        handleGoToSlide((currentIndex + 1) % BRANDS.length);
      }, intervalTime);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isUserInteracting]);

  // Transition to a specific slide
  const handleGoToSlide = (index, fromUser = false) => {
    if (index === currentIndex) return;
    if (fromUser) {
      setIsUserInteracting(true);
    }

    const brand = BRANDS[index];

    // GSAP Transition
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to([mainImgRef.current, brandNameRef.current, brandTaglineRef.current], {
      opacity: 0,
      y: 15,
      duration: 0.25,
      stagger: 0.05
    })
    .call(() => {
      setCurrentIndex(index);
    })
    .fromTo([mainImgRef.current, brandNameRef.current, brandTaglineRef.current],
      { opacity: 0, y: -15, scale: 1.03 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out"
      }
    );
  };

  const activeBrand = BRANDS[currentIndex];
  const prevIndex = (currentIndex - 1 + BRANDS.length) % BRANDS.length;
  const nextIndex = (currentIndex + 1) % BRANDS.length;

  const getWhatsAppLink = (brand) => {
    const encodedMsg = encodeURIComponent(brand.whatsappMsg + ` [Brand: ${brand.name}]`);
    return `https://wa.me/${whatsappBase}?text=${encodedMsg}&source=website&medium=hero&campaign=${brand.name.toLowerCase()}`;
  };

  return (
    <section ref={containerRef} className="uniq-hero-v3 min-h-[90vh] md:min-h-screen" id="hero" aria-label="Uniq Decor Furniture Hero">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-hero-v3 {
          display: grid;
          grid-template-columns: 32% 68%;
          background: var(--color-bg-primary);
          overflow: hidden;
          position: relative;
          isolation: isolate;
          padding-top: 130px;
          box-sizing: border-box;
        }

        .uniq-hero-v3::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 60%;
          height: 140%;
          background: radial-gradient(ellipse at center, rgba(27, 67, 50, 0.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3rem 4rem 12%;
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
        }

        .btn-hero-v3 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 14px 28px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: 0.35s ease;
          cursor: pointer;
          border: none;
          width: fit-content;
          min-width: 200px;
          position: relative;
          overflow: hidden;
        }

        .btn-hero-v3::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: 0.2s ease;
          pointer-events: none;
        }

        .btn-hero-v3:hover::after {
          opacity: 1;
        }

        .btn-hero-primary-v3 {
          background: var(--color-accent-primary);
          color: white;
          box-shadow: 0 4px 14px rgba(27, 67, 50, 0.15);
        }

        .btn-hero-primary-v3:hover {
          background: var(--color-accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 30px 80px rgba(27, 67, 50, 0.25);
        }

        .btn-hero-whatsapp-v3 {
          background: transparent;
          color: var(--color-text-primary);
          border: 1.5px solid var(--color-border);
        }

        .btn-hero-whatsapp-v3 svg {
          width: 18px;
          height: 18px;
          fill: var(--color-whatsapp);
          flex-shrink: 0;
        }

        .btn-hero-whatsapp-v3:hover {
          border-color: var(--color-whatsapp);
          color: var(--color-whatsapp);
          transform: translateY(-2px);
        }

        .hero-gst-v3 {
          font-family: var(--font-serif);
          font-size: 0.75rem;
          color: #717171;
          font-style: italic;
          letter-spacing: 0.05em;
          padding-top: 1rem;
          border-top: 1px solid #F0F0F0;
        }

        .hero-visual-col {
          position: relative;
          overflow: hidden;
          background: rgba(10, 10, 10, 0.85);
        }

        .brand-tag-overlay {
          position: absolute;
          top: 2rem;
          left: 2rem;
          z-index: 10;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          max-width: 80%;
        }

        .brand-pill {
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: 0.35s ease;
          cursor: pointer;
          user-select: none;
        }

        .brand-pill:hover,
        .brand-pill.active-pill {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
        }

        .carousel-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .carousel-main {
          position: relative;
          width: 70%;
          height: 75%;
          z-index: 5;
          will-change: transform, opacity;
        }

        .carousel-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }

        .carousel-main:hover .carousel-main-img {
          transform: scale(1.02);
        }

        .carousel-main::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
          border-radius: 0 0 12px 12px;
          pointer-events: none;
        }

        .carousel-brand-label {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 6;
          color: #FFFFFF;
          pointer-events: none;
        }

        .carousel-brand-label .brand-name {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
          letter-spacing: -0.01em;
        }

        .carousel-brand-label .brand-tagline {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.92;
          font-weight: 500;
        }

        .carousel-side {
          position: absolute;
          width: 18%;
          height: 50%;
          opacity: 0.35;
          transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          will-change: transform, opacity;
        }

        .carousel-side::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent 60%);
          pointer-events: none;
        }

        .carousel-side:hover {
          opacity: 0.7;
          transform: scale(1.03) !important;
          z-index: 7;
        }

        .carousel-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: transform 0.35s ease;
        }

        .carousel-side:hover img {
          transform: scale(1.08);
        }

        .carousel-side.prev {
          left: 3%;
          transform: translateX(-25%) scale(0.88);
        }

        .carousel-side.next {
          right: 3%;
          transform: translateX(25%) scale(0.88);
        }

        .carousel-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 10;
          padding: 8px 16px;
          background: rgba(255,255,255,0.1);
          border-radius: 50px;
          backdrop-filter: blur(8px);
        }

        .carousel-dot {
          width: 36px;
          height: 3px;
          background: rgba(255,255,255,0.25);
          border-radius: 2px;
          cursor: pointer;
          transition: 0.35s ease;
          position: relative;
          overflow: hidden;
          border: none;
          padding: 0;
        }

        .carousel-dot:hover {
          background: rgba(255,255,255,0.4);
        }

        .carousel-dot.active-dot {
          background: rgba(255,255,255,0.6);
        }

        .carousel-dot .progress-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0%;
          background: white;
          border-radius: 2px;
        }

        .carousel-dot.active-dot .progress-bar {
          animation: dotProgress 5s linear forwards;
        }

        @keyframes dotProgress {
          to { width: 100%; }
        }

        @media (max-width: 1024px) {
          .uniq-hero-v3 {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .hero-text-col {
            padding: 2.2rem 5% 2.5rem;
            order: 2;
            text-align: center;
            align-items: center;
          }

          .hero-label {
            justify-content: center;
          }

          .hero-headline {
            font-size: clamp(1.8rem, 5vw, 2.4rem);
            text-align: center;
          }

          .hero-sub {
            max-width: 100%;
            text-align: center;
          }

          .hero-actions-v3 {
            width: 100%;
            max-width: 320px;
            flex-direction: column;
            align-items: center;
          }

          .btn-hero-v3 {
            width: 100%;
            min-width: auto;
            justify-content: center;
          }

          .hero-gst-v3 {
            text-align: center;
          }

          .hero-visual-col {
            height: 55vh;
            order: 1;
          }

          .carousel-main {
            width: 94%;
            height: 86%;
          }

          .carousel-side {
            display: none;
          }

          .carousel-brand-label .brand-name {
            font-size: 1.4rem;
          }

          .carousel-brand-label .brand-tagline {
            font-size: 0.7rem;
          }

          .brand-tag-overlay {
            top: 1rem;
            left: 50%;
            transform: translateX(-50%);
            justify-content: center;
          }

          .brand-pill {
            font-size: 0.65rem;
            padding: 5px 12px;
          }
        }

        @media (max-width: 480px) {
          .hero-text-col {
            padding: 1.5rem 4% 2rem;
          }

          .hero-headline {
            font-size: 1.7rem;
          }

          .hero-sub {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .btn-hero-v3 {
            padding: 13px 24px;
            font-size: 0.88rem;
          }

          .carousel-main {
            width: 95%;
            height: 86%;
          }

          .carousel-dots {
            bottom: 1.2rem;
            gap: 0.5rem;
          }

          .carousel-dot {
            width: 28px;
          }
        }
      `}} />

      {/* LEFT: TEXT COLUMN */}
      <div className="hero-text-col">
        <div className="hero-label-el text-[var(--color-accent-primary)] font-serif text-[0.75rem] font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-3 before:content-[''] before:w-8 before:h-[1px] before:bg-[var(--color-accent-primary)] before:shrink-0 max-[1024px]:before:hidden max-[1024px]:justify-center">
          Udaipur, Rajasthan
        </div>
        
        <h1 className="hero-headline-el font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-[var(--color-text-primary)] mb-5 tracking-tight max-[1024px]:text-center">
          Premium <em className="italic text-[var(--color-accent-primary)] font-bold font-serif">Furniture</em> & Hospitality Supplies
        </h1>
        
        <p className="hero-sub-el text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed mb-9 max-w-sm max-[1024px]:text-center max-[1024px]:max-w-none">
          Four trusted brands under one roof. Serving hotels, hospitals, offices, and homes across India since 2010.
        </p>
        
        <div className="hero-actions-v3 flex gap-4 max-[1024px]:flex-col max-[1024px]:w-full max-[1024px]:max-w-[320px] max-[1024px]:items-center mb-8">
          <a href="#brands" className="btn-hero-el btn-hero-v3 btn-hero-primary-v3 cursor-hover">
            Explore Brands
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
          <a 
            href={getWhatsAppLink(activeBrand)}
            className="btn-hero-el btn-hero-v3 btn-hero-whatsapp-v3 cursor-hover" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Chat about ${activeBrand.name} on WhatsApp`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
        
        {/* GST & Trust Badge */}
        <div className="hero-gst-el hero-gst-v3 text-xs md:text-sm uppercase max-[1024px]:text-center">
          GST: 08ABCPG1457G2ZX &middot; Rajasthan &middot; PAN India Delivery
        </div>
      </div>

      {/* RIGHT: BRAND CAROUSEL COLUMN */}
      <div className="hero-visual-col flex justify-center items-center" role="region" aria-label="Brand showcase carousel">
        
        {/* Brand Pills */}
        <div className="brand-tag-overlay" role="tablist" aria-label="Select a brand">
          {BRANDS.map((brand, idx) => (
            <button
              key={brand.name}
              className={`brand-pill brand-pill-el ${idx === currentIndex ? "active-pill" : ""}`}
              role="tab"
              aria-selected={idx === currentIndex}
              onClick={() => handleGoToSlide(idx, true)}
              tabIndex={idx === currentIndex ? 0 : -1}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Auto-play Status */}
        <div className="absolute top-8 right-8 z-10 flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-widest max-[1024px]:hidden" aria-live="polite">
          <span className={`w-1.5 h-1.5 bg-green-500 rounded-full ${!isUserInteracting ? "animate-ping" : ""}`} aria-hidden="true" />
          <span>{!isUserInteracting ? "Auto-playing" : "Paused"}</span>
        </div>

        {/* Carousel Stage */}
        <div className="carousel-stage" id="heroCarousel" role="tabpanel" aria-roledescription="carousel" aria-label="Featured brands">
          
          {/* Side Preview: Prev */}
          <div 
            className="carousel-side prev max-[1024px]:hidden" 
            role="button" 
            tabIndex={0}
            onClick={() => handleGoToSlide(prevIndex, true)}
            aria-label={`View ${BRANDS[prevIndex].name} brand`}
          >
            <Image 
              src={BRANDS[prevIndex].image} 
              alt={BRANDS[prevIndex].alt}
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Main Active Slide */}
          <div className="carousel-main" role="group" aria-roledescription="slide" aria-label={`Slide ${currentIndex + 1} of ${BRANDS.length}: ${activeBrand.name}`}>
            <Image 
              ref={mainImgRef}
              src={activeBrand.image} 
              alt={activeBrand.alt}
              width={600}
              height={750}
              priority={currentIndex === 0}
              className="carousel-main-img"
            />
            <div className="carousel-brand-label">
              <div ref={brandNameRef} className="brand-name">{activeBrand.name}</div>
              <div ref={brandTaglineRef} className="brand-tagline">{activeBrand.tagline}</div>
            </div>
          </div>

          {/* Side Preview: Next */}
          <div 
            className="carousel-side next max-[1024px]:hidden" 
            role="button" 
            tabIndex={0}
            onClick={() => handleGoToSlide(nextIndex, true)}
            aria-label={`View ${BRANDS[nextIndex].name} brand`}
          >
            <Image 
              src={BRANDS[nextIndex].image} 
              alt={BRANDS[nextIndex].alt}
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

        </div>

        {/* Navigation Dots */}
        <div className="carousel-dots" role="tablist" aria-label="Carousel navigation">
          {BRANDS.map((brand, idx) => (
            <button
              key={brand.name}
              className={`carousel-dot ${idx === currentIndex ? "active-dot" : ""}`}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to slide ${idx + 1}: ${brand.name}`}
              onClick={() => handleGoToSlide(idx, true)}
              tabIndex={idx === currentIndex ? 0 : -1}
            >
              <div className="progress-bar" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

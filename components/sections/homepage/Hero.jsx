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
    whatsappMsg: "Hi Uniq Decor! 👋 I'm interested in DDecor home fabrics & curtains. Could you share your catalog and pricing for Udaipur?",
    logo: "/logos/DDecor-logo.png"
  },
  {
    name: "Geeken",
    tagline: "Office & Institutional Furniture",
    image: "/photos/Gemini_Generated_Image_ksdm8sksdm8sksdm.webp",
    alt: "Geeken ergonomic office chairs, desks and workstations",
    whatsappMsg: "Hi Uniq Decor! 👋 I'd like to know more about Geeken office furniture for my workspace. Please share details and pricing.",
    logo: "/logos/geeken-logo.png"
  },
  {
    name: "Roserro",
    tagline: "Hotel & Spa Linen",
    image: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
    alt: "Roserro luxury hotel bed sheets, towels and spa linen",
    whatsappMsg: "Hi Uniq Decor! 👋 I'm interested in Roserro hotel linen for my property. Could you send your product catalog and bulk pricing?",
    logo: "/logos/roserro-logo-1.png"
  },
  {
    name: "LaxRee",
    tagline: "Hospitality Supplies",
    image: "/photos/bedding-2 (2).webp",
    alt: "LaxRee hotel lobby furniture, amenities and hospitality solutions",
    whatsappMsg: "Hi Uniq Decor! 👋 I need LaxRee hospitality supplies for my hotel. Please share your range and quotation for Rajasthan.",
    logo: "/logos/laxree-logo.png"
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

    tl.from(".hero-headline-el", { x: -25, opacity: 0, duration: 0.7 })
      .from(".hero-sub-el", { x: -20, opacity: 0, duration: 0.6 }, "-=0.45")
      .from(".btn-hero-el", { 
        y: 15, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "back.out(1.4)",
        clearProps: "opacity,transform"
      }, "-=0.35");

    tl.from(".hero-visual-col", { 
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
      scale: 1.05,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, 0.3);

    // Continuous subtle zoom animation (Ken Burns effect)
    gsap.to(mainImgRef.current, {
      scale: 1.03,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
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
      duration: 0.25,
      stagger: 0.03
    })
    .call(() => {
      setCurrentIndex(index);
    })
    .fromTo(mainImgRef.current,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out"
      }
    )
    .fromTo([brandNameRef.current, brandTaglineRef.current],
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out"
      },
      "-=0.3"
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
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          background: #000;
          padding-top: 130px;
        }

        .uniq-hero-v3::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(27, 67, 50, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3rem 4rem 12%;
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 650px;
          background: transparent;
          margin-top: auto;
          margin-bottom: auto;
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
          box-shadow: 0 15px 35px rgba(27, 67, 50, 0.3);
        }

        .btn-hero-whatsapp-v3 {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #FFFFFF !important;
          border: 1.5px solid rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
        }

        .btn-hero-whatsapp-v3 svg {
          width: 18px;
          height: 18px;
          fill: #25D366;
          flex-shrink: 0;
        }

        .btn-hero-whatsapp-v3:hover {
          border-color: #25D366;
          color: #25D366 !important;
          background: rgba(37, 211, 102, 0.05);
          transform: translateY(-2px);
        }

        .hero-gst-v3 {
          font-family: var(--font-serif);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6) !important;
          font-style: italic;
          letter-spacing: 0.05em;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
          margin-top: 1.5rem;
        }

        .hero-visual-col {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          background: #000;
        }

        .brand-tag-overlay {
          position: absolute;
          top: 140px;
          right: 4%;
          z-index: 10;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          max-width: 80%;
        }

        .brand-pill {
          padding: 8px 18px;
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.35s ease;
          cursor: pointer;
          user-select: none;
          height: 48px;
          width: 120px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .brand-pill img {
          max-height: 28px;
          width: auto;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .brand-pill:hover img,
        .brand-pill.active-pill img {
          filter: none;
          opacity: 1;
        }

        .brand-pill:hover,
        .brand-pill.active-pill {
          background: #FFFFFF !important;
          border-color: var(--color-accent-gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }

        .carousel-stage {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-main {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .carousel-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-main::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(8, 13, 9, 0.95) 0%, rgba(8, 13, 9, 0.75) 45%, rgba(0, 0, 0, 0.25) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .carousel-brand-label {
          position: absolute;
          bottom: 3.5rem;
          right: 4%;
          z-index: 6;
          color: #FFFFFF;
          pointer-events: none;
          text-align: right;
        }

        .carousel-brand-label .brand-name {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
          letter-spacing: -0.01em;
        }

        .carousel-brand-label .brand-tagline {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.92;
          font-weight: 500;
          color: var(--color-accent-gold);
        }

        .carousel-dots {
          position: absolute;
          bottom: 3.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 10;
          padding: 8px 16px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          backdrop-filter: blur(8px);
        }

        .carousel-dot {
          width: 36px;
          height: 3px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          cursor: pointer;
          transition: 0.35s ease;
          position: relative;
          overflow: hidden;
          border: none;
          padding: 0;
        }

        .carousel-dot:hover {
          background: rgba(255,255,255,0.35);
        }

        .carousel-dot.active-dot {
          background: rgba(255,255,255,0.5);
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
            flex-direction: column;
            justify-content: center;
            padding-top: 140px;
            padding-bottom: 100px;
          }

          .hero-text-col {
            padding: 3rem 6%;
            max-width: 100%;
            text-align: center;
            align-items: center;
            z-index: 10;
          }

          .hero-headline-el {
            font-size: clamp(2rem, 6vw, 3rem) !important;
            text-align: center;
          }

          .hero-sub-el {
            max-width: 100%;
            text-align: center;
            font-size: 1rem;
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
            width: 100%;
          }

          .carousel-main::after {
            background: linear-gradient(to bottom, rgba(8, 13, 9, 0.85) 0%, rgba(8, 13, 9, 0.9) 100%);
          }

          .brand-tag-overlay {
            top: auto;
            bottom: 6.5rem;
            left: 50%;
            transform: translateX(-50%);
            justify-content: center;
            width: 100%;
            max-width: 90%;
          }

          .carousel-dots {
            bottom: 2rem;
          }

          .carousel-brand-label {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-text-col {
            padding: 2rem 4% 1.5rem;
          }

          .btn-hero-v3 {
            padding: 13px 24px;
            font-size: 0.88rem;
          }

          .brand-tag-overlay {
            bottom: 5.5rem;
          }

          .carousel-dots {
            bottom: 1.5rem;
          }
        }
      `}} />

      {/* LEFT: TEXT COLUMN */}
      <div className="hero-text-col">
        
        <h1 className="hero-headline-el font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-5 tracking-tight max-[1024px]:text-center">
          Premium <em className="italic text-[var(--color-accent-gold)] font-bold font-serif">Furniture</em> & Hospitality Supplies
        </h1>
        
        <p className="hero-sub-el text-sm md:text-base text-[#D1DCD4] leading-relaxed mb-9 max-w-sm max-[1024px]:text-center max-[1024px]:max-w-none">
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
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
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
              <Image
                src={brand.logo}
                alt={`${brand.name} official logo`}
                width={100}
                height={30}
                className="object-contain"
              />
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
          
          {/* Main Active Slide */}
          <div className="carousel-main" role="group" aria-roledescription="slide" aria-label={`Slide ${currentIndex + 1} of ${BRANDS.length}: ${activeBrand.name}`}>
            <Image 
              ref={mainImgRef}
              src={activeBrand.image} 
              alt={activeBrand.alt}
              fill
              priority
              className="carousel-main-img"
            />
            <div className="carousel-brand-label">
              <div ref={brandNameRef} className="mb-2 flex justify-end">
                <Image 
                  src={activeBrand.logo} 
                  alt={`${activeBrand.name} Logo`} 
                  width={130} 
                  height={38} 
                  className="object-contain max-h-[38px] w-auto bg-white/95 px-3 py-1.5 rounded-lg shadow-md"
                />
              </div>
              <div ref={brandTaglineRef} className="brand-tagline">{activeBrand.tagline}</div>
            </div>
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

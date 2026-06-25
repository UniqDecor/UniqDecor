"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Award, Package, Star, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function LaxreeConsolidatedPortal() {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      document.getElementById("laxree-split-hero")?.classList.add("loaded");
    }, 150);
    gsap.from(".laxree-reveal", {
      scrollTrigger: {
        trigger: ".laxree-reveal",
        start: "top 85%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LaxRee Hospitality & Roofing Udaipur - Uniq Decor and Furniture",
    "description": "Official brand portal for LaxRee hotel supplies, guest room amenities, and villa roofing solutions in Udaipur, Rajasthan.",
    "image": [
      "https://uniqdecorfurniture.in/photos/HOMEPAGE%20IMAGE/STONE%20COATED%20ROOFING.jpg"
    ],
    "url": "https://uniqdecorfurniture.in/laxree",
    "telephone": "+919982219222",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14",
      "addressLocality": "Udaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.5420,
      "longitude": 73.6964
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/uniqdecor",
      "https://www.instagram.com/uniqdecor",
      "https://www.linkedin.com/company/uniqdecor",
      "https://www.youtube.com/@uniqdecor"
    ]
  };

  return (
    <div ref={containerRef} className="theme-laxree bg-[#FAF9F5] text-[#1E2022] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .split-hero-container {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          background: #0F1D2C;
        }
        .split-panel {
          position: relative;
          flex: 1;
          overflow: hidden;
          transition: flex 0.7s cubic-bezier(0.25, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 5rem 8%;
          cursor: pointer;
        }
        .split-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 29, 44, 0.95) 15%, rgba(15, 29, 44, 0.4) 60%, transparent 100%);
          z-index: 1;
          transition: opacity 0.5s ease;
        }
        .split-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.3, 1), opacity 0.5s ease;
          transform: scale(1.03);
          opacity: 0.55;
        }
        .split-content {
          position: relative;
          z-index: 2;
          max-width: 500px;
          transform: translateY(20px);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.3, 1) 0.1s, opacity 0.6s ease 0.1s;
        }
        .split-hero-container.loaded .split-content {
          transform: translateY(0);
          opacity: 1;
        }
        .split-panel-expanded {
          flex: 1.35 !important;
        }
        .split-panel-collapsed {
          flex: 0.75 !important;
        }
        .split-panel-expanded .split-bg-image {
          transform: scale(1.08);
          opacity: 0.7;
        }
        .btn-split-arrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #C5A059;
          transition: color 0.3s ease;
        }
        .split-panel-expanded .btn-split-arrow {
          color: #FFFFFF;
        }
        @media (max-width: 768px) {
          .split-hero-container {
            flex-direction: column;
            min-height: 100vh;
          }
          .split-panel {
            flex: 1 !important;
            min-height: 50vh;
            padding: 3rem 6%;
          }
        }
      `}} />

      <h1 className="sr-only">LaxRee Showroom Udaipur | Hospitality Amenities & Architectural Roofing</h1>
      <div className="split-hero-container" id="laxree-split-hero">
        <Link
          href="/laxree-amenities"
          onMouseEnter={() => setHoveredPanel("amenities")}
          onMouseLeave={() => setHoveredPanel(null)}
          className={`split-panel ${hoveredPanel === "amenities" ? "split-panel-expanded" : hoveredPanel === "roofing" ? "split-panel-collapsed" : ""}`}
          id="panel-amenities"
        >
          <div className="split-bg-image" style={{ backgroundImage: `url('/photos/HOMEPAGE IMAGE/IN-ROOM AMENITIES.webp')` }}></div>
          <div className="split-content">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-2">Hospitality Division</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-none mb-4">
              LAXREE <br/><span className="font-serif italic font-normal text-[#C5A059]">Amenities</span>
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-light mb-6">
              Guest room electronics, bespoke washroom amenities, lobby infrastructure, outdoor furniture, and space pods — all available at our Udaipur showroom.
            </p>
            <span className="btn-split-arrow">
              Explore Amenities
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        <Link
          href="/laxree-roofing"
          onMouseEnter={() => setHoveredPanel("roofing")}
          onMouseLeave={() => setHoveredPanel(null)}
          className={`split-panel ${hoveredPanel === "roofing" ? "split-panel-expanded" : hoveredPanel === "amenities" ? "split-panel-collapsed" : ""}`}
          id="panel-roofing"
        >
          <div className="split-bg-image" style={{ backgroundImage: `url('/photos/1191-scaled.webp')` }}></div>
          <div className="split-content">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-2">Architectural Division</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-none mb-4">
              LAXREE <br/><span className="font-serif italic font-normal text-[#C5A059]">Roofing</span>
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-light mb-6">
              Stone-coated steel roofing tiles, flexible asphalt shingles, synthetic thatch, and accessories — premium solutions for resorts and villas.
            </p>
            <span className="btn-split-arrow">
              Explore Roofing
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>

      {/* WHY LAXREE */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto laxree-reveal">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5A059]">Welcome to LaxRee Showroom Udaipur</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1E2022]">Two Brands, One Destination</h2>
          <p className="text-[#4A4E51] text-xs md:text-sm mt-3">
            LaxRee Showroom Udaipur at Uniq Decor brings together two specialized divisions — hospitality amenities and architectural roofing — under one roof. Whether you are outfitting a luxury resort or constructing a new villa, our Hiran Magri showroom has the expertise and inventory to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#C5A059]/10 p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#C5A059]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2022] mb-3">700+ Product SKUs</h3>
            <p className="text-[#4A4E51] text-xs leading-relaxed">From silent minibars and digital safes to stone-coated roof tiles and synthetic thatch — a comprehensive catalog for hospitality and construction projects.</p>
          </div>
          <div className="bg-white border border-[#C5A059]/10 p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#C5A059]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2022] mb-3">ISO 9001 Certified</h3>
            <p className="text-[#4A4E51] text-xs leading-relaxed">LaxRee products meet international quality standards. Our roofing solutions are manufactured in ISO 9001 certified facilities with rigorous quality control.</p>
          </div>
          <div className="bg-white border border-[#C5A059]/10 p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#C5A059]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2022] mb-3">Udaipur Showroom</h3>
            <p className="text-[#4A4E51] text-xs leading-relaxed">Visit our Hiran Magri showroom to inspect physical samples of all products. Expert consultation, on-site measurements, and pan-India delivery available.</p>
          </div>
        </div>
      </section>

      {/* QUICK LINKS TO SUB-PAGES */}
      <section className="py-20 px-6 md:px-12 bg-white border-t border-[#C5A059]/10 laxree-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5A059]">Browse Collections</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#1E2022]">Explore LaxRee Product Lines</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/laxree-amenities/room-amenities" className="group bg-[#FAF9F5] border border-[#C5A059]/10 p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <h3 className="font-serif text-base font-bold text-[#1E2022] group-hover:text-[#C5A059] transition-colors">Room Amenities</h3>
              <p className="text-[#4A4E51] text-xs mt-2">Minibars, safes, kettles, hangers</p>
            </Link>
            <Link href="/laxree-amenities/washroom-amenities" className="group bg-[#FAF9F5] border border-[#C5A059]/10 p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <h3 className="font-serif text-base font-bold text-[#1E2022] group-hover:text-[#C5A059] transition-colors">Washroom Amenities</h3>
              <p className="text-[#4A4E51] text-xs mt-2">Hair dryers, mirrors, dispensers</p>
            </Link>
            <Link href="/laxree-amenities/lobby-amenities" className="group bg-[#FAF9F5] border border-[#C5A059]/10 p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <h3 className="font-serif text-base font-bold text-[#1E2022] group-hover:text-[#C5A059] transition-colors">Lobby & Front Desk</h3>
              <p className="text-[#4A4E51] text-xs mt-2">Trolleys, signage, podiums</p>
            </Link>
            <Link href="/laxree-roofing/stone-coated-tiles" className="group bg-[#FAF9F5] border border-[#C5A059]/10 p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <h3 className="font-serif text-base font-bold text-[#1E2022] group-hover:text-[#C5A059] transition-colors">Stone Coated Tiles</h3>
              <p className="text-[#4A4E51] text-xs mt-2">30+ year roofing solutions</p>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link href="/laxree-amenities/locations" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C5A059] hover:text-[#1E2022] transition-colors">
              Visit Our Showroom <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-[#0F1D2C] laxree-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-white/70 text-sm mb-8">Visit our Udaipur showroom, call us, or browse our product catalogs online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919982219222" className="px-8 py-3 bg-[#C5A059] text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#A8883E] transition-colors">
              Call +91 99822 19222
            </a>
            <Link href="/laxree-amenities/locations" className="px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white/10 transition-colors">
              Visit Showroom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

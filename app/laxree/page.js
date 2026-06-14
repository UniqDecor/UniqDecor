"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";

export default function LaxreeConsolidatedPortal() {
  const [hoveredPanel, setHoveredPanel] = useState(null); // 'amenities' or 'roofing' or null

  useGSAP(() => {
    // split hero entrance
    setTimeout(() => {
      document.getElementById("laxree-split-hero")?.classList.add("loaded");
    }, 150);
  });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LaxRee Hospitality & Roofing Udaipur - Uniq Decor and Furniture",
    "description": "Official brand portal for LaxRee hotel supplies, guest room amenities, and villa roofing solutions in Udaipur, Rajasthan.",
    "image": [
      "https://uniqdecorfurniture.in/wp-content/uploads/2024/01/stone-coated-roofing.jpg"
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
    }
  };

  return (
    <div className="theme-laxree bg-[#FAF9F5] text-[#1E2022] min-h-screen">
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

      {/* DUAL SPLIT HERO NAVIGATION PORTAL */}
      <div className="split-hero-container" id="laxree-split-hero">
        {/* Left Side: Hospitality Amenities */}
        <Link 
          href="/laxree-amenities"
          onMouseEnter={() => setHoveredPanel("amenities")}
          onMouseLeave={() => setHoveredPanel(null)}
          className={`split-panel ${
            hoveredPanel === "amenities" 
              ? "split-panel-expanded" 
              : hoveredPanel === "roofing" 
                ? "split-panel-collapsed" 
                : ""
          }`}
          id="panel-amenities"
        >
          <div className="split-bg-image" style={{ backgroundImage: `url('/photos/HOMEPAGE IMAGE/IN-ROOM AMENITIES.webp')` }}></div>
          <div className="split-content">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-2">Hospitality Division</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-none mb-4">
              LAXREE <br/><span className="font-serif italic font-normal text-[#C5A059]">Amenities</span>
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-light mb-6">
              Luxury guest room electronics, bespoke washroom items, lobby infrastructure, restaurant/banquet/outdoor furniture, and futuristic space pods.
            </p>
            <span className="btn-split-arrow cursor-hover">
              Explore Amenities
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        {/* Right Side: Premium Roofing */}
        <Link 
          href="/laxree-roofing"
          onMouseEnter={() => setHoveredPanel("roofing")}
          onMouseLeave={() => setHoveredPanel(null)}
          className={`split-panel ${
            hoveredPanel === "roofing" 
              ? "split-panel-expanded" 
              : hoveredPanel === "amenities" 
                ? "split-panel-collapsed" 
                : ""
          }`}
          id="panel-roofing"
        >
          <div className="split-bg-image" style={{ backgroundImage: `url('/photos/1191-scaled.webp')` }}></div>
          <div className="split-content">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-2">Architectural Division</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-none mb-4">
              LAXREE <br/><span className="font-serif italic font-normal text-[#C5A059]">Roofing</span>
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-light mb-6">
              Stone-coated steel roofing tiles, flexible asphalt shingles, UV-stabilized synthetic thatch tiles, and pre-assembled tiki thatch umbrellas.
            </p>
            <span className="btn-split-arrow cursor-hover">
              Explore Roofing
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

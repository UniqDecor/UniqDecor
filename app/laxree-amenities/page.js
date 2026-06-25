"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck,
  Star,
  Package,
} from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";
import { AMENITIES_CATEGORIES_DATA as LAXREE_AMENITIES_CATEGORIES_DATA } from "./laxreeAmenitiesCategoriesData";


export default function LaxreeAmenitiesPage() {


  const containerRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timelines
    const heroTl = gsap.timeline();
    heroTl.fromTo("#laxree-amenities-hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .fromTo("#laxree-amenities-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .fromTo("#laxree-amenities-hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .fromTo("#laxree-amenities-hero-scroll-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

    // Parallax background
    gsap.to("#laxree-amenities-hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Infinite Marquee setup
    if (marqueeTrackRef.current) {
      const track = marqueeTrackRef.current;
      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 35,
        ease: "none",
        repeat: -1
      });
    }


    // Consultation reveal
    gsap.from("#laxree-amenities-consultation .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#laxree-amenities-consultation",
        start: "top 80%",
        once: true
      }
    });

    // FAQ reveal
    gsap.from("#laxree-amenities-faq .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#laxree-amenities-faq",
        start: "top 80%",
        once: true
      }
    });
  }, { scope: containerRef });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LaxRee Hotel Amenities & Guest Room Supplies Udaipur - Uniq Decor and Furniture",
    "description": "High-quality hotel amenities, silent minibars, safes, guest room supplies in Udaipur by Uniq Decor.",
    "image": [
      "https://uniqdecorfurniture.in/photos/Minibar.webp"
    ],
    "url": "https://uniqdecorfurniture.in/laxree-amenities",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What range of capacities and cooling options are available for LaxRee hotel minibars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LaxRee minibars are available in 30L and 40L capacity variants. They are engineered with absorption cooling systems that operate in absolute 0 dB silence, complete with auto-defrost functionality and energy-saving internal LED lights, making them ideal for high-end guest room suites."
        }
      },
      {
        "@type": "Question",
        "name": "Can we customize the luggage trolleys and lobby bins with our hotel logo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Uniq Decor provides custom branding and logo placement services for B2B contract orders. Luggage trolleys, lobby waste bins, and room amenities like leatherette trays and tissue boxes can be customized with high-precision laser engraving or metal embossing."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum order quantity for LaxRee hotel amenities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accommodate orders of all sizes. Small boutique hotels can order individual units, while large chains benefit from bulk B2B contract rates. Custom-branded items typically have a minimum quantity, and our team provides flexible solutions based on your project requirements."
        }
      }
    ]
  };

  return (
    <div ref={containerRef} className="theme-laxree-amenities bg-[#FAF9F6] text-[#1C3328] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .laxree-category-tab.active {
          color: #2E5A44 !important;
          border-bottom-color: #2E5A44 !important;
          font-weight: 700;
        }

        .laxree-amenities-card {
          background: #FFFFFF;
          border: 1px solid rgba(30, 58, 95, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(30, 58, 95, 0.04);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .laxree-amenities-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(30, 58, 95, 0.12);
          border-color: rgba(163, 112, 76, 0.35);
        }

        .laxree-amenities-premium-radial-bg {
          background: radial-gradient(circle at center, rgba(163, 112, 76, 0.08) 0%, transparent 80%);
        }
        .laxree-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .laxree-marquee-track {
          display: flex;
          gap: 4rem;
          width: max-content;
        }
      `}} />

      {/* HERO COVER */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1C3328] pt-20">
        <div id="laxree-amenities-hero-bg" className="absolute inset-0 w-full h-full scale-110 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('/photos/AMT/hero.webp')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C3328]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span id="laxree-amenities-hero-tag" className="inline-block text-xs uppercase tracking-[0.3em] text-[#A3704C] font-bold mb-4">Premium Room Comfort & Guest Supplies</span>
          <h1 id="laxree-amenities-hero-title" className="font-serif text-5xl md:text-8xl text-white font-bold tracking-tight leading-none mb-6">
            LAXREE <br/><span className="text-[#EBF1ED] font-normal italic font-serif text-3xl md:text-5xl block mt-4">Hotel Amenities Udaipur</span>
          </h1>
          <p id="laxree-amenities-hero-desc" className="text-[#FAF9F6]/90 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Welcome your hotel guests with premium LaxRee Hotel Amenities Udaipur. We supply silent minibars, digital safes, stainless steel luggage racks, and custom-branded toiletries.
          </p>
          <div id="laxree-amenities-hero-scroll-btn" className="mt-12">
            <a href="#laxree-amenities-categories" className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FAF9F6]/80 hover:text-white transition-colors cursor-hover">
              <span>Explore Range</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </header>

      {/* QUALITY SHOWCASE */}
      <section className="py-20 px-6 md:px-12 bg-white" id="laxree-amenities-showcase">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#2E5A44]">Guest Comfort Excellence</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1C3328]">Designed for Hospitality</h2>
            <p className="text-[#4A6055] text-xs md:text-sm mt-3">LaxRee hospitality supplies deliver high durability, energy efficiency, and customize options matching boutique branding standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#EBF1ED]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#2E5A44]/5 text-[#2E5A44] rounded-xl flex items-center justify-center mb-6">
                  <Package className="w-6 h-6 text-[#2E5A44]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C3328] mb-3">700+ Products SKUs</h3>
                <p className="text-[#4A6055] text-xs leading-relaxed">Explore our extensive catalog of high-quality guest room amenities, washroom accessories, lobby systems, and bespoke furniture solutions.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#A3704C] font-bold mt-4">700+ products skus</span>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#EBF1ED]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#2E5A44]/5 text-[#2E5A44] rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-[#2E5A44]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C3328] mb-3">10+ Years Experience</h3>
                <p className="text-[#4A6055] text-xs leading-relaxed">A decade of manufacturing and supplying top-tier hospitality assets, ensuring premium standards and reliable nationwide logistics.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#A3704C] font-bold mt-4">10years+ industry experience</span>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#EBF1ED]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#2E5A44]/5 text-[#2E5A44] rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-[#2E5A44]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C3328] mb-3">Top Choice by Industry</h3>
                <p className="text-[#4A6055] text-xs leading-relaxed">Trusted by leading hoteliers, luxury resorts, and hospitality chains for our uncompromising quality and customized brand detailing.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#A3704C] font-bold mt-4">Top Choice by Industry</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE OUR RANGE - CATEGORY CARDS */}
      <section className="py-20 px-6 md:px-12 bg-[#EBF1ED]/30 border-b border-[#2E5A44]/10" id="laxree-amenities-categories">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A3704C]">Browse Collections</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1C3328]">Explore Our Range</h2>
            <p className="text-[#4A6055] text-xs md:text-sm mt-3">Discover LaxRee's complete range of hotel amenities, furniture, and glamping solutions available at our Udaipur showroom.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(LAXREE_AMENITIES_CATEGORIES_DATA).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/laxree-amenities/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[#2E5A44]/10 bg-white p-6 md:p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-[#A3704C]/30"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#2E5A44]/5 text-[#2E5A44] border border-[#2E5A44]/10 rounded-full text-[9px] uppercase font-bold tracking-widest">
                      {cat.categoryName}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1C3328] group-hover:text-[#2E5A44] transition-colors">{cat.categoryName}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[10px] text-[#4A6055] uppercase tracking-wider">{cat.items.length} Products</span>
                  </div>
                  <p className="text-[#4A6055] text-[11px] mt-3 leading-relaxed flex-1">{cat.tagline}</p>
                  <div className="mt-4 pt-4 border-t border-[#2E5A44]/10 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-[#2E5A44] font-bold group-hover:text-[#A3704C] transition-colors">
                      View Collection
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#2E5A44] group-hover:translate-x-1 transition-transform group-hover:text-[#A3704C]" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[#2E5A44]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS & MARQUEE */}
      <section className="py-20 bg-white" id="laxree-amenities-reviews">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#2E5A44]">Resort Reviews</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1C3328]">Hotelier Approved</h2>
            <p className="text-[#4A6055] text-xs md:text-sm mt-3">Read reviews from resort management teams who rely on LaxRee in-room accessories and customized guest toiletries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-[#2E5A44]/10 rounded-2xl p-8 bg-[#EBF1ED]/30 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#A3704C] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#1C3328] leading-relaxed">
                  "The absorption minibars from LaxRee operate in absolute 0 dB silence, which is a major comfort upgrade for our guest bedrooms. Their smart digital safes fit up to 15\" laptops perfectly, offering high security."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#1C3328]">Purchase Manager</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#4A6055]">Lakeside Luxury Villas & Suites</span>
              </div>
            </div>

            <div className="border border-[#2E5A44]/10 rounded-2xl p-8 bg-[#EBF1ED]/30 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#A3704C] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#1C3328] leading-relaxed">
                  "We ordered a complete suite of matching leatherette accessories and RFID smart locks for our hotel. The custom embossed logo printing looks elegant, and the keycard switches work flawlessly to save electricity."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#1C3328]">General Manager</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#4A6055]">Aravali Hills Resort</span>
              </div>
            </div>
          </div>

          <div className="laxree-marquee-wrapper border-t border-b border-[#2E5A44]/10 py-6">
            <div ref={marqueeTrackRef} className="laxree-marquee-track">
              {[
                "ARAVALI JUNGLE RESORT",
                "THE LAKESIDE BOUTIQUE HOTEL",
                "ROYAL HEALING SPA UDAIPUR",
                "RAJSAMAND PALACE VILLAS",
                "MEWAR GRAND PALACE HOTEL",
                "LAKE CITY BOUTIQUE INN",
                "UDAIPUR LUXURY SUITES"
              ].map((c, i) => (
                <span key={i} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4A6055]/50 font-sans">{c}</span>
              ))}
              {[
                "ARAVALI JUNGLE RESORT",
                "THE LAKESIDE BOUTIQUE HOTEL",
                "ROYAL HEALING SPA UDAIPUR",
                "RAJSAMAND PALACE VILLAS",
                "MEWAR GRAND PALACE HOTEL",
                "LAKE CITY BOUTIQUE INN",
                "UDAIPUR LUXURY SUITES"
              ].map((c, i) => (
                <span key={`clone-${i}`} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4A6055]/50 font-sans">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F6] border-t border-[#2E5A44]/10" id="laxree-amenities-faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A3704C]">Got Questions?</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#1C3328]">Frequently Asked Questions</h2>
            <p className="text-[#4A6055] text-xs mt-2">Common questions asked by hoteliers, resort builders, and developers regarding LaxRee hospitality amenities.</p>
          </div>

          <div className="flex flex-col gap-5">
            <details className="group border border-[#2E5A44]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]" open>
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1C3328] cursor-pointer list-none select-none">
                <span>What range of capacities and cooling options are available for LaxRee hotel minibars?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                LaxRee minibars are available in <strong>30L and 40L capacity</strong> variants. They are engineered with absorption cooling systems that operate in absolute <strong>0 dB silence</strong>, complete with auto-defrost functionality and energy-saving internal LED lights, making them ideal for high-end guest room suites.
              </p>
            </details>

            <details className="group border border-[#2E5A44]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1C3328] cursor-pointer list-none select-none">
                <span>Can we customize LaxRee products with our hotel branding and logo?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                Yes, Uniq Decor provides custom branding and logo placement services for B2B contract orders. Luggage trolleys, lobby waste bins, bathroom amenities, and room accessories can be customized with high-precision laser engraving or metal embossing to match your hotel's brand identity.
              </p>
            </details>

            <details className="group border border-[#2E5A44]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1C3328] cursor-pointer list-none select-none">
                <span>What is the minimum order quantity for LaxRee hotel amenities?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                We accommodate orders of all sizes. Small boutique hotels can order individual units, while large chains benefit from competitive bulk B2B contract rates. Custom-branded items typically have a minimum quantity, and our team provides flexible solutions based on your project requirements.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* SHOWROOM VISIT SECTION */}
      <ShowroomVisit />
    </div>
  );
}

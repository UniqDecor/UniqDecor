"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Check,
  ChevronRight,
  Star
} from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";
import { ROOFING_CATEGORIES_DATA as LAXREE_ROOFING_CATEGORIES_DATA } from "./laxreeRoofingCategoriesData";

export default function LaxreeRoofingPage() {
  const containerRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timelines
    const heroTl = gsap.timeline();
    heroTl.fromTo("#roofing-hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .fromTo("#roofing-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .fromTo("#roofing-hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .fromTo("#roofing-hero-badges", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .fromTo("#roofing-hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

    // Parallax background
    gsap.to("#roofing-hero-bg", {
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

    // Reveal animations
    gsap.from("#roofing-journey .reveal-block", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#roofing-journey",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-journey .reveal-block", { clearProps: "all" });
      }
    });

    gsap.from("#roofing-categories-overview .card-reveal", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#roofing-categories-overview",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-categories-overview .card-reveal", { clearProps: "all" });
      }
    });

    gsap.from("#roofing-technical-specs .reveal-block", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#roofing-technical-specs",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-technical-specs .reveal-block", { clearProps: "all" });
      }
    });

    gsap.from("#roofing-installation-blueprint .reveal-block", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#roofing-installation-blueprint",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-installation-blueprint .reveal-block", { clearProps: "all" });
      }
    });

    gsap.from("#roofing-clients-portfolio .reveal-block", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#roofing-clients-portfolio",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-clients-portfolio .reveal-block", { clearProps: "all" });
      }
    });

    gsap.from("#roofing-consultation .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#roofing-consultation",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-consultation .max-w-4xl", { clearProps: "all" });
      }
    });

    gsap.from("#roofing-faq .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#roofing-faq",
        start: "top 85%",
        once: true
      },
      onComplete: () => {
        gsap.set("#roofing-faq .max-w-4xl", { clearProps: "all" });
      }
    });

    // Refresh triggers to ensure layout bounds align
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, { scope: containerRef });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LaxRee Roofing Solutions & Resort Thatch Udaipur - Uniq Decor and Furniture",
    "description": "Architectural stone-coated metal roof tiles and synthetic thatch shingles in Udaipur. Premium roofing supplier and dealer.",
    "image": [
      "https://uniqdecorfurniture.in/photos/HOMEPAGE%20IMAGE/STONE%20COATED%20ROOFING.jpg"
    ],
    "url": "https://uniqdecorfurniture.in/laxree-roofing",
    "telephone": "+919982219222",
    "priceRange": "$$$",
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
        "name": "What is the expected lifespan of LaxRee Stone Coated Metal Roof Tiles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LaxRee Stone Coated Metal Roof Tiles are engineered to last 30+ years. Built with Aluzinc (AZ 150) steel coated with UV-resistant natural stone granules, they withstand extreme heat, heavy monsoon rains, and winds without rusting or fading."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request physical samples and get a quote for my roofing project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! As the authorized dealer for LaxRee in Udaipur, Uniq Decor provides professional on-site measurements, architectural CAD estimations, and expert technical guidance for builders, structural contractors, and property owners. You can also visit our showroom to inspect physical samples of all roofing profiles and color options before placing your order."
        }
      },
      {
        "@type": "Question",
        "name": "What warranty and after-sales support do LaxRee roofing products come with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LaxRee roofing products are backed by comprehensive structural warranties against manufacturing defects. Uniq Decor provides dedicated after-sales support, including technical guidance for installation, material replacement coordination, and post-installation service calls. Extended support packages are available for bulk commercial and resort projects."
        }
      }
    ]
  };

  return (
    <div ref={containerRef} className="theme-laxree bg-[#FAF9F5] text-[#1E2022] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .roofing-category-tab.active {
          color: #D97706 !important;
          border-bottom-color: #D97706 !important;
          font-weight: 700;
        }

        .roofing-premium-radial-bg {
          background: radial-gradient(circle at center, rgba(217, 119, 6, 0.08) 0%, transparent 80%);
        }
        .roofing-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .roofing-marquee-track {
          display: flex;
          gap: 4rem;
          width: max-content;
        }
      `}} />

      {/* HERO COVER */}
      <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#1E2022] pt-28 pb-16">
        <div id="roofing-hero-bg" className="absolute inset-0 w-full h-full scale-110 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('/photos/RF/hero.webp')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2022]/70 via-transparent to-[#FAF9F5]"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span id="roofing-hero-tag" className="inline-block text-xs uppercase tracking-[0.3em] text-[#D97706] font-bold mb-4">Laxree Roofing Solutions</span>
          
          <h1 id="roofing-hero-title" className="font-serif text-5xl md:text-8xl text-white font-bold tracking-tight leading-none mb-6">
            LaxRee Roofing Sheets Udaipur <br/><span className="text-[#F3F3F3] font-normal italic font-serif text-4xl md:text-7xl">Under Every Roof.</span>
          </h1>
          
          <p id="roofing-hero-desc" className="text-white/95 text-xs md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-8">
            Authorized dealer for LaxRee Roofing Sheets Udaipur. We engineer premium, innovative, and resilient architectural roofing solutions for India’s diverse climates.
          </p>

          {/* Badges Grid */}
          <div id="roofing-hero-badges" className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl">
            {[
              "Make in India Initiative",
              "#startupindia Certified",
              "ISO 9001 Certified Quality"
            ].map((badgeText, idx) => (
              <span key={idx} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
                {badgeText}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div id="roofing-hero-actions" className="flex w-full justify-center">
            <a 
              href="#roofing-consultation"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("roofing-consultation")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#D97706] hover:bg-[#B45309] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg hover:scale-[1.03] cursor-hover"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </header>

      {/* OUR JOURNEY SECTION */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F5] border-b border-[#D97706]/10" id="roofing-journey">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 reveal-block">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D97706]">Our Journey: The "Made in India" Vision</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1E2022] leading-tight">
                Empowering India's <br />
                <span className="text-[#D97706] italic font-normal font-serif">Architectural Growth</span>
              </h2>
              
              <p className="text-[#4A4E51] text-xs md:text-sm leading-relaxed">
                At Laxree Roofing Solutions, our journey begins with a proud commitment to the Made in India vision. Founded with the strategic purpose of contributing to India's infrastructure growth and development, we provide innovative, reliable, and highly durable roofing solutions tailored specifically to Indian standards, local environments, and severe weather conditions.
              </p>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#1E2022] mb-2">Why We Started</h3>
                <p className="text-[#4A4E51] text-xs leading-relaxed">
                  India's diverse climate—ranging from scorching desert heat to torrential, heavy monsoons—demands specialized roofing systems engineered to withstand intense, extreme conditions. Recognizing this market gap, we embarked on a mission to develop roofing solutions that are resilient, environmentally sustainable, and highly cost-effective. Our goal is to empower local communities, create job opportunities, and foster long-term economic growth by building an advanced manufacturing and innovation hub right here in India.
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#1E2022] mb-2">Our Unique Commitment</h3>
                <p className="text-[#4A4E51] text-xs leading-relaxed">
                  Laxree Roofing Solutions stands proud as India's first company focused on creating jobs through innovative, patented roofing technologies tailored specifically for Indian conditions. By integrating advanced cutting-edge technology, eco-friendly sustainability practices, and local manufacturing expertise, we are shaping the future of Indian architectural roofing.
                </p>
              </div>
            </div>

            {/* Right Operations */}
            <div className="lg:col-span-5 bg-white border border-[#D97706]/10 p-8 rounded-2xl flex flex-col gap-6 shadow-sm reveal-block">
              <h3 className="font-serif text-lg font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-3">Infrastructure & Operations</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D97706]/5 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs font-mono">01</div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1E2022]">State-of-the-Art Factory</h4>
                    <p className="text-[#4A4E51] text-[11px] mt-1 leading-relaxed">Advanced manufacturing lines deploying patented technology to guarantee absolute structural uniformity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D97706]/5 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs font-mono">02</div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1E2022]">Cutting-Edge Technology</h4>
                    <p className="text-[#4A4E51] text-[11px] mt-1 leading-relaxed">Continuous research and development testing for heat resistance, waterproofing, and structural load endurance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D97706]/5 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs font-mono">03</div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1E2022]">Expansive Warehouse</h4>
                    <p className="text-[#4A4E51] text-[11px] mt-1 leading-relaxed">Ready-to-ship inventory ensuring seamless logistics, quick turnaround times, and uninterrupted project supply chains across India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRODUCT CATEGORIES GRID */}
      <section className="py-20 px-6 md:px-12 bg-white border-b border-[#D97706]/10" id="roofing-categories-overview">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Our Solutions</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1E2022]">Core Product Categories</h2>
            <p className="text-[#4A4E51] text-xs md:text-sm mt-3">Laxree offers three distinct classes of premium structural materials, each blending advanced chemical engineering with natural aesthetics:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-reveal h-full">
              <div 
                onClick={() => document.getElementById("laxree-stone-tiles-roof")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative overflow-hidden rounded-2xl border border-[#D97706]/10 p-8 flex flex-col justify-between min-h-[300px] h-full cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Background Image with Zoom and Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="/photos/RF/stone coated tiles.webp"
                    alt="Stone Coated Tiles"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Category 01</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-2 mb-3">Stone Coated Tiles</h3>
                  <p className="text-white/80 text-xs leading-relaxed">The structural strength of premium steel combined with the classic beauty of natural stone.</p>
                </div>
                <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#D97706] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Collection &rarr;</span>
              </div>
            </div>

            <div className="card-reveal h-full">
              <div 
                onClick={() => document.getElementById("laxree-synthetic-thatch-roof")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative overflow-hidden rounded-2xl border border-[#D97706]/10 p-8 flex flex-col justify-between min-h-[300px] h-full cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Background Image with Zoom and Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="/photos/RF/synthetic thatch tiles.webp"
                    alt="Synthetic Thatch Tiles"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Category 02</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-2 mb-3">Synthetic Thatch Products</h3>
                  <p className="text-white/80 text-xs leading-relaxed">Natural, tropical resort charm re-imagined through ultra-durable, fire-retardant synthetic engineering.</p>
                </div>
                <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#D97706] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Collection &rarr;</span>
              </div>
            </div>

            <div className="card-reveal h-full">
              <div 
                onClick={() => document.getElementById("laxree-asphalt-shingles-roof")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative overflow-hidden rounded-2xl border border-[#D97706]/10 p-8 flex flex-col justify-between min-h-[300px] h-full cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Background Image with Zoom and Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="/photos/RF/asphalt shingles tiles cat.webp"
                    alt="Asphalt Shingles"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Category 03</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-2 mb-3">Asphalt Shingle Tiles</h3>
                  <p className="text-white/80 text-xs leading-relaxed">Modern architectural flexibility providing sleek, multi-layered roof protection that lasts for decades.</p>
                </div>
                <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#D97706] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Collection &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE OUR RANGE - CATEGORY CARDS */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F5] border-b border-[#D97706]/10" id="roofing-categories">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Browse Collections</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1E2022]">Explore Our Range</h2>
            <p className="text-[#4A4E51] text-xs md:text-sm mt-3">Discover LaxRee's complete range of roofing solutions available at our Udaipur showroom.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(LAXREE_ROOFING_CATEGORIES_DATA).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/laxree-roofing/${slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[#D97706]/10 bg-white p-6 md:p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-[#D97706]/30"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#D97706]/5 text-[#D97706] border border-[#D97706]/10 rounded-full text-[9px] uppercase font-bold tracking-widest">
                      {slug === "stone-coated-tiles" ? "Category 01" : slug === "synthetic-thatch" ? "Category 02" : "Category 03"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1E2022] group-hover:text-[#D97706] transition-colors">{cat.categoryName}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[10px] text-[#4A4E51] uppercase tracking-wider">{cat.items.length} Products</span>
                  </div>
                  <p className="text-[#4A4E51] text-[11px] mt-3 leading-relaxed flex-1">{cat.tagline}</p>
                  <div className="mt-4 pt-4 border-t border-[#D97706]/10 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-[#D97706] font-bold group-hover:text-[#D97706] transition-colors">
                      View Collection
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform group-hover:text-[#D97706]" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[#D97706]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL COMPARISON & ACCESSORIES */}
      <section className="py-20 px-6 md:px-12 bg-white border-b border-[#D97706]/10" id="roofing-technical-specs">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-block">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Technical Data</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1E2022]">Comparison & Accessories</h2>
            <p className="text-[#4A4E51] text-xs md:text-sm mt-3">Detailed dimensional and capability matrix designed for architects, structural contractors, and developers.</p>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#D97706]/10 shadow-sm mb-16 bg-[#FAF9F5] reveal-block">
            <table className="min-w-full divide-y divide-[#D97706]/10 text-left text-xs md:text-sm">
              <thead className="bg-[#1E2022] text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider">Product Type</th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider">Dimensions (mm)</th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider">Thickness Options</th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider">Core Strengths & Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D97706]/10 bg-white">
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Classic Tile</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1340 x 420</td>
                  <td className="px-6 py-4 text-[#4A4E51]">0.38 to 0.60 mm</td>
                  <td className="px-6 py-4 text-[#4A4E51]">150 AZ Aluzinc Steel, Algae Proof, Water Resistant</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Tudor Tile</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1340 x 420</td>
                  <td className="px-6 py-4 text-[#4A4E51]">0.38 to 0.60 mm</td>
                  <td className="px-6 py-4 text-[#4A4E51]">150 AZ Aluzinc Steel, Timeless Look, Fire Proof</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Shingle Tile</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1340 x 420</td>
                  <td className="px-6 py-4 text-[#4A4E51]">0.38 to 0.60 mm</td>
                  <td className="px-6 py-4 text-[#4A4E51]">30+ Years Lifespan, Dual & Single Colors, Eco-Friendly</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Metal Kelu</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1340 x 420</td>
                  <td className="px-6 py-4 text-[#4A4E51]">0.40 to 0.50 mm</td>
                  <td className="px-6 py-4 text-[#4A4E51]">Traditional Aesthetics with High Metal Strength</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Synthetic Thatch Tiles</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">500 x 500</td>
                  <td className="px-6 py-4 text-[#4A4E51]">1.5 mm (550g)</td>
                  <td className="px-6 py-4 text-[#4A4E51]">10+ Years Life, FR / Non-FR Variants, Algae Proof</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Thatch Carpet</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1006 x 15240</td>
                  <td className="px-6 py-4 text-[#4A4E51]">Roll Substrate</td>
                  <td className="px-6 py-4 text-[#4A4E51]">165 sq. ft. Total Coverage, FR / Non-FR Variants</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">Laminated Shingle</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1000 x 333</td>
                  <td className="px-6 py-4 text-[#4A4E51]">5.2 mm</td>
                  <td className="px-6 py-4 text-[#4A4E51]">High-Grade Double Layer Bitumen, Fire Proof</td>
                </tr>
                <tr className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1E2022]">3-Tab / Mosaic / Fish</td>
                  <td className="px-6 py-4 font-mono text-[#4A4E51]">1000 x 333</td>
                  <td className="px-6 py-4 text-[#4A4E51]">2.7 mm</td>
                  <td className="px-6 py-4 text-[#4A4E51]">Lightweight, Cost-Effective, International Standards</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* System Accessories (Crucial for Leak-Proof Completeness) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-block">
            <div className="bg-[#FAF9F5] border border-[#D97706]/10 p-8 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold block mb-2">Roof Completeness</span>
              <h3 className="font-serif text-xl font-bold text-[#1E2022] mb-4">Stone Coated Metal Accessories</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A4E51]">
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Angle Ridge Cap (1380x180mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Flat Ridge Cap (1380x180mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Flat Board (1200x454mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> L-Shape Valley (2000x120mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> U-Shape Valley (2000x152mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Wall Flashing (2000x454mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Decorative Frill (2000x152mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Repair Kits (Stone Glue/Granules)</li>
              </ul>
            </div>

            <div className="bg-[#FAF9F5] border border-[#D97706]/10 p-8 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold block mb-2">Roof Completeness</span>
              <h3 className="font-serif text-xl font-bold text-[#1E2022] mb-4">Asphalt Shingle Accessories</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A4E51]">
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Shingle Ridge Units (333x333mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Shingle Starters (165x1000mm)</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Bitumen Roll & Primer</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> Roof Deck Protection Layers</li>
                <li className="flex items-center gap-2 font-semibold"><Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" /> High-Tensile Fasteners & Nails</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LAYERED INSTALLATION BLUEPRINT */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F5] border-b border-[#D97706]/10" id="roofing-installation-blueprint">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-block">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Installation Guide</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#1E2022]">Layered Installation Blueprint</h2>
            <p className="text-[#4A4E51] text-xs mt-2">Technical walkthrough of our advanced layering systems developed for leak-proof insulation.</p>
          </div>

          <div className="flex flex-col gap-6 reveal-block">
            <details className="group border-b border-[#D97706]/10 pb-5" open>
              <summary className="flex justify-between items-center font-serif text-base md:text-lg font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>Layer 1: Stone Coated Metal Roofing Structural Build</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <div className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-2 transition-all space-y-2">
                <p><strong>Main Support Framing:</strong> Built with high-strength structural beams paired with cross-layered horizontal wooden or steel Purlins.</p>
                <p><strong>Insulation Barrier:</strong> Polyshield Reflective Foil Insulation is layered directly over the framing to reject radiant heat down-transfer.</p>
                <p><strong>Spacing Framework:</strong> A tight interlocking grid layout is set up with 50 mm frame edges and 320 mm - 370 mm purlin centers.</p>
                <p><strong>Laxree Tile Integration:</strong> Overlapping Laxree Stone Coated Metal Roof Tiles lock securely into place with matching Ridge Caps and Wall Flashings along intersecting valley lines.</p>
              </div>
            </details>

            <details className="group border-b border-[#D97706]/10 pb-5">
              <summary className="flex justify-between items-center font-serif text-base md:text-lg font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>Layer 2: Synthetic Thatch Layering System</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <div className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-2 transition-all space-y-2">
                <p><strong>Staggered Installation:</strong> Laid out in overlapping horizontal paths beginning from the bottom eave upwards.</p>
                <p><strong>Row Spacing:</strong> The 1st and 2nd rows are packed tight at a 100 mm spacing interval, widening to 200 mm at the 3rd and 4th rows, and settling at a steady 300 mm interval from the 5th row onwards to ensure an authentic, water-shedding natural slope thickness. All panels lock down with heavy-duty mounting clips.</p>
              </div>
            </details>

            <details className="group border-b border-[#D97706]/10 pb-5">
              <summary className="flex justify-between items-center font-serif text-base md:text-lg font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>Layer 3: Asphalt Shingle Structural Build</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <div className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-2 transition-all space-y-2">
                <p><strong>Substrate Prep:</strong> Installed directly over clean, flat structural substrates like 18 mm OSB or plywood boards covered by optional Roof Deck Protection layers.</p>
                <p><strong>Bitumen Application:</strong> Elements are sealed using high-grade Bitumen Primer and fastened with corrosion-proof Self-Tapping Nails.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ESTEEMED CLIENTS PORTFOLIO */}
      <section className="py-20 px-6 md:px-12 bg-white border-b border-[#D97706]/10" id="roofing-clients-portfolio">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-block">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">B2B Validation</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1E2022]">Chosen By The Best, Trusted For Excellence</h2>
            <p className="text-[#4A4E51] text-xs md:text-sm mt-3">Laxree Roofing Solutions is the preferred structural choice for India’s premier luxury hospitality groups, international hotel chains, and high-end commercial property developers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 reveal-block">
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#D97706]/5 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">Luxury & Palaces</h3>
              <ul className="space-y-1.5 text-xs text-[#4A4E51] font-semibold">
                <li>&bull; Taj Resorts</li>
                <li>&bull; Rambagh Palace</li>
                <li>&bull; Fairmont Hotels & Resorts</li>
                <li>&bull; Royal Orchid Hotels</li>
                <li>&bull; The Claridges</li>
                <li>&bull; Heritage Village Resort</li>
              </ul>
            </div>
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#D97706]/5 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">International Chains</h3>
              <ul className="space-y-1.5 text-xs text-[#4A4E51] font-semibold">
                <li>&bull; Marriott Resorts</li>
                <li>&bull; Fairfield by Marriott</li>
                <li>&bull; Radisson Hotels</li>
                <li>&bull; Hard Rock Hotels</li>
                <li>&bull; Holiday Inn</li>
                <li>&bull; ibis Hotels</li>
              </ul>
            </div>
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#D97706]/5 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">Leisure & Eco-Retreats</h3>
              <ul className="space-y-1.5 text-xs text-[#4A4E51] font-semibold">
                <li>&bull; Club Mahindra</li>
                <li>&bull; The Fern Hotels & Resorts</li>
                <li>&bull; Ananta Hotels & Resorts</li>
                <li>&bull; Lemon Tree Hotels</li>
                <li>&bull; Ramada by Wyndham</li>
                <li>&bull; Mayfair Hotels & Resorts</li>
                <li>&bull; Sayaji</li>
                <li>&bull; Lords Hotels</li>
              </ul>
            </div>
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#D97706]/5 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">Commercial Hubs</h3>
              <ul className="space-y-1.5 text-xs text-[#4A4E51] font-semibold">
                <li>&bull; Deltin Suites</li>
                <li>&bull; Swosti Group</li>
                <li>&bull; OYO Rooms</li>
                <li>&bull; Clarks Hotels</li>
                <li>&bull; Ramee Group</li>
                <li>&bull; Praveg</li>
                <li>&bull; Tree of Life</li>
                <li>&bull; Rathna Residency</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-[#FAF9F5] border border-[#D97706]/10 p-8 rounded-2xl reveal-block shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold block mb-4">Completed Projects Showcase</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#4A4E51]">
              <div>
                <strong className="block text-[#1E2022] mb-1">Luxury Hospitality</strong>
                <span className="leading-relaxed">Premium Resorts in Jaipur, Pushkar, and Kerala.</span>
              </div>
              <div>
                <strong className="block text-[#1E2022] mb-1">Coastal Architecture</strong>
                <span className="leading-relaxed">High-end Beach Resorts in Daman, Island Resorts in Lakshadweep, and trendy Beachfront Cafes in Goa.</span>
              </div>
              <div>
                <strong className="block text-[#1E2022] mb-1">Private Estates</strong>
                <span className="leading-relaxed">Luxury Mountain Farmhouses in Khandala, rustic Eco-Cottages in Ajabgarh, and elite expansive Residential Sites in Punjab.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS & MARQUEE */}
      <section className="py-20 bg-white" id="roofing-reviews">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Client Feedback</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1E2022]">Trusted by Developers</h2>
            <p className="text-[#4A4E51] text-xs md:text-sm mt-3">Read how developers, architects, and resort operations managers depend on LaxRee for custom roofing works.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-[#D97706]/10 rounded-2xl p-8 bg-[#F3F3F3]/50 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#C5A059] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#C5A059]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#1E2022] leading-relaxed">
                  "For our boutique resort roof, we chose LaxRee stone coated Roman tiles. Their weather resistance has completely protected our property from strong rain and hot summers. They look incredibly rich and premium."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#1E2022]">Managing Director</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#4A4E51]">Mewar Luxury Resort & Spa</span>
              </div>
            </div>

            <div className="border border-[#D97706]/10 rounded-2xl p-8 bg-[#F3F3F3]/50 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#C5A059] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#C5A059]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#1E2022] leading-relaxed">
                  "LaxRee synthetic thatch tiles are outstanding. They gave our glamping pods and poolside huts a beautiful organic tiki look with zero rot or safety issues. Highly recommended for tropical designs."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#1E2022]">Operations Head</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#4A4E51]">Udaipur Lakeview Glamping Retreat</span>
              </div>
            </div>
          </div>

          <div className="roofing-marquee-wrapper border-t border-b border-[#D97706]/10 py-6">
            <div ref={marqueeTrackRef} className="roofing-marquee-track">
              {[
                "MEWAR VILLA ESTATES",
                "LAKEVIEW RESORT & SPA",
                "ARAVALI ECO RETREAT",
                "ROYAL UDAIPUR COTTAGES",
                "HILLTOP HERITAGE RESORTS",
                "SAJJANGARH BOUTIQUE VILLAS",
                "MEWAR STRUCTURAL ROOFS"
              ].map((c, i) => (
                <span key={i} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4A4E51]/50 font-sans">{c}</span>
              ))}
              {[
                "MEWAR VILLA ESTATES",
                "LAKEVIEW RESORT & SPA",
                "ARAVALI ECO RETREAT",
                "ROYAL UDAIPUR COTTAGES",
                "HILLTOP HERITAGE RESORTS",
                "SAJJANGARH BOUTIQUE VILLAS",
                "MEWAR STRUCTURAL ROOFS"
              ].map((c, i) => (
                <span key={`clone-${i}`} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4A4E51]/50 font-sans">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F5] border-t border-[#D97706]/10" id="roofing-faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Got Questions?</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#1E2022]">Frequently Asked Questions</h2>
            <p className="text-[#4A4E51] text-xs mt-2">Common questions asked by architects, builders, and homeowners regarding our premium roofing materials.</p>
          </div>

          <div className="flex flex-col gap-5">
            <details className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(217,119,6,0.02)]" open>
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>What is the expected lifespan of LaxRee Stone Coated Metal Roof Tiles?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                LaxRee Stone Coated Metal Roof Tiles are engineered to last <strong>30+ years</strong>. Built with premium Aluzinc (AZ 150) steel coated with UV-resistant natural stone granules, they withstand extreme heat, heavy monsoon rains, and high wind loads without rusting, cracking, or losing color.
              </p>
            </details>

            <details className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(217,119,6,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>Can I request physical samples and get a quote for my roofing project?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                Yes! As the authorized dealer for LaxRee in Udaipur, Uniq Decor provides professional on-site measurements, architectural CAD estimations, and expert technical guidance for builders, structural contractors, and property owners. You can also visit our showroom to inspect physical samples of all roofing profiles and color options before placing your order.
              </p>
            </details>

            <details className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(217,119,6,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>What warranty and after-sales support do LaxRee roofing products come with?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                LaxRee roofing products are backed by comprehensive structural warranties against manufacturing defects. Uniq Decor provides dedicated after-sales support, including technical guidance for installation, material replacement coordination, and post-installation service calls. Extended support packages are available for bulk commercial and resort projects.
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

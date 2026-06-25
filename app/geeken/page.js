"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Cpu, 
  Leaf, 
  Award, 
  Video, 
  Play, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight 
} from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";
import { GEEKEN_CATEGORIES_DATA } from "./geekenCategoriesData";

// B2B solutions carousel data
const B2B_CAROUSEL_DATA = [
  {
    title: "EduSmart Classrooms",
    img: "/photos/geeken/b2b-classrooms.jpg",
    badge: "Educational",
    desc: "Integrated writing tablets, heavy-duty stackable training chairs, and digital smart podiums configured for higher education academies.",
    spec: "Foldable Tablets"
  },
  {
    title: "Cafe & Lounge Hubs",
    img: "/photos/geeken/b2b-cafebars.jpg",
    badge: "Collaborative",
    desc: "Vibrant cafeteria tables, ergonomic bar stools, lounge seating blocks, and pouffes that encourage active team collaborations and break sessions.",
    spec: "Teak & Polymer"
  },
  {
    title: "Transit Waiting Benches",
    img: "/photos/geeken/b2b-transitbenches.jpg",
    badge: "Public Areas",
    desc: "Perforated steel airport benches, executive waiting lounges, and clinic seating lines designed to endure massive daily foot traffic.",
    spec: "BIFMA Perforated"
  },
  {
    title: "Smart AV Auditoriums",
    img: "/photos/geeken/b2b-auditoriums.jpg",
    badge: "Specialty",
    desc: "Plush motorized push-back chairs with cup holders, writing pads, acoustic wooden panels, and fully customized stepped floor alignments.",
    spec: "Auto-Return Seat"
  },
  {
    title: "Mobile Archive Compactors",
    img: "/photos/geeken/b2b-compactors.jpg",
    badge: "Industrial",
    desc: "High-density mechanical gear-drive rolling racks that double file archiving capacity on the exact same storage footprint.",
    spec: "High Density Gear"
  }
];

export default function GeekenPage() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const containerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const carouselViewportRef = useRef(null);

  // Stats refs for counting animation
  const statsRef = useRef(null);
  const [stats, setStats] = useState([
    { label: "Trusted Legacy", current: 0, target: 35, suffix: "+", sub: "Years Since 1987" },
    { label: "Solutions Catalogued", current: 0, target: 1100, suffix: "+", sub: "Product Designs" },
    { label: "Finished Projects", current: 0, target: 35000, suffix: "+", sub: "Completed Sites" },
    { label: "Satisfied Customers", current: 0, target: 2000000, suffix: "+", sub: "Happy Users", format: "compact" }
  ]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timelines
    const heroTl = gsap.timeline();
    heroTl.fromTo("#geeken-hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .fromTo("#geeken-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .fromTo("#geeken-hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .fromTo("#geeken-hero-scroll-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

    // Parallax background
    gsap.to("#geeken-hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Animate stats counter when in view
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const duration = 2; // seconds
        const startTime = performance.now();

        const updateCounters = (timestamp) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const easeProgress = progress * (2 - progress); // easeOutQuad

          setStats((prevStats) =>
            prevStats.map((stat) => {
              const currentVal = Math.floor(easeProgress * stat.target);
              return { ...stat, current: currentVal };
            })
          );

          if (progress < 1) {
            requestAnimationFrame(updateCounters);
          } else {
            // Set final values
            setStats((prevStats) =>
              prevStats.map((stat) => ({ ...stat, current: stat.target }))
            );
          }
        };

        requestAnimationFrame(updateCounters);
      }
    });

    // Infinite Marquee Animation
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

    // Consultation section reveal
    gsap.from("#geeken-consultation .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#geeken-consultation",
        start: "top 80%",
        once: true
      }
    });

    // FAQ section reveal
    gsap.from("#geeken-faq .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#geeken-faq",
        start: "top 80%",
        once: true
      }
    });
  }, { scope: containerRef });

  // Carousel scroll controller
  const scrollCarousel = (direction) => {
    const viewport = carouselViewportRef.current;
    if (!viewport) return;

    const card = viewport.querySelector(".carousel-card");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width + 24; // width + gap
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

    if (direction === "right") {
      if (viewport.scrollLeft >= maxScrollLeft - 10) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        viewport.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (viewport.scrollLeft <= 10) {
        viewport.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        viewport.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const formatStatValue = (value, format) => {
    if (format === "compact") {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(0) + "M";
      } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + "K";
      }
    }
    return value.toLocaleString();
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Geeken Office Furniture Udaipur - Uniq Decor and Furniture",
    "description": "Authorized dealer of Geeken office furniture in Udaipur. Explore premium ergonomic chairs, modular desks, executive seating, and clinic waiting benches.",
    "image": [
      "https://uniqdecorfurniture.in/photos/geeken/executive-task-chair.png"
    ],
    "@id": "https://uniqdecorfurniture.in/#store",
    "url": "https://uniqdecorfurniture.in/geeken",
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
    ],
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "IN",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 7,
      "returnFees": "https://schema.org/FreeReturn"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Geeken and how long have they been in the furniture industry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Geeken is one of India's leading premium office and institutional furniture brands, operating for over 35 years since 1987. With five state-of-the-art factories spanning 650,000+ sq. ft., Geeken combines German CNC manufacturing technology with BIFMA-certified ergonomic standards to serve corporate, healthcare, and educational clients nationwide."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer layout audits and bulk B2B commercial pricing in Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Uniq Decor provides professional on-site floor layout audits and customized 2D/3D workspace planning. We offer wholesale commercial contract rates and structured logistics support for corporate buildings, hospitals, and academies in Udaipur and across Rajasthan."
        }
      },
      {
        "@type": "Question",
        "name": "What warranty and after-sales support do Geeken products come with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Geeken furniture is backed by comprehensive structural warranties against manufacturing defects. Uniq Decor provides dedicated after-sales support including on-site service calls for adjustments, repairs, and spare parts replacement. Extended warranty and AMC packages are available for bulk corporate and institutional clients."
        }
      }
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Geeken Office Furniture Udaipur - Uniq Decor",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "85",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div ref={containerRef} className="theme-geeken bg-[#FAF9F6] text-[#1A202C] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .geeken-category-tab.active {
          color: #2C5282 !important;
          border-bottom-color: #2C5282 !important;
          font-weight: 700;
        }

        .geeken-premium-radial-bg {
          background: radial-gradient(circle at center, rgba(99, 179, 237, 0.08) 0%, transparent 80%);
        }
        .geeken-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .geeken-marquee-track {
          display: flex;
          gap: 4rem;
          width: max-content;
        }
        .carousel-viewport::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* HERO COVER */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A192F] pt-20">
        <div id="geeken-hero-bg" className="absolute inset-0 w-full h-full scale-110 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('/photos/geeken/hero-bg.png')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span id="geeken-hero-tag" className="inline-block text-xs uppercase tracking-[0.3em] text-[#63B3ED] font-bold mb-4">Ergonomic Office & Healthcare Systems</span>
          <h1 id="geeken-hero-title" className="font-serif text-5xl md:text-8xl text-white font-bold tracking-tight leading-none mb-6">
            GEEKEN <br/><span className="text-[#E9ECEF] font-normal italic font-serif text-3xl md:text-5xl block mt-4">Office Furniture Udaipur</span>
          </h1>
          <p id="geeken-hero-desc" className="text-[#FAF9F6]/90 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Discover premium Geeken Office Furniture Udaipur at Uniq Decor. Optimize your workplace and hospital rooms with ergonomic chairs, modular workstations, and steel lockers.
          </p>
          <div id="geeken-hero-scroll-btn" className="mt-12">
            <a href="#geeken-portfolio-nav" className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FAF9F6]/80 hover:text-white transition-colors cursor-hover">
              <span>Explore Portfolio</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </header>

      {/* LEGACY & STATS */}
      <section className="py-20 px-6 md:px-12 bg-[#F8F9FA]" id="geeken-legacy">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#2C5282]">Est. 1987 | India's Premium Workplaces</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 text-[#1A202C] leading-tight">
                Crafting Spaces for <br />
                <span className="text-[#2C5282] italic font-normal font-serif">Success & Productivity</span>
              </h2>
              
              <p className="text-[#4A5568] text-xs md:text-sm mt-5 leading-relaxed">
                At Geeken, we believe a workspace is more than just tables and chairs—it is the breeding ground for innovation. For over three decades, we have been leading the corporate and institutional furniture revolution in India, fusing cutting-edge design, German engineering, and ergonomic biomechanics.
              </p>

              {/* Pillars */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#2C5282]/5 text-[#2C5282] flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-[#1A202C]">German-Tech CNC Manufacturing</h3>
                    <p className="text-[#4A5568] text-[11px] mt-1 leading-relaxed">Operated with automated steel fabrication, laser bending, and precision-stitch upholstery for zero-defect results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#2C5282]/5 text-[#2C5282] flex items-center justify-center shrink-0 mt-0.5">
                    <Leaf className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-[#1A202C]">IGBC Green Certified Factory</h3>
                    <p className="text-[#4A5568] text-[11px] mt-1 leading-relaxed">Built on sustainable eco-compliant processes, low-VOC coatings, and fully recyclable metal frameworks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#2C5282]/5 text-[#2C5282] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-[#1A202C]">National Sales & Support Network</h3>
                    <p className="text-[#4A5568] text-[11px] mt-1 leading-relaxed">Serving clients nationwide with 100+ exclusive dealers and specialized on-site installation teams.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#2C5282]/10 to-[#C9A227]/10 rounded-2xl blur-xl opacity-75"></div>
              
              <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl group">
                <div 
                  className="relative aspect-video w-full bg-[#0A192F] flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => setIsPlayingVideo(true)}
                >
                  {isPlayingVideo ? (
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/GOOaa1BkQgM?autoplay=1&mute=0&rel=0" 
                      title="Geeken Manufacturing Excellence" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('/photos/geeken/hero-bg.png')`, opacity: 0.45 }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest font-bold text-white flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-[#63B3ED]" />
                          Factory Tour
                        </span>
                      </div>
                      
                      <div className="relative z-10 w-16 h-16 rounded-full bg-[#2C5282] hover:bg-[#63B3ED] text-white flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-1" />
                        <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" style={{ animationDuration: "2s" }}></div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                        <div>
                          <h3 className="text-white text-xs uppercase tracking-wider font-bold">What Sets Us Apart?</h3>
                          <p className="text-[#E9ECEF] text-[10px] uppercase tracking-widest mt-0.5 font-light">650,000+ Sq.Ft. Production Space</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Specification tags */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl border border-black/5 flex flex-col hover:shadow-md transition-shadow">
                  <span className="text-[10px] uppercase tracking-wider text-[#C9A227] font-bold">Five Factories</span>
                  <span className="text-xs text-[#1A202C] font-semibold mt-1">650,000+ Sq.Ft.</span>
                  <span className="text-[9px] text-[#4A5568] mt-0.5">High-speed assembly lines</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-black/5 flex flex-col hover:shadow-md transition-shadow">
                  <span className="text-[10px] uppercase tracking-wider text-[#C9A227] font-bold">B2B Partners</span>
                  <span className="text-xs text-[#1A202C] font-semibold mt-1">100+ Exclusive Dealers</span>
                  <span className="text-[9px] text-[#4A5568] mt-0.5">Pan-India delivery support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div ref={statsRef} className="border-t border-black/5 pt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#4A5568] font-semibold block mb-2">{stat.label}</span>
                  <div className="font-serif text-3xl md:text-4xl font-bold text-[#2C5282] flex items-center justify-center gap-0.5">
                    <span>{formatStatValue(stat.current, stat.format)}</span>
                    <span className="text-[#C9A227]">{stat.suffix}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-bold block mt-2">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BRAND SHOWCASE */}
      <section className="py-20 px-6 md:px-12 bg-white" id="geeken-showcase">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#2C5282]">Industrial Quality Standards</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1A202C]">Engineered for Performance</h2>
            <p className="text-[#4A5568] text-xs md:text-sm mt-3">Geeken furniture is thoroughly tested for load-bearing capacity, posture support, and structural lifespan in top-tier corporate offices and hospitals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F8F9FA]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#2C5282]/5 text-[#2C5282] rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-[#2C5282]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A202C] mb-3">ISO-Certified Ergonomics</h3>
                <p className="text-[#4A5568] text-xs leading-relaxed">Designed in alignment with human biomechanics to prevent cervical strain, lower back issues, and facilitate healthy sitting postures during long working hours.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#C9A227] font-bold mt-4">BIFMA & ISO Standard</span>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F8F9FA]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#2C5282]/5 text-[#2C5282] rounded-xl flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6 text-[#2C5282]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A202C] mb-3">Heavy-Gauge Steel</h3>
                <p className="text-[#4A5568] text-xs leading-relaxed">Our steel storage units and hospital bed structures utilize premium cold-rolled steel sheets with epoxy powder-coated finishes for scratch-free life.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#C9A227] font-bold mt-4">Corrosion Resistant</span>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F8F9FA]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#2C5282]/5 text-[#2C5282] rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#2C5282]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A202C] mb-3">100,000+ Cycle Tests</h3>
                <p className="text-[#4A5568] text-xs leading-relaxed">Chair pneumatic gas lifts, backrest tension springs, and modular locks are certified to withstand over 100,000 continuous compression tests.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#C9A227] font-bold mt-4">Hospitality & Corporate Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE CATEGORIES - LINKS TO SUB-PAGES */}
      <section className="py-20 px-6 md:px-12 bg-[#F8F9FA] border-b border-[#2C5282]/10" id="geeken-categories">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#2C5282]">Browse Collections</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1A202C]">Explore Our Range</h2>
            <p className="text-[#4A5568] text-xs md:text-sm mt-3">Discover Geeken's complete range of office, storage, and healthcare furniture solutions available at our Udaipur showroom.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(GEEKEN_CATEGORIES_DATA).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/geeken/${slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[#2C5282]/10 bg-white p-6 md:p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-[#2C5282]/30"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#2C5282]/5 text-[#2C5282] border border-[#2C5282]/10 rounded-full text-[9px] uppercase font-bold tracking-widest">
                      {slug === "ergonomic-chairs" ? "Category 01" : slug === "workstations" ? "Category 02" : slug === "storage" ? "Category 03" : "Category 04"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1A202C] group-hover:text-[#2C5282] transition-colors">{cat.categoryName}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[10px] text-[#4A5568] uppercase tracking-wider">{cat.items.length} Products</span>
                  </div>
                  <p className="text-[#4A5568] text-[11px] mt-3 leading-relaxed flex-1">{cat.tagline}</p>
                  <div className="mt-4 pt-4 border-t border-[#2C5282]/10 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-[#2C5282] font-bold group-hover:text-[#C9A227] transition-colors">
                      View Collection
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#2C5282] group-hover:translate-x-1 transition-transform group-hover:text-[#C9A227]" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[#2C5282]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZED B2B CAROUSEL */}
      <section className="geeken-interactive-section bg-[#E9ECEF] border-t border-b border-[#2C5282]/8 py-20 relative overflow-hidden" id="geeken-b2b-carousel">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A227]">Smart Spaces</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#1A202C]">Specialized B2B Series</h2>
              <p className="text-[#4A5568] text-xs md:text-sm mt-2 max-w-xl">Explore Geeken's targeted furniture solutions designed to fulfill modern workspace contracts, heavy-traffic public spaces, and collaborative institutions.</p>
            </div>
            
            {/* Carousel navigation */}
            <div className="flex items-center gap-3">
              <button onClick={() => scrollCarousel("left")} className="w-12 h-12 bg-white border border-[#2C5282]/10 rounded-full flex items-center justify-center text-[#2C5282] shadow-md hover:bg-[#2C5282] hover:text-white hover:border-[#2C5282] hover:scale-110 transition-all cursor-hover" aria-label="Previous Slide">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollCarousel("right")} className="w-12 h-12 bg-white border border-[#2C5282]/10 rounded-full flex items-center justify-center text-[#2C5282] shadow-md hover:bg-[#2C5282] hover:text-white hover:border-[#2C5282] hover:scale-110 transition-all cursor-hover" aria-label="Next Slide">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="carousel-container-full">
          <div ref={carouselViewportRef} className="carousel-viewport flex gap-6 pb-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none px-6 max-w-6xl mx-auto">
            {B2B_CAROUSEL_DATA.map((slide, idx) => (
              <div key={idx} className="carousel-card flex-shrink-0 w-[calc(100%-48px)] sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-24px)] snap-start p-2">
                <div className="bg-white border border-[#2C5282]/6 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-400 hover:translate-y-[-10px] hover:shadow-[0_20px_40px_rgba(44,82,130,0.1)] hover:border-[#2C5282]/20 flex flex-col h-full">
                  <div className="h-56 overflow-hidden relative">
                    <Image 
                      src={slide.img} 
                      alt={slide.title} 
                      fill 
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[8px] uppercase tracking-widest text-[#2C5282] font-bold rounded-full shadow-sm">
                      {slide.badge}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1A202C]">{slide.title}</h3>
                      <p className="text-xs text-[#4A5568] mt-2 leading-relaxed">{slide.desc}</p>
                    </div>
                    <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest text-[#C9A227] font-bold">{slide.spec}</span>
                      <a href="#geeken-consultation" className="text-xs font-semibold text-[#2C5282] hover:text-[#C9A227] transition-colors flex items-center gap-1 cursor-hover">
                        Enquire <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* REVIEWS & CLIENT MARQUEE */}
      <section className="py-20 bg-white" id="geeken-reviews">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#2C5282]">Client Feedback</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#1A202C]">Trusted by Corporates</h2>
            <p className="text-[#4A5568] text-xs md:text-sm mt-3">Discover how offices, universities, and hospitals across Rajasthan optimize spaces with Geeken ergonomics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-[#2C5282]/10 rounded-2xl p-8 bg-[#F8F9FA]/50 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#C9A227] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#C9A227]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#1A202C] leading-relaxed">
                  "We outsourced our complete corporate headquarters furniture setup to Uniq Decor. Their Geeken modular workstations and executive mesh chairs are robust, ergonomic, and have considerably reduced workplace fatigue for our 120-member team."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#1A202C]">Director of Infrastructure</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#4A5568]">Rajasthan Tech Hub Pvt. Ltd.</span>
              </div>
            </div>

            <div className="border border-[#2C5282]/10 rounded-2xl p-8 bg-[#F8F9FA]/50 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#C9A227] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#C9A227]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#1A202C] leading-relaxed">
                  "For our newly constructed ICU wing, we purchased Geeken modular electric beds and medical utility carts. The sterile coatings are clean, mechanism fits medical specs, and the delivery was executed on schedule."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#1A202C]">Chief Medical Superintendent</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#4A5568]">Udaipur City Healthcare Institute</span>
              </div>
            </div>
          </div>

          {/* Marquee ticker */}
          <div className="geeken-marquee-wrapper border-t border-b border-[#2C5282]/10 py-6">
            <div ref={marqueeTrackRef} className="geeken-marquee-track">
              {[
                "RAJASTHAN TECH HUB",
                "MEWAR INFOTECH SOLUTIONS",
                "UDAIPUR CITY HOSPITAL",
                "PACIFIC DENTAL UNIVERSITY",
                "APEX INDUSTRIES SHED",
                "SECTOR 14 BUSINESS HUB"
              ].map((c, i) => (
                <span key={i} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4A5568]/50 font-sans">{c}</span>
              ))}
              {/* Clones for seamless looping */}
              {[
                "RAJASTHAN TECH HUB",
                "MEWAR INFOTECH SOLUTIONS",
                "UDAIPUR CITY HOSPITAL",
                "PACIFIC DENTAL UNIVERSITY",
                "APEX INDUSTRIES SHED",
                "SECTOR 14 BUSINESS HUB"
              ].map((c, i) => (
                <span key={`clone-${i}`} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4A5568]/50 font-sans">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F6] border-t border-[#2C5282]/10" id="geeken-faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A227]">Got Questions?</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#1A202C]">Frequently Asked Questions</h2>
            <p className="text-[#4A5568] text-xs mt-2">Common questions asked by corporate managers, architects, and administrators regarding Geeken professional workspaces.</p>
          </div>

          <div className="flex flex-col gap-5">
            <details className="group border border-[#2C5282]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(44,82,130,0.02)]" open>
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1A202C] cursor-pointer list-none select-none">
                <span>Who is Geeken and how long have they been in the furniture industry?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Geeken is one of India's leading premium office and institutional furniture brands, operating for over <strong>35 years since 1987</strong>. With five state-of-the-art factories spanning 650,000+ sq. ft., Geeken combines German CNC manufacturing technology with BIFMA-certified ergonomic standards to serve corporate, healthcare, and educational clients nationwide.
              </p>
            </details>

            <details className="group border border-[#2C5282]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(44,82,130,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1A202C] cursor-pointer list-none select-none">
                <span>Do you offer layout audits and bulk B2B commercial pricing in Udaipur?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Yes, Uniq Decor provides professional on-site floor layout audits and customized 2D/3D workspace planning. We offer wholesale commercial contract rates and structured logistics support for corporate buildings, hospitals, and academies in Udaipur and across Rajasthan.
              </p>
            </details>

            <details className="group border border-[#2C5282]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(44,82,130,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1A202C] cursor-pointer list-none select-none">
                <span>What warranty and after-sales support do Geeken products come with?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Geeken furniture is backed by comprehensive structural warranties against manufacturing defects. Uniq Decor provides dedicated after-sales support including on-site service calls for adjustments, repairs, and spare parts replacement. Extended warranty and AMC packages are available for bulk corporate and institutional clients.
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

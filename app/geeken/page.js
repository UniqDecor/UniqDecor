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

// Product Section Data
const PRODUCTS_DATA = {
  chairs: {
    id: "geeken-chairs",
    title: "Ergonomic Chairs",
    tag: "Category 01",
    desc: "BIFMA-compliant mesh-back task chairs, executive high-back seating, and visitor conference chairs with advanced posture control systems.",
    badges: ["BIFMA Certified", "Postural Mesh"],
    items: [
      {
        title: "Premium Executive Task Chairs",
        img: "/photos/geeken/executive-task-chair.png",
        badge: "Hot Seller",
        desc: "Adjustable lumbar support, multi-lock synchro tilt mechanism, 3D armrests, and high-density breathable mesh.",
        spec: "Adjustable 3D"
      },
      {
        title: "Visitor Lobby Sofas",
        img: "/photos/geeken/visitor-lobby-sofa.webp",
        badge: "Reception",
        desc: "High-density foam cushion wrapped in premium leatherette with a strong tubular chrome steel frame structure.",
        spec: "Chrome Base"
      },
      {
        title: "Airport & Clinic Waiting Benches",
        img: "/photos/geeken/waiting-bench.webp",
        badge: "Heavy Duty",
        desc: "3-seater perforated steel benches with powder-coated silver finish. Ideal for high-occupancy waiting lobbies.",
        spec: "3-Seater Steel"
      }
    ]
  },
  workstations: {
    id: "geeken-workstations",
    title: "Modular Workstations",
    tag: "Category 02",
    desc: "Benching desk systems, acoustic privacy partitions, and premium executive conference tables designed to coordinate modern office floors.",
    badges: ["Cable Management", "Modular"],
    items: [
      {
        title: "Linear Workstation Desks",
        img: "/photos/geeken/linear-workstation.webp",
        badge: "Custom Layouts",
        desc: "Integrated cable management raceways, aluminum soft-close hatches, and fabric pin-board partition panels.",
        spec: "Modular Desk"
      },
      {
        title: "Conference Boardroom Tables",
        img: "/photos/geeken/boardroom-table.webp",
        badge: "Boardroom",
        desc: "Spacious executive conference tables equipped with pop-up media sockets, robust steel legs, and pre-laminated board top.",
        spec: "Media Ready"
      },
      {
        title: "Executive Boss Desks",
        img: "/photos/geeken/boss-desk.png",
        badge: "Managerial",
        desc: "Premium L-shaped desks with attached side returns, lockable drawers, and matching modesty panels for corporate leaders.",
        spec: "L-Shape Teak Finish"
      }
    ]
  },
  storage: {
    id: "geeken-storage",
    title: "Steel Storage & Lockers",
    tag: "Category 03",
    desc: "Heavy-duty filing cabinets, metal cupboards, multi-door staff lockers, and safe storage systems built with cold-rolled industrial steel sheets.",
    badges: ["Digital Lock Option", "0.8mm CRCA Steel"],
    items: [
      {
        title: "Multi-Door Staff Lockers",
        img: "/photos/geeken/staff-lockers.webp",
        desc: "4, 6, or 12-compartment metal lockers with individual padlocking loops, ventilation slots, and labels. Ideal for corporate changing rooms.",
        spec: "CRCA Steel"
      },
      {
        title: "4-Drawer Lateral Filing Cabinets",
        img: "/photos/geeken/filing-cabinet.png",
        desc: "Central locking mechanism drawer slides with anti-tilt safety system. Smooth telescopic channels accommodate foolscap folders.",
        spec: "Telescopic Slides"
      }
    ]
  },
  healthcare: {
    id: "geeken-healthcare",
    title: "Healthcare Furniture",
    tag: "Category 04",
    desc: "Sterile hospital beds, ICU beds, medical trolley units, and patient recovery chairs designed for maximum hospital safety and durability.",
    badges: ["ISO 13485 (Medical)", "Sterile Coated"],
    items: [
      {
        title: "Modular ICU Electric Beds",
        img: "/photos/geeken/icu-bed.png",
        badge: "ICU Grade",
        desc: "Features 4-section backrest adjustments, trendelenburg tilt with hand remote controls, and ABS plastic molded panels.",
        spec: "Electric Adjust"
      },
      {
        title: "Sterile Lab Workstations",
        img: "/photos/geeken/lab-workstation.png",
        badge: "Laboratory",
        desc: "Medical-grade chemical-resistant board tops, stainless steel frames, and modular storage cabinets built for clinical test labs.",
        spec: "Anti-Chemical Board"
      }
    ]
  }
};

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
  const [activeTab, setActiveTab] = useState("geeken-chairs");


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

    // Scroll active category tracker
    const sections = ["geeken-chairs", "geeken-workstations", "geeken-storage", "geeken-healthcare"];
    sections.forEach((secId) => {
      ScrollTrigger.create({
        trigger: `#${secId}`,
        start: "top 180px",
        end: "bottom 180px",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveTab(secId);
          }
        }
      });
    });

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
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are Geeken chairs BIFMA certified and how do they support back posture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Geeken chairs are fully BIFMA compliant. They are engineered with ergonomic postural mesh backs, adjustable lumbar support, 3D/4D armrests, and multi-lock synchro-tilt mechanisms that conform to the body's natural alignment, significantly reducing lower back fatigue."
        }
      },
      {
        "@type": "Question",
        "name": "Can Geeken modular workstations be customized to fit specific office floor plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our modular linear and L-shaped desk layouts are fully customizable. They feature integrated aluminum soft-close wire management trays, pinnable partition panels, and noise-damping acoustic barriers that can be customized to optimize any office floor plan."
        }
      },
      {
        "@type": "Question",
        "name": "What steel gauge and materials are used in Geeken filing cabinets and cupboards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Geeken cupboards and staff lockers are constructed using heavy-duty, cold-rolled industrial steel sheets (0.8mm CRCA steel). They are coated with anti-scratch epoxy powder finishes and feature secure telescopic drawers, anti-tilt mechanisms, and digital locker options."
        }
      },
      {
        "@type": "Question",
        "name": "Are Geeken healthcare beds and tables safe for sterile ICU environments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Geeken healthcare furniture is ISO 13485 (Medical Devices Quality) certified. Our electric ICU beds, sterile tables, and patient recovery chairs are treated with medical-grade antimicrobial coatings and chemically-resistant surfaces that withstand rigorous sanitization."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer layout audits and bulk B2B commercial pricing in Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Uniq Decor provides professional on-site floor layout audits and customized 2D/3D workspace planning. We offer wholesale commercial contract rates and structured logistics support for corporate buildings, hospitals, and academies in Udaipur and across Rajasthan."
        }
      }
    ]
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
            GEEKEN <br/><span className="text-[#E9ECEF] font-normal italic font-serif">Workplace</span>
          </h1>
          <p id="geeken-hero-desc" className="text-[#FAF9F6]/90 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Optimize corporate productivity and hospital environments with ISO-certified ergonomic chairs, customizable modular workstations, and heavy-duty steel lock cupboards.
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
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A202C]">German-Tech CNC Manufacturing</h4>
                    <p className="text-[#4A5568] text-[11px] mt-1 leading-relaxed">Operated with automated steel fabrication, laser bending, and precision-stitch upholstery for zero-defect results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#2C5282]/5 text-[#2C5282] flex items-center justify-center shrink-0 mt-0.5">
                    <Leaf className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A202C]">IGBC Green Certified Factory</h4>
                    <p className="text-[#4A5568] text-[11px] mt-1 leading-relaxed">Built on sustainable eco-compliant processes, low-VOC coatings, and fully recyclable metal frameworks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#2C5282]/5 text-[#2C5282] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A202C]">National Sales & Support Network</h4>
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

      {/* STICKY CATEGORIES NAV */}
      <div id="geeken-portfolio-nav" className="sticky top-[73px] z-40 bg-[#E9ECEF]/90 backdrop-blur-md border-b border-[#2C5282]/10 py-4 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 flex justify-start md:justify-center items-center overflow-x-auto gap-8 scroll-none">
          {Object.entries(PRODUCTS_DATA).map(([key, section]) => (
            <a
              key={key}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveTab(section.id);
              }}
              className={`geeken-category-tab flex-shrink-0 text-xs uppercase tracking-widest pb-1 border-b-2 border-transparent font-semibold transition-colors cursor-hover ${
                activeTab === section.id 
                  ? "active border-b-2" 
                  : "text-[#4A5568] hover:text-[#2C5282]"
              }`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* PRODUCT LISTS */}
      <div className="py-10">
        {Object.entries(PRODUCTS_DATA).map(([key, sec]) => (
          <section key={key} id={sec.id} className="scroll-mt-36 py-16 border-b border-[#2C5282]/10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C9A227] font-bold">{sec.tag}</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A202C] mt-1">{sec.title}</h2>
                  <p className="text-[#4A5568] text-xs md:text-sm mt-2 max-w-xl">{sec.desc}</p>
                </div>
                <div className="flex gap-2">
                  {sec.badges.map((b, i) => (
                    <span key={i} className="px-3 py-1 bg-[#2C5282]/5 text-[#2C5282] border border-[#2C5282]/10 rounded-full text-[10px] uppercase font-bold">{b}</span>
                  ))}
                </div>
              </div>

              <div className={`grid grid-cols-1 ${sec.items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
                {sec.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#2C5282]/8 rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(44,82,130,0.04)] transition-all duration-400 cubic-bezier(0.165,0.84,0.44,1) hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(44,82,130,0.12)] hover:border-[#2C5282]/20 group cursor-hover"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <Image 
                        src={item.img} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-widest text-[#2C5282] font-bold rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-[#1A202C]">{item.title}</h3>
                      <p className="text-xs text-[#4A5568] mt-2 leading-relaxed">{item.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-bold">{item.spec}</span>
                        <ChevronRight className="w-4 h-4 text-[#2C5282] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

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
                <span>Are Geeken chairs BIFMA certified and how do they support back posture?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Yes, Geeken chairs are fully <strong>BIFMA compliant</strong>. They are engineered with ergonomic postural mesh backs, adjustable lumbar support, 3D/4D armrests, and multi-lock synchro-tilt mechanisms that conform to the body's natural alignment, significantly reducing lower back fatigue.
              </p>
            </details>

            <details className="group border border-[#2C5282]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(44,82,130,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1A202C] cursor-pointer list-none select-none">
                <span>Can Geeken modular workstations be customized to fit specific office floor plans?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Absolutely. Our modular linear and L-shaped desk layouts are fully customizable. They feature integrated aluminum soft-close wire management trays, pinnable partition panels, and noise-damping acoustic barriers that can be customized to optimize any office floor plan.
              </p>
            </details>

            <details className="group border border-[#2C5282]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(44,82,130,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1A202C] cursor-pointer list-none select-none">
                <span>What steel gauge and materials are used in Geeken filing cabinets and cupboards?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Geeken cupboards and staff lockers are constructed using heavy-duty, cold-rolled industrial steel sheets (<strong>0.8mm CRCA steel</strong>). They are coated with anti-scratch epoxy powder finishes and feature secure telescopic drawers, anti-tilt mechanisms, and digital locker options.
              </p>
            </details>

            <details className="group border border-[#2C5282]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(44,82,130,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1A202C] cursor-pointer list-none select-none">
                <span>Are Geeken healthcare beds and tables safe for sterile ICU environments?</span>
                <span className="text-[#2C5282] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A5568] leading-relaxed mt-3 pl-1">
                Yes, Geeken healthcare furniture is <strong>ISO 13485 (Medical Devices Quality)</strong> certified. Our electric ICU beds, sterile tables, and patient recovery chairs are treated with medical-grade antimicrobial coatings and chemically-resistant surfaces that withstand rigorous sanitization.
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
          </div>
        </div>
      </section>

      {/* CORPORATE QUOTES CONSULTATION */}
      <section className="bg-[#0A192F] text-white py-20 px-6 md:px-12 relative overflow-hidden border-t-4 border-[#63B3ED]" id="geeken-consultation">
        <div className="absolute inset-0 geeken-premium-radial-bg pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col gap-6 items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#63B3ED] font-bold">Bulk Corporate Quotations</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">Request an Ergonomic Site Audit</h2>
          <p className="text-white/80 max-w-2xl text-xs md:text-base leading-relaxed">
            Need customized 2D office workstation floor layouts, medical chair specs, or custom color-finish steel lockers? Consult our Geeken corporate designers in Udaipur for a complete bulk quotation.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a 
              href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20%F0%9F%91%8B%20I'm%20setting%20up%20an%20office%2Fhospital%20and%20need%20a%20complete%20furniture%20quote." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg hover:scale-[1.03] cursor-hover"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Get Project Quote on WhatsApp
            </a>
            <Link 
              href="/#showroom" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white hover:bg-white hover:text-[#0A192F] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 cursor-hover font-sans"
            >
              View Showroom Address
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

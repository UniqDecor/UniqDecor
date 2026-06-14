"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Check, 
  ChevronRight, 
  ChevronDown, 
  VolumeX, 
  Tag, 
  KeyRound,
  ShieldCheck,
  Star,
  Hotel,
  Package,
  Map,
  MessageSquareMore,
  MapPin
} from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";

// Product categories dataset matching updated specs
const AMENITIES_PRODUCTS = {
  room: {
    id: "laxree-room-amenities",
    title: "Room Amenities",
    tag: "Category 01",
    desc: "Noiseless minibars, safety kettles, smart safes, and anti-theft hangers built for luxury guest suites.",
    items: [
      {
        title: "Minibar",
        img: "/photos/Minibar.webp",
        desc: "No-compressor noiseless cooling (0 dB) with auto-defrost and LED lighting. Available in 30L / 40L capacities."
      },
      {
        title: "Kettle",
        img: "/photos/Kettle.webp",
        desc: "Food-grade SS304 or borosilicate glass kettles with double-wall insulation and auto shut-off safety."
      },
      {
        title: "Safebox",
        img: "/photos/Safebox.webp",
        desc: "Fits up to 15\" laptops. Features secure ADA digital keypads, internal LED lights, and manual override keys."
      },
      {
        title: "Wooden Hanger",
        img: "/photos/Hanger.webp",
        desc: "Solid lotus wood hangers featuring anti-theft security rings, locking pant hooks, and non-slip bars."
      }
    ]
  },
  washroom: {
    id: "laxree-washroom-amenities",
    title: "Wash Room Amenities",
    tag: "Category 02",
    desc: "Wall-mounted safety hairdryers, LED magnifying vanity mirrors, and premium soap dispensers.",
    items: [
      {
        title: "Hair Dryer",
        img: "/photos/AMT/hair dryer.webp",
        desc: "Wall-mounted style with safety auto-off pressure switch, dual heat speed controls, and low noise ventilation.",
        spec: "1200W - 1600W rating"
      },
      {
        title: "Magnifying Mirror",
        img: "/photos/AMT/magnifying mirror.webp",
        desc: "Wall-mounted double-sided LED magnifying vanity mirror featuring 3x/5x magnification options and a 360-degree brass swivel arm.",
        spec: "LED Lighted - Brass Base"
      },
      {
        title: "Soap Dispenser",
        img: "/photos/AMT/soap dispenser.webp",
        desc: "Available in automatic smart infrared sensor or manual steel/acrylic styles. Completely leak-proof and refillable.",
        spec: "Liquid / Gel / Foam"
      }
    ]
  },
  lobby: {
    id: "laxree-lobby-amenities",
    title: "Lobby Amenities",
    tag: "Category 03",
    desc: "Heavy-duty luggage trolleys, commercial digital signage totems, and premium lobby dustbins.",
    items: [
      {
        title: "Luggage Trolley",
        img: "/photos/AMT/luggage trolley.webp",
        badge: "Stainless Steel",
        desc: "Polished gold or silver titanium SS304 tube frames, complete with a luxury wrap-around carpeted base, protective bumper, and mute heavy-duty wheels.",
        spec: "Hotel Lobby Spec"
      },
      {
        title: "Digital Signage",
        img: "/photos/AMT/digital signage.webp",
        badge: "LED Display",
        desc: "Slim interactive or commercial-grade digital totem display stand, built with high-definition IPS panels and integrated Android media player.",
        spec: "43\" - 55\" Screen"
      },
      {
        title: "Lobby Dustbin",
        img: "/photos/AMT/lobby dutbin.webp",
        badge: "Stainless Steel",
        desc: "Elegant stainless steel or titanium lobby waste bin featuring a built-in ash urn top, perfect for hotel entrances, elevator bays, and hallways.",
        spec: "SS304 - Ash Urn Top"
      }
    ]
  },
  restaurant: {
    id: "laxree-restaurant-furniture",
    title: "Restaurant Furniture",
    tag: "Category 04",
    desc: "Elegant dining chairs, tables, and custom-upholstered dining sofas built for hotel restaurants.",
    items: [
      {
        title: "Restaurant Chair",
        img: "/photos/AMT/restaurant chair.webp",
        desc: "Solid ashwood or steel frames upholstered in stain-resistant fabrics with premium ergonomic seating."
      },
      {
        title: "Restaurant Table",
        img: "/photos/AMT/retaurangt table.webp",
        desc: "Premium quartz, marble, or solid oak wood tabletops with heavy cast-iron or steel support bases."
      },
      {
        title: "Sofa",
        img: "/photos/AMT/sofa.webp",
        desc: "Custom-upholstered banquet bench sofas and luxury tufted booths designed to optimize restaurant dining layout."
      }
    ]
  },
  banquet: {
    id: "laxree-banquet-furniture",
    title: "Banquet Furniture",
    tag: "Category 05",
    desc: "High-strength banquet chairs, foldable tables, and speaker podiums.",
    items: [
      {
        title: "Banquet Chair",
        img: "/photos/AMT/banquet chair.webp",
        desc: "Stackable high-tensile steel or alloy frames. Thick fire-retardant foam cushioning."
      },
      {
        title: "Banquet Table",
        img: "/photos/HOMEPAGE IMAGE/BANQUET LINEN ROSERRO.jpg",
        desc: "Heavy-duty folding round or rectangular tables. Structural legs lock tight for events."
      },
      {
        title: "Podium Lectern",
        img: "/photos/Podium.webp",
        desc: "Premium wood, metal, or acrylic lecterns with built-in mic ports and branding zones."
      }
    ]
  },
  outdoor: {
    id: "laxree-outdoor-furniture",
    title: "Outdoor & Garden Furniture",
    tag: "Category 06",
    desc: "Heavy-duty weather-proof FRP furniture, all-weather rattan dining chairs, and UV-resistant outdoor tables.",
    items: [
      {
        title: "FRP Furniture",
        img: "/photos/AMT/outdoor furniure.webp",
        badge: "FRP Composite",
        desc: "Fiber-reinforced plastic sun loungers, benches, and outdoor planters built to survive harsh rains and direct UV sunlight."
      },
      {
        title: "Rattan Chair",
        img: "/photos/AMT/outdoor wicker furniture.webp",
        badge: "Synthetic Rattan",
        desc: "Powder-coated aluminum structural frames woven with high-density synthetic PE rattan fibers for high durability."
      },
      {
        title: "Garden Table",
        img: "/photos/lxslideb1.webp",
        badge: "UV Guard",
        desc: "All-weather composite wood or tempered glass garden dining tables with anti-rust steel leg assemblies."
      }
    ]
  },
  pods: {
    id: "laxree-space-pods",
    title: "Domes & Space Pods",
    tag: "Category 07",
    desc: "Prefabricated luxury outdoor glamping capsule pods and geodesic resort domes built with advanced insulation and structural integrity.",
    items: [
      {
        title: "Space Pods",
        img: "/photos/AMT/space pods.webp",
        badge: "Flagship Pod",
        titleBadge: "Turnkey Prefab",
        desc: "Our luxury glamping space pods are premium modular capsule units designed for immediate resort site placement. Featuring high-grade steel internal framing, heat/sound insulation layers, double-glazed smart glass panels, integrated LED ceiling profiles, air conditioning vents, and pre-fitted luxury bathrooms. Re-defines organic eco-tourism with cutting-edge comfort."
      },
      {
        title: "Domes",
        img: "/photos/AMT/glamping dome.webp",
        badge: "Geodesic Design",
        titleBadge: "Resort Dome",
        desc: "High-tensile geodesic dome structures wrapped in thick weather-proof PVC/polycarbonate covers. Fully insulated with dynamic bay window panoramic views."
      }
    ]
  }
};



export default function LaxreeAmenitiesPage() {
  const [activeTab, setActiveTab] = useState("laxree-room-amenities");


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

    // Scroll active category tracker
    const sections = [
      "laxree-room-amenities",
      "laxree-washroom-amenities",
      "laxree-lobby-amenities",
      "laxree-restaurant-furniture",
      "laxree-banquet-furniture",
      "laxree-outdoor-furniture",
      "laxree-space-pods"
    ];
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
      "https://uniqdecorfurniture.in/wp-content/uploads/2024/01/stone-coated-roofing.jpg"
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
        "name": "Are LaxRee space pods and geodesic domes prefabricated and easy to install?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our luxury glamping space pods and resort domes are fully prefabricated turnkey units. They are delivered with pre-fitted internal steel framing, thick heat and sound insulation, double-glazed smart glass, dynamic LED lighting, integrated AC ducts, and pre-wired bathrooms. They are ready for immediate plug-and-play installation on your site."
        }
      },
      {
        "@type": "Question",
        "name": "What safety features are integrated into LaxRee hotel kettles and hairdryers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Safety is our highest priority. LaxRee in-room kettles are built using food-grade SS304 stainless steel or borosilicate glass with double-wall cool-touch insulation and automatic steam shut-off. Our wall-mounted hotel hairdryers feature automatic pressure-sensitive safety off-switches on the handle to prevent hazards."
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
        "name": "What is the structural material used for LaxRee outdoor and garden furniture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our outdoor collections are built to withstand extreme weather. We utilize high-density fiber-reinforced composite plastics (FRP) and powder-coated aluminum frames hand-woven with UV-resistant synthetic PE rattan fibers that do not fade or crack under harsh sun or monsoon rains."
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
            LAXREE <br/><span className="text-[#EBF1ED] font-normal italic font-serif">Amenities</span>
          </h1>
          <p id="laxree-amenities-hero-desc" className="text-[#FAF9F6]/90 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Welcome your hotel guests with premium silent minibars, digital safes, stainless steel luggage racks, and custom-branded herbal toiletry kits.
          </p>
          <div id="laxree-amenities-hero-scroll-btn" className="mt-12">
            <a href="#laxree-amenities-portfolio-nav" className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FAF9F6]/80 hover:text-white transition-colors cursor-hover">
              <span>Explore Portfolio</span>
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

      {/* STICKY CATEGORIES NAV */}
      <div id="laxree-amenities-portfolio-nav" className="sticky top-[73px] z-40 bg-[#EBF1ED]/95 backdrop-blur-md border-b border-[#2E5A44]/10 py-4 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 flex justify-start md:justify-center items-center overflow-x-auto gap-8 scroll-none">
          {Object.entries(AMENITIES_PRODUCTS).map(([key, sec]) => (
            <a
              key={key}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveTab(sec.id);
              }}
              className={`laxree-category-tab flex-shrink-0 text-xs uppercase tracking-widest pb-1 border-b-2 border-transparent font-semibold transition-colors cursor-hover ${
                activeTab === sec.id 
                  ? "active border-b-2" 
                  : "text-[#4A6055] hover:text-[#2E5A44]"
              }`}
            >
              {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* PRODUCT LISTS */}
      <div className="py-10">
        {Object.entries(AMENITIES_PRODUCTS).map(([key, sec]) => (
          <section key={key} id={sec.id} className="scroll-mt-36 py-16 border-b border-[#2E5A44]/10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#A3704C] font-bold">{sec.tag}</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C3328] mt-1">{sec.title}</h2>
                  <p className="text-[#4A6055] text-xs md:text-sm mt-2 max-w-xl">{sec.desc}</p>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${sec.items.length === 2 ? 'md:grid-cols-2' : sec.items.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
                {sec.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="laxree-amenities-card group cursor-hover"
                  >
                    <div className="aspect-square w-full overflow-hidden relative bg-[#EBF1ED]">
                      <Image 
                        src={item.img || "/assets/laxree_roofing.png"} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-widest text-[#2E5A44] font-bold rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-base font-bold text-[#1C3328]">{item.title}</h3>
                        {item.titleBadge && (
                          <span className="bg-[#A3704C]/10 text-[#A3704C] px-2.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-extrabold whitespace-nowrap">
                            {item.titleBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#4A6055] mt-2 leading-relaxed">{item.desc}</p>
                      {item.spec && (
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#A3704C] font-bold">{item.spec}</span>
                          <ChevronRight className="w-4 h-4 text-[#2E5A44] group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      </div>



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
                <span>Are LaxRee space pods and geodesic domes prefabricated and easy to install?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                Yes, our luxury glamping space pods and resort domes are fully prefabricated turnkey units. They are delivered with pre-fitted internal steel framing, thick heat and sound insulation layers, double-glazed smart glass, dynamic LED lighting, integrated AC ducts, and pre-wired bathrooms. They are ready for immediate plug-and-play installation on your site.
              </p>
            </details>

            <details className="group border border-[#2E5A44]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1C3328] cursor-pointer list-none select-none">
                <span>What safety features are integrated into LaxRee hotel kettles and hairdryers?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                Safety is our highest priority. LaxRee in-room kettles are built using food-grade SS304 stainless steel or borosilicate glass with double-wall cool-touch insulation and automatic steam shut-off. Our wall-mounted hotel hairdryers feature automatic pressure-sensitive safety off-switches on the handle to prevent hazards.
              </p>
            </details>

            <details className="group border border-[#2E5A44]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1C3328] cursor-pointer list-none select-none">
                <span>Can we customize the luggage trolleys and lobby bins with our hotel logo?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                Yes, Uniq Decor provides custom branding and logo placement services for B2B contract orders. Luggage trolleys, lobby waste bins, and room amenities like leatherette trays and tissue boxes can be customized with high-precision laser engraving or metal embossing.
              </p>
            </details>

            <details className="group border border-[#2E5A44]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1C3328] cursor-pointer list-none select-none">
                <span>What is the structural material used for LaxRee outdoor and garden furniture?</span>
                <span className="text-[#A3704C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A6055] leading-relaxed mt-3 pl-1">
                Our outdoor collections are built to withstand extreme weather. We utilize high-density fiber-reinforced composite plastics (FRP) and powder-coated aluminum frames hand-woven with UV-resistant synthetic PE rattan fibers that do not fade or crack under harsh sun or monsoon rains.
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

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
  Award, 
  Leaf, 
  ShieldCheck,
  Star,
  MapPin,
  Map
} from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";

// Product datasets matching consolidated specs
const ROOFING_PRODUCTS = {
  tiles: {
    id: "laxree-stone-tiles-roof",
    title: "Stone Coated Metal Roof Tiles",
    tag: "Category 01",
    desc: "Engineered with premium Aluzinc (AZ 150) steel sheets coated with UV-resistant natural stone granules. Combines structural steel strength with traditional natural stone aesthetics. All items are Water Resistant, Algae Proof, Fire Proof, Sustainable, and Easy to Install.",
    badges: ["150 AZ Aluzinc", "Class A Fire"],
    items: [
      {
        title: "Classic Tile",
        img: "/photos/RF/classic tile.webp",
        badge: "Classic Wave",
        desc: "Symmetrical, bold rolling waves providing a clean, timeless European look.",
        spec: "1340 x 420 mm | 0.38 - 0.60 mm"
      },
      {
        title: "Tudor Tile",
        img: "/photos/RF/tudor tiles.webp",
        badge: "Tudor Step",
        desc: "Elegant, sharper step-down profiles that elevate rooftops with timeless style and traditional depth.",
        spec: "1340 x 420 mm | 0.38 - 0.60 mm"
      },
      {
        title: "Stone Coated Shingle Tile",
        img: "/photos/RF/stone coated shingles.webp",
        badge: "Slate/Wood Shingle",
        desc: "Flat, interlocking block profiles mimicking classic wood or slate shingle cuts. Available in stunning single and dual-tone color blends. Expected lifespan of 30+ years.",
        spec: "1340 x 420 mm | 0.38 - 0.60 mm"
      },
      {
        title: "Metal Kelu",
        img: "/photos/RF/metal kelu.webp",
        badge: "Heritage Kelu",
        desc: "Re-inventing traditional Indian heritage clay tile elegance with the indestructible strength of modern metal roofing.",
        spec: "1340 x 420 mm | 0.40 - 0.50 mm"
      }
    ],
    colors: [
      "Terracotta", "Green", "Green Black", "Blue", "Peacock Blue", 
      "Blue Black", "Coffee Brown", "Brown Black", "Red Black", 
      "Black", "Peacock Black", "Light Grey", "White Black", 
      "Cement Grey", "Grey Black"
    ]
  },
  thatch: {
    id: "laxree-synthetic-thatch-roof",
    title: "Synthetic Thatch Products",
    tag: "Category 02",
    desc: "Ideal for luxury beach resorts, eco-lodges, theme parks, and premium farmhouses. It delivers authentic tropical textures without the decay, bugs, or high maintenance of real straw. All items are Eco-Friendly, Algae Proof, Non-Hazardous, and have a 10x longer lifespan than natural matting.",
    badges: ["Non-Combustible", "10x Lifespan"],
    items: [
      {
        title: "Thatch Umbrella",
        img: "/photos/RF/thatch umbrella.webp",
        badge: "Tiki Poolside",
        desc: "Perfect for poolside shades, open-air beach lounges, and outdoor restaurant bars. Highly water and fire resistant. Equipped with standard support frame assemblies.",
        spec: "1981 mm Dia | 2740 mm Height | Heavy Bases"
      },
      {
        title: "Synthetic Thatch Tiles",
        img: "/photos/RF/synthetic thatch tiles.webp",
        badge: "Resort Tile",
        desc: "Modular thatch tiles designed for quick layered installation over existing sloped roofs. Available in Fire Retardant (FR) / Non-FR variants. Expected lifespan of 10+ years.",
        spec: "500 x 500 mm | 1.5 mm | 550g | FR / Non-FR"
      },
      {
        title: "Thatch Roll",
        img: "/photos/RF/thatch roll.webp",
        badge: "Continuous Weave",
        desc: "Continuous woven thatch styling for rapid coverage on large architectural projects. Available in FR / Non-FR variants.",
        spec: "500 mm Width | Custom Lengths | 1.5 mm"
      },
      {
        title: "Thatch Carpet",
        img: "/photos/RF/thatch carpet.webp",
        badge: "Thatch Carpet Roll",
        desc: "Continuous backing substrate thatch carpet panels. Delivers a total area coverage of 165 sq. ft. per roll. Available in FR / Non-FR.",
        spec: "1006 x 15240 mm (3.3 x 50 ft) | FR / Non-FR"
      },
      {
        title: "Artificial Thatch Mat",
        img: "/photos/RF/artifical thathc mat.webp",
        badge: "Bamboo/Reed Weave",
        desc: "Fine-woven interior ceiling linings or wall cladding mimicking premium natural bamboo or reed weaves. Made of sustainable Polyethylene (PE). Fully fire resistant and easy to install.",
        spec: "Made to Order | Customizable | PE Material"
      }
    ],
    colors: ["Cream", "Grey", "Brown", "Custom Color Matching Options"]
  },
  shingles: {
    id: "laxree-asphalt-shingles-roof",
    title: "Asphalt Shingle Tiles",
    tag: "Category 03",
    desc: "Multi-layered, high-grade bitumen roofing shingles that offer top-tier impact protection and wind resistance with a sleek, clean profile. All products are Water Resistant, Algae Proof, and Fire Proof.",
    badges: ["High-Grade Bitumen", "International Standards"],
    items: [
      {
        title: "Laminated Shingles",
        img: "/photos/RF/laminated shingles.webp",
        badge: "Architectural 3D",
        desc: "Dual-layer architectural dimensioning creating rich shadow lines and premium depth.",
        spec: "1000 x 333 mm | 5.2 mm Thickness"
      },
      {
        title: "3-Tab Shingles",
        img: "/photos/RF/3 tab shingles.webp",
        badge: "Symmetrical Clean",
        desc: "Classic, symmetrical three-tab flat spacing for clean layout lines and high value.",
        spec: "1000 x 333 mm | 2.7 mm Thickness"
      },
      {
        title: "Mosaic Shingles",
        img: "/photos/RF/mosaic shingles.webp",
        badge: "Hexagonal Art",
        desc: "Striking, repeating hexagonal mosaic patterns that create highly stylized artistic roofs. Extremely affordable and quick to install.",
        spec: "1000 x 333 mm | 2.7 mm Thickness"
      },
      {
        title: "Fish Shingles",
        img: "/photos/RF/fish shingles.webp",
        badge: "Fish Scale",
        desc: "Scalloped, rounded semi-circle profiles evoking heritage design language that captivates at first glance.",
        spec: "1000 x 333 mm | 2.7 mm Thickness"
      }
    ]
  }
};

export default function LaxreeRoofingPage() {
  const [activeTab, setActiveTab] = useState("laxree-stone-tiles-roof");
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

    // Scroll active category tracker
    const sections = [
      "laxree-stone-tiles-roof",
      "laxree-synthetic-thatch-roof",
      "laxree-asphalt-shingles-roof"
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
      "https://uniqdecorfurniture.in/wp-content/uploads/2024/01/stone-coated-roofing.jpg"
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
        "name": "Are Synthetic Thatch Tiles fire retardant and safe for resorts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, LaxRee Synthetic Thatch Tiles are available in certified Fire Retardant (FR) formulations. They are non-combustible, algae-proof, and offer a 10x longer lifespan than natural thatch straw, making them perfect for luxury beach resorts and eco-lodges."
        }
      },
      {
        "@type": "Question",
        "name": "How do Asphalt Shingles protect against heavy wind and water leaks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LaxRee Asphalt Shingle Tiles are composed of high-grade bitumen layers and fiberglass reinforcement. They lock together securely to create a continuous, fully waterproof shield that offers top-tier wind and impact resistance."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide roof estimations and site surveys in Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! As Udaipur's authorized dealer, Uniq Decor provides professional on-site measurements, CAD estimations, and expert technical guidance for architects, builders, and villa owners."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I view physical samples of LaxRee Roofing tiles in Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can visit the Uniq Decor showroom at 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur, Rajasthan (313001) to see and touch live samples of all profiles and color options."
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
            Under Every Roof <br/><span className="text-[#F3F3F3] font-normal italic font-serif text-4xl md:text-7xl">Lies a Story.</span>
          </h1>
          
          <p id="roofing-hero-desc" className="text-white/95 text-xs md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-8">
            Premium, innovative, and resilient architectural roofing solutions proudly engineered for India’s diverse climates.
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
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#1E2022] mb-2">Why We Started</h4>
                <p className="text-[#4A4E51] text-xs leading-relaxed">
                  India's diverse climate—ranging from scorching desert heat to torrential, heavy monsoons—demands specialized roofing systems engineered to withstand intense, extreme conditions. Recognizing this market gap, we embarked on a mission to develop roofing solutions that are resilient, environmentally sustainable, and highly cost-effective. Our goal is to empower local communities, create job opportunities, and foster long-term economic growth by building an advanced manufacturing and innovation hub right here in India.
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#1E2022] mb-2">Our Unique Commitment</h4>
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

      {/* STICKY CATEGORIES NAV */}
      <div id="geeken-portfolio-nav" className="sticky top-[73px] z-40 bg-[#F3F3F3]/95 backdrop-blur-md border-b border-[#D97706]/10 py-4 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 flex justify-start md:justify-center items-center overflow-x-auto gap-8 scroll-none">
          {Object.entries(ROOFING_PRODUCTS).map(([key, sec]) => (
            <a
              key={key}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveTab(sec.id);
              }}
              className={`roofing-category-tab flex-shrink-0 text-xs uppercase tracking-widest pb-1 border-b-2 border-transparent font-semibold transition-colors cursor-hover ${
                activeTab === sec.id 
                  ? "active border-b-2" 
                  : "text-[#4A4E51] hover:text-[#D97706]"
              }`}
            >
              {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* PRODUCT LISTS */}
      <div className="py-10">
        {Object.entries(ROOFING_PRODUCTS).map(([key, sec]) => (
          <section key={key} id={sec.id} className="scroll-mt-36 py-16 border-b border-[#D97706]/10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold">{sec.tag}</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E2022] mt-1">{sec.title}</h2>
                  <p className="text-[#4A4E51] text-xs md:text-sm mt-2 max-w-xl">{sec.desc}</p>
                </div>
                <div className="flex gap-2">
                  {sec.badges.map((b, i) => (
                    <span key={i} className="px-3 py-1 bg-[#D97706]/5 text-[#D97706] border border-[#D97706]/10 rounded-full text-[10px] uppercase font-bold">{b}</span>
                  ))}
                </div>
              </div>

              <div className={`grid grid-cols-1 ${sec.items.length === 2 ? 'md:grid-cols-2' : sec.items.length === 5 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-8`}>
                {sec.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#D97706]/8 rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(217,119,6,0.04)] transition-all duration-400 cubic-bezier(0.165,0.84,0.44,1) hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(217,119,6,0.12)] hover:border-[#D97706]/20 group cursor-hover"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <Image 
                        src={item.img || "/assets/laxree_roofing.png"} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-widest text-[#D97706] font-bold rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-[#1E2022]">{item.title}</h3>
                      <p className="text-xs text-[#4A4E51] mt-2 leading-relaxed">{item.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold">{item.spec}</span>
                        <ChevronRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color swatches display */}
              {sec.colors && (
                <div className="mt-12 bg-white border border-[#D97706]/10 p-8 rounded-2xl shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold block mb-4">Stone-Coated Tile Colors</span>
                  <div className="flex flex-wrap gap-2.5">
                    {sec.colors.map((color, i) => (
                      <span key={i} className="px-4 py-2 bg-[#FAF9F5] border border-[#D97706]/5 text-[10px] uppercase tracking-wider font-semibold rounded-full text-[#4A4E51] transition-all hover:border-[#D97706] hover:text-[#D97706]">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

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
              <h4 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">Luxury & Palaces</h4>
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
              <h4 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">International Chains</h4>
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
              <h4 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">Leisure & Eco-Retreats</h4>
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
              <h4 className="font-serif text-base font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-2 mb-3">Commercial Hubs</h4>
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
                <span>Are Synthetic Thatch Tiles fire retardant and safe for resorts?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                Yes, LaxRee Synthetic Thatch Tiles are available in certified <strong>Fire Retardant (FR)</strong> formulations. They are non-combustible, algae-proof, and offer a 10x longer lifespan than natural thatch straw, making them extremely safe and cost-effective for commercial resort roofs, farmhouses, and glamping pods.
              </p>
            </details>

            <details className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(217,119,6,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>How do Asphalt Shingles protect against heavy wind and water leaks?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                LaxRee Asphalt Shingle Tiles feature multi-layered high-grade bitumen reinforced with tough fiberglass. The tiles seal tightly together with a self-adhesive bitumen backing to form a continuous, 100% waterproof shield with top-tier wind uplift and impact resistance.
              </p>
            </details>

            <details className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(217,119,6,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>Do you provide roof estimations and site surveys in Udaipur?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                Yes! As the authorized dealer for LaxRee in Udaipur, Uniq Decor provides professional on-site measurements, architectural CAD estimations, and expert technical guidance for builders, structural contractors, and property owners.
              </p>
            </details>

            <details className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(217,119,6,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>Where can I view physical samples of LaxRee Roofing tiles in Udaipur?</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">
                You can view and inspect physical samples of our roofing tiles, resort thatch shingles, and color options at our showroom located at <strong>2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur, Rajasthan (313001)</strong>.
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

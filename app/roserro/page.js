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
  Feather, 
  Star 
} from "lucide-react";

// Sourcing Nodes
const ROSERRO_PRODUCTS_SHOWCASE = [
  {
    category: "Bed Linen",
    title: "Premium Bed Sheets",
    img: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
    desc: "Premium thread-count sheets in Percale and Sateen weaves, designed for luxurious guest comfort and extreme wash durability.",
    spec: "T-200 to T-500",
    collection: "Hotel Bedding"
  },
  {
    category: "Bed Linen",
    title: "Duvet Inserts & Covers",
    img: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN.webp",
    desc: "All-season microfiber comforters and premium down duvet inserts featuring secure box quilting to prevent filling shifts.",
    spec: "150 - 600 GSM",
    collection: "Hotel Bedding"
  },
  {
    category: "Bed Linen",
    title: "Hotel Bed Pillows",
    img: "/photos/pillow.webp",
    desc: "Hypoallergenic pillows featuring conjugate cluster fibers, microfiber, and down alternative fills tailored for diverse sleepers.",
    spec: "Custom Firmness",
    collection: "Hotel Bedding"
  },
  {
    category: "Bed Linen",
    title: "Mattress Protectors",
    img: "/photos/mattress.webp",
    desc: "Quilted cotton and waterproof Terry surface mattress covers, protectors, and toppers designed to preserve bed hygiene.",
    spec: "Liquid Barrier",
    collection: "Bed Protection"
  },
  {
    category: "Bath Linen",
    title: "Plush Bath Towels",
    img: "/photos/HOMEPAGE IMAGE/BATH AND SPA LINEN ROSERRO.jpg",
    desc: "Super absorbent 100% ring-spun cotton bath sheets, hand towels, and pool wraps woven in everyday and premium GSM weights.",
    spec: "400 - 700+ GSM",
    collection: "Trident Towels"
  },
  {
    category: "Bath Linen",
    title: "Dream Pool Towels",
    img: "/photos/Bath.webp",
    desc: "Vat-dyed striped pool towels and heavy-duty quilted bath mats featuring double-ply long-staple cotton fibers.",
    spec: "Vat-Dyed Stripe",
    collection: "Pool & Spa Mat"
  },
  {
    category: "Bath Linen",
    title: "Luxury Bathrobes",
    img: "/photos/Bathrobe.webp",
    desc: "Absorbent classic waffle-textured robes and traditional Terry cotton velour robes styled in elegant Kimono or Shawl cuts.",
    spec: "Unisex Fit",
    collection: "Spa & Wellness"
  },
  {
    category: "Banquet Linen",
    title: "Banquet Tablecloths",
    img: "/photos/HOMEPAGE IMAGE/BANQUET LINEN ROSERRO.jpg",
    desc: "Spill-resistant spun polyester table covers, seamless overlays, underlays, and pleated event skirting designed for banquets.",
    spec: "Stain Release",
    collection: "Banquet & Events"
  },
  {
    category: "Banquet Linen",
    title: "Spandex Chair Covers",
    img: "/photos/HOMEPAGE IMAGE/RESTAURANT LINEN.webp",
    desc: "Heavyweight stretch spandex chair covers with reinforced elastic foot pockets and optional matching decorative bows.",
    spec: "200 GSM Spandex",
    collection: "Banquet & Events"
  },
  {
    category: "Hospital Linen",
    title: "Antistatic Ward Sheets",
    img: "/photos/HOMEPAGE IMAGE/HOSPITAL FURITURE.webp",
    desc: "Boil-washable flat and fitted clinical bedsheets, cellular honeycomb thermal blankets, and protective anti-static patient gowns.",
    spec: "Boil Washable",
    collection: "Healthcare Linen"
  }
];





// Product Sheets Data
const PRODUCT_SHEETS = {
  bedding: {
    id: "roserro-bedding",
    title: "Luxury Bed Linens",
    tag: "Category 01",
    desc: "Premium thread-count sheets, all-season duvet inserts, customized pillows, and protective mattress layers designed for elite guest sleep.",
    badges: ["T-200 to T-500", "Custom Embroidery"],
    items: [
      {
        title: "Bespoke Bed Sheets",
        img: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN ROSERRO.webp",
        badge: "Percale & Sateen",
        desc: "Crisp Percale (T-200 to T-500) and smooth Sateen (T-300 to T-500) sheets. Woven in 100% combed cotton or durable poly-cotton blends.",
        spec: "T-200 to T-500 Thread Count"
      },
      {
        title: "Luxury Duvet Inserts & Covers",
        img: "/photos/HOMEPAGE IMAGE/LUXURY BED LINEN.webp",
        badge: "All-Season Weight",
        desc: "All-season microfiber inserts (150-600 GSM) and natural down-feather duvets. Box-stitch quilting ensures even fill distribution.",
        spec: "Microfiber / Down Fill"
      },
      {
        title: "Hotel Standard Pillows",
        img: "/photos/pillow.webp",
        badge: "Custom Sleepers",
        desc: "Tailored comfort styles (Microfiber, Conjugate Cluster Fibers, Down Alternative, and Down Feather) built for back, side, or stomach sleep.",
        spec: "Custom Firmness Options"
      },
      {
        title: "Mattress & Pillow Protectors",
        img: "/photos/mattress.webp",
        badge: "Sanitary Barrier",
        desc: "Cotton quilted protectors (150 GSM), waterproof breathable Terry surface protectors, and premium microfiber toppers.",
        spec: "2\"-3\" Mattress Toppers"
      }
    ]
  },
  bath: {
    id: "roserro-bath",
    title: "Spa Bath Linens",
    tag: "Category 02",
    desc: "Plush ring-spun cotton towels, signature bath mats, pool wraps, and custom-collared robes woven for premium guest experiences.",
    badges: ["400 to 700+ GSM", "Plush Ring-Spun"],
    items: [
      {
        title: "Essential & Premium Towels",
        img: "/photos/HOMEPAGE IMAGE/BATH AND SPA LINEN ROSERRO.jpg",
        badge: "Essential",
        desc: "Plush 100% ring-spun cotton towels ranging from Everyday Essential (400-500 GSM) to high-density commercial Premium (500-600 GSM).",
        spec: "Double-Ply Pile"
      },
      {
        title: "Luxury & Indulgence Bath Sheets",
        img: "/photos/Towel_new_17062025.webp",
        badge: "Ultra Plush",
        desc: "Heavy-density Turkish-style long-staple cotton bath sheets. Available in Luxury (600-700 GSM) and Indulgence (700+ GSM) collections.",
        spec: "600 to 700+ GSM"
      },
      {
        title: "Signature Bath Mats & Pool Towels",
        img: "/photos/Bath.webp",
        badge: "Reversible",
        desc: "Quilted reversible cotton mats (20\" x 30\") and Plunge pool towels (36\" x 72\") featuring vat-dyed anti-fade stripes.",
        spec: "Vat-Dyed Stripe"
      },
      {
        title: "Premium Hotel Bathrobes",
        img: "/photos/Bathrobe.webp",
        badge: "Waffle / Terry",
        desc: "Classic Waffle textured robes (with elegant velour trims) and Traditional Terry cotton velour robes in Shawl or Kimono collar cuts.",
        spec: "Shawl or Kimono Cut"
      }
    ]
  },
  banquet: {
    id: "roserro-banquet",
    title: "Elegant Banquet Linens",
    tag: "Category 03",
    desc: "Seamless tablecloths, pleated skirting, stretch spandex chair covers, and mercerized satin napkins for elite wedding and event tables.",
    badges: ["Event Grade", "Spill Resistant"],
    items: [
      {
        title: "Tablecloths & Underlays",
        img: "/photos/HOMEPAGE IMAGE/BANQUET LINEN ROSERRO.jpg",
        badge: "Spun Polyester",
        desc: "Seamless table covers and heavy-duty underlays/overlays made of premium spill-resistant spun polyester. Designed for quick turnarounds.",
        spec: "Spill & Stain Release"
      },
      {
        title: "Table Runners & Skirting",
        img: "/photos/HOMEPAGE IMAGE/BANQUET AND EVENT LINEN.webp",
        badge: "High Lustre",
        desc: "High-sheen satin table runners paired with classic pleated event table skirting and decorative frills for stage setups.",
        spec: "Satin / Pleated Spec"
      },
      {
        title: "Stretch Spandex Chair Covers",
        img: "/photos/HOMEPAGE IMAGE/RESTAURANT LINEN.webp",
        badge: "200 GSM Spandex",
        desc: "Heavyweight stretch spandex event chair covers featuring reinforced elastic leg pockets. Available with custom decorative bows.",
        spec: "Reinforced Foot Pockets"
      },
      {
        title: "Table Napkins & Place Mats",
        img: "/photos/DDECOR/THROWS.webp",
        badge: "Mercerized",
        desc: "Snag-resistant mercerized poly-cotton dinner napkins and elegant jacquard woven heat-resistant table place mats.",
        spec: "Snag-Resistant Finish"
      }
    ]
  },
  healthcare: {
    id: "roserro-healthcare",
    title: "Healthcare Linens",
    tag: "Category 04",
    desc: "Hospital-grade bedsheets, pillows, pillow covers, and cellular thermal blankets engineered for clinical durability and sanitation.",
    badges: ["Sanitized Spec", "Boil Washable"],
    items: [
      {
        title: "Bedsheets",
        img: "/photos/ROSERRO/roserro-healthcare-bedsheet.webp",
        badge: "Boil Washable",
        desc: "Flat and fitted medical ward sheets built to endure high-temperature sanitizing wash cycles. Highly resistant to chlorine bleach and shrinking.",
        spec: "Pre-Shrunk Cotton/Poly"
      },
      {
        title: "Pillow",
        img: "/photos/ROSERRO/roserro-healthcare-pillow.webp",
        badge: "Clinical Spec",
        desc: "Hypoallergenic pillows featuring firm-support cluster fills. Available with fluid-resistant and wipe-clean hospital-grade encasements.",
        spec: "Hypoallergenic Fill"
      },
      {
        title: "Pillow Cover",
        img: "/photos/ROSERRO/roserro-healthcare-pillow-cover.webp",
        badge: "Envelope Style",
        desc: "Antimicrobial and soil-resistant pillow covers featuring secure overlap envelope flaps, designed for heavy institutional laundry runs.",
        spec: "Antimicrobial Shield"
      },
      {
        title: "Blanket",
        img: "/photos/ROSERRO/roserro-healthcare-blanket.webp",
        badge: "Honeycomb",
        desc: "Breathable pure cotton thermal blankets woven with a honeycomb cellular structure to trap body warmth efficiently in patient rooms.",
        spec: "100% Cotton Cellular"
      }
    ]
  }
};

export default function RoserroPage() {
  const [activeTab, setActiveTab] = useState("roserro-bedding");

  const containerRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timelines
    const heroTl = gsap.timeline();
    heroTl.fromTo("#roserro-hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .fromTo("#roserro-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .fromTo("#roserro-hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .fromTo("#roserro-hero-scroll-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

    // Parallax background
    gsap.to("#roserro-hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Infinite Marquee animation
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
    const sections = ["roserro-bedding", "roserro-bath", "roserro-banquet", "roserro-healthcare"];
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

    // Origins loop card anim setup
    gsap.from("#roserro-origins .max-w-2xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#roserro-origins",
        start: "top 80%",
        once: true
      }
    });

    // Flagship reveal
    gsap.from("#roserro-specs-guide .max-w-2xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#roserro-specs-guide",
        start: "top 80%",
        once: true
      }
    });

    // FAQ reveal
    gsap.from("#roserro-faq .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#roserro-faq",
        start: "top 80%",
        once: true
      }
    });

    // Consultation section reveal
    gsap.from("#roserro-consultation .max-w-4xl", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#roserro-consultation",
        start: "top 80%",
        once: true
      }
    });
  }, { scope: containerRef });



  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Roserro Luxury Bed Linens Udaipur - Uniq Decor and Furniture",
    "description": "Premium Roserro hotel linens and spa sheets supplier in Udaipur. Authorized showroom at Gokul Tower, Hiran Magri.",
    "image": [
      "https://uniqdecorfurniture.in/wp-content/uploads/2024/01/roserro-bed-linen.jpg"
    ],
    "url": "https://uniqdecorfurniture.in/roserro",
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
        "name": "What makes Roserro linens suitable for luxury hotels and resorts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Roserro linens are woven with high-thread-count (T-200 to T-500) combed cotton and certified long-staple ring-spun fibers. This structure ensures maximum softness and breathability while maintaining excellent tensile strength to withstand hundreds of commercial laundry cycles."
        }
      },
      {
        "@type": "Question",
        "name": "What customization and branding options does Roserro offer for B2B orders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer computerized custom embroidery and monogramming services. Hoteliers can customize their coordinates with Single, Double, or Triple Line borders, textured cable cords, and digitized hotel brand logos stitched onto flat sheets, bath sheets, and bathrobes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I select the right towel GSM weight for my spa or pool rooms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 400-500 GSM lightweight towels for B2B procurement for gymnasiums, pool decks, and spas. For guest suites and luxury hotel rooms, our Premium (500-600 GSM) or Luxury (600-700 GSM) double-ply towels provide optimal loft, absorption, and a plush weight."
        }
      },
      {
        "@type": "Question",
        "name": "Are Roserro healthcare linens safe for high-temperature commercial sanitization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Roserro hospital and clinic linens, including our ward bedsheets, pillow covers, and honeycomb blankets, are pre-shrunk and engineered to tolerate commercial boil-washing cycles and steam autoclave sterilization without losing structural integrity."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum order quantity (MOQ) for custom-monogrammed hotel supplies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For standard white linens from our catalog, we support low MOQs. For bespoke designs, customized embroidery borders, or custom-dyed logo monograms, our factory MOQ starts at 100 sets per item size."
        }
      }
    ]
  };

  return (
    <div ref={containerRef} className="theme-roserro bg-[#FAF9F6] text-[#0F1E19] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .roserro-category-tab.active {
          color: #D4AF37 !important;
          border-bottom-color: #D4AF37 !important;
          font-weight: 700;
        }

        .roserro-origins-section {
          background-color: #F5F1EA;
          border-top: 1px solid rgba(28, 63, 48, 0.06);
          overflow: hidden;
        }
        .origins-carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
        }
        .origins-carousel-container::before,
        .origins-carousel-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 10;
          pointer-events: none;
        }
        .origins-carousel-container::before {
          left: 0;
          background: linear-gradient(to right, #F5F1EA 10%, transparent 100%);
        }
        .origins-carousel-container::after {
          right: 0;
          background: linear-gradient(to left, #F5F1EA 10%, transparent 100%);
        }
        .origins-carousel-track {
          display: flex;
          gap: 24px;
          width: max-content;
        }
        .origins-carousel-track:hover {
          animation-play-state: paused;
        }
        .roserro-origin-card-v2 {
          width: 320px;
          background: #FFFFFF;
          border: 1px solid rgba(28, 63, 48, 0.06);
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(11, 79, 74, 0.02);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .roserro-origin-card-v2:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 35px rgba(11, 79, 74, 0.06);
          border-color: rgba(180, 90, 60, 0.2);
        }
        .roserro-showcase-v2 {
          background-color: #F5F1EA;
          border-top: 1px solid rgba(28, 63, 48, 0.06);
        }
        .showcase-preview-box {
          background: #FFFFFF;
          border: 1px solid rgba(28, 63, 48, 0.08);
          border-radius: 24px;
          box-shadow: 0 12px 40px rgba(11, 79, 74, 0.03);
          overflow: hidden;
        }
        .spec-table-row {
          border-bottom: 1px solid rgba(28, 63, 48, 0.06);
          padding: 12px 0;
        }
        .spec-table-row:last-child {
          border-bottom: none;
        }
        .swatch-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 2px solid transparent;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
        }
        .swatch-btn:hover {
          transform: scale(1.15);
        }
        .swatch-btn.active {
          border-color: #B45A3C;
          transform: scale(1.15);
          box-shadow: 0 0 10px rgba(180, 90, 60, 0.3);
        }
        .swatch-btn.active::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1px solid #B45A3C;
          border-radius: 50%;
        }
        .roserro-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .roserro-marquee-track {
          display: flex;
          gap: 4rem;
          width: max-content;
        }
        .animate-origins-scroll {
          animation: scrollOriginsMarquee 50s linear infinite;
        }
        .animate-origins-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes scrollOriginsMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-3440px, 0, 0); }
        }
        @media (max-width: 768px) {
          .animate-origins-scroll {
            animation-duration: 35s;
          }
        }
      `}} />

      {/* HERO COVER */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F1E19] pt-20">
        <div id="roserro-hero-bg" className="absolute inset-0 w-full h-full scale-110 opacity-30 bg-cover bg-center" style={{ backgroundImage: "url('/photos/ROSERRO/hero-roserro.webp')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E19]/60 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span id="roserro-hero-tag" className="inline-block text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Premium Hotel Linens & Teak Beds</span>
          <h1 id="roserro-hero-title" className="font-serif text-5xl md:text-8xl text-white font-bold tracking-tight leading-none mb-6">
            ROSERRO <br/><span className="text-[#E9EFEA] font-normal italic font-serif">Hospitality</span>
          </h1>
          <p id="roserro-hero-desc" className="text-[#FAF9F6]/90 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Furnish your boutique resorts and luxury hotel suites with premium 300+ TC bed sheets, high-density spa bathrobes, drapes, and bespoke carved solid teakwood structural furniture.
          </p>
          <div id="roserro-hero-scroll-btn" className="mt-12">
            <a href="#roserro-portfolio-nav" className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FAF9F6]/80 hover:text-white transition-colors cursor-hover">
              <span>Explore Portfolio</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </header>

      {/* QUALITY SHOWCASE */}
      <section className="py-20 px-6 md:px-12 bg-white" id="roserro-showcase">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1C3F30]">Premium Quality Standards</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#0F1E19]">Crafted for Elite Spaces</h2>
            <p className="text-[#354F44] text-xs md:text-sm mt-3">From high-thread-count cotton weaves to certified flax and bamboo fibers, Roserro stands for durability, sustainability, and unparalleled sensory comfort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F4F6F4]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#1C3F30]/5 text-[#1C3F30] rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#1C3F30]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F1E19] mb-3">Hotel-Grade Cotton</h3>
                <p className="text-[#354F44] text-xs leading-relaxed">Woven with premium Egyptian long-staple combed cotton threads to withstand hundreds of commercial laundry cycles while maintaining luxurious softness.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mt-4">300+ Thread Count</span>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F4F6F4]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#1C3F30]/5 text-[#1C3F30] rounded-xl flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6 text-[#1C3F30]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F1E19] mb-3">French Flax & Bamboo</h3>
                <p className="text-[#354F44] text-xs leading-relaxed">European Flax certified and spun in France, alongside closed-loop processed bamboo-viscose. Heavy, fluid fibers designed to breathe during warm nights.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mt-4">European Flax & Bamboo</span>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#F4F6F4]/50 p-8 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#1C3F30]/5 text-[#1C3F30] rounded-xl flex items-center justify-center mb-6">
                  <Feather className="w-6 h-6 text-[#1C3F30]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F1E19] mb-3">Spa Combed Weaves</h3>
                <p className="text-[#354F44] text-xs leading-relaxed">High-density 600 GSM bath sheets and combed cotton drapes designed to lock moisture and feel gentle on skin in hotel spas and luxury bathrooms.</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mt-4">600 GSM Combed Weaves</span>
            </div>
          </div>
        </div>
      </section>

      {/* FIBER ORIGINS LOOP */}
      <section id="roserro-origins" className="roserro-origins-section py-20 scroll-mt-36">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B45A3C]">Complete B2B Linen Showcase</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#0B4F4A]">Premium Hotel & Hospital Linens</h2>
              <p className="text-[#3A3631] text-xs md:text-sm mt-3 leading-relaxed">
                Explore Roserro's comprehensive hospitality and clinical collection. Woven to withstand high-temperature institutional laundering while delivering exceptional comfort. Hover over the cards to pause and inspect.
              </p>
            </div>
          </div>
        </div>

        <div className="origins-carousel-container">
          <div className="origins-carousel-track animate-origins-scroll">
            {/* Set 1 */}
            {ROSERRO_PRODUCTS_SHOWCASE.map((node, idx) => (
              <div key={idx} className="roserro-origin-card-v2">
                <div className="h-48 overflow-hidden relative">
                  <Image src={node.img} alt={node.title} fill className="object-cover" />
                  <span className="absolute top-4 left-4 bg-white/95 px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#0B4F4A] font-bold rounded-full shadow-sm">
                    {node.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-[#0B4F4A]">{node.title}</h3>
                  <p className="text-[11px] text-[#3A3631] mt-2 leading-relaxed">{node.desc}</p>
                  <div className="mt-4 pt-4 border-t border-[#0B4F4A]/5 text-[10px] text-[#6E6860] space-y-1">
                    <div className="flex justify-between"><span>Specification:</span> <strong className="text-[#0B4F4A]">{node.spec}</strong></div>
                    <div className="flex justify-between"><span>Collection:</span> <strong className="text-[#B45A3C]">{node.collection}</strong></div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate Set for Infinite Loop */}
            {ROSERRO_PRODUCTS_SHOWCASE.map((node, idx) => (
              <div key={`clone-${idx}`} className="roserro-origin-card-v2" aria-hidden="true">
                <div className="h-48 overflow-hidden relative">
                  <Image src={node.img} alt={node.title} fill className="object-cover" />
                  <span className="absolute top-4 left-4 bg-white/95 px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#0B4F4A] font-bold rounded-full shadow-sm">
                    {node.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-[#0B4F4A]">{node.title}</h3>
                  <p className="text-[11px] text-[#3A3631] mt-2 leading-relaxed">{node.desc}</p>
                  <div className="mt-4 pt-4 border-t border-[#0B4F4A]/5 text-[10px] text-[#6E6860] space-y-1">
                    <div className="flex justify-between"><span>Specification:</span> <strong className="text-[#0B4F4A]">{node.spec}</strong></div>
                    <div className="flex justify-between"><span>Collection:</span> <strong className="text-[#B45A3C]">{node.collection}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY CATEGORIES NAV */}
      <div id="roserro-portfolio-nav" className="sticky top-[73px] z-40 bg-[#E9EFEA]/90 backdrop-blur-md border-b border-[#1C3F30]/10 py-4 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 flex justify-start md:justify-center items-center overflow-x-auto gap-8 scroll-none">
          {Object.entries(PRODUCT_SHEETS).map(([key, sec]) => (
            <a
              key={key}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveTab(sec.id);
              }}
              className={`roserro-category-tab flex-shrink-0 text-xs uppercase tracking-widest pb-1 border-b-2 border-transparent font-semibold transition-colors cursor-hover ${
                activeTab === sec.id 
                  ? "active border-b-2" 
                  : "text-[#354F44] hover:text-[#D4AF37]"
              }`}
            >
              {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* PRODUCT LISTS */}
      <div className="py-10">
        {Object.entries(PRODUCT_SHEETS).map(([key, sec]) => (
          <section key={key} id={sec.id} className="scroll-mt-36 py-16 border-b border-[#1C3F30]/10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B45A3C] font-bold">{sec.tag}</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F1E19] mt-1">{sec.title}</h2>
                  <p className="text-[#354F44] text-xs md:text-sm mt-2 max-w-xl">{sec.desc}</p>
                </div>
                <div className="flex gap-2">
                  {sec.badges.map((b, i) => (
                    <span key={i} className="px-3 py-1 bg-[#0B4F4A]/5 text-[#0B4F4A] border border-[#0B4F4A]/10 rounded-full text-[10px] uppercase font-bold">{b}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sec.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#283f30]/8 rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(28,63,48,0.04)] transition-all duration-400 cubic-bezier(0.165,0.84,0.44,1) hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(28,63,48,0.12)] hover:border-[#283f30]/20 group cursor-hover"
                  >
                    <div className="aspect-square w-full overflow-hidden relative bg-stone-100">
                      <Image 
                        src={item.img} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-widest text-[#0B4F4A] font-bold rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-[#0F1E19]">{item.title}</h3>
                      <p className="text-xs text-[#354F44] mt-2 leading-relaxed">{item.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#B45A3C] font-bold">{item.spec}</span>
                        <ChevronRight className="w-4 h-4 text-[#0B4F4A] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* SECTION 1: CUSTOM EMBROIDERY & HOTEL BRANDING SHOWCASE */}
      <section id="roserro-branding-showcase" className="py-20 px-6 md:px-12 bg-white border-b border-[#1C3F30]/10 scroll-mt-36">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Embroidery Details */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B45A3C] block mb-2">Custom Brand Personalization</span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0B4F4A] leading-tight">
                  Amplify Your Brand <br/>with Custom Design
                </h2>
                <p className="text-[#3A3631] text-xs md:text-sm mt-4 leading-relaxed">
                  Enhance your property’s branding effortlessly by incorporating your custom logos, typography, or signature border cords onto lounge chair covers, pool towels, bathrobes, and bedsheets. We offer computerized precision monogramming tailored to international B2B hospitality standards.
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#3A3631]">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#0B4F4A]/5 flex items-center justify-center text-[#0B4F4A] font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-bold text-[#0B4F4A] text-sm">Single, Double & Triple Line Borders</h4>
                    <p className="text-[#6E6860] mt-1">Classic hotel border configurations. Parallel colored thread cords are stitched directly on duvet covers and pillow flanges for immediate elegance.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#0B4F4A]/5 flex items-center justify-center text-[#0B4F4A] font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-bold text-[#0B4F4A] text-sm">Textured Cable & Dotted Stitching</h4>
                    <p className="text-[#6E6860] mt-1">Artisanal stitching patterns that add premium surface depth and design details to flat sheet coordinates and spa bed covers.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#0B4F4A]/5 flex items-center justify-center text-[#0B4F4A] font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-bold text-[#0B4F4A] text-sm">Precision Logo Monogramming</h4>
                    <p className="text-[#6E6860] mt-1">High-density embroidery for towels, bathrobes, slippers, and laundry bags. Resists fading and thread pull under high-turnover wash cycles.</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[10px] text-[#A3704C] uppercase tracking-widest font-extrabold flex gap-4 items-center">
                <span className="px-3 py-1.5 bg-[#A3704C]/5 border border-[#A3704C]/10 rounded-full">Minimum Order: 100 Sets</span>
                <span className="px-3 py-1.5 bg-[#0B4F4A]/5 border border-[#0B4F4A]/10 rounded-full text-[#0B4F4A]">Factory Monogrammed</span>
              </div>
            </div>

            {/* Right: Preview Image Frame */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#1C3F30]/10 shadow-lg bg-stone-50">
              <Image 
                src="/photos/fabric_1.webp" 
                alt="Roserro Custom Embroidery Mockup" 
                fill 
                className="object-cover"
              />
              <div className="absolute top-6 right-6 bg-[#0F1E19]/90 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-white text-[9px] uppercase tracking-widest font-bold shadow-md">
                Custom Border Spec
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNICAL SPECIFICATIONS & FABRIC GUIDE */}
      <section id="roserro-specs-guide" className="roserro-showcase-v2 py-20 px-6 md:px-12 scroll-mt-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B45A3C]">B2B Procurement Guide</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#0B4F4A]">Hospitality Fabric Standards</h2>
            <p className="text-[#3A3631] text-xs md:text-sm mt-3">A technical guide to help hotel purchase managers select the optimal thread count, weave, and towel GSM weight.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Sheeting Guide */}
            <div className="bg-white border border-[#283f30]/8 rounded-2xl p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#0B4F4A] mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Bed Sheeting Guide</span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#B45A3C] font-bold bg-[#B45A3C]/5 px-2 py-1 rounded">T-200 to T-500</span>
              </h3>
              
              <div className="space-y-6 text-xs text-[#3A3631]">
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Percale Weave Sheets</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Crisp, cool hand feel with a tightly woven plain weave. Offers high breathability, making it ideal for warmer resort properties, summer seasons, and high-frequency hotel laundering runs.</p>
                </div>
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Sateen Weave Sheets</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Silky-smooth texture with a high-luster satin drape. Retains warmth better, offering premium luxury feel for centrally air-conditioned heritage suites and luxury villas.</p>
                </div>
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Satin Stripe (1-Inch)</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Tone-on-tone stripes (available in T-210 to T-400). Standard B2B supply for international business hotel chains, combining executive aesthetics with high tensile strength.</p>
                </div>
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Jacquard Checks</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Tone-on-tone geometric checks woven directly into the fabric. Known for superior crease-resistance, minimal shrinkage, and long life under institutional care.</p>
                </div>
              </div>
            </div>

            {/* Right: Toweling Guide */}
            <div className="bg-white border border-[#283f30]/8 rounded-2xl p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#0B4F4A] mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Bath & Towel GSM Guide</span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#B45A3C] font-bold bg-[#B45A3C]/5 px-2 py-1 rounded">400 to 700+ GSM</span>
              </h3>

              <div className="space-y-6 text-xs text-[#3A3631]">
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Everyday Essential (400 - 500 GSM)</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Lightweight towels designed for quick drying and rapid turnover. Standard for hotel gymnasiums, poolsides, beach clubs, and standard guest bathrooms.</p>
                </div>
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Premium & Luxury (500 - 700 GSM)</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Woven with high-density double-ply twisted cotton loops. Extremely plush and highly absorbent. The premium standard for five-star suites and wellness properties.</p>
                </div>
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Indulgence Bath Sheets (700+ GSM)</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Ultra-heavy, spa-grade bath sheets. Delivers maximum sensory loft and luxury warmth, absorbing moisture instantly. Tailored for top-tier heritage resorts and spa rooms.</p>
                </div>
                <div>
                  <strong className="block text-sm text-[#0F1E19]">Waffle Honeycomb vs Terry Velour Robes</strong>
                  <p className="text-[#6E6860] mt-1 leading-relaxed">Honeycomb waffle robes are lightweight and breathable, ideal for humid/summer spa lounges. Traditional Terry robes are heavy, plush, and double-needle stitched for maximum post-bath drying comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* REVIEWS & MARQUEE */}
      <section className="py-20 bg-white" id="roserro-reviews">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1C3F30]">Hospitality Reviews</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#0F1E19]">Trusted by Luxury Hotels</h2>
            <p className="text-[#354F44] text-xs md:text-sm mt-3">Read how high-end resorts and heritage boutique properties in Udaipur and beyond rely on Roserro for quality linen supplies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-[#1C3F30]/10 rounded-2xl p-8 bg-[#F4F6F4]/30 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#D4AF37] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#0F1E19] leading-relaxed">
                  "We ordered standard satin drapes and duvet sets for our luxury lakeview property in Udaipur. The sheets feel extremely soft, and even after 150 commercial wash cycles, they maintain their structural luster. Our guests frequently appreciate the comfort."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#0F1E19]">Executive Housekeeper</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#354F44]">Premium Lake Palace Resort</span>
              </div>
            </div>

            <div className="border border-[#1C3F30]/10 rounded-2xl p-8 bg-[#F4F6F4]/30 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex text-[#D4AF37] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm italic text-[#0F1E19] leading-relaxed">
                  "Roserro's exclusive Trident Bath Linen collection has significantly elevated our spa experience. Their 600 GSM double-ply long-staple cotton bathsheets and custom waffle bathrobes maintain exceptional loft and absorbency wash after wash."
                </p>
              </div>
              <div className="mt-6">
                <strong className="block text-xs text-[#0F1E19]">Spa Director</strong>
                <span className="text-[10px] uppercase tracking-widest text-[#354F44]">Aravalli Wellness & Spa Retreat</span>
              </div>
            </div>
          </div>

          <div className="roserro-marquee-wrapper border-t border-b border-[#1C3F30]/10 py-6">
            <div ref={marqueeTrackRef} className="roserro-marquee-track">
              {[
                "THE RADISSON UDAIPUR",
                "LAKEVIEW LUXURY BOUTIQUE",
                "THE PALMS RESORT",
                "ATELIER HEALER SPA",
                "SURYAM ROYAL RESIDENCES",
                "TRIDENT SUITES INDIA"
              ].map((h, i) => (
                <span key={i} className="text-xs uppercase tracking-[0.2em] font-bold text-[#354F44]/50 font-sans">{h}</span>
              ))}
              {/* Clones */}
              {[
                "THE RADISSON UDAIPUR",
                "LAKEVIEW LUXURY BOUTIQUE",
                "THE PALMS RESORT",
                "ATELIER HEALER SPA",
                "SURYAM ROYAL RESIDENCES",
                "TRIDENT SUITES INDIA"
              ].map((h, i) => (
                <span key={`clone-${i}`} className="text-xs uppercase tracking-[0.2em] font-bold text-[#354F44]/50 font-sans">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F6] border-t border-[#1C3F30]/10" id="roserro-faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B45A3C]">Got Questions?</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#0B4F4A]">Frequently Asked Questions</h2>
            <p className="text-[#3A3631] text-xs md:text-sm mt-3">Common inquiries from hotel owners, purchase managers, and clinical administrators regarding Roserro linens.</p>
          </div>

          <div className="flex flex-col gap-5">
            <details className="group border border-[#1C3F30]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]" open>
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#0F1E19] cursor-pointer list-none select-none">
                <span>What makes Roserro linens suitable for luxury hotels and resorts?</span>
                <span className="text-[#B45A3C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#354F44] leading-relaxed mt-3 pl-1">
                Roserro linens are woven with high-thread-count (T-200 to T-500) combed cotton and certified long-staple ring-spun fibers. This structure ensures maximum softness and breathability while maintaining excellent tensile strength to withstand hundreds of commercial laundry cycles.
              </p>
            </details>

            <details className="group border border-[#1C3F30]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#0F1E19] cursor-pointer list-none select-none">
                <span>What customization and branding options does Roserro offer for B2B orders?</span>
                <span className="text-[#B45A3C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#354F44] leading-relaxed mt-3 pl-1">
                We offer computerized custom embroidery and monogramming services. Hoteliers can customize their coordinates with Single, Double, or Triple Line borders, textured cable cords, and digitized hotel brand logos stitched onto flat sheets, bath sheets, and bathrobes.
              </p>
            </details>

            <details className="group border border-[#1C3F30]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#0F1E19] cursor-pointer list-none select-none">
                <span>How do I select the right towel GSM weight for my spa or pool rooms?</span>
                <span className="text-[#B45A3C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#354F44] leading-relaxed mt-3 pl-1">
                We recommend 400-500 GSM lightweight towels for B2B procurement for gymnasiums, pool decks, and spas. For guest suites and luxury hotel rooms, our Premium (500-600 GSM) or Luxury (600-700 GSM) double-ply towels provide optimal loft, absorption, and a plush weight.
              </p>
            </details>

            <details className="group border border-[#1C3F30]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#0F1E19] cursor-pointer list-none select-none">
                <span>Are Roserro healthcare linens safe for high-temperature commercial sanitization?</span>
                <span className="text-[#B45A3C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#354F44] leading-relaxed mt-3 pl-1">
                Yes. Roserro hospital and clinic linens, including our ward bedsheets, pillow covers, and honeycomb blankets, are pre-shrunk and engineered to tolerate commercial boil-washing cycles and steam autoclave sterilization without losing structural integrity.
              </p>
            </details>

            <details className="group border border-[#1C3F30]/15 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(28,63,48,0.02)]">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#0F1E19] cursor-pointer list-none select-none">
                <span>What is the minimum order quantity (MOQ) for custom-monogrammed hotel supplies?</span>
                <span className="text-[#B45A3C] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#354F44] leading-relaxed mt-3 pl-1">
                For standard white linens from our catalog, we support low MOQs. For bespoke designs, customized embroidery borders, or custom-dyed logo monograms, our factory MOQ starts at 100 sets per item size.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* PREMIUM BULK CONSULTATION */}
      <section className="bg-[#1C3F30] text-white py-20 px-6 md:px-12 relative overflow-hidden border-t-4 border-[#D4AF37]" id="roserro-consultation">
        <div className="absolute inset-0 roserro-premium-radial-bg pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col gap-6 items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Premium In-store Consultations</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">Experience Roserro Textures in Person</h2>
          <p className="text-white/80 max-w-2xl text-xs md:text-base leading-relaxed">
            Feel the difference between 300 TC and 600 TC Egyptian cotton weaves or explore solid teakwood sample swatches. Visit our luxury showroom in Udaipur to consult on hospitality layouts, ddecor matching, and contract pricing.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a 
              href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20%F0%9F%91%8B%20I'm%20setting%20up%20a%20hotel%2Fhospitality%20property%20or%20luxury%20villa%20and%20interested%20in%20Roserro%20luxury%20linens%20and%20bespoke%20furniture.%20Please%20share%20bulk%20estimates." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg hover:scale-[1.03] cursor-hover"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Book Consultation on WhatsApp
            </a>
            <Link 
              href="/#showroom" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white hover:bg-white hover:text-[#1C3F30] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 cursor-hover font-sans"
            >
              View Showroom Address
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";

// Gallery items
const GALLERY_ITEMS = [
  { cat: "curtains", title: "Imperial Silk Curtain", desc: "Lustrous gold silk curtains paired with delicate transparent sheers.", img: "/assets/ddecor/curtains.png" },
  { cat: "ready-made-curtains", title: "Botanical Eyelet Curtain", desc: "Pre-stitched floral printed canvas panel with metal ring grommets.", img: "/photos/DDECOR/LINEN DRAPES,CURTAINS.webp" },
  { cat: "upholstery", title: "Tuscan Chenille Sofa", desc: "Heavy-duty textured chenille fabric in warm earthy tones.", img: "/assets/ddecor/upholstery.png" },
  { cat: "bedding", title: "Egyptian Cotton Bedset", desc: "500 Thread Count sateen bedsheets with refined Oxford borders.", img: "/assets/ddecor/bedsheets.png" },
  { cat: "kids-bedding", title: "Safari Animal Bedset", desc: "Combed cotton kids sheets printed with non-toxic jungle characters.", img: "/photos/bed.webp" },
  { cat: "cushions", title: "Velvet Emerald Cushions", desc: "Plush decorative cushion covers featuring rich gold embroidery.", img: "/assets/ddecor/cushions.png" },
  { cat: "bath-linens", title: "Brio Bath Towels", desc: "600 GSM combed cotton towels in vibrant anti-microbial shades.", img: "/assets/ddecor/bath.png" },
  { cat: "curtains", title: "Oatmeal Linen Drapes", desc: "Natural textured linen drapes providing smooth light filtration.", img: "/assets/ddecor/curtains_2.png" },
  { cat: "upholstery", title: "Sage Damask Sofa Weave", desc: "Sophisticated jacquard weave tailored for accent armchairs.", img: "/assets/ddecor/upholstery_2.png" },
  { cat: "blinds", title: "Dual Zebra Shades", desc: "Alternating sheer and solid stripes that slide past each other.", img: "/photos/DDECOR/LINEN DRAPES,CURTAINS.webp" },
  { cat: "rugs", title: "Wool Medallion Rug", desc: "Classic floral medallion pattern hand-carved in premium organic wool.", img: "/photos/DDECOR/THROWS.webp" },
  { cat: "gifting", title: "Royal Bedset Gift Box", desc: "Premium coordinates bedding sets folded inside a polished wood box.", img: "/photos/DDECOR/EMBRALED CUSHION.webp" }
];

// Product Sliders Data
const CURTAINS_SLIDES = [
  { img: "/assets/ddecor/curtains.png", title: "Sheer Linen & Silk Blend Curtains" },
  { img: "/assets/ddecor/curtains_2.png", title: "Velvet Blackout Curtains" },
  { img: "/assets/ddecor/curtains_3.png", title: "Embroidered Geometric Sheers" }
];

const UPHOLSTERY_SLIDES = [
  { img: "/assets/ddecor/upholstery.png", title: "Tuscan Chenille Sofa Fabric" },
  { img: "/assets/ddecor/upholstery_2.png", title: "Plain Linens & Textured Weaves" },
  { img: "/assets/ddecor/upholstery_3.png", title: "Velvet Textured Weaves" }
];

const BEDDING_SLIDES = [
  { img: "/assets/ddecor/bedsheets.png", title: "Egyptian Cotton Bedset" },
  { img: "/assets/ddecor/bedsheets_2.png", title: "Bridal Satin Comforter" },
  { img: "/assets/ddecor/bedsheets_3.png", title: "Geometric Duvet Weave" }
];

const BATH_SLIDES = [
  { img: "/assets/ddecor/bath.png", title: "Turkish Spa Towels" },
  { img: "/assets/ddecor/bath_2.png", title: "Bamboo Combed Bathmat" },
  { img: "/assets/ddecor/bath_3.png", title: "Organic Waffle Bathrobes" }
];



// Reusable Slider Component
function CollectionSlider({ slides, title, desc, tag, stepNum, features, slug }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const trackRef = useRef(null);

  const handlePrev = () => {
    setSlideIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        xPercent: -100 * slideIdx,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [slideIdx]);

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 md:px-12 border-b border-[#8B4513]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Detail */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8B4513]">{tag}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-[#2D2A26]">{title}</h2>
          <p className="text-[#6B6560] leading-relaxed text-sm md:text-base">{desc}</p>
          
          <ul className="flex flex-col gap-3 border-t border-[#8B4513]/10 pt-6">
            {features.map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-[#6B6560]">
                <Check className="w-4 h-4 text-[#B8860B]" /> {feat}
              </li>
            ))}
          </ul>

          {slug && (
            <div className="pt-2">
              <Link 
                href={`/ddecor/${slug}`} 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B8860B] hover:text-[#8B4513] transition-colors cursor-hover border-b border-transparent hover:border-[#8B4513]"
              >
                Explore {title.split(" & ")[0]} Store &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[4/3] group shadow-xl order-1 lg:order-2 bg-[#2D2A26]">
          <div className="absolute inset-0 bg-[#2D2A26]/10 z-10 pointer-events-none"></div>
          
          <div ref={trackRef} className="flex w-full h-full will-change-transform">
            {slides.map((slide, idx) => (
              <div key={idx} className="flex-shrink-0 w-full h-full relative">
                <Image src={slide.img} alt={slide.title} fill className="object-cover" />
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md py-3 px-5 rounded-lg border border-[#8B4513]/10 shadow-lg">
                  <span className="font-serif italic text-sm text-[#8B4513]">"{slide.title}"</span>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 left-4 w-11 h-11 rounded-full bg-white/85 backdrop-blur-sm border border-[#8B4513]/15 text-[#8B4513] flex items-center justify-center shadow-lg hover:bg-white transition-all z-30 cursor-hover opacity-0 group-hover:opacity-100" aria-label="Prev">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-4 w-11 h-11 rounded-full bg-white/85 backdrop-blur-sm border border-[#8B4513]/15 text-[#8B4513] flex items-center justify-center shadow-lg hover:bg-white transition-all z-30 cursor-hover opacity-0 group-hover:opacity-100" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 right-6 z-20 bg-black/25 backdrop-blur-md px-3 py-2 rounded-full flex gap-2 items-center">
            {slides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setSlideIdx(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === slideIdx ? "w-6 bg-white" : "bg-white/45"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DDecorPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timeline
    const heroTl = gsap.timeline();
    heroTl.fromTo("#hero-tag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .fromTo("#hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .fromTo("#hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .fromTo("#hero-scroll-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

    // Parallax background
    gsap.to("#hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Sections reveal
    gsap.from(".reveal-section", {
      scrollTrigger: {
        trigger: ".reveal-section",
        start: "top 80%",
        once: true
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  const handleFilterClick = (cat) => {
    setActiveFilter(cat);

    const cards = containerRef.current.querySelectorAll(".gallery-card");
    gsap.to(cards, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.inOut",
      onComplete: () => {
        cards.forEach((card) => {
          const cardCat = card.getAttribute("data-category");
          if (cat === "all" || cardCat === cat) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });

        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
        });
      }
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "UNIQ Decor",
    "image": ["https://uniqdecorfurniture.in/assets/ddecor/hero.png"],
    "@id": "https://uniqdecorfurniture.in/#store",
    "url": "https://uniqdecorfurniture.in/ddecor",
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
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
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
        "name": "What types of fabrics does D'Decor offer for curtains and upholstery in Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "D'Decor offers an extensive range including sheer linens, velvet blackout fabrics, embroidered sheers, chenille upholstery fabrics, jacquard weaves, cotton sateen bedding, and high-durability performance textiles suitable for both residential and hospitality applications in Udaipur."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get custom-sized curtains and upholstery at Uniq Decor's D'Decor showroom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide full custom measurement and tailoring services for all D'Decor fabrics. Our team takes precise laser measurements at your Udaipur home or hotel site to ensure curtains, sofa upholstery, and drapery are stitched to perfect dimensions with motorized track integration available."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose the right curtain fabric for Udaipur's climate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For Udaipur's hot summers, we recommend thermal blackout curtains or linen blends that provide insulation while allowing natural light. Velvet drapes offer excellent heat retention for winter months. Our showroom experts at Hiran Magri can guide you through fabric samples and recommend the best material based on your room orientation and sun exposure."
        }
      }
    ]
  };

  return (
    <div ref={containerRef} className="theme-ddecor bg-[#FAF9F6] text-[#2D2A26] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <style dangerouslySetInnerHTML={{__html: `

      `}} />

      {/* HERO */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2D2A26] pt-20">
        <div id="hero-bg" className="absolute inset-0 w-full h-full scale-110 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('/assets/ddecor/hero.png')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A26]/50 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span id="hero-tag" className="inline-block text-xs uppercase tracking-[0.3em] text-[#C9A227] font-bold mb-4">Exquisite Fabric Curations</span>
          <h1 id="hero-title" className="font-serif text-5xl md:text-8xl text-white font-bold tracking-tight leading-none mb-6">
            D'DECOR <br/><span className="text-[#F5F0E8] font-normal italic font-serif">Showroom Udaipur</span>
          </h1>
          <p id="hero-desc" className="text-[#FAF9F6] text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in premium textures, custom curtain weaves, tailored sofa fabrics, and elegant residential bedding designed to make your home feel extraordinary.
          </p>
          <div id="hero-scroll-btn" className="mt-12">
            <a href="#showcase-gallery" className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FAF9F6]/80 hover:text-white transition-colors cursor-hover">
              <span>Explore Portfolio</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </header>

      {/* GALLERY SHOWCASE */}
      <section id="showcase-gallery" className="py-16 bg-[#FAF9F6] border-b border-[#8B4513]/10 relative z-10 reveal-section">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B4513]">Exclusive Collections</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#2D2A26]">Showcase Gallery</h2>
            <p className="text-[#6B6560] text-xs md:text-sm mt-2">Filter and browse our curated selection of premium D'Decor fabric categories. View detailed weaves and designer textures instantly.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            {["all", "curtains", "ready-made-curtains", "upholstery", "bedding", "kids-bedding", "cushions", "bath-linens", "blinds", "rugs", "gifting"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterClick(tab)}
                className={`px-6 py-2.5 rounded-full border border-[#8B4513]/10 text-xs uppercase tracking-wider font-semibold cursor-hover transition-all duration-300 ${
                  activeFilter === tab
                    ? "bg-[#1B4332] text-[#FAF9F6] border-[#1B4332] shadow-lg"
                    : "bg-white text-[#6B6560] hover:border-[#C9A227] hover:text-[#C9A227]"
                }`}
              >
                {tab === "ready-made-curtains" ? "ready curtains" : tab === "kids-bedding" ? "kids bedding" : tab === "bath-linens" ? "bath linens" : tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item, idx) => {
              const itemSlug = `/ddecor/${item.cat}`;
              return (
                <Link
                  key={idx}
                  href={itemSlug}
                  className="gallery-card bg-[#F5F0E8]/50 rounded-2xl overflow-hidden border border-[#8B4513]/5 shadow-sm flex flex-col justify-between cursor-hover transition-all duration-300 hover:translate-y-[-6px]"
                  data-category={item.cat}
                >
                  <div className="relative overflow-hidden aspect-[4/3] w-full bg-stone-100">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-[#FAF9F6] text-[#8B4513] text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#8B4513]/10 font-bold z-10">
                      {item.cat}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-1.5 bg-white flex-grow border-t border-[#8B4513]/5 justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#2D2A26]">{item.title}</h3>
                      <p className="text-[11px] text-[#6B6560] leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-[#B8860B] text-[10px] uppercase font-bold tracking-wider">
                      <span>Explore Collection</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CURTAINS */}
      <CollectionSlider
        slides={CURTAINS_SLIDES}
        tag="Collection 01"
        title="Designer Curtains & Custom Drapes"
        desc="Dress your windows in fabrics that dictate the room's mood. D'Decor’s range features sheer linen panels that capture sunlight beautifully, custom heavy velvet panels for thermal insulation, and complete blackouts for absolute privacy."
        features={[
          "Custom measurements & tailored fits",
          "Sheer, semi-blackout, and thermal liners",
          "Automated motorised curtain rod integration"
        ]}
        slug="curtains"
      />

      {/* UPHOLSTERY */}
      <CollectionSlider
        slides={UPHOLSTERY_SLIDES}
        tag="Collection 02"
        title="Premium Upholstery & Sofa Fabrics"
        desc="Re-envisage your seating. Our high-durability fabrics are engineered to look editorial while resisting daily rubs. Discover dense chenilles, classic jacquard textures, and ultra-plush velvets available in 200+ shade cards."
        features={[
          "High rub-test score fabrics (Martindale certified)",
          "Stain-resistant & easy clean technology",
          "Bespoke textures from plain linen to jacquards"
        ]}
        slug="upholstery"
      />

      {/* BEDDING */}
      <CollectionSlider
        slides={BEDDING_SLIDES}
        tag="Collection 03"
        title="Luxury Bed Linens & Coordinates"
        desc="Craft your signature sleeping sanctuary. Dive into 100% long-staple combed cotton sheets with thread counts from 300TC to 600TC. Coordinates include matching comforter duvets, quilted coverlets, and accent shams."
        features={[
          "100% Egyptian combed cotton sheets",
          "Hypoallergenic high-fill comforter inserts",
          "Coordinates for matching master suite sets"
        ]}
        slug="bedding"
      />



      {/* BATH */}
      <CollectionSlider
        slides={BATH_SLIDES}
        tag="Collection 04"
        title="Plush Bath Linens & Towels"
        desc="Bring hotel luxury home. D'Decor’s luxury towels are knit from premium combed cotton fibers, yielding high absorption rates while retaining soft pile height washing after washing."
        features={[
          "600+ GSM thick combed Turkish towels",
          "Zero-twist cotton loops for fast absorbency",
          "Resistant to bleach & color-fast certified"
        ]}
        slug="bath-linens"
      />

      {/* LOCAL SEO NAVIGATION DIRECTORY */}
      <section className="py-20 bg-[#F5F0E8] border-t border-[#8B4513]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B4513]">Explore D'Decor Udaipur Store</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#2D2A26]">Udaipur Regional Guides & Fabric Specialties</h2>
            <p className="text-[#6B6560] text-xs mt-2">
              Browse customized D'Decor catalogs tailored for local neighborhoods, premium fabric materials, and hospitality contract requirements in Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Neighborhoods */}
            <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#8B4513]/10 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#2D2A26] border-b border-[#8B4513]/10 pb-3">Udaipur Localities</h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link href="/ddecor/locations/shobhagpura" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Shobhagpura Showroom Selection
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/locations/hiran-magri" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Hiran Magri Sofa Fabrics
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/locations/bhuwana" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Bhuwana Wallpapers & Decor
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/locations/panchwati" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Panchwati Luxury Home Decor
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/locations/fatehpura" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Fatehpura Wallcoverings
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/locations/madhuban" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Madhuban Custom Curtains
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fabrics Spec */}
            <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#8B4513]/10 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#2D2A26] border-b border-[#8B4513]/10 pb-3">Fabric Technology</h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link href="/ddecor/materials/velvet-curtains" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Royal Velvet Fabrics
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/materials/blackout-curtains" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> 100% Blackout Drapes
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/materials/stain-resistant-fabrics" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Easy-Clean Upholstery
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/materials/motorized-drapes" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Smart Motorized Tracks
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/materials/roller-blinds" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Minimalist Roller Blinds
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/materials/roman-shades" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Custom Roman Shades
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/materials/sheer-curtains" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Luxury Sheer Curtains
                  </Link>
                </li>
              </ul>
            </div>

            {/* B2B Niches */}
            <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#8B4513]/10 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#2D2A26] border-b border-[#8B4513]/10 pb-3">Commercial & Heritage</h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link href="/ddecor/hospitality/hotel-curtains" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Commercial Hotel Fabrics
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/hospitality/mewari-heritage" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Royal Mewari Decor Style
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/hospitality/villa-furnishing" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> Luxury Villa Furnishing
                  </Link>
                </li>
                <li>
                  <Link href="/ddecor/hospitality/banquet-linens" className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#B8860B] font-semibold flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" /> B2B Banquet Table Linens
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 md:px-12 bg-[#FAF9F6] border-t border-[#8B4513]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B4513]">Got Questions?</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-[#2D2A26]">Frequently Asked Questions</h2>
            <p className="text-[#6B6560] text-xs mt-2">Common questions about our D'Decor fabrics, custom services, and showroom experience.</p>
          </div>

          <div className="flex flex-col gap-5">
            <details className="group border border-[#8B4513]/15 rounded-2xl bg-white p-5 shadow-sm" open>
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#2D2A26] cursor-pointer list-none select-none">
                <span>What types of fabrics does D'Decor offer for curtains and upholstery in Udaipur?</span>
                <span className="text-[#8B4513] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#6B6560] leading-relaxed mt-3 pl-1">
                D'Decor offers an extensive range including sheer linens, velvet blackout fabrics, embroidered sheers, chenille upholstery fabrics, jacquard weaves, cotton sateen bedding, and high-durability performance textiles suitable for both residential and hospitality applications in Udaipur.
              </p>
            </details>

            <details className="group border border-[#8B4513]/15 rounded-2xl bg-white p-5 shadow-sm">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#2D2A26] cursor-pointer list-none select-none">
                <span>Can I get custom-sized curtains and upholstery at Uniq Decor's D'Decor showroom?</span>
                <span className="text-[#8B4513] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#6B6560] leading-relaxed mt-3 pl-1">
                Yes, we provide full custom measurement and tailoring services for all D'Decor fabrics. Our team takes precise laser measurements at your Udaipur home or hotel site to ensure curtains, sofa upholstery, and drapery are stitched to perfect dimensions with motorized track integration available.
              </p>
            </details>

            <details className="group border border-[#8B4513]/15 rounded-2xl bg-white p-5 shadow-sm">
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#2D2A26] cursor-pointer list-none select-none">
                <span>How do I choose the right curtain fabric for Udaipur's climate?</span>
                <span className="text-[#8B4513] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#6B6560] leading-relaxed mt-3 pl-1">
                For Udaipur's hot summers, we recommend thermal blackout curtains or linen blends that provide insulation while allowing natural light. Velvet drapes offer excellent heat retention for winter months. Our showroom experts at Hiran Magri can guide you through fabric samples and recommend the best material based on your room orientation and sun exposure.
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

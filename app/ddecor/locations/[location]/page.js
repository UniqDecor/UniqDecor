import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LOCATIONS_DATA } from "../../locationsData";
import { Check, ChevronRight, Phone, MapPin, Clock, Mail } from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";

// Generate static routes for compilation
export async function generateStaticParams() {
  return Object.keys(LOCATIONS_DATA).map((key) => ({
    location: key,
  }));
}

// Generate dynamic meta metadata
export async function generateMetadata({ params }) {
  const { location } = params;
  const data = LOCATIONS_DATA[location];

  if (!data) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDesc,
    keywords: data.keywords,
    alternates: {
      canonical: `/ddecor/locations/${location}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url: `https://uniqdecorfurniture.in/ddecor/locations/${location}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }) {
  const { location } = params;
  const data = LOCATIONS_DATA[location];

  if (!data) {
    notFound();
  }

  // Schema LD JSON structures
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": `UNIQ Decor - D'Decor Showroom Udaipur (${data.locationName})`,
    "image": [data.mainImage],
    "url": `https://uniqdecorfurniture.in/ddecor/locations/${location}`,
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
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `${data.locationName}, Udaipur`
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  };

  const whatsappBase = "919982219222";
  const getWhatsAppLink = (locName) => {
    const encodedMsg = encodeURIComponent(`Hi Uniq Decor! 👋 I'm based in ${locName}, Udaipur and interested in D'Decor home furnishings. Please share fabric samples and pricing estimates.`);
    return `https://wa.me/${whatsappBase}?text=${encodedMsg}`;
  };

  return (
    <div className="theme-ddecor bg-[#FAF9F6] text-[#2D2A26] min-h-screen">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {styleTag}

      {/* HERO SECTION */}
      <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#2D2A26] pt-32 pb-16">
        <div className="absolute inset-0 w-full h-full scale-105 opacity-35 bg-cover bg-center" style={{ backgroundImage: `url('${data.mainImage}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A26]/50 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#C9A227] font-bold mb-4">
            D'Decor Udaipur &bull; {data.locationName} Gallery
          </span>
          <h1 className="font-serif text-3xl md:text-6xl text-white font-bold tracking-tight leading-tight mb-6">
            {data.headline}
          </h1>
          <p className="text-[#FAF9F6] text-xs md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            {data.tagline}
          </p>
        </div>
      </header>

      {/* RICH COPY SECTION */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto border-b border-[#8B4513]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B4513]">Premium Neighborhood Showcase</span>
            <h2 className="font-serif text-3xl font-bold text-[#2D2A26]">Bespoke Furnishing for {data.locationName}</h2>
            <p className="text-[#6B6560] leading-relaxed text-sm md:text-base">
              {data.introText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href={getWhatsAppLink(data.locationName)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-md"
              >
                Inquire on WhatsApp
              </a>
              <Link
                href="/#showroom"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-[#8B4513]/15 text-[#8B4513] hover:border-[#8B4513] text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-sm"
              >
                Showroom Directions
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 bg-[#F5F0E8] border border-[#8B4513]/10 p-8 rounded-2xl flex flex-col gap-6">
            <h3 className="font-serif text-lg font-bold text-[#2D2A26] border-b border-[#8B4513]/10 pb-3">Consultation Highlights</h3>
            <ul className="flex flex-col gap-4">
              {data.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs uppercase tracking-wider font-semibold text-[#6B6560]">
                  <Check className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTS SHOWCASE GRID */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto border-b border-[#8B4513]/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B4513]">Premium Picks</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#2D2A26]">Featured Catalogues for {data.locationName}</h2>
          <p className="text-[#6B6560] text-xs md:text-sm mt-2">
            Selected designs matching the housing styles and architectural formats in {data.locationName}, Udaipur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => (
            <div key={idx} className="bg-white border border-[#8B4513]/8 rounded-[20px] overflow-hidden shadow-sm hover:translate-y-[-6px] hover:shadow-lg transition-all duration-400 group">
              <div className="h-56 overflow-hidden relative bg-stone-100">
                <Image
                  src={item.img}
                  alt={`${item.title} D'Decor showroom ${data.locationName} Udaipur`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col justify-between min-h-[160px]">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2D2A26]">{item.title}</h3>
                  <p className="text-[11px] text-[#6B6560] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-bold">{item.spec}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8B4513] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 md:px-12 max-w-4xl mx-auto border-b border-[#8B4513]/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B4513]">Local FAQs</span>
          <h2 className="font-serif text-3xl font-bold mt-2 text-[#2D2A26]">Frequently Asked Questions</h2>
          <p className="text-[#6B6560] text-xs mt-2">Answers about measurements, tailoring, and installations in the {data.locationName} locality.</p>
        </div>

        <div className="flex flex-col gap-6">
          {data.faqs.map((faq, idx) => (
            <details key={idx} className="group border-b border-[#8B4513]/10 pb-5" open={idx === 0}>
              <summary className="flex justify-between items-center font-serif text-base md:text-lg font-bold text-[#2D2A26] cursor-pointer list-none select-none">
                <span>{faq.q}</span>
                <span className="text-[#8B4513] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#6B6560] leading-relaxed mt-3 pl-2 transition-all">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* SHOWROOM VISIT SECTION */}
      <ShowroomVisit />

      {/* INTERNAL LINKING / BROWSE OTHER AREAS */}
      <section className="py-16 bg-[#F5F0E8] border-t border-[#8B4513]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <span className="text-xs uppercase tracking-widest text-[#8B4513] font-bold block mb-6">Browse Other Service Localities</span>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {Object.entries(LOCATIONS_DATA).map(([key, item]) => {
              const isCurrent = key === location;
              if (isCurrent) return null;
              return (
                <Link
                  key={key}
                  href={`/ddecor/locations/${key}`}
                  className="px-5 py-2.5 bg-white border border-[#8B4513]/10 text-xs font-bold uppercase tracking-wider text-[#6B6560] rounded-full hover:border-[#C9A227] hover:text-[#C9A227] hover:scale-[1.03] transition-all"
                >
                  {item.locationName} Showrooms
                </Link>
              );
            })}
            <Link
              href="/ddecor"
              className="px-5 py-2.5 bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#142d22] transition-all"
            >
              Back to D'Decor Atelier &larr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styleTag = (
  <style dangerouslySetInnerHTML={{__html: `
    details summary::-webkit-details-marker {
      display: none;
    }
  `}} />
);

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ROOFING_CATEGORIES_DATA } from "../laxreeRoofingCategoriesData";
import { Check, ChevronRight, Phone, ArrowUpRight } from "lucide-react";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";

export async function generateStaticParams() {
  return Object.keys(ROOFING_CATEGORIES_DATA).map((key) => ({
    category: key,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = params;
  const data = ROOFING_CATEGORIES_DATA[category];
  if (!data) return { title: "Category Not Found" };
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    keywords: data.keywords,
    alternates: { canonical: `/laxree-roofing/${category}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url: `https://uniqdecorfurniture.in/laxree-roofing/${category}`,
      type: "website",
      images: [{ url: `https://uniqdecorfurniture.in${data.mainImage}`, width: 1200, height: 630, alt: data.headline }],
    },
    twitter: { card: "summary_large_image", title: data.metaTitle, description: data.metaDesc },
  };
}

export default async function RoofingCategoryPage({ params }) {
  const { category } = params;
  const data = ROOFING_CATEGORIES_DATA[category];
  if (!data) notFound();

  const whatsappBase = "919982219222";
  const whatsappLink = (name) => `https://wa.me/${whatsappBase}?text=${encodeURIComponent(`Hi Uniq Decor! I'm interested in LaxRee Roofing ${name} at your Udaipur showroom. Please share the catalog and pricing.`)}`;

  const itemSchemas = data.items.map((item, idx) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `LaxRee ${item.title} at Uniq Decor Udaipur`,
    "image": `https://uniqdecorfurniture.in${item.img}`,
    "description": item.desc,
    "sku": `LAXROOF-${category}-${idx + 1}`,
    "brand": { "@type": "Brand", "name": "LaxRee Roofing" },
    "hasCertification": { "@type": "Certification", "name": "ISO 9001 & ASTM E108 Certified", "description": "LaxRee roofing products are manufactured in ISO 9001 certified facilities and meet ASTM E108 fire safety standards." },
    "offers": {
      "@type": "Offer",
      "url": `https://uniqdecorfurniture.in/laxree-roofing/${category}`,
      "priceCurrency": "INR",
      "price": "0",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": { "@id": "https://uniqdecorfurniture.in/#store" }
    }
  }));

  return (
    <div className="theme-laxree bg-[#FAF9F5] text-[#1E2022] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://uniqdecorfurniture.in/" },
          { "@type": "ListItem", "position": 2, "name": "LaxRee Roofing", "item": "https://uniqdecorfurniture.in/laxree-roofing" },
          { "@type": "ListItem", "position": 3, "name": data.categoryName, "item": `https://uniqdecorfurniture.in/laxree-roofing/${category}` }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FurnitureStore", "@id": "https://uniqdecorfurniture.in/#store",
        "name": "UNIQ Decor Showroom - Udaipur", "image": [data.mainImage],
        "url": `https://uniqdecorfurniture.in/laxree-roofing/${category}`, "telephone": "+919982219222",
        "priceRange": "$$$", "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14", "addressLocality": "Udaipur", "addressRegion": "Rajasthan", "postalCode": "313001", "addressCountry": "IN" },
        "geo": { "@type": "GeoCoordinates", "latitude": 24.5420, "longitude": 73.6964 },
        "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "10:00", "closes": "20:00" },
        "sameAs": ["https://www.facebook.com/uniqdecor","https://www.instagram.com/uniqdecor","https://www.linkedin.com/company/uniqdecor","https://www.youtube.com/@uniqdecor"]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        "name": `LaxRee ${data.categoryName} at Uniq Decor Udaipur`,
        "image": data.mainImage, "description": data.metaDesc,
        "brand": { "@type": "Brand", "name": "LaxRee Roofing" },
        "offers": { "@type": "AggregateOffer", "priceCurrency": "INR", "lowPrice": "499", "highPrice": "49999", "offerCount": data.items.length.toString(), "priceRange": "$$-$$$", "availability": "https://schema.org/InStock", "seller": { "@id": "https://uniqdecorfurniture.in/#store" } }
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": data.faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      })}} />
      {itemSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <style dangerouslySetInnerHTML={{__html: `details summary::-webkit-details-marker { display: none; }`}} />

      <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#1E2022] pt-32 pb-16">
        <div className="absolute inset-0 w-full h-full scale-105 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('${data.mainImage}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2022]/70 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#D97706] font-bold mb-4">LaxRee Roofing Udaipur &bull; {data.categoryName}</span>
          <h1 className="font-serif text-3xl md:text-6xl text-white font-bold tracking-tight leading-tight mb-6">{data.headline}</h1>
          <p className="text-[#F3F3F3]/80 text-xs md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">{data.tagline}</p>
        </div>
      </header>

      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto border-b border-[#D97706]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Udaipur Showroom Collection</span>
            <h2 className="font-serif text-3xl font-bold text-[#1E2022]">Premium {data.categoryName} in Udaipur</h2>
            <p className="text-[#4A4E51] leading-relaxed text-sm md:text-base">{data.introText}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a href={whatsappLink(data.categoryName)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-md">Inquire on WhatsApp</a>
              <a href="tel:+919982219222" className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-[#D97706]/15 text-[#D97706] hover:border-[#D97706] text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-sm"><Phone className="w-4 h-4" /> Call +91 99822 19222</a>
            </div>
          </div>
          <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#D97706]/10 p-8 rounded-2xl flex flex-col gap-6">
            <h3 className="font-serif text-lg font-bold text-[#1E2022] border-b border-[#D97706]/10 pb-3">Why {data.categoryName} from LaxRee?</h3>
            <ul className="flex flex-col gap-4">
              {data.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-xs uppercase tracking-wider font-semibold text-[#4A4E51]"><Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" /><span>{f}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto border-b border-[#D97706]/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Explore Range</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#1E2022]">{data.categoryName}</h2>
          <p className="text-[#4A4E51] text-xs md:text-sm mt-2">Browse our selection of LaxRee {data.categoryName.toLowerCase()} available at our Udaipur showroom.</p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${data.items.length >= 4 ? 'lg:grid-cols-4' : data.items.length === 5 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
          {data.items.map((item, idx) => (
            <div key={idx} className="bg-white border border-[#D97706]/8 rounded-[20px] overflow-hidden shadow-sm hover:translate-y-[-6px] hover:shadow-lg transition-all duration-400 group">
              <div className="h-56 overflow-hidden relative bg-stone-100">
                <Image src={item.img} alt={`${item.title} - LaxRee ${data.categoryName}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {item.badge && <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-widest text-[#D97706] font-bold rounded-full shadow-sm">{item.badge}</span>}
              </div>
              <div className="p-6 flex flex-col justify-between min-h-[140px]">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1E2022]">{item.title}</h3>
                  <p className="text-[11px] text-[#4A4E51] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-[#D97706] font-bold">{item.spec}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D97706] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {data.colors && (
          <div className="mt-12 bg-white border border-[#D97706]/10 p-8 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-bold block mb-4">Available Colors</span>
            <div className="flex flex-wrap gap-2.5">
              {data.colors.map((color, i) => (
                <span key={i} className="px-4 py-2 bg-[#FAF9F5] border border-[#D97706]/5 text-[10px] uppercase tracking-wider font-semibold rounded-full text-[#4A4E51] hover:border-[#D97706] hover:text-[#D97706] transition-all">{color}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="py-20 px-4 md:px-12 max-w-4xl mx-auto border-b border-[#D97706]/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D97706]">Got Questions?</span>
          <h2 className="font-serif text-3xl font-bold mt-2 text-[#1E2022]">Frequently Asked Questions</h2>
          <p className="text-[#4A4E51] text-xs mt-2">Common queries about LaxRee {data.categoryName.toLowerCase()} in Udaipur.</p>
        </div>
        <div className="flex flex-col gap-5">
          {data.faqs.map((faq, idx) => (
            <details key={idx} className="group border border-[#D97706]/15 rounded-2xl bg-white p-5 shadow-sm" open={idx === 0}>
              <summary className="flex justify-between items-center font-serif text-base font-bold text-[#1E2022] cursor-pointer list-none select-none">
                <span>{faq.q}</span>
                <span className="text-[#D97706] group-open:rotate-180 transition-transform duration-300 font-sans text-xs ml-3">&darr;</span>
              </summary>
              <p className="text-xs md:text-sm text-[#4A4E51] leading-relaxed mt-3 pl-1">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ShowroomVisit />

      <section className="py-16 bg-[#F3F3F3] border-t border-[#D97706]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold block mb-6">Explore Other Roofing Collections</span>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {Object.entries(ROOFING_CATEGORIES_DATA).map(([key, item]) => {
              if (key === category) return null;
              return (
                <Link key={key} href={`/laxree-roofing/${key}`} className="px-5 py-2.5 bg-white border border-[#D97706]/10 text-xs font-bold uppercase tracking-wider text-[#4A4E51] rounded-full hover:border-[#D97706] hover:text-[#D97706] hover:scale-[1.03] transition-all">{item.categoryName}</Link>
              );
            })}
            <Link href="/laxree-roofing" className="px-5 py-2.5 bg-[#1E2022] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#3a3d40] transition-all">Back to LaxRee Hub &larr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

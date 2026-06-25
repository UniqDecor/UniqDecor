"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone, Mail } from "lucide-react";

export default function LaxreeRoofingLocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://uniqdecorfurniture.in/#store",
    "name": "LaxRee Roofing Solutions Showroom Udaipur",
    "image": "https://uniqdecorfurniture.in/photos/HOMEPAGE%20IMAGE/STONE%20COATED%20ROOFING.jpg",
    "url": "https://uniqdecorfurniture.in/laxree-roofing/locations",
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
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://uniqdecorfurniture.in/#organization",
      "name": "UNIQ Decor"
    }
  };

  return (
    <div className="theme-laxree bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/laxree-roofing" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D97706] hover:text-[#C9A227] transition-colors cursor-hover">
            <ArrowLeft className="w-4 h-4" /> Back to LaxRee Roofing
          </Link>
        </div>

        <header className="border-b border-[#D97706]/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Visit Our Showroom</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            LaxRee Roofing Showroom Udaipur
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-3 leading-relaxed max-w-2xl">
            Explore premium roofing solutions at our Udaipur showroom — stone-coated metal tiles, synthetic thatch, and asphalt shingles. Authorized LaxRee Roofing dealer at Uniq Decor.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-[#C9A227]" /> Location
            </h2>
            <div className="bg-[#FAF9F6] rounded-xl p-5 border border-black/5 space-y-3">
              <p className="font-bold text-[#1A202C]">Uniq Decor &mdash; LaxRee Roofing Gallery</p>
              <p className="text-xs md:text-sm">2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur, Rajasthan 313001</p>
              <p className="text-xs md:text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C9A227]" /> Landmark: Near CA Circle, Hiran Magri</p>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#C9A227]" /> Hours & Contact
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C9A227]" />
                <span>Monday&ndash;Saturday: 10:00 AM &ndash; 8:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A227]" />
                <span>+91-9982219222</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A227]" />
                <span>info@uniqdecor.com</span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I%20want%20to%20know%20more%20about%20LaxRee%20roofing%20solutions%20in%20Udaipur." target="_blank" className="inline-flex items-center gap-2 bg-[#D97706] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b05f00] transition-colors cursor-hover">
                WhatsApp Roofing Team
              </Link>
            </div>
          </section>
        </div>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm mb-10">
          <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] mb-4">Why Visit Our LaxRee Roofing Showroom in Udaipur?</h2>
          <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-black/5">
              <h3 className="font-bold text-[#1A202C] mb-1">Physical Samples</h3>
              <p>View and touch actual stone-coated tile samples, synthetic thatch mats, and asphalt shingle cutouts in person.</p>
            </div>
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-black/5">
              <h3 className="font-bold text-[#1A202C] mb-1">Expert Guidance</h3>
              <p>Get professional recommendations based on your roof slope, climate conditions, and architectural style.</p>
            </div>
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-black/5">
              <h3 className="font-bold text-[#1A202C] mb-1">Project Quotes</h3>
              <p>Receive detailed cost estimates for residential, resort, and commercial roofing projects across Rajasthan.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Award, Users, Building2, Shield } from "lucide-react";

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://uniqdecorfurniture.in/#organization",
    "name": "UNIQ Decor Udaipur",
    "url": "https://uniqdecorfurniture.in/",
    "logo": "https://uniqdecorfurniture.in/photos/UNIQ-DECOR-Logo.webp",
    "description": "UNIQ Decor is Udaipur's premier multi-brand furniture, home decor, and hospitality solutions showroom. Authorized dealers of ROSERRO, D'DECOR, GEEKEN, and LAXREE brands since 2015.",
    "foundingDate": "2015",
    "email": "info@uniqdecor.com",
    "telephone": "+919982219222",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14",
      "addressLocality": "Udaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/uniqdecor",
      "https://www.instagram.com/uniqdecor",
      "https://www.linkedin.com/company/uniqdecor",
      "https://www.youtube.com/@uniqdecor"
    ],
    "founder": {
      "@type": "Person",
      "name": "Founder, UNIQ Decor"
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Founder & Managing Director",
    "jobTitle": "Managing Director",
    "worksFor": { "@id": "https://uniqdecorfurniture.in/#organization" },
    "telephone": "+919982219222",
    "email": "info@uniqdecor.com"
  };

  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors cursor-hover">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <header className="border-b border-[#2C5282]/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Our Story</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            About UNIQ Decor Udaipur
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-3 leading-relaxed max-w-2xl">
            Udaipur&apos;s premier multi-brand destination for luxury furniture, premium fabrics, hospitality supplies, and architectural roofing solutions — serving Rajasthan since 2015.
          </p>
        </header>

        <div className="space-y-10 text-sm md:text-base text-[#4A5568] leading-relaxed">
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-[#C9A227]" /> Who We Are
            </h2>
            <p className="mb-4">
              UNIQ Decor is a multi-brand furniture, home decor, and hospitality solutions showroom in Udaipur, Rajasthan. We bring together four premier national brands under one roof — <strong>ROSERRO</strong> luxury furniture, <strong>D&apos;DECOR</strong> premium fabrics and curtains, <strong>GEEKEN</strong> ergonomic office furniture, and <strong>LAXREE</strong> hospitality amenities and roofing solutions.
            </p>
            <p className="mb-4">
              Located at Gokul Tower in Hiran Magri, our showroom spans over 3,000 sq. ft. of curated display space, featuring live product demonstrations, fabric swatch libraries, and consulting rooms for custom project planning.
            </p>
            <p>
              We serve a diverse clientele — from luxury homeowners and interior designers to hotel procurement managers, corporate facility heads, and government contractors across Rajasthan.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-[#C9A227]" /> Our Brand Partnerships
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-black/5 rounded-xl p-4 bg-[#FAF9F6]">
                <h3 className="font-bold text-[#1A202C] mb-2">ROSERRO</h3>
                <p className="text-xs">Authorized dealer of luxury living room sofas, wooden consoles, structural beds, and premium lounge furniture.</p>
              </div>
              <div className="border border-black/5 rounded-xl p-4 bg-[#FAF9F6]">
                <h3 className="font-bold text-[#1A202C] mb-2">D&apos;DECOR</h3>
                <p className="text-xs">Authorized gallery for high-rub curtains, blackout drapes, sheer fabrics, wallpapers, cushion and upholstery materials.</p>
              </div>
              <div className="border border-black/5 rounded-xl p-4 bg-[#FAF9F6]">
                <h3 className="font-bold text-[#1A202C] mb-2">GEEKEN</h3>
                <p className="text-xs">Authorized dealer of ergonomic task chairs, modular workstations, steel storage, and healthcare furniture with BIFMA-certified quality.</p>
              </div>
              <div className="border border-black/5 rounded-xl p-4 bg-[#FAF9F6]">
                <h3 className="font-bold text-[#1A202C] mb-2">LAXREE</h3>
                <p className="text-xs">Premium supplier of hotel guest amenities (minibars, safes), 400TC bedding, bath towels, stone-coated roofing tiles, and synthetic thatch.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-[#C9A227]" /> Our Services
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Custom furniture sizing and tailoring",
                "In-home and on-site laser measurements",
                "Fabric swatch library with 200+ samples",
                "B2B bulk procurement for hotels and corporates",
                "White-glove delivery and installation",
                "Project consultation from blueprint to handover"
              ].map((service, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#C9A227] mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-[#C9A227]" /> Visit Our Showroom
            </h2>
            <div className="bg-[#FAF9F6] rounded-xl p-5 border border-black/5">
              <p className="font-bold text-[#1A202C] mb-1">UNIQ Decor</p>
              <p className="text-xs md:text-sm mb-2">2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur, Rajasthan 313001</p>
              <p className="text-xs md:text-sm mb-2"><strong>Phone:</strong> +91-9982219222</p>
              <p className="text-xs md:text-sm mb-2"><strong>Email:</strong> info@uniqdecor.com</p>
              <p className="text-xs md:text-sm"><strong>Hours:</strong> Mon&ndash;Sat, 10:00 AM &ndash; 8:00 PM</p>
            </div>
            <div className="mt-4">
              <Link href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I%20would%20like%20to%20know%20more%20about%20your%20showroom." target="_blank" className="inline-flex items-center gap-2 bg-[#C9A227] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b08d1f] transition-colors cursor-hover">
                Chat on WhatsApp
              </Link>
            </div>
          </section>
        </div>
        {/* Last Updated */}
        <div className="mt-12 pt-6 border-t border-black/5 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
            Last updated: June 25, 2026
          </p>
        </div>
      </div>
    </div>
  );
}

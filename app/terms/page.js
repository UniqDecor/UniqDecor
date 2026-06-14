"use client";

import Link from "next/link";
import { ArrowLeft, Scale, FileText, ClipboardList, Info } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors cursor-hover">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Title Header */}
        <header className="border-b border-[#2C5282]/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Legal Agreement</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            Terms of Service
          </h1>
          <p className="text-[#4A5568] text-xs md:text-sm mt-3 leading-relaxed">
            Effective Date: June 14, 2026. Please read these terms carefully before scheduling site audits, requesting commercial B2B pricing, or placing corporate orders with Uniq Decor Udaipur.
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-xs md:text-sm text-[#4A5568] leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <ClipboardList className="w-5 h-5 text-[#2C5282]" /> 1. B2B Quotations & Commercial Contracts
            </h2>
            <p className="mb-4">
              All commercial project estimates, layout designs, and bulk product quotations provided by our Udaipur showroom are governed by the following criteria:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Quote Validity</strong>: Written quotations remain valid for 30 calendar days from the date of issue unless specified otherwise in writing.</li>
              <li><strong>Price Revisions</strong>: B2B pricing models are structured on raw material indices and factory freight rates. Prices might adjust in case of significant fluctuations in national supplier price sheets.</li>
              <li><strong>Order Confirmation</strong>: Orders are formally processed only upon receipt of the signed contract agreement along with the stipulated advance deposit.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#2C5282]" /> 2. Logistics, Deliveries & Installation
            </h2>
            <p className="mb-4">
              Uniq Decor manages shipping and on-site assembly logistics for contract works across Udaipur, Rajasthan, and neighboring territories:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Timeline Estimates</strong>: Delivery timelines are estimated in good faith and depend on factory production schedules. We are not liable for transit delays caused by force majeure or regional transportation disruptions.</li>
              <li><strong>Site Readiness</strong>: The client is responsible for ensuring that installation sites are clean, secure, and ready for floor installations (e.g. for workstation setups or roofing works).</li>
              <li><strong>On-Site Assembly</strong>: Official brand installations are conducted by trained technicians in compliance with manufacturer guidelines.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-[#2C5282]" /> 3. Warranty & Brand Certifications
            </h2>
            <p className="mb-4">
              We stand by the structural integrity of our partner products. All warranties are backed directly by the parent manufacturing brands:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>D'Decor</strong>: Fabrics and linens are warranted against weaving defects under proper care instructions.</li>
              <li><strong>Geeken</strong>: Ergonomic task chairs hold BIFMA certifications, with warranties covering gas lifts and mechanisms.</li>
              <li><strong>LaxRee Roofing</strong>: Stone-coated metal tiles and asphalt shingles are warranted for architectural durability and weather protection based on manufacturer grades.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Info className="w-5 h-5 text-[#2C5282]" /> 4. Showroom Visitations & Business Hours
            </h2>
            <p>
              Visitors to our 2nd Floor Gokul Tower showroom in Udaipur are requested to schedule appointments via our online booking widget or WhatsApp channel to ensure dedicated designer availability. Showroom visits are open Monday through Saturday, from 10:00 AM to 8:00 PM. The studio remains closed on Sundays.
            </p>
          </section>

          {/* Contact Block */}
          <div className="border-t border-[#2C5282]/10 pt-10 text-center">
            <h3 className="font-serif text-lg font-bold text-[#1A202C]">Legal & Contractual Support</h3>
            <p className="text-xs text-[#4A5568] mt-1">
              For legal inquiries, contract documentation audits, or showroom compliance details, reach out to our legal officer at:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#2C5282]">
              <span>📞 +91 99822 19222</span>
              <span>✉️ info@uniqdecor.com</span>
              <span>📍 Sector 14 Hiran Magri, Udaipur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

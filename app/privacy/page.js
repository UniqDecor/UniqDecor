"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, CheckCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
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
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Compliance & Security</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[#4A5568] text-xs md:text-sm mt-3 leading-relaxed">
            Effective Date: June 14, 2026. This policy outlines how Uniq Decor Udaipur collects, processes, and protects your information across our B2B showroom consultations and website operations.
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-xs md:text-sm text-[#4A5568] leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#2C5282]" /> 1. Information We Collect
            </h2>
            <p className="mb-4">
              Uniq Decor limits the collection of personal data to details necessary for handling showroom visit bookings, bulk quotation queries, and customer order management:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information</strong>: Name, phone number, business email address, and company billing/shipping addresses.</li>
              <li><strong>Project Specifications</strong>: Floor layout files (2D/3D DWG drawings), site photography, and required fabric metrics or furniture sizes.</li>
              <li><strong>Digital Interactions</strong>: Standard IP logs, browser configurations, and cookies collected during your visits to our online portals.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-[#2C5282]" /> 2. Data Protection & Security
            </h2>
            <p className="mb-4">
              We implement rigid technical protocols and secure firewalls to protect customer databases from unauthorized leakages, alterations, or access:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Commercial transaction records are stored inside encrypted offline databases.</li>
              <li>WhatsApp chat sessions are conducted via standard secure business channels, processed strictly by our customer relations desks.</li>
              <li>No customer data is shared, sold, or distributed to third-party commercial marketing platforms.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-[#2C5282]" /> 3. Brand Distribution & Partner Protocols
            </h2>
            <p className="mb-4">
              As an authorized corporate dealership studio, we serve as a supply agent for premier national and international interior brands:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>D'Decor Fabrics</strong>: Customer specifications for custom drapery, curtains, or upholstery are shared only with D'Decor's custom logistics channels to process weaves and sizing correctly.</li>
              <li><strong>Geeken Furniture</strong>: Commercial project measurements and product choices are verified against official Geeken BIFMA compliance logs and custom contract specs.</li>
              <li><strong>LaxRee Group</strong>: Logistics data for glamping domes, guest amenities, or premium roofing are routed through verified factory transport networks to facilitate direct transport.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#1A202C] flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-[#2C5282]" /> 4. Cookies & Analytics
            </h2>
            <p>
              Our website uses basic session cookies and analysis tags to monitor page load times, scroll patterns, and form completions. This statistics data is strictly used to optimize layout performance, enhance loading speeds, and verify SEO indexing on major search engines. You can configure your browser to block cookies, though some interactive elements like smooth navigation or custom maps might load slower.
            </p>
          </section>

          {/* Contact Block */}
          <div className="border-t border-[#2C5282]/10 pt-10 text-center">
            <h3 className="font-serif text-lg font-bold text-[#1A202C]">Privacy Queries & Audits</h3>
            <p className="text-xs text-[#4A5568] mt-1">
              For any concerns regarding user database records or privacy compliance audits, contact our compliance manager at:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#2C5282]">
              <span>📞 +91 99822 19222</span>
              <span>✉️ info@uniqdecor.com</span>
              <span>📍 Sector 14 Hiran Magri, Udaipur</span>
            </div>
            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-black/5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium text-center">
                Last updated: June 25, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

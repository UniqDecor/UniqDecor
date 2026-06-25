import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | Uniq Decor Showroom Udaipur",
  description: "Visit Uniq Decor in Hiran Magri, Udaipur. Call +91-9982219222 or email info@uniqdecor.com. Mon–Sat 10 AM–8 PM. Free consultation and showroom visits available.",
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "UNIQ Decor Udaipur",
    "url": "https://uniqdecorfurniture.in/",
    "logo": "https://uniqdecorfurniture.in/photos/UNIQ-DECOR-Logo.webp",
    "description": "Udaipur's premier multi-brand furniture, home decor, and hospitality solutions showroom. Contact us for D'Decor, Geeken, Roserro, and LaxRee products.",
    "telephone": "+919982219222",
    "email": "info@uniqdecor.com",
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
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919982219222",
      "contactType": "sales",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/uniqdecor",
      "https://www.instagram.com/uniqdecor",
      "https://www.linkedin.com/company/uniqdecor",
      "https://www.youtube.com/@uniqdecor"
    ]
  };

  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors cursor-hover">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <header className="border-b border-[#2C5282]/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            Contact Us
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-3 leading-relaxed max-w-2xl">
            Visit our showroom, call us, or send a message. We are here to help with your furniture, decor, and hospitality needs.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A202C] flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#C9A227]" /> Address
              </h2>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                UNIQ Decor<br />
                2nd Floor, Gokul Tower, F Block<br />
                Near CA Circle, Hiran Magri, Sector 14<br />
                Udaipur, Rajasthan 313001
              </p>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A202C] flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5 text-[#C9A227]" /> Phone
              </h2>
              <a href="tel:+919982219222" className="text-sm text-[#2C5282] hover:text-[#C9A227] font-bold transition-colors block">
                +91 99822 19222
              </a>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A202C] flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-[#C9A227]" /> Email
              </h2>
              <a href="mailto:info@uniqdecor.com" className="text-sm text-[#2C5282] hover:text-[#C9A227] font-bold transition-colors block">
                info@uniqdecor.com
              </a>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A202C] flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#C9A227]" /> Hours
              </h2>
              <p className="text-sm text-[#4A5568]">
                <strong>Mon–Sat:</strong> 10:00 AM – 8:00 PM<br />
                <strong>Sunday:</strong> Closed
              </p>
            </section>

            <a
              href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#1DA851] transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A202C] flex items-center gap-3 mb-6">
                <Send className="w-5 h-5 text-[#C9A227]" /> Send us a Message
              </h2>
              <form
                action="https://formspree.io/f/info@uniqdecor.com"
                method="POST"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Name *</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] bg-[#FAF9F6]" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Email *</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] bg-[#FAF9F6]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Phone</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] bg-[#FAF9F6]" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Subject</label>
                  <select id="subject" name="subject" className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] bg-[#FAF9F6]">
                    <option value="">Select a topic...</option>
                    <option value="D'Decor">D'Decor Curtains & Fabrics</option>
                    <option value="Geeken">Geeken Office Furniture</option>
                    <option value="Roserro">Roserro Luxury Linens</option>
                    <option value="LaxRee-Amenities">LaxRee Hotel Amenities</option>
                    <option value="LaxRee-Roofing">LaxRee Roofing Solutions</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#4A5568] mb-1.5">Message *</label>
                  <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] bg-[#FAF9F6] resize-none"></textarea>
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-[#C9A227] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b08d1f] transition-colors shadow-sm">
                  Send Message
                </button>
              </form>
            </section>

            <section className="bg-white p-1 rounded-2xl border border-black/5 shadow-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.4!2d73.6964!3d24.5420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDMyJzMxLjIiTiA3M8KwNDEnNDcuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UNIQ Decor Showroom Location - Hiran Magri, Udaipur"
              />
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
    </div>
  );
}

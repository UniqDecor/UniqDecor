"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleQuickLink = (e, targetId) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="uniq-footer-v14 bg-[#080D09] text-[#EAEFF2] font-sans pt-16 px-[4%] border-t-2 border-[var(--color-accent-gold)] relative overflow-hidden" aria-label="Uniq Decor Footer">
      
      {/* Ambient Lights */}
      <div className="absolute top-[-50px] right-[5%] w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(197,160,89,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[-5%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(201,162,39,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 footer-grid border-b border-white/5">
        
        {/* Column 1: Legacy Bio */}
        <div className="lg:col-span-3 footer-block">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <Image
              src="/logos/uniq-logo.png"
              alt="Uniq Decor Logo"
              width={160}
              height={44}
              className="h-[44px] w-auto object-contain"
            />
          </Link>
          <p className="text-[#D1DCD4] text-sm leading-relaxed mb-6 max-w-sm">
            Udaipur's premier curatorial studio for elite home fabrics, bespoke drapery, executive office layouts, and luxury B2B hospitality contract curations. Empowering spaces with legacy craftsmanship since 2016.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/2 text-[#EAEFF2] transition-all duration-300 hover:text-black hover:bg-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] hover:-translate-y-1 hover:shadow-lg" aria-label="Uniq Decor Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/2 text-[#EAEFF2] transition-all duration-300 hover:text-black hover:bg-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] hover:-translate-y-1 hover:shadow-lg" aria-label="Uniq Decor Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/2 text-[#EAEFF2] transition-all duration-300 hover:text-black hover:bg-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] hover:-translate-y-1 hover:shadow-lg" aria-label="Uniq Decor LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="lg:col-span-2 footer-block">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent-gold)] mb-6 relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-7 after:h-0.5 after:bg-[var(--color-accent-gold)]">
            Collections
          </h3>
          <ul className="flex flex-col gap-3.5 list-none p-0 m-0 text-sm">
            <li>
              <Link href="/ddecor" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                D'Decor Fabrics & Linens
              </Link>
            </li>
            <li>
              <Link href="/geeken" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Geeken Office Furniture
              </Link>
            </li>
            <li>
              <Link href="/roserro" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Roserro Hotel Linens
              </Link>
            </li>
            <li>
              <Link href="/laxree-amenities" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                LaxRee Resort Amenities
              </Link>
            </li>
            <li>
              <Link href="/laxree-roofing" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                LaxRee Premium Roofing
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Navigation */}
        <div className="lg:col-span-2 footer-block">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent-gold)] mb-6 relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-7 after:h-0.5 after:bg-[var(--color-accent-gold)]">
            Navigation
          </h3>
          <ul className="flex flex-col gap-3.5 list-none p-0 m-0 text-sm">
            <li>
              <Link href="/#brands" onClick={(e) => handleQuickLink(e, "brands")} className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Brand Hub Gallery
              </Link>
            </li>
            <li>
              <Link href="/#why-us" onClick={(e) => handleQuickLink(e, "why-us")} className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link href="/#journey" onClick={(e) => handleQuickLink(e, "journey")} className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Our Design Journey
              </Link>
            </li>
            <li>
              <Link href="/#showroom" onClick={(e) => handleQuickLink(e, "showroom")} className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Showroom Gallery
              </Link>
            </li>
            <li>
              <Link href="/#faq" onClick={(e) => handleQuickLink(e, "faq")} className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                FAQ Accordions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Official Brands */}
        <div className="lg:col-span-2 footer-block">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent-gold)] mb-6 relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-7 after:h-0.5 after:bg-[var(--color-accent-gold)]">
            Official Links
          </h3>
          <ul className="flex flex-col gap-3.5 list-none p-0 m-0 text-sm">
            <li>
              <a href="https://www.ddecor.com/" target="_blank" rel="noopener noreferrer" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                D'Decor <ExternalLink className="w-3 h-3 text-[var(--color-accent-gold)]" />
              </a>
            </li>
            <li>
              <a href="https://geeken.in/" target="_blank" rel="noopener noreferrer" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Geeken <ExternalLink className="w-3 h-3 text-[var(--color-accent-gold)]" />
              </a>
            </li>
            <li>
              <a href="https://laxree.com/" target="_blank" rel="noopener noreferrer" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                LaxRee Amenities <ExternalLink className="w-3 h-3 text-[var(--color-accent-gold)]" />
              </a>
            </li>
            <li>
              <a href="https://laxreeroofing.com/" target="_blank" rel="noopener noreferrer" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                LaxRee Roofing <ExternalLink className="w-3 h-3 text-[var(--color-accent-gold)]" />
              </a>
            </li>
            <li>
              <a href="https://roserro.com/" target="_blank" rel="noopener noreferrer" className="text-[#D1DCD4] hover:text-[var(--color-accent-gold)] hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                Roserro <ExternalLink className="w-3 h-3 text-[var(--color-accent-gold)]" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Address Block */}
        <div className="lg:col-span-3 footer-block">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent-gold)] mb-6 relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-7 after:h-0.5 after:bg-[var(--color-accent-gold)]">
            Udaipur Showroom
          </h3>
          <address className="not-italic text-[#D1DCD4] text-sm flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-[var(--color-accent-gold)] shrink-0 mt-0.5" />
              <div>
                <span>Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)</span>
                <br />
                <a 
                  href="https://www.google.com/maps/dir//2nd+floor,+Uniq+Decor+%26+Furniture,+Gokul+Tower,+F+Block,+Sector+14,+Hiran+Magri,+Udaipur,+Gordhan+Vilas+Rural,+Rajasthan+313001" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent-gold)] hover:text-white uppercase tracking-wider mt-2 transition-colors duration-200" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Map Location <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-[var(--color-accent-gold)] shrink-0" />
              <a href="tel:+919982219222" className="hover:text-[var(--color-accent-gold)] transition-colors">+91 99822 19222</a>
            </div>
            
            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-[var(--color-accent-gold)] shrink-0" />
              <a href="mailto:info@uniqdecor.com" className="hover:text-[var(--color-accent-gold)] transition-colors">info@uniqdecor.com</a>
            </div>
            
            <div className="flex gap-3 items-start">
              <Clock className="w-4 h-4 text-[var(--color-accent-gold)] shrink-0 mt-0.5" />
              <div>
                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
                <br />
                <span className="text-[11px] text-gray-500 font-medium">Sunday Closed</span>
              </div>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Utility Strip */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center py-8 text-xs text-[#D1DCD4] gap-4 bg-[#050806] mx-[-4.3%] px-[4%] mt-4">
        
        {/* Scroll-To-Top Trigger */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
          <button 
            className="flex items-center justify-center w-12 h-12 bg-[var(--color-accent-gold)] hover:bg-white text-[#080D09] hover:text-[var(--color-accent-gold)] border-[6px] border-[#080D09] rounded-full cursor-pointer shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
            onClick={scrollToTop}
            aria-label="Scroll Back to Top"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="text-center md:text-left flex flex-col gap-1.5">
          <span>&copy; {new Date().getFullYear()} Uniq Decor Udaipur. All Rights Reserved.</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">GST: 08ABCPG1457G2ZX &middot; Rajasthan &middot; PAN India Delivery</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
          <Link href="/privacy" className="hover:text-[var(--color-accent-gold)] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[var(--color-accent-gold)] transition-colors">Terms of Service</Link>
          <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-gold)] transition-colors">Robots.txt</a>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-gold)] transition-colors">Sitemap</a>
          <span className="text-white/10 hidden sm:inline">|</span>
          <span className="text-gray-500">Curation by <strong className="text-white font-semibold">AARTIQ ITECH</strong></span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Phone } from "lucide-react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/ddecor", label: "D'Decor" },
  { href: "/geeken", label: "Geeken Office" },
  { href: "/roserro", label: "Roserro Linen" },
  { href: "/laxree-amenities", label: "LaxRee Amenities" },
  { href: "/laxree-roofing", label: "LaxRee Roofing" },
  { href: "/blog", label: "Blog" },
  { href: "/sitemap", label: "Sitemap" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=site:uniqdecorfurniture.in+${encodeURIComponent(searchQuery.trim())}`, "_blank");
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isDrawerOpen]);

  // Sync body theme class with current path
  useEffect(() => {
    const themeMap = {
      "/": "theme-homepage",
      "/ddecor": "theme-ddecor",
      "/geeken": "theme-geeken",
      "/roserro": "theme-roserro",
      "/laxree-amenities": "theme-laxree-amenities",
      "/laxree-roofing": "theme-laxree",
      "/laxree": "theme-laxree",
    };

    const activeTheme = themeMap[pathname] || "theme-homepage";

    // Remove any previous theme classes from body
    Object.values(themeMap).forEach((cls) => {
      document.body.classList.remove(cls);
    });

    // Add active theme class to body
    document.body.classList.add(activeTheme);
  }, [pathname]);

  // Handle mobile link click
  const handleLinkClick = (e, href) => {
    setIsDrawerOpen(false);

    // If it's a section anchor on the homepage, handle it smoothly
    if (href.startsWith("/#") || href === "/") {
      const isHomepage = pathname === "/";
      const targetId = href.includes("#") ? href.split("#")[1] : "homepage-root";
      
      if (isHomepage) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          const offset = isScrolled
            ? (window.innerWidth >= 1024 ? 100 : 54)
            : (window.innerWidth >= 1024 ? 124 : 112);
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: targetId === "homepage-root" ? 0 : offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      {/* Red Promo Banner */}
      <div
        className="absolute lg:fixed top-0 left-0 w-full h-[40px] bg-[#D32F2F] text-white flex items-center justify-center z-[100000] font-sans text-[11px] md:text-xs font-bold tracking-wider uppercase px-4 text-center border-b border-black/15 shadow-md"
        role="banner"
      >
        🔥 Premium Brands Showroom in Udaipur — Authorized Dealer for D'Decor, Geeken & LaxRee
      </div>

      {/* Main Header */}
      <header
        className={`fixed left-0 w-full flex items-center justify-between px-[5%] z-[99999] transition-all duration-400 font-sans border-b border-[var(--color-accent-gold)]/15 ${
          isScrolled
            ? "top-0 lg:top-[40px] h-[54px] md:h-[60px] bg-white shadow-md border-b-[var(--color-border)]"
            : "top-[40px] h-[72px] md:h-[84px] bg-white"
        }`}
        aria-label="Main Navigation"
      >
        {/* Branding Emblem */}
        <Link
          href="/"
          className="flex items-center gap-3 decoration-none group"
          onClick={(e) => handleLinkClick(e, "/")}
        >
          <Image
            src="/logos/uniq-logo.png"
            alt="Uniq Decor Logo"
            width={180}
            height={50}
            className={`w-auto object-contain transition-all duration-400 ${
              isScrolled ? "h-[32px] md:h-[38px]" : "h-[42px] md:h-[50px]"
            }`}
            style={{ width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Desktop Navigation Links" className="hidden lg:block">
          <ul className="flex gap-8 list-none p-0 m-0">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative py-1.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[var(--color-accent-primary)] before:transition-all before:duration-300 hover:text-[var(--color-text-primary)] hover:before:w-full ${
                      isActive
                        ? "text-[var(--color-text-primary)] before:w-full"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA & Mobile burger */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Phone - always visible */}
          <a
            href="tel:+919982219222"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Call Uniq Decor"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">+91 99822 19222</span>
          </a>

          {/* Search toggle */}
          <button
            className="flex items-center justify-center w-8 h-8 bg-transparent border-none cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link
            href="/#section-showroom"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-[var(--color-accent-primary)] rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-accent-primary)] transition-all duration-400 hover:bg-[var(--color-accent-primary)] hover:text-white hover:-translate-y-0.5 hover:shadow-md cursor-hover"
            onClick={(e) => handleLinkClick(e, "/#section-showroom")}
          >
            Book Visit
          </Link>

          <button
            className="lg:hidden flex flex-col justify-between w-6 h-4.5 bg-transparent border-none cursor-pointer z-[100000]"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle Navigation Drawer Menu"
            aria-expanded={isDrawerOpen}
          >
            {isDrawerOpen ? (
              <X className="w-6 h-6 text-[var(--color-accent-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--color-text-primary)]" />
            )}
          </button>
        </div>

        {/* Mobile Slide Drawer Overlay */}
        <div
          className={`fixed top-0 right-0 w-full h-screen bg-[#FAF9F6]/95 backdrop-blur-xl z-[99998] flex flex-col items-center justify-center px-10 pt-24 pb-16 transition-transform duration-500 ease-in-out lg:hidden ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <ul className="list-none p-0 m-0 mb-12 flex flex-col items-center gap-6">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block text-lg font-medium tracking-widest uppercase transition-colors hover:text-[var(--color-accent-primary)] ${
                      isActive
                        ? "text-[var(--color-accent-primary)] font-bold"
                        : "text-[var(--color-text-primary)]"
                    }`}
                    style={{
                      transitionDelay: `${idx * 0.05}s`,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="transition-all duration-400 delay-300">
            <Link
              href="/#section-showroom"
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-accent-primary)] rounded-full text-xs font-bold uppercase tracking-widest text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white"
              onClick={(e) => handleLinkClick(e, "/#section-showroom")}
            >
              Book Showroom Visit
            </Link>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <div
        className={`fixed top-0 left-0 w-full z-[99998] transition-all duration-300 ${
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: isScrolled ? "54px" : "72px", marginTop: "40px" }}
      >
        <div className="bg-white shadow-lg border-b border-black/10 px-[5%] py-4">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, blog posts... (Google site search)"
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder:text-gray-400 font-sans"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-accent-primary)] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-sans"
            >
              ESC
            </button>
          </form>
        </div>
        {/* Backdrop */}
        <div className="h-screen bg-black/20" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} />
      </div>
    </>
  );
}

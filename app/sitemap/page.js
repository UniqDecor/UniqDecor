import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Sitemap | Uniq Decor Udaipur",
  description: "Complete site map of Uniq Decor showroom in Udaipur. Browse all pages across D'Decor, Geeken, Roserro, LaxRee Amenities, and LaxRee Roofing brands.",
};

const SECTIONS = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/blog", label: "Blog" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    title: "Brand Hubs",
    links: [
      { href: "/ddecor", label: "D'Decor — Premium Fabrics & Curtains" },
      { href: "/geeken", label: "Geeken — Ergonomic Office Furniture" },
      { href: "/roserro", label: "Roserro — Luxury Hotel Linens" },
      { href: "/laxree", label: "LaxRee Portal" },
      { href: "/laxree-amenities", label: "LaxRee — Hospitality Amenities" },
      { href: "/laxree-roofing", label: "LaxRee — Roofing Solutions" },
    ],
  },
  {
    title: "D'Decor Categories",
    links: [
      "/ddecor/curtains", "/ddecor/upholstery", "/ddecor/wallpapers", "/ddecor/bedding",
      "/ddecor/cushions", "/ddecor/duvet-cover", "/ddecor/comforter", "/ddecor/blinds",
      "/ddecor/rugs", "/ddecor/ready-made-curtains", "/ddecor/bath-linens",
      "/ddecor/kids-bedding", "/ddecor/gifting",
    ].map((href) => ({ href, label: href.replace("/ddecor/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "D'Decor Locations",
    links: [
      "/ddecor/locations/hiran-magri", "/ddecor/locations/shobhagpura", "/ddecor/locations/bhuwana",
      "/ddecor/locations/fatehpura", "/ddecor/locations/panchwati", "/ddecor/locations/madhuban",
    ].map((href) => ({ href, label: href.replace("/ddecor/locations/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "D'Decor Materials",
    links: [
      "/ddecor/materials/velvet-curtains", "/ddecor/materials/blackout-curtains",
      "/ddecor/materials/stain-resistant-fabrics", "/ddecor/materials/motorized-drapes",
      "/ddecor/materials/roller-blinds", "/ddecor/materials/roman-shades",
      "/ddecor/materials/sheer-curtains",
    ].map((href) => ({ href, label: href.replace("/ddecor/materials/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "D'Decor Hospitality",
    links: [
      "/ddecor/hospitality/hotel-curtains", "/ddecor/hospitality/mewari-heritage",
      "/ddecor/hospitality/villa-furnishing", "/ddecor/hospitality/banquet-linens",
    ].map((href) => ({ href, label: href.replace("/ddecor/hospitality/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "Geeken",
    links: [
      "/geeken/ergonomic-chairs", "/geeken/workstations", "/geeken/storage", "/geeken/healthcare",
      "/geeken/locations",
    ].map((href) => ({ href, label: href.replace("/geeken/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "Roserro",
    links: [
      "/roserro/bed-linen", "/roserro/bath-linen", "/roserro/banquet-linen", "/roserro/healthcare-linen",
      "/roserro/locations",
    ].map((href) => ({ href, label: href.replace("/roserro/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "LaxRee Amenities",
    links: [
      "/laxree-amenities/room-amenities", "/laxree-amenities/washroom-amenities",
      "/laxree-amenities/lobby-amenities", "/laxree-amenities/restaurant-furniture",
      "/laxree-amenities/banquet-furniture", "/laxree-amenities/outdoor-furniture",
      "/laxree-amenities/space-pods", "/laxree-amenities/locations",
    ].map((href) => ({ href, label: href.replace("/laxree-amenities/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "LaxRee Roofing",
    links: [
      "/laxree-roofing/stone-coated-tiles", "/laxree-roofing/synthetic-thatch",
      "/laxree-roofing/asphalt-shingles", "/laxree-roofing/locations",
    ].map((href) => ({ href, label: href.replace("/laxree-roofing/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  },
  {
    title: "Blog Posts",
    links: [
      { href: "/blog/curtain-fabrics-guide-udaipur", label: "Complete Guide to Curtain Fabrics in Udaipur" },
      { href: "/blog/best-ergonomic-office-chairs-udaipur", label: "Best Ergonomic Office Chairs in Udaipur 2026" },
      { href: "/blog/hotel-linen-thread-count-gsm-guide", label: "Hotel Linen Guide: Thread Count & GSM Explained" },
      { href: "/blog/stone-coated-roofing-vs-clay-tiles", label: "Stone Coated Roofing Tiles vs Clay Tiles" },
      { href: "/blog/hotel-room-amenities-guide-udaipur", label: "Hotel Room Amenities Guide for Udaipur Resorts" },
      { href: "/blog/ddecor-vs-other-brands-udaipur", label: "D'Decor vs Other Fabric Brands Comparison" },
      { href: "/blog/choose-wallpaper-udaipur-home", label: "How to Choose Wallpaper for Udaipur Homes" },
      { href: "/blog/office-furniture-setup-guide-udaipur", label: "Office Furniture Setup Guide for Udaipur Businesses" },
      { href: "/blog/geeken-bifma-certification-standards", label: "Geeken BIFMA Certifications Explained" },
      { href: "/blog/hospitality-linen-supplier-udaipur", label: "Hospitality Linen Supplier Udaipur — B2B Guide" },
      { href: "/blog/roserro-vs-other-linen-brands", label: "Roserro vs Other Linen Brands Comparison" },
      { href: "/blog/silent-minibar-vs-traditional-comparison", label: "Silent Minibar vs Traditional Minibar Comparison" },
      { href: "/blog/synthetic-thatch-roofing-resort-guide", label: "Synthetic Thatch Roofing for Resorts Guide" },
      { href: "/blog/asphalt-shingles-vs-metal-roofing", label: "Asphalt Shingles vs Metal Roofing Cost Comparison" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <header className="border-b border-[#2C5282]/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Navigation</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            HTML Sitemap
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-3 leading-relaxed max-w-2xl">
            Complete index of all pages on Uniq Decor Udaipur. Browse by brand or category.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h2 className="font-serif text-base font-bold text-[#1A202C] mb-4 pb-2 border-b border-black/5">
                {section.title}
              </h2>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#2C5282] hover:text-[#C9A227] transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

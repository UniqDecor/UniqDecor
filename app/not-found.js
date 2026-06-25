import Link from "next/link";

export const metadata = {
  title: "Page Not Found - Uniq Decor",
  description: "The page you are looking for does not exist at Uniq Decor. Browse our premium furniture, curtains, and home decor showroom in Udaipur.",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
      <div className="max-w-lg mx-auto text-center">
        <span className="text-[200px] font-serif font-bold text-[#8B4513]/10 leading-none select-none">404</span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2D2A26] -mt-10 mb-4">Page Not Found</h1>
        <p className="text-[#6B6560] text-sm leading-relaxed mb-8">
          The page you are looking for might have been moved, removed, or does not exist. 
          Visit our showroom in Udaipur or browse our collections below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="px-6 py-3 bg-[#8B4513] text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#6B3410] transition-colors">
            Back to Home
          </Link>
          <a href="tel:+919982219222" className="px-6 py-3 border border-[#8B4513]/20 text-[#8B4513] text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#8B4513]/5 transition-colors">
            Call Showroom
          </a>
        </div>
        <div className="border-t border-[#8B4513]/10 pt-8">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#2D2A26] mb-4">Popular Pages</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link href="/ddecor" className="text-[#6B6560] hover:text-[#8B4513] transition-colors">D'Decor Fabrics</Link>
            <Link href="/geeken" className="text-[#6B6560] hover:text-[#8B4513] transition-colors">Geeken Furniture</Link>
            <Link href="/roserro" className="text-[#6B6560] hover:text-[#8B4513] transition-colors">Roserro Linens</Link>
            <Link href="/laxree-amenities" className="text-[#6B6560] hover:text-[#8B4513] transition-colors">LaxRee Amenities</Link>
            <Link href="/laxree-roofing" className="text-[#6B6560] hover:text-[#8B4513] transition-colors">LaxRee Roofing</Link>
            <Link href="/about" className="text-[#6B6560] hover:text-[#8B4513] transition-colors">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

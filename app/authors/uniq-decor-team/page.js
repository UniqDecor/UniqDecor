import Link from "next/link";
import { ArrowLeft, User, BookOpen, MapPin } from "lucide-react";

export const metadata = {
  title: "Uniq Decor Team | Authors",
  description: "Meet the content team at Uniq Decor showroom in Udaipur — experts in curtain fabrics, office furniture, hotel linens, roofing, and home decor.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://uniqdecorfurniture.in/authors/uniq-decor-team",
  "name": "Uniq Decor Team",
  "jobTitle": "Content & Product Specialists",
  "description": "The content team at Uniq Decor, Udaipur's premier multi-brand furniture and home decor showroom. Specializing in curtains, office furniture, hospitality linens, roofing, and amenities.",
  "url": "https://uniqdecorfurniture.in/authors/uniq-decor-team",
  "worksFor": { "@id": "https://uniqdecorfurniture.in/#organization" },
  "sameAs": [
    "https://www.facebook.com/uniqdecor",
    "https://www.instagram.com/uniqdecor",
    "https://www.linkedin.com/company/uniqdecor"
  ]
};

export default function AuthorPage() {
  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        <header className="border-b border-[#2C5282]/10 pb-8 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Author</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight flex items-center gap-4">
            <User className="w-8 h-8 text-[#C9A227]" /> Uniq Decor Team
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-3 leading-relaxed">
            Content and product specialists at Udaipur&apos;s premier multi-brand furniture and home decor showroom.
          </p>
        </header>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
          <section>
            <h2 className="font-serif text-lg font-bold text-[#1A202C] mb-3">About</h2>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              The Uniq Decor Team brings together expertise across curtain fabrics, office furniture, hospitality linens, roofing solutions, and hotel amenities. Based at our Hiran Magri showroom in Udaipur, we create practical guides to help homeowners, hoteliers, and businesses make informed purchasing decisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C9A227]" /> Expertise
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#4A5568]">
              <li className="flex items-center gap-2">• D'Decor curtain fabrics & wallpapers</li>
              <li className="flex items-center gap-2">• Geeken ergonomic office furniture</li>
              <li className="flex items-center gap-2">• Roserro hotel & hospitality linens</li>
              <li className="flex items-center gap-2">• LaxRee guest room amenities</li>
              <li className="flex items-center gap-2">• LaxRee roofing solutions</li>
              <li className="flex items-center gap-2">• Interior design & home decor</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C9A227]" /> Location
            </h2>
            <p className="text-sm text-[#4A5568]">
              Uniq Decor, 2nd Floor, Gokul Tower, Hiran Magri, Sector 14, Udaipur, Rajasthan 313001
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C9A227] hover:text-[#2C5282] transition-colors">
            <ArrowLeft className="w-4 h-4" /> View All Blog Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

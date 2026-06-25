import Link from "next/link";
import { ArrowLeft, User, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Authors | Uniq Decor Udaipur",
  description: "Meet the content team at Uniq Decor showroom in Udaipur.",
};

const authors = [
  {
    slug: "uniq-decor-team",
    name: "Uniq Decor Team",
    role: "Content & Product Specialists",
    bio: "Content and product specialists at Udaipur's premier multi-brand furniture and home decor showroom.",
  },
];

export default function AuthorsIndexPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Uniq Decor Authors",
    "itemListElement": authors.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": { "@type": "Person", "name": a.name, "url": `https://uniqdecorfurniture.in/authors/${a.slug}` },
    })),
  };

  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        <header className="border-b border-[#2C5282]/10 pb-8 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">People</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">Our Authors</h1>
        </header>
        <div className="space-y-4">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="block bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A227]/10 text-[#C9A227] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-lg font-bold text-[#1A202C] group-hover:text-[#C9A227] transition-colors">{author.name}</h2>
                  <p className="text-xs text-[#4A5568]">{author.role}</p>
                  <p className="text-xs text-[#4A5568] mt-1">{author.bio}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#C9A227]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

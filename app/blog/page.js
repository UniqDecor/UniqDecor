import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Calendar, User } from "lucide-react";
import { BLOG_POSTS, BLOG_META } from "./blogData";

export const metadata = {
  title: BLOG_META.title,
  description: BLOG_META.description,
  openGraph: {
    title: BLOG_META.title,
    description: BLOG_META.description,
    url: "https://uniqdecorfurniture.in/blog",
    siteName: "Uniq Decor",
    locale: "en_US",
    type: "website",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": BLOG_META.title,
  "description": BLOG_META.description,
  "url": "https://uniqdecorfurniture.in/blog",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": BLOG_POSTS.map((post, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://uniqdecorfurniture.in/blog/${post.slug}`,
    })),
  },
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@graph": BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://uniqdecorfurniture.in${post.image}`,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "author": {
      "@id": "https://uniqdecorfurniture.in/authors/uniq-decor-team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Uniq Decor",
      "logo": {
        "@type": "ImageObject",
        "url": "https://uniqdecorfurniture.in/photos/UNIQ-DECOR-Logo.webp",
      },
    },
    "url": `https://uniqdecorfurniture.in/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://uniqdecorfurniture.in/blog/${post.slug}`,
    },
  })),
};

export default function BlogIndexPage() {
  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <header className="border-b border-[#2C5282]/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-bold block mb-3">Resources</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
            Uniq Decor Blog
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-3 leading-relaxed max-w-2xl">
            Expert guides on curtain fabrics, office furniture, hotel linens, roofing, and home decor from Udaipur&apos;s premier showroom.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 bg-[#C9A227] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-[#4A5568] mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.datePublished}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <h2 className="font-serif text-lg font-bold text-[#1A202C] group-hover:text-[#C9A227] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-xs text-[#4A5568] leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5282] group-hover:text-[#C9A227] transition-colors mt-4">
                  Read More <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

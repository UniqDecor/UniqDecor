import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "../blogData";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Uniq Decor Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://uniqdecorfurniture.in/blog/${post.slug}`,
      siteName: "Uniq Decor",
      locale: "en_US",
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [{ url: `https://uniqdecorfurniture.in${post.image}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://uniqdecorfurniture.in${post.image}`,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "author": { "@id": "https://uniqdecorfurniture.in/authors/uniq-decor-team" },
    "publisher": {
      "@type": "Organization",
      "name": "Uniq Decor",
      "logo": { "@type": "ImageObject", "url": "https://uniqdecorfurniture.in/photos/UNIQ-DECOR-Logo.webp" },
    },
    "url": `https://uniqdecorfurniture.in/blog/${post.slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://uniqdecorfurniture.in/blog/${post.slug}` },
    "about": { "@type": "Thing", "name": post.category },
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  } : null;

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <div className="theme-homepage bg-[#FAF9F6] text-[#1A202C] min-h-screen pt-32 pb-20 px-4 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        <header className="border-b border-[#2C5282]/10 pb-8 mb-10">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#4A5568] mb-4 flex-wrap">
            <span className="bg-[#C9A227]/10 text-[#C9A227] font-bold px-3 py-1 rounded-full">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.datePublished}</span>
            {post.dateModified && post.dateModified !== post.datePublished && (
              <span className="flex items-center gap-1 text-[10px] text-gray-400">Updated: {post.dateModified}</span>
            )}
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A202C] leading-tight">
            {post.title}
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base mt-4 leading-relaxed">
            {post.description}
          </p>
        </header>

        {post.image && (
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-sm">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority />
          </div>
        )}

        <article className="space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1A202C] mb-3">{section.heading}</h2>
              <p className="text-sm md:text-base text-[#4A5568] leading-relaxed">{section.body}</p>
            </section>
          ))}
        </article>

        {post.faq && post.faq.length > 0 && (
          <section className="mt-12 bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1A202C] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {post.faq.map((item, i) => (
                <div key={i} className="border-b border-black/5 pb-5 last:border-0 last:pb-0">
                  <h3 className="font-bold text-sm text-[#1A202C] mb-2">{item.q}</h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-[#2C5282]/10 flex flex-col sm:flex-row justify-between gap-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-2 text-xs font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> {prevPost.title}
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group flex items-center gap-2 text-xs font-bold text-[#2C5282] hover:text-[#C9A227] transition-colors">
              {nextPost.title} <ChevronRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C9A227] hover:text-[#2C5282] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Visit Uniq Decor Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}

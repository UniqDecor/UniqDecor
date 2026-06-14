export const metadata = {
  title: "LaxRee - Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)",
  description: "Discover LaxRee's premium solutions in Udaipur: Luxury hotel room guest amenities and architectural villa roofing (stone coated metal tiles, synthetic thatch).",
  alternates: {
    canonical: "/laxree",
  },
};

export default function LaxreeLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LaxRee Luxury Hospitality Amenities & Resort Roofing Udaipur - Uniq Decor",
    "description": "Discover LaxRee's premium solutions in Udaipur: Luxury hotel room guest amenities and architectural villa roofing (stone coated metal tiles, synthetic thatch).",
    "url": "https://uniqdecorfurniture.in/laxree",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://uniqdecorfurniture.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "LaxRee Brand Portal",
          "item": "https://uniqdecorfurniture.in/laxree"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

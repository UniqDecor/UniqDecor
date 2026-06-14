export const metadata = {
  title: "LaxRee Roofing - Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)",
  description: "Authorized dealer for LaxRee roofing tiles and resort thatch in Udaipur. Premium stone-coated metal roof tiles, synthetic thatch, and asphalt shingles.",
  alternates: {
    canonical: "/laxree-roofing",
  },
};

export default function LaxreeRoofingLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LaxRee Roofing & Resort Thatch - Uniq Decor",
    "description": "Authorized dealer for LaxRee roofing tiles and resort thatch in Udaipur. Premium stone-coated metal roof tiles, synthetic thatch, and asphalt shingles.",
    "url": "https://uniqdecorfurniture.in/laxree-roofing",
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
          "name": "LaxRee Roofing",
          "item": "https://uniqdecorfurniture.in/laxree-roofing"
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

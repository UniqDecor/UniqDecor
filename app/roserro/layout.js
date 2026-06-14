export const metadata = {
  title: "Roserro - Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)",
  description: "Authorized dealer of Roserro hospitality linens in Udaipur. Explore 300+ TC organic cotton bedsheets, spa bathrobes, hotel bath sheets, and teak beds.",
  alternates: {
    canonical: "/roserro",
  },
};

export default function RoserroLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Roserro Luxury Bed Linens & Spa Bathrobes - Uniq Decor",
    "description": "Authorized dealer of Roserro hospitality linens in Udaipur. Explore 300+ TC organic cotton bedsheets, spa bathrobes, hotel bath sheets, and teak beds.",
    "url": "https://uniqdecorfurniture.in/roserro",
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
          "name": "Roserro Linen",
          "item": "https://uniqdecorfurniture.in/roserro"
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

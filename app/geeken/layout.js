export const metadata = {
  title: "Geeken - Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)",
  description: "Discover Geeken's range of ergonomic office chairs, modular executive tables, workstation desks, and conference tables in Udaipur at Uniq Decor.",
  alternates: {
    canonical: "/geeken",
  },
};

export default function GeekenLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Geeken Office Furniture & Ergonomic Chairs Udaipur - Uniq Decor",
    "description": "Discover Geeken's range of ergonomic office chairs, modular executive tables, workstation desks, and conference tables in Udaipur at Uniq Decor.",
    "url": "https://uniqdecorfurniture.in/geeken",
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
          "name": "Geeken Office",
          "item": "https://uniqdecorfurniture.in/geeken"
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

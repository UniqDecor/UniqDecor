export const metadata = {
  title: "D'Decor - Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)",
  description: "Authorized D'Decor fabrics in Udaipur. Explore premium curtains, custom sofa weaves, cushion covers, bedsheets, and bath linens at Uniq Decor.",
  alternates: {
    canonical: "/ddecor",
  },
};

export default function DdecorLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "D'Decor Showroom Udaipur - Uniq Decor",
    "description": "Authorized D'Decor fabrics in Udaipur. Explore premium curtains, custom sofa weaves, cushion covers, bedsheets, and bath linens at Uniq Decor.",
    "url": "https://uniqdecorfurniture.in/ddecor",
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
          "name": "D'Decor",
          "item": "https://uniqdecorfurniture.in/ddecor"
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

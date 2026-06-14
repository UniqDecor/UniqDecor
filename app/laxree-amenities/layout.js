export const metadata = {
  title: "LaxRee Amenities - Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)",
  description: "Authorized LaxRee hotel guest room supplies in Udaipur. We supply silent minibars, digital safes, hair dryers, lobby luggage trolleys, and banquet furniture.",
  alternates: {
    canonical: "/laxree-amenities",
  },
};

export default function LaxreeAmenitiesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LaxRee Hotel Amenities & Guest Room Supplies Supplier - Uniq Decor",
    "description": "Authorized LaxRee hotel guest room supplies in Udaipur. We supply silent minibars, digital safes, hair dryers, lobby luggage trolleys, and banquet furniture.",
    "url": "https://uniqdecorfurniture.in/laxree-amenities",
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
          "name": "LaxRee Amenities",
          "item": "https://uniqdecorfurniture.in/laxree-amenities"
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

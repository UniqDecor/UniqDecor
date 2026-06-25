export const metadata = {
  title: "Geeken Office Furniture Udaipur | Ergonomic Chairs",
  description: "Authorized Geeken dealer in Udaipur — explore premium ergonomic chairs, modular workstations, and steel lockers. Get B2B pricing + free layout audit at our Hiran Magri showroom.",
  author: "Uniq Decor Team",
  datePublished: "2026-06-01",
  dateModified: "2026-06-25",
  alternates: {
    canonical: "/geeken",
  },
  openGraph: {
    title: "Geeken Office Furniture Udaipur | Ergonomic Chairs",
    description: "Visit Uniq Decor, the leading distributor of Geeken Office Furniture Udaipur. Discover ergonomic office chairs, modular tables, and executive desks.",
    url: "https://uniqdecorfurniture.in/geeken",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geeken Office Furniture Udaipur | Ergonomic Chairs",
    description: "Visit Uniq Decor, the leading distributor of Geeken Office Furniture Udaipur. Discover ergonomic office chairs, modular tables, and executive desks.",
  },
};

export default function GeekenLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://uniqdecorfurniture.in/geeken/#webpage",
        "url": "https://uniqdecorfurniture.in/geeken",
        "name": "Geeken Office Furniture & Ergonomic Chairs Udaipur - Uniq Decor",
        "description": "Visit Uniq Decor, the leading distributor of Geeken Office Furniture Udaipur. Discover ergonomic office chairs, modular tables, and executive desks.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://uniqdecorfurniture.in/#website",
          "name": "Uniq Decor",
          "url": "https://uniqdecorfurniture.in/"
        },
        "publisher": {
          "@type": "LocalBusiness",
          "@id": "https://uniqdecorfurniture.in/#store"
        },
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
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://uniqdecorfurniture.in/#store",
        "name": "UNIQ Decor Showroom Udaipur",
        "sameAs": [
          "https://www.facebook.com/uniqdecor",
          "https://www.instagram.com/uniqdecor",
          "https://www.linkedin.com/company/uniqdecor",
          "https://www.youtube.com/@uniqdecor"
        ],
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "IN",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnFees": "https://schema.org/FreeReturn"
        },
        "hasShippingService": {
          "@type": "ShippingService",
          "name": "Uniq Decor Delivery Across Rajasthan",
          "areaServed": {
            "@type": "State",
            "name": "Rajasthan"
          },
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 25,
            "unitText": "business days"
          },
          "shippingRate": {
            "@type": "MonetaryAmount",
            "currency": "INR",
            "value": "0"
          },
          "shippingDestination": {
            "@type": "AdministrativeArea",
            "name": "Udaipur"
          }
        }
      }
    ]
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

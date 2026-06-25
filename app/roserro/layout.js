export const metadata = {
  title: "Roserro Mattress Udaipur | Premium Mattress & Bed Showroom",
  description: "Roserro luxury hotel linens supplier in Udaipur. Shop 300+ TC bed sheets, spa bath towels, banquet tablecloths at Uniq Decor. Bulk B2B orders with custom embroidery available.",
  author: "Uniq Decor Team",
  datePublished: "2026-06-01",
  dateModified: "2026-06-25",
  alternates: {
    canonical: "/roserro",
  },
  openGraph: {
    title: "Roserro Mattress Udaipur | Premium Mattress & Bed Showroom",
    description: "Authorized dealer of Roserro Mattress Udaipur at Uniq Decor. Explore 300+ TC organic cotton bedsheets, spa bathrobes, hotel towels, and teak beds.",
    url: "https://uniqdecorfurniture.in/roserro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roserro Mattress Udaipur | Premium Mattress & Bed Showroom",
    description: "Authorized dealer of Roserro Mattress Udaipur at Uniq Decor. Explore 300+ TC organic cotton bedsheets, spa bathrobes, hotel towels, and teak beds.",
  },
};

export default function RoserroLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://uniqdecorfurniture.in/roserro/#webpage",
        "url": "https://uniqdecorfurniture.in/roserro",
        "name": "Roserro Mattress Udaipur | Luxury Bed Linens & Spa Bathrobes - Uniq Decor",
        "description": "Authorized dealer of Roserro Mattress Udaipur at Uniq Decor. Explore 300+ TC organic cotton bedsheets, spa bathrobes, hotel towels, and teak beds.",
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
              "name": "Roserro Linen",
              "item": "https://uniqdecorfurniture.in/roserro"
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

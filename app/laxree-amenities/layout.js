export const metadata = {
  title: "LaxRee Hotel Amenities Udaipur | Premium Guest Room Supplies",
  description: "LaxRee Hotel Amenities Udaipur — premium silent minibars, digital safes, hair dryers, and lobby supplies. Authorized dealer at Uniq Decor. Bulk hotel supply contracts welcome.",
  author: "Uniq Decor Team",
  datePublished: "2026-06-01",
  dateModified: "2026-06-25",
  alternates: {
    canonical: "/laxree-amenities",
  },
  openGraph: {
    title: "LaxRee Hotel Amenities Udaipur | Premium Guest Room Supplies",
    description: "Authorized dealer for LaxRee Hotel Amenities Udaipur at Uniq Decor. We supply silent minibars, digital safes, hair dryers, and lobby luggage trolleys.",
    url: "https://uniqdecorfurniture.in/laxree-amenities",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaxRee Hotel Amenities Udaipur | Premium Guest Room Supplies",
    description: "Authorized dealer for LaxRee Hotel Amenities Udaipur at Uniq Decor. We supply silent minibars, digital safes, hair dryers, and lobby luggage trolleys.",
  },
};

export default function LaxreeAmenitiesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://uniqdecorfurniture.in/laxree-amenities/#webpage",
        "url": "https://uniqdecorfurniture.in/laxree-amenities",
        "name": "LaxRee Hotel Amenities Udaipur | Guest Room Supplies Supplier - Uniq Decor",
        "description": "Authorized dealer for LaxRee Hotel Amenities Udaipur at Uniq Decor. We supply silent minibars, digital safes, hair dryers, and lobby luggage trolleys.",
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
              "name": "LaxRee Amenities",
              "item": "https://uniqdecorfurniture.in/laxree-amenities"
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

export const metadata = {
  title: "LaxRee Roofing Sheets Udaipur | Stone-Coated Metal Tiles",
  description: "LaxRee Roofing Sheets Udaipur — stone coated metal tiles, synthetic thatch, and asphalt shingles. ISO 9001 certified. Get a free quote for your resort or commercial project today.",
  author: "Uniq Decor Team",
  datePublished: "2026-06-01",
  dateModified: "2026-06-25",
  alternates: {
    canonical: "/laxree-roofing",
  },
  openGraph: {
    title: "LaxRee Roofing Sheets Udaipur | Stone-Coated Metal Tiles",
    description: "Authorized dealer for LaxRee Roofing Sheets Udaipur at Uniq Decor. We supply stone-coated metal roof tiles, synthetic thatch, and asphalt shingles.",
    url: "https://uniqdecorfurniture.in/laxree-roofing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaxRee Roofing Sheets Udaipur | Stone-Coated Metal Tiles",
    description: "Authorized dealer for LaxRee Roofing Sheets Udaipur at Uniq Decor. We supply stone-coated metal roof tiles, synthetic thatch, and asphalt shingles.",
  },
};

export default function LaxreeRoofingLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://uniqdecorfurniture.in/laxree-roofing/#webpage",
        "url": "https://uniqdecorfurniture.in/laxree-roofing",
        "name": "LaxRee Roofing Sheets Udaipur | Resort Thatch & Tiles - Uniq Decor",
        "description": "Authorized dealer for LaxRee Roofing Sheets Udaipur at Uniq Decor. We supply stone-coated metal roof tiles, synthetic thatch, and asphalt shingles.",
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
              "name": "LaxRee Roofing",
              "item": "https://uniqdecorfurniture.in/laxree-roofing"
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

export const metadata = {
  title: "D'Decor Showroom Udaipur | Premium Custom Curtains & Fabrics",
  description: "Visit D'Decor Showroom Udaipur at Uniq Decor for premium curtains, custom sofa fabrics, and luxury bed linens. Shop 44+ exclusive fabric collections or visit our Hiran Magri showroom today.",
  author: "Uniq Decor Team",
  datePublished: "2026-06-01",
  dateModified: "2026-06-25",
  alternates: {
    canonical: "/ddecor",
  },
  openGraph: {
    title: "D'Decor Showroom Udaipur | Premium Custom Curtains & Fabrics",
    description: "Visit the premier D'Decor Showroom Udaipur at Uniq Decor. Explore premium curtains, custom sofa weaves, cushion covers, bedsheets, and luxury bath linens.",
    url: "https://uniqdecorfurniture.in/ddecor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D'Decor Showroom Udaipur | Premium Custom Curtains & Fabrics",
    description: "Visit the premier D'Decor Showroom Udaipur at Uniq Decor. Explore premium curtains, custom sofa weaves, cushion covers, bedsheets, and luxury bath linens.",
  },
};

export default function DdecorLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://uniqdecorfurniture.in/ddecor/#webpage",
        "url": "https://uniqdecorfurniture.in/ddecor",
        "name": "D'Decor Showroom Udaipur | Custom Curtains & Sofa Fabrics - Uniq Decor",
        "description": "Visit the premier D'Decor Showroom Udaipur at Uniq Decor. Explore premium curtains, custom sofa weaves, cushion covers, bedsheets, and luxury bath linens.",
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
              "name": "D'Decor",
              "item": "https://uniqdecorfurniture.in/ddecor"
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

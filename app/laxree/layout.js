export const metadata = {
  title: "LaxRee Showroom Udaipur | Luxury Roofing & Hotel Supplies",
  description: "LaxRee Showroom Udaipur at Uniq Decor — premium hotel amenities and architectural roofing solutions. Visit our Hiran Magri showroom or call +91 99822 19222 for a free consultation.",
  author: "Uniq Decor Team",
  datePublished: "2026-06-01",
  dateModified: "2026-06-25",
  alternates: {
    canonical: "/laxree",
  },
  openGraph: {
    title: "LaxRee Showroom Udaipur | Luxury Roofing & Hotel Supplies",
    description: "Visit the official LaxRee Showroom Udaipur at Uniq Decor. Explore luxury hotel guest room amenities and premium architectural resort roofing solutions.",
    url: "https://uniqdecorfurniture.in/laxree",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaxRee Showroom Udaipur | Luxury Roofing & Hotel Supplies",
    description: "Visit the official LaxRee Showroom Udaipur at Uniq Decor. Explore luxury hotel guest room amenities and premium architectural resort roofing solutions.",
  },
};

export default function LaxreeLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://uniqdecorfurniture.in/laxree/#webpage",
        "url": "https://uniqdecorfurniture.in/laxree",
        "name": "LaxRee Luxury Hospitality Amenities & Resort Roofing Udaipur - Uniq Decor",
        "description": "Visit the official LaxRee Showroom Udaipur at Uniq Decor. Explore luxury hotel guest room amenities and premium architectural resort roofing solutions.",
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
              "name": "LaxRee Brand Portal",
              "item": "https://uniqdecorfurniture.in/laxree"
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

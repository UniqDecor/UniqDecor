"use client";

import Hero from "@/components/sections/homepage/Hero";
import BrandHub from "@/components/sections/homepage/BrandHub";
import OurClients from "@/components/sections/homepage/OurClients";
import Hospitality from "@/components/sections/homepage/Hospitality";
import DdecorSummary from "@/components/sections/homepage/DdecorSummary";
import GeekenSummary from "@/components/sections/homepage/GeekenSummary";
import RoserroSummary from "@/components/sections/homepage/RoserroSummary";
import LaxreeSummary from "@/components/sections/homepage/LaxreeSummary";
import WhyUs from "@/components/sections/homepage/WhyUs";
import Testimonials from "@/components/sections/homepage/Testimonials";
import Showroom from "@/components/sections/homepage/Showroom";
import ShowroomVisit from "@/components/sections/homepage/ShowroomVisit";
import Journey from "@/components/sections/homepage/Journey";
import FAQ from "@/components/sections/homepage/FAQ";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "UNIQ Decor",
    "image": [
      "https://uniqdecorfurniture.in/photos/HOMEPAGE%20IMAGE/STONE%20COATED%20ROOFING.jpg"
    ],
    "@id": "https://uniqdecorfurniture.in/#store",
    "url": "https://uniqdecorfurniture.in/",
    "telephone": "+919982219222",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14",
      "addressLocality": "Udaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.5420,
      "longitude": 73.6964
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/uniqdecor",
      "https://www.instagram.com/uniqdecor",
      "https://www.linkedin.com/company/uniqdecor",
      "https://www.youtube.com/@uniqdecor"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919982219222",
      "contactType": "sales",
      "email": "info@uniqdecor.com",
      "availableLanguage": ["English", "Hindi"]
    },
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
      "shippingDestination": [
        {
          "@type": "AdministrativeArea",
          "name": "Udaipur"
        }
      ],
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
      "deliveryTime": {
        "@type": "QuantitativeValue",
        "minValue": 3,
        "maxValue": 25,
        "unitText": "business days"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I customize furniture sizing and fabric selections at the Udaipur showroom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Custom tailoring is our absolute signature. Every sofa or lounge suite from Roserro Furniture can be dimensionally customized in size to match your room blueprint. Additionally, we house Udaipur's largest physical material library representing D'Decor Premium Fabrics, allowing you to select bespoke drapery sheer panels, cushion skins, and hotel headboards directly from premium fabric catalogs."
        }
      },
      {
        "@type": "Question",
        "name": "Which authorized premium brands are on active display in the gallery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Udaipur flagship gallery exhibits designated design blocks for our four authorized national brand partners: ROSERRO — Premium living room sofas, carved wooden lounge consoles, and luxury structural beds. D'DECOR — Authorized catalogs of high-rub curtains, sheers, wallpapers, and cushion fabrics. GEEKEN — Ergonomic corporate task chairs, active executive tables, and modular office partition spaces. LAXREE — Highly luxurious 400TC bedding linens, bath towels, and institutional hotel mattresses."
        }
      },
      {
        "@type": "Question",
        "name": "What warranty and quality protection is covered on custom items?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uncompromising material stability is guaranteed. Custom solid-wood furniture structures from Roserro include comprehensive warranty protection against teak framing defects. Office seating assets from Geeken Ergonomics include official brand warranty covers on high-performance gas lift mechanisms, base shells, and nylon castors. All textiles utilize high rub-count parameters for maximum wear resistance."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide full-scale site measurements for homes and offices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. For multi-room residences, entire luxury resort suites, and corporate workplace layouts in Udaipur, our technical experts perform high-accuracy laser site measurements. This guarantees that curtains are stitched to match perfect ceiling heights and ergonomic modular desks align with structural columns and power channels on the floor plan."
        }
      },
      {
        "@type": "Question",
        "name": "What is the expected delivery and setup timeline for Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard retail orders, ready-made ergonomic chairs, and in-stock hospitality bath linens are dispatched within 3 to 5 business days. Bespoke living suites, tailor-stitched D'Decor motorized curtains, and wholesale corporate workspaces require approximately 15 to 25 business days. This permits customized structure milling, hand-stitching, inspection, and white-glove site installation."
        }
      }
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "UNIQ Decor - Udaipur Furniture & Home Decor Store",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "245",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="theme-homepage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <Hero />
      <BrandHub />
      <OurClients />
      <Hospitality />
      <DdecorSummary />
      <GeekenSummary />
      <RoserroSummary />
      <LaxreeSummary />
      <WhyUs />
      <Testimonials />
      <Showroom />
      <ShowroomVisit />
      <Journey />
      <FAQ />
    </div>
  );
}

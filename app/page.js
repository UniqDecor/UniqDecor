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
import Journey from "@/components/sections/homepage/Journey";
import FAQ from "@/components/sections/homepage/FAQ";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "UNIQ Decor",
    "image": [
      "https://uniqdecorfurniture.in/wp-content/uploads/2024/01/stone-coated-roofing.jpg"
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
      "https://www.instagram.com/uniqdecor"
    ]
  };

  return (
    <div className="theme-homepage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      <Journey />
      <FAQ />
    </div>
  );
}

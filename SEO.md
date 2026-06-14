# UNIQ Decor & Furniture: Local SEO Architecture & Strategy

This document outlines the SEO implementation, page routing, and metadata configurations developed to optimize search rankings for the **D'Decor Udaipur** brand division.

---

## 1. Directory & Routing Architecture

To capture specific localized queries, the D'Decor segment is broken down into structured, static sub-directories.

```
f:\UNIQ\app\ddecor
├── page.js                      # Main D'Decor Atelier hub
├── layout.js                    # Breadcrumb & WebPage schema wrapper
├── categoriesData.js            # Main categories static database
│
├── [category]                   # Category Landing Pages (9 Pages)
│   └── page.js                  # Dynamic SSG page layout
│
├── locations                    # Hyper-Local Localities (6 Pages)
│   ├── [location]
│   │   └── page.js              # Localized neighborhood templates
│   └── locationsData.js         # Locality copy & target keywords
│
├── materials                    # Material Spec/Utility (7 Pages)
│   ├── [material]
│   │   └── page.js              # Technical specification templates
│   └── materialsData.js         # Fabric metrics & utility keywords
│
└── hospitality                  # B2B & Contract Niches (4 Pages)
    ├── [niche]
    │   └── page.js              # B2B Hospitality layouts
    └── hospitalityData.js       # Contract specifications & B2B copy
```

---

## 2. Core SEO Implementation Details

### A. Static Site Generation (SSG) for Crawlability
All dynamic routes are compiled into lightweight, static HTML at build time using Next.js `generateStaticParams()`. This ensures crawlers (like Googlebot) read fully rendered HTML content immediately on access.
```javascript
export async function generateStaticParams() {
  return Object.keys(DATA_STORE).map((key) => ({
    paramName: key,
  }));
}
```

### B. Dynamic Metadata Configs (`generateMetadata`)
Each page defines unique meta tags to prevent duplicate content issues.
- **Titles**: `Focus Keyword | Showroom Context - Uniq Decor`
- **Descriptions**: Target localized sentences incorporating core keywords, address location references, and call-to-actions.
- **Keywords**: Specific lists of 5-8 related long-tail search phrases.
- **Canonical Alternates**: Absolute self-referencing URLs (e.g. `/ddecor/locations/shobhagpura`) to consolidate link equity.
- **OpenGraph**: Rich social sharing configurations.

### C. Rich Schema Markups (JSON-LD)
Valid structured data is injected into the head of each template page:

1. **`LocalBusiness` (FurnitureStore/Service)**:
   - Sets physical store coordinates: Latitude `24.5956`, Longitude `73.7125`.
   - Incorporates the unified NAP (Name, Address, Phone) registry: `12, New Bhupalpura, Opp. Central Academy School, Udaipur, Rajasthan - 313001`.
   - Hyper-local targeting via neighborhood-specific `areaServed` property:
     ```json
     "areaServed": {
       "@type": "AdministrativeArea",
       "name": "Shobhagpura, Udaipur"
     }
     ```
2. **`Product` / `Service`**:
   - Applied to material and hospitality pages to mark up product catalog values, price aggregations (INR pricing scopes), brand identification (`D'Decor`), and availability ratings.

### D. Image Alt Text Optimization
Image alt text is dynamically built using the formula:
`"{Product Title} D'Decor {Context} store Udaipur"`
This avoids generic alt tags and indexes images inside local search queries.

### E. Internal Linking Ecosystem
- **Hub Directory**: The bottom of the primary D'Decor Atelier hub features a customized directory linking all locations, materials, and niche pages.
- **Cross-Linking**: Dynamic templates include contextual footer buttons to browse sister pages in the same category.
- **Sitemap**: Every static path is registered in [public/sitemap.xml](file:///f:/UNIQ/public/sitemap.xml).

---

## 3. Maintenance Guide: How to Expand Pages

To add a new page under any division, follow this simple procedure:

### Add a New Neighborhood Location
1. Open [app/ddecor/locationsData.js](file:///f:/UNIQ/app/ddecor/locationsData.js).
2. Append a new slug key (e.g., `fatehpura`) to the export object:
   ```javascript
   "fatehpura": {
     slug: "fatehpura",
     locationName: "Fatehpura",
     focusKeyword: "luxury curtains Fatehpura Udaipur",
     metaTitle: "Luxury Curtains Fatehpura Udaipur | Uniq Decor",
     metaDesc: "...",
     keywords: ["...", "..."],
     headline: "...",
     tagline: "...",
     mainImage: "https://images.unsplash.com/...",
     introText: "...",
     features: ["...", "..."],
     items: [/* Array of 6 products */],
     faqs: [/* Array of 3 FAQs */]
   }
   ```
3. Update [public/sitemap.xml](file:///f:/UNIQ/public/sitemap.xml) with the new URL:
   `/ddecor/locations/fatehpura`.
4. Run `npm run build` to compile the new static page automatically.

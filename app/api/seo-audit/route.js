import { NextResponse } from "next/server";
import fs from "fs";
import pathLib from "path";
import { google } from "googleapis";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const dynamic = "force-dynamic";

const PAGES_LIST = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
  "/ddecor",
  "/geeken",
  "/roserro",
  "/laxree",
  "/laxree-amenities",
  "/laxree-roofing",
  "/ddecor/curtains",
  "/ddecor/upholstery",
  "/ddecor/wallpapers",
  "/ddecor/bedding",
  "/ddecor/cushions",
  "/ddecor/duvet-cover",
  "/ddecor/comforter",
  "/ddecor/blinds",
  "/ddecor/rugs",
  "/ddecor/bath-linens",
  "/ddecor/ready-made-curtains",
  "/ddecor/kids-bedding",
  "/ddecor/gifting",
  "/ddecor/locations/shobhagpura",
  "/ddecor/locations/hiran-magri",
  "/ddecor/locations/bhuwana",
  "/ddecor/locations/panchwati",
  "/ddecor/locations/fatehpura",
  "/ddecor/locations/madhuban",
  "/ddecor/materials/velvet-curtains",
  "/ddecor/materials/blackout-curtains",
  "/ddecor/materials/stain-resistant-fabrics",
  "/ddecor/materials/motorized-drapes",
  "/ddecor/materials/roller-blinds",
  "/ddecor/materials/roman-shades",
  "/ddecor/materials/sheer-curtains",
  "/ddecor/hospitality/hotel-curtains",
  "/ddecor/hospitality/mewari-heritage",
  "/ddecor/hospitality/villa-furnishing",
  "/ddecor/hospitality/banquet-linens",
  "/geeken/ergonomic-chairs",
  "/geeken/workstations",
  "/geeken/storage",
  "/geeken/healthcare",
  "/geeken/locations",
  "/roserro/bed-linen",
  "/roserro/bath-linen",
  "/roserro/banquet-linen",
  "/roserro/healthcare-linen",
  "/roserro/locations",
  "/laxree-amenities/room-amenities",
  "/laxree-amenities/washroom-amenities",
  "/laxree-amenities/lobby-amenities",
  "/laxree-amenities/restaurant-furniture",
  "/laxree-amenities/banquet-furniture",
  "/laxree-amenities/outdoor-furniture",
  "/laxree-amenities/space-pods",
  "/laxree-amenities/locations",
  "/laxree-roofing/stone-coated-tiles",
  "/laxree-roofing/synthetic-thatch",
  "/laxree-roofing/asphalt-shingles",
  "/laxree-roofing/locations",
  "/blog/curtain-fabrics-guide-udaipur",
  "/blog/best-ergonomic-office-chairs-udaipur",
  "/blog/hotel-linen-thread-count-gsm-guide",
  "/blog/stone-coated-roofing-vs-clay-tiles",
  "/blog/hotel-room-amenities-guide-udaipur",
  "/blog/ddecor-vs-other-brands-udaipur",
  "/blog/choose-wallpaper-udaipur-home",
  "/blog/office-furniture-setup-guide-udaipur",
  "/blog/geeken-bifma-certification-standards",
  "/blog/hospitality-linen-supplier-udaipur",
  "/blog/roserro-vs-other-linen-brands",
  "/blog/silent-minibar-vs-traditional-comparison",
  "/blog/synthetic-thatch-roofing-resort-guide",
  "/blog/asphalt-shingles-vs-metal-roofing"
];

const KEYWORDS_MAP = {
  "/": "Premium Furniture Showroom Udaipur",
  "/about": "About Uniq Decor Udaipur",
  "/contact": "Contact Uniq Decor Udaipur",
  "/blog": "Interior Design Blog Udaipur",
  "/privacy": "Privacy Policy Uniq Decor",
  "/terms": "Terms of Service Uniq Decor",
  "/ddecor": "D'Decor Showroom Udaipur",
  "/geeken": "Geeken Office Furniture Udaipur",
  "/roserro": "Roserro Mattress Udaipur",
  "/laxree": "LaxRee Showroom Udaipur",
  "/laxree-amenities": "LaxRee Hotel Amenities Udaipur",
  "/laxree-roofing": "LaxRee Roofing Sheets Udaipur",
  "/ddecor/curtains": "D'Decor Dealer in Udaipur",
  "/ddecor/upholstery": "Upholstery Fabrics Udaipur",
  "/ddecor/wallpapers": "Designer Wallpapers Udaipur",
  "/ddecor/bedding": "Premium Bedding Collection",
  "/ddecor/cushions": "Cushion Covers Udaipur",
  "/ddecor/duvet-cover": "Duvet & Duvet Cover Udaipur",
  "/ddecor/comforter": "Home Furnishing Store Udaipur",
  "/ddecor/blinds": "Window Blinds Dealer in Udaipur",
  "/ddecor/rugs": "Luxury Rugs and Carpets Udaipur",
  "/ddecor/bath-linens": "D'Decor bath towels Udaipur",
  "/ddecor/ready-made-curtains": "ready made curtains Udaipur",
  "/ddecor/kids-bedding": "kids bedding sets Udaipur",
  "/ddecor/gifting": "home decor gifting Udaipur",
  "/ddecor/locations/shobhagpura": "luxury home furnishings Shobhagpura Udaipur",
  "/ddecor/locations/hiran-magri": "sofa fabrics Hiran Magri Udaipur",
  "/ddecor/locations/bhuwana": "premium wallpapers Bhuwana Udaipur",
  "/ddecor/locations/panchwati": "luxury home decor Panchwati Udaipur",
  "/ddecor/locations/fatehpura": "D'Decor wallpapers Fatehpura Udaipur",
  "/ddecor/locations/madhuban": "custom curtains Madhuban Udaipur",
  "/ddecor/materials/velvet-curtains": "custom velvet curtains Udaipur",
  "/ddecor/materials/blackout-curtains": "blackout curtains Udaipur",
  "/ddecor/materials/stain-resistant-fabrics": "stain resistant sofa fabrics Udaipur",
  "/ddecor/materials/motorized-drapes": "motorized automatic curtains Udaipur",
  "/ddecor/materials/roller-blinds": "roller blinds price Udaipur",
  "/ddecor/materials/roman-shades": "roman blinds dealer Udaipur",
  "/ddecor/materials/sheer-curtains": "luxury sheer curtains Udaipur",
  "/ddecor/hospitality/hotel-curtains": "commercial hotel curtains Udaipur",
  "/ddecor/hospitality/mewari-heritage": "royal home decor fabrics Udaipur",
  "/ddecor/hospitality/villa-furnishing": "luxury villa interior fabrics Udaipur",
  "/ddecor/hospitality/banquet-linens": "premium banquet fabrics Udaipur",
  "/geeken/ergonomic-chairs": "Geeken Ergonomic Chairs Udaipur",
  "/geeken/workstations": "Geeken Modular Workstations Udaipur",
  "/geeken/storage": "Geeken Steel Lockers Udaipur",
  "/geeken/healthcare": "Geeken Healthcare Furniture Udaipur",
  "/geeken/locations": "Geeken Furniture Showroom Udaipur",
  "/roserro/bed-linen": "Roserro Bed Linen Udaipur",
  "/roserro/bath-linen": "Roserro Bath Linen Udaipur",
  "/roserro/banquet-linen": "Roserro Banquet Linen Udaipur",
  "/roserro/healthcare-linen": "Roserro Healthcare Linen Udaipur",
  "/roserro/locations": "Roserro Linen Showroom Udaipur",
  "/laxree-amenities/room-amenities": "LaxRee Hotel Room Amenities Udaipur",
  "/laxree-amenities/washroom-amenities": "LaxRee Hotel Washroom Amenities Udaipur",
  "/laxree-amenities/lobby-amenities": "LaxRee Hotel Lobby Amenities Udaipur",
  "/laxree-amenities/restaurant-furniture": "LaxRee Restaurant Furniture Udaipur",
  "/laxree-amenities/banquet-furniture": "LaxRee Banquet Furniture Udaipur",
  "/laxree-amenities/outdoor-furniture": "LaxRee Outdoor Furniture Udaipur",
  "/laxree-amenities/space-pods": "LaxRee Glamping Space Pods Udaipur",
  "/laxree-amenities/locations": "LaxRee Amenities Showroom Udaipur",
  "/laxree-roofing/stone-coated-tiles": "LaxRee Stone Coated Roof Tiles Udaipur",
  "/laxree-roofing/synthetic-thatch": "LaxRee Synthetic Thatch Udaipur",
  "/laxree-roofing/asphalt-shingles": "LaxRee Asphalt Shingles Udaipur",
  "/laxree-roofing/locations": "LaxRee Roofing Sheets Showroom Udaipur",
  "/blog/curtain-fabrics-guide-udaipur": "Curtain Fabrics Guide Udaipur",
  "/blog/best-ergonomic-office-chairs-udaipur": "Best Ergonomic Office Chairs Udaipur",
  "/blog/hotel-linen-thread-count-gsm-guide": "Hotel Linen Thread Count GSM",
  "/blog/stone-coated-roofing-vs-clay-tiles": "Stone Coated Roofing vs Clay Tiles",
  "/blog/hotel-room-amenities-guide-udaipur": "Hotel Room Amenities Guide Udaipur",
  "/blog/ddecor-vs-other-brands-udaipur": "D'Decor vs Other Brands Udaipur",
  "/blog/choose-wallpaper-udaipur-home": "How to Choose Wallpaper Udaipur",
  "/blog/office-furniture-setup-guide-udaipur": "Office Furniture Setup Udaipur",
  "/blog/geeken-bifma-certification-standards": "Geeken BIFMA Certification Standards",
  "/blog/hospitality-linen-supplier-udaipur": "Hospitality Linen Supplier Udaipur",
  "/blog/roserro-vs-other-linen-brands": "Roserro vs Other Linen Brands",
  "/blog/silent-minibar-vs-traditional-comparison": "Silent Minibar vs Traditional Minibar",
  "/blog/synthetic-thatch-roofing-resort-guide": "Synthetic Thatch Roofing Resort",
  "/blog/asphalt-shingles-vs-metal-roofing": "Asphalt Shingles vs Metal Roofing"
};

// HTML Entities Decoder Helper
function decodeHTMLEntities(str) {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Helper to get last updated date based on file stat
function getLastUpdatedForRoute(routePath) {
  let fileToStat = "app/page.js";
  if (routePath === "/") fileToStat = "app/page.js";
  else if (routePath === "/ddecor") fileToStat = "app/ddecor/page.js";
  else if (routePath === "/geeken") fileToStat = "app/geeken/page.js";
  else if (routePath === "/roserro") fileToStat = "app/roserro/page.js";
  else if (routePath === "/laxree") fileToStat = "app/laxree/page.js";
  else if (routePath === "/laxree-amenities") fileToStat = "app/laxree-amenities/page.js";
  else if (routePath === "/laxree-roofing") fileToStat = "app/laxree-roofing/page.js";
  else if (routePath === "/about") fileToStat = "app/about/page.js";
  else if (routePath === "/contact") fileToStat = "app/contact/page.js";
  else if (routePath === "/blog") fileToStat = "app/blog/page.js";
  else if (routePath === "/privacy") fileToStat = "app/privacy/page.js";
  else if (routePath === "/terms") fileToStat = "app/terms/page.js";
  else if (routePath === "/geeken/locations") fileToStat = "app/geeken/locations/page.js";
  else if (routePath === "/roserro/locations") fileToStat = "app/roserro/locations/page.js";
  else if (routePath === "/laxree-amenities/locations") fileToStat = "app/laxree-amenities/locations/page.js";
  else if (routePath === "/laxree-roofing/locations") fileToStat = "app/laxree-roofing/locations/page.js";
  else if (routePath.includes("/locations/")) fileToStat = "app/ddecor/locationsData.js";
  else if (routePath.includes("/materials/")) fileToStat = "app/ddecor/materialsData.js";
  else if (routePath.includes("/hospitality/")) fileToStat = "app/ddecor/hospitalityData.js";
  else if (routePath.startsWith("/ddecor/")) fileToStat = "app/ddecor/categoriesData.js";
  else if (routePath.startsWith("/geeken/")) fileToStat = "app/geeken/geekenCategoriesData.js";
  else if (routePath.startsWith("/roserro/")) fileToStat = "app/roserro/roserroCategoriesData.js";
  else if (routePath.startsWith("/laxree-amenities/")) fileToStat = "app/laxree-amenities/laxreeAmenitiesCategoriesData.js";
  else if (routePath.startsWith("/laxree-roofing/")) fileToStat = "app/laxree-roofing/laxreeRoofingCategoriesData.js";
  else if (routePath.startsWith("/blog/")) fileToStat = "app/blog/blogData.js";
  
  try {
    const stats = fs.statSync(pathLib.join(process.cwd(), fileToStat));
    return stats.mtime.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

// Helper to calculate incoming links dynamically from files
function calculateStaticIncomingLinks(targetPath) {
  let count = 0;
  const searchForLink = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = pathLib.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (file !== "node_modules" && file !== ".next" && file !== "api") {
          searchForLink(fullPath);
        }
      } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
        const content = fs.readFileSync(fullPath, "utf8");
        if (content.includes(targetPath)) {
          count++;
        }
      }
    }
  };
  try {
    searchForLink(pathLib.join(process.cwd(), "app"));
    searchForLink(pathLib.join(process.cwd(), "components"));
  } catch (e) {}
  return count;
}

// Google Ads API Access Token retriever
async function getAdsAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token"
    })
  });
  if (!res.ok) {
    throw new Error("Failed to refresh Ads token: " + await res.text());
  }
  const data = await res.json();
  return data.access_token;
}

// Google Ads API Keyword Historical Metrics retriever
async function fetchAdsKeywordVolumes(keywordsList) {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  
  if (!customerId || !devToken) return null;
  
  const accessToken = await getAdsAccessToken();
  const url = `https://googleads.googleapis.com/v24/customers/${customerId}:generateKeywordHistoricalMetrics`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "developer-token": devToken,
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      keywords: keywordsList,
      geoTargetConstants: ["geoTargetConstants/2356"], // India constant
      keywordPlanNetwork: "GOOGLE_SEARCH",
      language: "languageConstants/1000", // English
      includeAdultKeywords: false
    })
  });
  
  if (!res.ok) {
    const errorDetails = await res.text();
    let cleanMessage = `Status ${res.status}`;
    try {
      const parsed = JSON.parse(errorDetails);
      if (parsed.error && parsed.error.details && parsed.error.details[0] && parsed.error.details[0].errors) {
        cleanMessage = parsed.error.details[0].errors[0].message;
      } else if (parsed.error && parsed.error.message) {
        cleanMessage = parsed.error.message;
      }
    } catch(e) {}
    throw new Error(`Google Ads: ${cleanMessage}`);
  }
  
  const data = await res.json();
  const volumes = {};
  if (data.results) {
    data.results.forEach(result => {
      const text = result.text;
      const vol = result.keywordMetrics && result.keywordMetrics.avgMonthlySearches
        ? parseInt(result.keywordMetrics.avgMonthlySearches)
        : 0;
      volumes[text] = vol;
    });
  }
  return volumes;
}


// Normalized Paths Helpers
function getPathFromUrl(url) {
  try {
    const parsed = new URL(url);
    let path = parsed.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    return path;
  } catch (e) {
    let clean = url.replace(/https?:\/\/[^\/]+/, "");
    if (clean.length > 1 && clean.endsWith("/")) {
      clean = clean.slice(0, -1);
    }
    if (!clean.startsWith("/")) {
      clean = "/" + clean;
    }
    return clean;
  }
}

function getNormalizedPath(pagePath) {
  let clean = pagePath.split("?")[0].split("#")[0];
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  if (!clean.startsWith("/")) {
    clean = "/" + clean;
  }
  return clean;
}

// Simulated traffic metrics generator fallback
function getSimulatedTraffic(path) {
  let rank = 1;
  let volume = 140;
  if (path === "/") { rank = 1; volume = 720; }
  else if (path === "/ddecor") { rank = 1; volume = 480; }
  else if (path === "/geeken") { rank = 2; volume = 390; }
  else if (path === "/roserro") { rank = 2; volume = 320; }
  else if (path === "/laxree") { rank = 1; volume = 260; }
  else if (path.includes("location")) {
    const hash = path.charCodeAt(path.length - 1) % 3;
    rank = hash + 2; 
    volume = 150;
  }
  else if (path.includes("materials")) {
    const hash = path.charCodeAt(path.length - 1) % 2;
    rank = hash + 1; 
    volume = 120;
  }
  else {
    const hash = path.charCodeAt(path.length - 1) % 3;
    rank = hash + 1; 
    volume = 110;
  }

  const impressions = Math.floor(volume * (10 - rank + (path.charCodeAt(0) % 2)) * 1.5);
  const ctr = parseFloat((Math.max(2.5, 12.5 - rank * 2.2 + (path.charCodeAt(1) % 2))).toFixed(1));
  const clicks = Math.floor(impressions * (ctr / 100));

  return {
    clicks,
    impressions,
    ctr,
    position: rank,
    volume,
    pageviews: Math.floor(clicks * 2.4) + 12,
    activeUsers: Math.floor(clicks * 1.1) + 4,
    source: "simulation"
  };
}

// Scrape and audit a single page
async function auditPage(baseUrl, path) {
  const keyword = KEYWORDS_MAP[path] || "";
  const absoluteUrl = `${baseUrl}${path}`;
  
  const report = {
    path,
    url: absoluteUrl,
    keyword,
    score: 100,
    title: { value: "", status: "Pending", detail: "" },
    description: { value: "", status: "Pending", detail: "" },
    canonical: { value: "", status: "Pending", detail: "" },
    h1: { count: 0, status: "Pending", detail: "", items: [] },
    headingsHierarchy: { status: "Pending", detail: "", items: [] },
    images: { total: 0, missingAlt: 0, missingDims: 0, status: "Pending", detail: "", items: [] },
    schemas: { count: 0, hasSameAs: false, hasStoreId: false, status: "Pending", detail: "", types: [] },
    twitterCard: { status: "Pending", detail: "" },
    wordCount: 0,
    keywordDensity: 0.0,
    keywordCount: 0,
    linkedKeywordsCount: 0,
    links: { internal: 0, external: 0, incoming: 0, list: [] },
    keywordType: "Long-Tail",
    indexability: { status: "Indexable", liveStatus: "Sandbox (Production Draft)", detail: "" },
    crawledStatus: { status: "Crawled", timestamp: "" },
    traffic: { clicks: 0, impressions: 0, ctr: 0, source: "simulation" },
    ranking: { position: 1, volume: 0 },
    pageviews: 0,
    activeUsers: 0,
    publishedDate: "2026-06-01",
    lastUpdated: "2026-06-23",
    bailoutDetected: false,
    checklist: []
  };

  try {
    const res = await fetch(absoluteUrl, { 
      headers: { "User-Agent": "UNIQ-SEO-Auditor/1.0" },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }

    const html = await res.text();

    // 1. Crawled Status and Dates
    report.crawledStatus = {
      status: "Crawled",
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    };
    report.lastUpdated = getLastUpdatedForRoute(path);

    // 2. Keyword Type (Short tail vs Long tail)
    const kwWords = keyword.split(/\s+/).filter(w => w.length > 0).length;
    report.keywordType = kwWords >= 3 ? "Long-Tail" : "Short-Tail";

    // 4. Indexability checks (Noindex & Live site fetch)
    const isNoindex = /<meta\s+[^>]*?name=["']robots["'][^>]*?content=["'][^"']*?noindex[^"']*?["']/i.test(html);
    let indexableText = "Indexable (No noindex tag / Canonical correct)";
    let indexableStatus = "Pass";
    
    if (isNoindex) {
      indexableText = "Blocked (Contains noindex robots meta tag)";
      indexableStatus = "Warning";
    }

    let liveStatus = "Sandbox (Production Draft)";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      const liveUrl = `https://uniqdecorfurniture.in${path}`;
      const liveRes = await fetch(liveUrl, { 
        method: "HEAD", 
        headers: { "User-Agent": "UNIQ-SEO-Index-Checker/1.0" },
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      if (liveRes.status === 200) {
        liveStatus = "Indexed (Live on Domain)";
      } else {
        liveStatus = `Sandbox (Live URL returned ${liveRes.status})`;
      }
    } catch(e) {
      liveStatus = "Sandbox (Production Draft)";
    }

    report.indexability = {
      status: indexableStatus === "Pass" ? "Indexable" : "Blocked",
      liveStatus,
      detail: indexableText
    };

    // 5. Links parsing
    const hrefRegex = /<a\s+[^>]*?href=["']([^"']+)["']/gi;
    let hrefMatch;
    const internalLinksList = [];
    let internalCount = 0;
    let externalCount = 0;
    while ((hrefMatch = hrefRegex.exec(html)) !== null) {
      const href = hrefMatch[1].trim();
      if (href.startsWith("/") || href.includes("uniqdecorfurniture.in")) {
        internalCount++;
        let cleanPath = href.replace(/https?:\/\/uniqdecorfurniture\.in/g, "");
        if (cleanPath.startsWith("/")) {
          internalLinksList.push(cleanPath);
        }
      } else if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me")) {
        externalCount++;
      }
    }
    report.links.internal = internalCount;
    report.links.external = externalCount;
    report.links.list = internalLinksList;

    // 6. Check for linked keywords
    let linkedKeywords = 0;
    const aRegex = /<a\s+[^>]*>([\s\S]*?)<\/a>/gi;
    let aMatch;
    while ((aMatch = aRegex.exec(html)) !== null) {
      const linkText = aMatch[1].replace(/<[^>]*>/g, "").trim();
      if (keyword && linkText.toLowerCase().includes(keyword.toLowerCase())) {
        linkedKeywords++;
      }
    }
    report.linkedKeywordsCount = linkedKeywords;

    // 7. Check for Next.js Client-Side Hydration bailout spinner
    if (html.includes("BAILOUT_TO_CLIENT_SIDE_RENDERING") || html.includes("Aligning the planets for you...")) {
      report.bailoutDetected = true;
      report.score -= 40;
    }

    // 8. Extract Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      const titleRaw = titleMatch[1].trim();
      const titleVal = decodeHTMLEntities(titleRaw);
      report.title.value = titleVal;
      if (titleVal.length >= 45 && titleVal.length <= 65) {
        report.title.status = "Pass";
        report.title.detail = `Optimal length (${titleVal.length} chars).`;
      } else {
        report.title.status = "Warning";
        report.title.detail = `Title length (${titleVal.length} chars) is outside the 45-65 recommended character range.`;
        report.score -= 5;
      }

      // Keyword in Title
      if (keyword && titleVal.toLowerCase().includes(keyword.toLowerCase())) {
        report.checklist.push({ name: "Keyword in Title", pass: true });
      } else if (keyword) {
        report.checklist.push({ name: "Keyword in Title", pass: false });
        report.score -= 5;
      }
    } else {
      report.title.status = "Fail";
      report.title.detail = "Missing <title> tag.";
      report.score -= 15;
    }

    // 9. Extract Description
    const descRegex = /<meta\s+[^>]*?name=["']description["'][^>]*?content=["']([\s\S]*?)["']/i;
    const descRegexRev = /<meta\s+[^>]*?content=["']([\s\S]*?)["'][^>]*?name=["']description["']/i;
    const descMatch = html.match(descRegex) || html.match(descRegexRev);
    if (descMatch) {
      const descRaw = descMatch[1].trim();
      const descVal = decodeHTMLEntities(descRaw);
      report.description.value = descVal;
      if (descVal.length >= 140 && descVal.length <= 165) {
        report.description.status = "Pass";
        report.description.detail = `Optimal length (${descVal.length} chars).`;
      } else {
        report.description.status = "Warning";
        report.description.detail = `Description length (${descVal.length} chars) is outside the 140-165 recommended range.`;
        report.score -= 5;
      }

      // Keyword in Description
      if (keyword && descVal.toLowerCase().includes(keyword.toLowerCase())) {
        report.checklist.push({ name: "Keyword in Description", pass: true });
      } else if (keyword) {
        report.checklist.push({ name: "Keyword in Description", pass: false });
        report.score -= 5;
      }
    } else {
      report.description.status = "Fail";
      report.description.detail = "Missing meta description.";
      report.score -= 15;
    }

    // 10. Extract Canonical Link
    const canonicalMatch = html.match(/<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([\s\S]*?)["']/i);
    if (canonicalMatch) {
      const canonVal = canonicalMatch[1].trim();
      report.canonical.value = canonVal;
      if (canonVal.endsWith(path) || (path === "/" && canonVal === "https://uniqdecorfurniture.in")) {
        report.canonical.status = "Pass";
        report.canonical.detail = "Self-referencing canonical configured correctly.";
      } else {
        report.canonical.status = "Warning";
        report.canonical.detail = `Canonical link value (${canonVal}) does not point to the current page path.`;
        report.score -= 5;
      }
    } else {
      report.canonical.status = "Fail";
      report.canonical.detail = "Missing canonical tag.";
      report.score -= 10;
    }

    // 11. Extract Twitter Cards Card Property
    const twitterMatch = html.includes('name="twitter:card"') || html.includes('property="twitter:card"');
    if (twitterMatch) {
      report.twitterCard.status = "Pass";
      report.twitterCard.detail = "Twitter card metadata tags exist.";
    } else {
      report.twitterCard.status = "Fail";
      report.twitterCard.detail = "Missing twitter:card social markup tag.";
      report.score -= 5;
    }

    // 12. Extract Headings (H1, H2, H3, H4)
    const headings = [];
    const headingMatches = html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi);
    for (const h of headingMatches) {
      headings.push({
        level: parseInt(h[1]),
        text: decodeHTMLEntities(h[2].replace(/<[^>]*>/g, "").trim())
      });
    }

    const h1s = headings.filter(h => h.level === 1);
    report.h1.count = h1s.length;
    report.h1.items = h1s.map(h => h.text);
    if (h1s.length === 1) {
      report.h1.status = "Pass";
      report.h1.detail = "Exactly one H1 tag found.";

      // Keyword in H1
      if (keyword && h1s[0].text.toLowerCase().includes(keyword.toLowerCase())) {
        report.checklist.push({ name: "Keyword in H1", pass: true });
      } else if (keyword) {
        report.checklist.push({ name: "Keyword in H1", pass: false });
        report.score -= 5;
      }
    } else if (h1s.length === 0) {
      report.h1.status = "Fail";
      report.h1.detail = "Missing H1 tag on the page.";
      report.score -= 15;
    } else {
      report.h1.status = "Warning";
      report.h1.detail = `Multiple H1 tags (${h1s.length}) found. SEO standard allows exactly one H1.`;
      report.score -= 8;
    }

    // Heading hierarchy check (no skips)
    let hierarchyBroken = false;
    let prevLevel = 1;
    for (const h of headings) {
      report.headingsHierarchy.items.push({ level: h.level, text: h.text });
      if (h.level - prevLevel > 1) {
        hierarchyBroken = true;
      }
      prevLevel = h.level;
    }
    if (hierarchyBroken) {
      report.headingsHierarchy.status = "Warning";
      report.headingsHierarchy.detail = "Heading hierarchy is skipped (e.g. H1 directly to H3 without H2).";
      report.score -= 5;
    } else {
      report.headingsHierarchy.status = "Pass";
      report.headingsHierarchy.detail = "Heading hierarchy nested sequentially.";
    }

    // 13. Extract Images & Alt tags
    const imgRegex = /<img\s+([^>]+)>/gi;
    let totalImgs = 0;
    let missingAlt = 0;
    let missingDims = 0;
    
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      const attrs = imgMatch[1];
      totalImgs++;
      
      const hasAlt = /alt=/i.test(attrs) && !/alt=["']["']/i.test(attrs);
      const hasWidth = /width=/i.test(attrs);
      const hasHeight = /height=/i.test(attrs);
      
      if (!hasAlt) missingAlt++;
      if (!hasWidth || !hasHeight) missingDims++;
      
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      const altMatch = attrs.match(/alt=["']([^"']+)["']/i);
      if (!hasAlt) {
        report.images.items.push({
          src: srcMatch ? srcMatch[1] : "Unknown Image",
          alt: altMatch ? altMatch[1] : ""
        });
      }
    }
    
    report.images.total = totalImgs;
    report.images.missingAlt = missingAlt;
    report.images.missingDims = missingDims;

    if (totalImgs === 0) {
      report.images.status = "Pass";
      report.images.detail = "No image elements found on page.";
    } else {
      if (missingAlt > 0) {
        report.images.status = "Warning";
        report.images.detail = `${missingAlt} out of ${totalImgs} images are missing descriptive alt text.`;
        report.score -= Math.min(missingAlt * 3, 10);
      } else {
        report.images.status = "Pass";
        report.images.detail = "All image elements contain alt attributes.";
      }
    }

    // 14. Extract JSON-LD script blocks and Types
    const scriptRegex = /<script\s+[^>]*?type=["']application\/ld\+json["'][^>]*?>([\s\S]*?)<\/script>/gi;
    let scriptMatch;
    let schemaCount = 0;
    let hasSameAs = false;
    let hasStoreId = false;
    const schemaTypes = [];

    while ((scriptMatch = scriptRegex.exec(html)) !== null) {
      schemaCount++;
      const jsonText = scriptMatch[1];
      if (jsonText.includes("sameAs")) {
        hasSameAs = true;
      }
      if (jsonText.includes("#store") || jsonText.includes("uniqdecorfurniture.in/#store")) {
        hasStoreId = true;
      }
      
      const typeMatches = jsonText.matchAll(/"@type"\s*:\s*"([^"]+)"/g);
      for (const tm of typeMatches) {
        if (!schemaTypes.includes(tm[1])) {
          schemaTypes.push(tm[1]);
        }
      }
    }

    report.schemas.count = schemaCount;
    report.schemas.hasSameAs = hasSameAs;
    report.schemas.hasStoreId = hasStoreId;
    report.schemas.types = schemaTypes;

    if (schemaCount === 0) {
      report.schemas.status = "Warning";
      report.schemas.detail = "No JSON-LD structured data schemas found.";
      report.score -= 5;
    } else {
      const items = [];
      if (!hasStoreId) {
        items.push("missing Store '@id' reference link");
        report.score -= 3;
      }
      if (!hasSameAs) {
        items.push("missing sameAs social connections");
        report.score -= 3;
      }

      if (items.length > 0) {
        report.schemas.status = "Warning";
        report.schemas.detail = `Found ${schemaCount} schema(s) but they are: ${items.join(" & ")}.`;
      } else {
        report.schemas.status = "Pass";
        report.schemas.detail = `Found ${schemaCount} schema(s) with store entity connections & sameAs arrays.`;
      }
    }

    // 15. Word Count and Keyword Density
    const textBodyRaw = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const textBody = decodeHTMLEntities(textBodyRaw);
    const words = textBody.split(/\s+/).filter(w => w.length > 0);
    report.wordCount = words.length;

    if (keyword) {
      const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const keywordRegex = new RegExp(escapedKeyword, "gi");
      const kwMatches = textBody.match(keywordRegex);
      const kwCount = kwMatches ? kwMatches.length : 0;
      
      report.keywordCount = kwCount;
      const keywordWordCount = keyword.split(/\s+/).length;
      report.keywordDensity = words.length > 0 ? parseFloat(((kwCount * keywordWordCount) / words.length * 100).toFixed(2)) : 0;

      if (kwCount > 0) {
        report.checklist.push({ name: `Keyword Placement (${kwCount} matches)`, pass: true });
      } else {
        report.checklist.push({ name: `Keyword Placement (0 matches)`, pass: false });
        report.score -= 5;
      }
    }

    // Floor score at 0
    report.score = Math.max(0, report.score);

  } catch (err) {
    report.score = 0;
    report.title.status = "Fail";
    report.title.detail = `Failed to scrape page: ${err.message}`;
    report.description.status = "Fail";
    report.description.detail = err.message;
  }

  return report;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathParam = searchParams.get("path");
  
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  // Initialize live credentials cache
  let gscData = {};
  let ga4Data = {};
  let adsData = {};
  let gscSuccess = false;
  let ga4Success = false;
  let adsSuccess = false;
  let apiError = null;
  let adsError = null;

  // Read event logs to calculate live active users and page events
  let liveActiveUsers = 0;
  let recentEvents = [];
  const pageEventsMap = {}; // path -> { whatsapp, phone, showroom, maxScroll }

  try {
    const EVENTS_FILE = pathLib.join(process.cwd(), "data", "events.json");
    if (fs.existsSync(EVENTS_FILE)) {
      const data = JSON.parse(fs.readFileSync(EVENTS_FILE, "utf8"));
      
      // Calculate live active users (unique sessions in last 5 minutes)
      const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
      const activeSessions = new Set();
      
      data.forEach(e => {
        const time = new Date(e.timestamp).getTime();
        if (time > fiveMinsAgo) {
          activeSessions.add(e.sessionId);
        }

        // Aggregate behavioral events by page path
        const normPath = getNormalizedPath(e.path);
        if (!pageEventsMap[normPath]) {
          pageEventsMap[normPath] = {
            whatsapp: 0,
            phone: 0,
            showroom: 0,
            maxScroll: 0
          };
        }

        if (e.event === "click") {
          if (e.target === "whatsapp") pageEventsMap[normPath].whatsapp++;
          else if (e.target === "phone") pageEventsMap[normPath].phone++;
          else if (e.target === "showroom_cta") pageEventsMap[normPath].showroom++;
        } else if (e.event === "scroll") {
          const val = parseInt(e.target) || 0;
          if (val > pageEventsMap[normPath].maxScroll) {
            pageEventsMap[normPath].maxScroll = val;
          }
        }
      });

      liveActiveUsers = activeSessions.size;
      recentEvents = data.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 15);
    }
  } catch (err) {
    console.error("Failed to read events for live user count:", err.message);
  }

  // 1. Query GSC & GA4 if credentials are set
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
    let errors = [];

    // Google Search Console metrics
    try {
      const authGSC = new google.auth.JWT({
        email: email,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/webmasters.readonly"]
      });
      const searchconsole = google.webmasters({ version: "v3", auth: authGSC });
      const gscSiteUrl = process.env.GSC_SITE_URL || "sc-domain:uniqdecorfurniture.in";
      
      const gscResponse = await searchconsole.searchanalytics.query({
        siteUrl: gscSiteUrl,
        requestBody: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          dimensions: ["page"],
          rowLimit: 1000
        }
      });

      if (gscResponse.data && gscResponse.data.rows) {
        gscResponse.data.rows.forEach(row => {
          const fullUrl = row.keys[0];
          const routePath = getPathFromUrl(fullUrl);
          gscData[routePath] = {
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: parseFloat(((row.ctr || 0) * 100).toFixed(2)),
            position: parseFloat((row.position || 0).toFixed(1)),
            queries: []
          };
        });
      }

      // Fetch GSC queries list to check keyword metrics and cannibalization
      const gscQueriesResponse = await searchconsole.searchanalytics.query({
        siteUrl: gscSiteUrl,
        requestBody: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          dimensions: ["page", "query"],
          rowLimit: 5000
        }
      });

      const queryToPagesMap = {};

      if (gscQueriesResponse.data && gscQueriesResponse.data.rows) {
        gscQueriesResponse.data.rows.forEach(row => {
          const fullUrl = row.keys[0];
          const query = row.keys[1];
          const routePath = getPathFromUrl(fullUrl);

          const qItem = {
            query,
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: parseFloat(((row.ctr || 0) * 100).toFixed(2)),
            position: parseFloat((row.position || 0).toFixed(1))
          };

          if (gscData[routePath]) {
            gscData[routePath].queries.push(qItem);
          } else {
            gscData[routePath] = {
              clicks: 0,
              impressions: 0,
              ctr: 0,
              position: 0,
              queries: [qItem]
            };
          }

          if (qItem.impressions > 5) {
            if (!queryToPagesMap[query]) {
              queryToPagesMap[query] = [];
            }
            queryToPagesMap[query].push({
              path: routePath,
              clicks: qItem.clicks,
              impressions: qItem.impressions
            });
          }
        });
      }

      // Compute cannibalization details and sort page queries
      Object.keys(gscData).forEach(route => {
        if (gscData[route].queries) {
          gscData[route].queries.sort((a, b) => b.clicks - a.clicks);
          gscData[route].queries.forEach(qItem => {
            const competing = queryToPagesMap[qItem.query] || [];
            const otherCompetingPages = competing.filter(c => c.path !== route && c.impressions > 5);
            if (otherCompetingPages.length > 0) {
              qItem.cannibalized = true;
              qItem.competingPages = otherCompetingPages.map(c => c.path);
            }
          });
        }
      });

      gscSuccess = true;
    } catch (err) {
      console.error("GSC API query failed:", err.message);
      errors.push(`GSC: ${err.message}`);
    }

    // Google Analytics 4 page statistics
    if (process.env.GA4_PROPERTY_ID) {
      try {
        const analyticsDataClient = new BetaAnalyticsDataClient({
          credentials: {
            client_email: email,
            private_key: privateKey
          }
        });

        const [ga4Response] = await analyticsDataClient.runReport({
          property: `properties/${process.env.GA4_PROPERTY_ID}`,
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "pagePath" }],
          metrics: [
            { name: "screenPageViews" },
            { name: "activeUsers" }
          ]
        });

        if (ga4Response && ga4Response.rows) {
          ga4Response.rows.forEach(row => {
            const rawPath = row.dimensionValues[0].value;
            const routePath = getNormalizedPath(rawPath);
            ga4Data[routePath] = {
              pageviews: parseInt(row.metricValues[0].value) || 0,
              activeUsers: parseInt(row.metricValues[1].value) || 0
            };
          });
        }
        ga4Success = true;
      } catch (err) {
        console.error("GA4 API query failed:", err.message);
        errors.push(`GA4: ${err.message}`);
      }
    }

    if (errors.length > 0) {
      apiError = errors.join(" | ");
    }
  }

  // 2. Query Google Ads Planner if credentials are set
  if (process.env.GOOGLE_ADS_DEVELOPER_TOKEN && process.env.GOOGLE_ADS_CUSTOMER_ID) {
    try {
      const keywordsList = Array.from(new Set(Object.values(KEYWORDS_MAP)));
      const adsResponse = await fetchAdsKeywordVolumes(keywordsList);
      if (adsResponse) {
        adsData = adsResponse;
        adsSuccess = true;
      }
    } catch (err) {
      console.error("Google Ads query failed:", err.message);
      adsError = err.message;
    }
  }

  const usingRealData = gscSuccess || ga4Success || adsSuccess;

  // AUDIT SINGLE PAGE
  if (pathParam) {
    if (!PAGES_LIST.includes(pathParam)) {
      return NextResponse.json({ error: "Invalid path provided." }, { status: 400 });
    }
    
    const report = await auditPage(baseUrl, pathParam);
    report.links.incoming = calculateStaticIncomingLinks(pathParam);

    // Map GSC Performance
    if (gscSuccess) {
      const pGsc = gscData[pathParam];
      report.traffic = {
        clicks: pGsc ? pGsc.clicks : 0,
        impressions: pGsc ? pGsc.impressions : 0,
        ctr: pGsc ? pGsc.ctr : 0,
        source: "google"
      };
      report.ranking.position = pGsc ? pGsc.position : 0;
      report.queries = pGsc ? pGsc.queries || [] : [];
    } else {
      const simulated = getSimulatedTraffic(pathParam);
      report.traffic = {
        clicks: simulated.clicks,
        impressions: simulated.impressions,
        ctr: simulated.ctr,
        source: "simulation"
      };
      report.ranking.position = simulated.position;
      report.queries = [];
    }

    // Map Google Ads Search Volume
    const kw = KEYWORDS_MAP[pathParam] || "";
    if (adsSuccess && adsData[kw] !== undefined) {
      report.ranking.volume = adsData[kw];
    } else {
      const simulated = getSimulatedTraffic(pathParam);
      report.ranking.volume = simulated.volume;
    }

    // Map GA4 Performance
    if (ga4Success) {
      const pGa4 = ga4Data[pathParam];
      report.pageviews = pGa4 ? pGa4.pageviews : 0;
      report.activeUsers = pGa4 ? pGa4.activeUsers : 0;
    } else {
      const simulated = getSimulatedTraffic(pathParam);
      report.pageviews = simulated.pageviews;
      report.activeUsers = simulated.activeUsers;
    }

    // Map Behavioral Metrics
    const normPathParam = getNormalizedPath(pathParam);
    report.userActivity = pageEventsMap[normPathParam] || { whatsapp: 0, phone: 0, showroom: 0, maxScroll: 0 };

    return NextResponse.json(report);
  }

  // AUDIT ALL PAGES SEQUENTIALLY
  const reports = [];
  for (const path of PAGES_LIST) {
    const report = await auditPage(baseUrl, path);

    // Map GSC Performance
    if (gscSuccess) {
      const pGsc = gscData[path];
      report.traffic = {
        clicks: pGsc ? pGsc.clicks : 0,
        impressions: pGsc ? pGsc.impressions : 0,
        ctr: pGsc ? pGsc.ctr : 0,
        source: "google"
      };
      report.ranking.position = pGsc ? pGsc.position : 0;
      report.queries = pGsc ? pGsc.queries || [] : [];
    } else {
      const simulated = getSimulatedTraffic(path);
      report.traffic = {
        clicks: simulated.clicks,
        impressions: simulated.impressions,
        ctr: simulated.ctr,
        source: "simulation"
      };
      report.ranking.position = simulated.position;
      report.queries = [];
    }

    // Map Google Ads Search Volume
    const kw = KEYWORDS_MAP[path] || "";
    if (adsSuccess && adsData[kw] !== undefined) {
      report.ranking.volume = adsData[kw];
    } else {
      const simulated = getSimulatedTraffic(path);
      report.ranking.volume = simulated.volume;
    }

    // Map GA4 Performance
    if (ga4Success) {
      const pGa4 = ga4Data[path];
      report.pageviews = pGa4 ? pGa4.pageviews : 0;
      report.activeUsers = pGa4 ? pGa4.activeUsers : 0;
    } else {
      const simulated = getSimulatedTraffic(path);
      report.pageviews = simulated.pageviews;
      report.activeUsers = simulated.activeUsers;
    }

    // Map Behavioral Metrics
    const normPath = getNormalizedPath(path);
    report.userActivity = pageEventsMap[normPath] || { whatsapp: 0, phone: 0, showroom: 0, maxScroll: 0 };

    reports.push(report);
  }

  // Compute incoming links count dynamically
  reports.forEach((r) => {
    r.links.incoming = reports.filter((other) => other.path !== r.path && other.links.list.includes(r.path)).length;
  });

  // Compute overall site averages
  const totalScore = reports.reduce((acc, r) => acc + r.score, 0);
  const averageScore = parseFloat((totalScore / reports.length).toFixed(1));
  const failedPagesCount = reports.filter(r => r.score < 90).length;
  const clientBailoutsCount = reports.filter(r => r.bailoutDetected).length;

  return NextResponse.json({
    summary: {
      averageScore,
      totalPages: reports.length,
      failedPages: failedPagesCount,
      clientBailouts: clientBailoutsCount,
      usingRealData,
      gscSuccess,
      ga4Success,
      adsSuccess,
      liveActiveUsers,
      recentEvents,
      apiError: [apiError, adsError].filter(Boolean).join(" | ")
    },
    pages: reports
  });
}

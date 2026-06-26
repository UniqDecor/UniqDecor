import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import pathLib from "path";

const INSPECTIONS_FILE = pathLib.join(process.cwd(), "data", "gsc-inspections.json");

function ensureInspectionsFile() {
  const dir = pathLib.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(INSPECTIONS_FILE)) {
    fs.writeFileSync(INSPECTIONS_FILE, JSON.stringify({}), "utf8");
  }
}

function loadInspections() {
  try {
    ensureInspectionsFile();
    return JSON.parse(fs.readFileSync(INSPECTIONS_FILE, "utf8"));
  } catch { return {}; }
}

function saveInspection(path, data) {
  try {
    ensureInspectionsFile();
    const inspections = loadInspections();
    inspections[path] = {
      ...data,
      lastChecked: data.lastChecked || new Date().toISOString()
    };
    fs.writeFileSync(INSPECTIONS_FILE, JSON.stringify(inspections, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save GSC inspection cache:", err.message);
  }
}

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pathParam = searchParams.get("path") || "/";

    // Support GOOGLE_SERVICE_ACCOUNT_JSON for Vercel compatibility
    let email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? (process.env.GOOGLE_PRIVATE_KEY.includes("\\n")
          ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : process.env.GOOGLE_PRIVATE_KEY)
      : null;

    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      try {
        const saJson = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
        email = saJson.client_email;
        privateKey = saJson.private_key;
      } catch(e) { /* fall through to individual vars */ }
    }

    const cachedInspections = loadInspections();
    const cached = cachedInspections[pathParam];

    let indexVerdict = cached?.verdict || "Unknown";
    let indexCoverage = cached?.coverage || "Inspection Credentials Not Configured";
    let indexLastCrawl = cached?.lastCrawl || null;
    let indexGoogleCanonical = cached?.canonical || null;
    let indexMobileUsability = cached?.mobileUsability || "Unknown";
    let isIndexed = cached?.isIndexed !== undefined ? cached.isIndexed : false;

    // 1. Query Google URL Inspection API if credentials are set
    if (email && privateKey) {
      try {
        const auth = new google.auth.JWT({
          email: email,
          key: privateKey,
          scopes: ["https://www.googleapis.com/auth/webmasters.readonly"]
        });
        const searchconsole = google.searchconsole({ version: "v1", auth });
        const gscSiteUrl = process.env.GSC_SITE_URL || "sc-domain:uniqdecorfurniture.in";
        const targetUrl = `https://www.uniqdecorfurniture.in${pathParam}`;

        const inspectRes = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: targetUrl,
            siteUrl: gscSiteUrl
          }
        });

        if (inspectRes.data && inspectRes.data.inspectionResult) {
          const res = inspectRes.data.inspectionResult;
          if (res.indexStatusResult) {
            indexVerdict = res.indexStatusResult.verdict || "Unknown";
            indexCoverage = res.indexStatusResult.coverageState || "Unknown";
            indexLastCrawl = res.indexStatusResult.lastCrawlTime || null;
            indexGoogleCanonical = res.indexStatusResult.googleCanonical || null;
            isIndexed = indexVerdict === "PASS";
          }
          if (res.mobileUsabilityResult) {
            indexMobileUsability = res.mobileUsabilityResult.verdict || "Unknown";
          }
        }
      } catch (err) {
        console.error("URL Inspection API failed:", err.message);
        indexCoverage = `GSC Error: ${err.message}`;
      }
    }

    // 2. Query PageSpeed Insights API (mobile strategy)
    let speedScore = 95;
    let fcp = "1.2 s";
    let lcp = "2.1 s";
    let cls = "0.02";
    let speedIndex = "1.8 s";
    let isSpeedSimulated = true;

    const gscOnly = searchParams.get("gscOnly") === "true";

    if (!gscOnly) {
      try {
        const targetUrl = `https://www.uniqdecorfurniture.in${pathParam}`;
        const psiUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout to keep it fast

        const res = await fetch(psiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const lh = data.lighthouseResult;
          if (lh) {
            speedScore = Math.round((lh.categories?.performance?.score || 0.95) * 100);
            fcp = lh.audits?.["first-contentful-paint"]?.displayValue || fcp;
            lcp = lh.audits?.["largest-contentful-paint"]?.displayValue || lcp;
            cls = lh.audits?.["cumulative-layout-shift"]?.displayValue || cls;
            speedIndex = lh.audits?.["speed-index"]?.displayValue || speedIndex;
            isSpeedSimulated = false;
          }
        }
      } catch (err) {
        console.warn("PageSpeed Insights API request timed out or failed, falling back to simulated scores:", err.message);
      }
    }

    if (indexVerdict !== "Unknown" && indexCoverage !== "Inspection Credentials Not Configured") {
      saveInspection(pathParam, {
        verdict: indexVerdict,
        coverage: indexCoverage,
        lastCrawl: indexLastCrawl,
        canonical: indexGoogleCanonical,
        mobileUsability: indexMobileUsability,
        isIndexed,
        pageSpeedScore: speedScore
      });
    }

    return NextResponse.json({
      path: pathParam,
      inspection: {
        verdict: indexVerdict,
        coverage: indexCoverage,
        lastCrawl: indexLastCrawl,
        canonical: indexGoogleCanonical,
        mobileUsability: indexMobileUsability,
        isIndexed,
        lastChecked: cached?.lastChecked || new Date().toISOString()
      },
      pageSpeed: {
        score: speedScore,
        fcp,
        lcp,
        cls,
        speedIndex,
        simulated: isSpeedSimulated
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json(); // Map of { [path]: { verdict, coverage, lastCrawl, canonical, mobileUsability, isIndexed, lastChecked } }
    
    let inspections = {};
    try {
      ensureInspectionsFile();
      inspections = loadInspections();
    } catch (e) {
      console.warn("Could not access local inspections file (expected in read-only environment):", e.message);
    }
    
    Object.entries(body).forEach(([path, data]) => {
      inspections[path] = {
        verdict: data.verdict || "Unknown",
        coverage: data.coverage || "Unknown",
        lastCrawl: data.lastCrawl || null,
        canonical: data.canonical || null,
        mobileUsability: data.mobileUsability || "Unknown",
        isIndexed: data.isIndexed !== undefined ? data.isIndexed : false,
        lastChecked: data.lastChecked || new Date().toISOString()
      };
    });
    
    try {
      fs.writeFileSync(INSPECTIONS_FILE, JSON.stringify(inspections, null, 2), "utf8");
    } catch (e) {
      console.warn("Failed to write GSC inspections cache to local disk (expected in read-only environment):", e.message);
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

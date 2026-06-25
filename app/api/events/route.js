import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");
const AGGREGATES_FILE = path.join(DATA_DIR, "aggregates.json");

function ensureFilesExist() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(EVENTS_FILE)) fs.writeFileSync(EVENTS_FILE, JSON.stringify([]), "utf8");
  if (!fs.existsSync(AGGREGATES_FILE)) fs.writeFileSync(AGGREGATES_FILE, JSON.stringify({
    totalSessions: 0,
    totalPageviews: 0,
    totalWhatsAppClicks: 0,
    totalPhoneClicks: 0,
    totalShowroomClicks: 0,
    totalFormSubmissions: 0,
    totalErrors: 0,
    totalDuration: 0,
    referrers: {},
    devices: {},
    pages: {},
    daily: {}
  }), "utf8");
}

function getNormalizedPath(p) {
  let clean = (p || "/").split("?")[0].split("#")[0];
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  if (!clean.startsWith("/")) clean = "/" + clean;
  return clean;
}

export async function POST(request) {
  try {
    ensureFilesExist();

    const bodyText = await request.text();
    let payload;
    try { payload = JSON.parse(bodyText); } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!payload.sessionId || !payload.event) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Read existing events
    let events = [];
    try {
      const data = fs.readFileSync(EVENTS_FILE, "utf8");
      events = JSON.parse(data);
    } catch (err) { events = []; }

    // Filter events older than 7 days (keep longer for trend analysis)
    const thresholdTime = Date.now() - 7 * 24 * 60 * 60 * 1000;
    events = events.filter(e => {
      try { return new Date(e.timestamp).getTime() > thresholdTime; } catch (err) { return false; }
    });

    // Build enriched event
    const newEvent = {
      sessionId: payload.sessionId,
      event: payload.event,
      path: payload.path || "/",
      target: payload.target || null,
      label: payload.label || null,
      href: payload.href || null,
      tagName: payload.tagName || null,
      referrer: payload.referrer || null,
      device: payload.device || null,
      formId: payload.formId || null,
      fieldCount: payload.fieldCount || null,
      duration: payload.duration || null,
      seconds: payload.seconds || null,
      previousPath: payload.previousPath || null,
      sessionDuration: payload.sessionDuration || null,
      is404: payload.is404 || false,
      pageLoadTime: payload.pageLoadTime || null,
      message: payload.message || null,
      source: payload.source || null,
      line: payload.line || null,
      timestamp: payload.timestamp || new Date().toISOString()
    };

    events.push(newEvent);

    // Write events back
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), "utf8");

    // Update aggregates in real-time
    try {
      const aggData = JSON.parse(fs.readFileSync(AGGREGATES_FILE, "utf8"));
      const today = new Date().toISOString().split("T")[0];

      if (!aggData.daily[today]) {
        aggData.daily[today] = { pageviews: 0, sessions: 0, clicks: 0, wa: 0, phone: 0, showroom: 0, forms: 0, errors: 0 };
      }

      // Track unique sessions per day
      const sessionSet = new Set();
      events.filter(e => {
        try { return new Date(e.timestamp).toISOString().split("T")[0] === today; }
        catch { return false; }
      }).forEach(e => sessionSet.add(e.sessionId));
      aggData.daily[today].sessions = sessionSet.size;

      if (newEvent.event === "pageview") {
        aggData.totalPageviews++;
        aggData.daily[today].pageviews++;
      }

      if (newEvent.event === "heartbeat" && newEvent.sessionDuration) {
        aggData.totalDuration += newEvent.sessionDuration;
      }

      if (newEvent.event === "click") {
        aggData.daily[today].clicks++;
        if (newEvent.target === "whatsapp") {
          aggData.totalWhatsAppClicks++;
          aggData.daily[today].wa++;
        } else if (newEvent.target === "phone") {
          aggData.totalPhoneClicks++;
          aggData.daily[today].phone++;
        } else if (newEvent.target === "showroom_cta") {
          aggData.totalShowroomClicks++;
          aggData.daily[today].showroom++;
        }
      }

      if (newEvent.event === "form_submit") {
        aggData.totalFormSubmissions++;
        aggData.daily[today].forms++;
      }

      if (newEvent.event === "error") {
        aggData.totalErrors++;
        aggData.daily[today].errors++;
      }

      if (newEvent.referrer && newEvent.referrer.length > 0) {
        const refDomain = (() => {
          try { return new URL(newEvent.referrer).hostname; } catch { return "direct"; }
        })();
        aggData.referrers[refDomain] = (aggData.referrers[refDomain] || 0) + 1;
      }

      if (newEvent.device) {
        const plat = newEvent.device.platform || "Unknown";
        aggData.devices[plat] = (aggData.devices[plat] || 0) + 1;
      }

      // Page-level aggregations
      const normPath = getNormalizedPath(newEvent.path);
      if (!aggData.pages[normPath]) {
        aggData.pages[normPath] = { pageviews: 0, clicks: 0, wa: 0, phone: 0, showroom: 0, forms: 0, totalTime: 0, entries: 0 };
      }
      if (newEvent.event === "pageview") aggData.pages[normPath].pageviews++;
      if (newEvent.event === "page_time") aggData.pages[normPath].totalTime += (newEvent.seconds || 0);
      if (newEvent.event === "page_time") aggData.pages[normPath].entries++;
      if (newEvent.event === "click") aggData.pages[normPath].clicks++;
      if (newEvent.event === "click" && newEvent.target === "whatsapp") aggData.pages[normPath].wa++;
      if (newEvent.event === "click" && newEvent.target === "phone") aggData.pages[normPath].phone++;
      if (newEvent.event === "click" && newEvent.target === "showroom_cta") aggData.pages[normPath].showroom++;
      if (newEvent.event === "form_submit") aggData.pages[normPath].forms++;

      fs.writeFileSync(AGGREGATES_FILE, JSON.stringify(aggData, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to update aggregates:", err.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to process event log:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    ensureFilesExist();

    const events = JSON.parse(fs.readFileSync(EVENTS_FILE, "utf8"));
    const aggregates = JSON.parse(fs.readFileSync(AGGREGATES_FILE, "utf8"));

    // Compute live stats from recent 5 minutes
    const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
    const activeSessions = new Set();
    let recentClicks = 0;

    events.forEach(e => {
      try {
        const time = new Date(e.timestamp).getTime();
        if (time > fiveMinsAgo) {
          activeSessions.add(e.sessionId);
          if (e.event === "click") recentClicks++;
        }
      } catch {}
    });

    // Compute average session duration
    const sessionsWithDuration = events.filter(e => e.event === "heartbeat" && e.sessionDuration);
    const avgSessionDuration = sessionsWithDuration.length > 0
      ? Math.round(sessionsWithDuration.reduce((s, e) => s + (e.sessionDuration || 0), 0) / sessionsWithDuration.length)
      : 0;

    // Compute average time-on-page from page_time events
    const pageTimeEvents = events.filter(e => e.event === "page_time" && e.seconds);
    const avgTimeOnPage = pageTimeEvents.length > 0
      ? Math.round(pageTimeEvents.reduce((s, e) => s + (e.seconds || 0), 0) / pageTimeEvents.length)
      : 0;

    // Top referrers
    const referrers = {};
    events.filter(e => e.referrer && e.referrer.length > 0).forEach(e => {
      try {
        const domain = new URL(e.referrer).hostname;
        referrers[domain] = (referrers[domain] || 0) + 1;
      } catch { referrers["direct"] = (referrers["direct"] || 0) + 1; }
    });

    // Device breakdown
    const devices = {};
    events.filter(e => e.device).forEach(e => {
      const plat = e.device.platform || "Unknown";
      devices[plat] = (devices[plat] || 0) + 1;
    });

    // 404 tracking
    const notFoundPaths = {};
    events.filter(e => e.is404).forEach(e => {
      notFoundPaths[e.path] = (notFoundPaths[e.path] || 0) + 1;
    });

    // Error tracking
    const errorEvents = events.filter(e => e.event === "error");

    return NextResponse.json({
      liveActiveUsers: activeSessions.size,
      recentClicks,
      avgSessionDuration,
      avgTimeOnPage,
      totalPageviews: aggregates.totalPageviews,
      totalWhatsAppClicks: aggregates.totalWhatsAppClicks,
      totalPhoneClicks: aggregates.totalPhoneClicks,
      totalShowroomClicks: aggregates.totalShowroomClicks,
      totalFormSubmissions: aggregates.totalFormSubmissions,
      totalErrors: aggregates.totalErrors,
      totalDuration: aggregates.totalDuration,
      referrers,
      devices,
      notFoundPaths,
      errorEvents: errorEvents.slice(-20).map(e => ({
        message: e.message,
        path: e.path,
        timestamp: e.timestamp
      })),
      daily: aggregates.daily,
      pages: aggregates.pages,
      recentEvents: events.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 25)
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

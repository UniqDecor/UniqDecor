import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ensure data folder and events.json file exists
const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");

function ensureEventsFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify([]), "utf8");
  }
}

export async function POST(request) {
  try {
    ensureEventsFileExists();

    const bodyText = await request.text();
    let payload;
    try {
      payload = JSON.parse(bodyText);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!payload.sessionId || !payload.event) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Read existing event logs
    let events = [];
    try {
      const data = fs.readFileSync(EVENTS_FILE, "utf8");
      events = JSON.parse(data);
    } catch (err) {
      events = [];
    }

    // Filter out events older than 24 hours to keep the log light and fast
    const thresholdTime = Date.now() - 24 * 60 * 60 * 1000;
    events = events.filter(e => {
      try {
        return new Date(e.timestamp).getTime() > thresholdTime;
      } catch (err) {
        return false;
      }
    });

    // Add new event
    events.push({
      sessionId: payload.sessionId,
      event: payload.event,
      path: payload.path || "/",
      target: payload.target || null,
      label: payload.label || null,
      timestamp: payload.timestamp || new Date().toISOString()
    });

    // Write back to file
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to process event log:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Support options/CORS pre-flight if needed
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

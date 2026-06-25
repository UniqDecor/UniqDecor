import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { paths } = body; // Array of paths e.g., ["/about", "/contact"]

    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ error: "Missing or invalid paths array." }, { status: 400 });
    }

    // Support credentials from env vars
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

    if (!email || !privateKey) {
      return NextResponse.json({
        error: "Google credentials are not configured. Configure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local to use instant indexing."
      }, { status: 401 });
    }

    // Extract GCP project ID from service account email to generate a direct enablement link
    const emailMatch = email.match(/@([^.]+)/);
    const projectId = emailMatch ? emailMatch[1] : "uniqdecor-seo-dashboard";
    const activationUrl = `https://console.cloud.google.com/apis/library/indexing.googleapis.com?project=${projectId}`;

    // Initialize Auth
    const auth = new google.auth.JWT({
      email: email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/indexing"]
    });

    const indexingClient = google.indexing({ version: "v3", auth });
    const results = [];

    for (const path of paths) {
      const targetUrl = `https://www.uniqdecorfurniture.in${path}`;
      try {
        const response = await indexingClient.urlNotifications.publish({
          requestBody: {
            url: targetUrl,
            type: "URL_UPDATED"
          }
        });
        
        results.push({
          path,
          url: targetUrl,
          success: true,
          status: response.status,
          data: response.data
        });
      } catch (err) {
        console.error(`Indexing submission failed for ${targetUrl}:`, err.message);
        
        let needsActivation = false;
        let errorMessage = err.message;
        
        // Check if API is disabled in the Google Cloud project
        if (
          err.message.includes("Indexing API has not been used") || 
          err.message.includes("disabled") ||
          (err.response && err.response.data && JSON.stringify(err.response.data).includes("disabled"))
        ) {
          needsActivation = true;
          errorMessage = `Google Indexing API is disabled. Please enable it in the GCP Console using this link: ${activationUrl}`;
        }

        results.push({
          path,
          url: targetUrl,
          success: false,
          error: errorMessage,
          needsActivation,
          activationUrl
        });
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

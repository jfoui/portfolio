import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

// Store: portfolio-analytics (Upstash Redis via Vercel KV).
// Receives one analytics event per POST and stores it in Vercel KV.
// Never breaks the site: any failure still answers { ok: true }.
// If the KV store is not linked yet, the event is skipped immediately
// (no hanging on a missing connection).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const event = {
        ts: new Date().toISOString(),
        type: body.type === "cv_download" ? "cv_download" : "visit",
        page: typeof body.page === "string" ? body.page.slice(0, 200) : "/",
        referrer:
          typeof body.referrer === "string" ? body.referrer.slice(0, 500) : "",
        device: typeof body.device === "string" ? body.device : "",
        browser: typeof body.browser === "string" ? body.browser : "",
        os: typeof body.os === "string" ? body.os : "",
        model: typeof body.model === "string" ? body.model.slice(0, 100) : "",
        screen: typeof body.screen === "string" ? body.screen : "",
        language: typeof body.language === "string" ? body.language : "",
        timezone: typeof body.timezone === "string" ? body.timezone : "",
        country: req.headers.get("x-vercel-ip-country") ?? "",
        city: req.headers.get("x-vercel-ip-city") ?? "",
        region: req.headers.get("x-vercel-ip-country-region") ?? "",
        ip: (
          req.headers.get("x-real-ip") ??
          req.headers.get("x-forwarded-for")?.split(",")[0] ??
          ""
        ).trim(),
      };
      // Never let a slow store hold the response.
      await Promise.race([
        (async () => {
          await kv.lpush("analytics:events", JSON.stringify(event));
          await kv.ltrim("analytics:events", 0, 4999);
        })(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
    }
  } catch {
    // tracking must never break the page
  }
  return NextResponse.json({ ok: true });
}

import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

// Receives one analytics event per POST and stores it in Vercel KV.
// Never breaks the site: any failure still answers { ok: true }.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = {
      ts: new Date().toISOString(),
      type: body.type === "cv_download" ? "cv_download" : "visit",
      page: typeof body.page === "string" ? body.page.slice(0, 200) : "/",
      referrer:
        typeof body.referrer === "string" ? body.referrer.slice(0, 500) : "",
      device: typeof body.device === "string" ? body.device : "",
      browser: typeof body.browser === "string" ? body.browser : "",
      os: typeof body.os === "string" ? body.os : "",
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
    await kv.lpush("analytics:events", JSON.stringify(event));
    await kv.ltrim("analytics:events", 0, 4999);
  } catch {
    // tracking must never break the page
  }
  return NextResponse.json({ ok: true });
}

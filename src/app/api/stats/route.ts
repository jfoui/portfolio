import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

type RawEvent = {
  ts?: string;
  type?: string;
  page?: string;
  referrer?: string;
  device?: string;
  browser?: string;
  os?: string;
  screen?: string;
  language?: string;
  timezone?: string;
  country?: string;
  city?: string;
  region?: string;
  ip?: string;
};

// Public aggregate stats for the analytics dashboard Space.
// Returns counts and breakdowns only — never IP addresses.
export async function GET() {
  const empty = {
    totals: { visits: 0, downloads: 0, uniqueVisitors: 0 },
    perDay: [] as { day: string; visits: number; downloads: number }[],
    byDevice: {} as Record<string, number>,
    byBrowser: {} as Record<string, number>,
    byOs: {} as Record<string, number>,
    byCountry: {} as Record<string, number>,
    byCity: {} as Record<string, number>,
    byReferrer: {} as Record<string, number>,
    recent: [] as Omit<RawEvent, "ip">[],
  };
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json(empty);
    }
    const rows = await Promise.race([
      kv.lrange("analytics:events", 0, 4999),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("kv timeout")), 3000),
      ),
    ]);
    const events: RawEvent[] = (rows as unknown[])
      .map((r) => {
        try {
          return JSON.parse(typeof r === "string" ? r : JSON.stringify(r));
        } catch {
          return null;
        }
      })
      .filter(Boolean) as RawEvent[];
    const count = (key: keyof RawEvent) => {
      const out: Record<string, number> = {};
      for (const e of events) {
        const v = (e[key] as string) || "unknown";
        out[v] = (out[v] ?? 0) + 1;
      }
      return out;
    };
    const perDayMap: Record<string, { visits: number; downloads: number }> =
      {};
    for (const e of events) {
      const day = (e.ts ?? "").slice(0, 10) || "unknown";
      perDayMap[day] ??= { visits: 0, downloads: 0 };
      if (e.type === "cv_download") perDayMap[day].downloads += 1;
      else perDayMap[day].visits += 1;
    }
    const perDay = Object.entries(perDayMap)
      .map(([day, v]) => ({ day, ...v }))
      .sort((a, b) => (a.day < b.day ? -1 : 1))
      .slice(-14);
    const stats = {
      totals: {
        visits: events.filter((e) => e.type !== "cv_download").length,
        downloads: events.filter((e) => e.type === "cv_download").length,
        uniqueVisitors: new Set(events.map((e) => e.ip).filter(Boolean)).size,
      },
      perDay,
      byDevice: count("device"),
      byBrowser: count("browser"),
      byOs: count("os"),
      byCountry: count("country"),
      byCity: count("city"),
      byReferrer: count("referrer"),
      recent: events
        .slice(0, 20)
        .map(({ ip: _ip, ...rest }) => rest),
    };
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(empty);
  }
}

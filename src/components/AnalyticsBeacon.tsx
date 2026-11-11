"use client";

import { useEffect } from "react";

function detect() {
  const ua = navigator.userAgent;
  const device = /iPad/.test(ua)
    ? "tablet"
    : /Mobi|Android|iPhone/.test(ua)
      ? "mobile"
      : "desktop";
  const os = /Windows NT/.test(ua)
    ? "Windows"
    : /Mac OS X/.test(ua)
      ? "macOS"
      : /Android/.test(ua)
        ? "Android"
        : /iPhone|iPad/.test(ua)
          ? "iOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "Other";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
      ? "Opera"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : "Other";
  return { device, browser, os };
}

export function sendAnalyticsEvent(type: "visit" | "cv_download") {
  try {
    const { device, browser, os } = detect();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        page: window.location.pathname,
        referrer: document.referrer || "",
        device,
        browser,
        os,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language || "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // tracking must never break the page
  }
}

// Sends one "visit" event per browser session.
export default function AnalyticsBeacon() {
  useEffect(() => {
    if (!sessionStorage.getItem("pa-visit")) {
      sessionStorage.setItem("pa-visit", "1");
      sendAnalyticsEvent("visit");
    }
  }, []);
  return null;
}

"use client";

import { useEffect, useState } from "react";

export default function LoadTime() {
  const [seconds, setSeconds] = useState<string | null>(null);

  useEffect(() => {
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    if (nav) setSeconds((nav.duration / 1000).toFixed(2));
  }, []);

  if (!seconds) return null;
  return (
    <p className="font-mono text-xs text-muted">
      This page loaded in {seconds} s on your device.
    </p>
  );
}

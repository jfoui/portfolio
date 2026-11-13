"use client";

import { useEffect, useRef } from "react";

// Thin vertical scroll progress on the right edge, mobile only: the hero
// is a tall sticky section, so on a phone it can look like there is nothing
// below. The bar shows how far down the page you are.
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = fillRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed right-0 top-0 z-50 h-full w-[3px] bg-line/40 md:hidden"
      aria-hidden="true"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-top bg-accent"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}

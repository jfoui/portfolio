"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { sendAnalyticsEvent } from "@/components/AnalyticsBeacon";
import CountUp from "@/components/CountUp";
import { profile, projects } from "@/data/content";

const edits = ["01", "02", "03"];

// The headline tightens as you scroll, like Nightly: the section is tall
// and sticky, and scroll progress drives which edit is live.
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(2);
      return;
    }
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, -el.getBoundingClientRect().top / Math.max(1, total)),
      );
      setStage(progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2);
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

  const featured = projects[0];
  const line = (shown: boolean, struck: boolean) =>
    `block transition-all duration-500 ${
      shown ? "opacity-100" : "opacity-0"
    } ${struck ? "text-muted line-through decoration-muted/60" : ""}`;
  const late = (shown: boolean) =>
    `transition-all duration-500 ${
      shown ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
    }`;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[260vh] border-b border-line"
    >
      <div className="sticky top-0 flex min-h-svh items-center">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 md:grid-cols-[200px_1fr]">
          <aside className="hidden md:block">
            <ol className="relative space-y-5 border-l border-line pl-5">
              {edits.map((n, i) => (
                <li key={n} className="relative">
                  <span
                    className={`absolute -left-[26px] top-1.5 h-2 w-2 rounded-full transition-colors duration-500 ${
                      i <= stage ? "bg-accent" : "bg-line"
                    }`}
                    aria-hidden="true"
                  />
                  <p
                    className={`font-mono text-xs transition-colors duration-500 ${
                      i <= stage ? "text-ink" : "text-muted"
                    }`}
                  >
                    {n}
                  </p>
                </li>
              ))}
            </ol>
          </aside>

          <div>
            <ol
              className="mb-10 flex items-center md:hidden"
              aria-hidden="true"
            >
              {edits.map((n, i) => (
                <li key={n} className="flex items-center">
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                        i <= stage ? "bg-accent" : "bg-line"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs transition-colors duration-500 ${
                        i <= stage ? "text-ink" : "text-muted"
                      }`}
                    >
                      {n}
                    </span>
                  </span>
                  {i < edits.length - 1 && (
                    <span
                      className={`mx-3 h-px w-10 transition-colors duration-500 ${
                        i < stage ? "bg-accent" : "bg-line"
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>
            <h1 className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              <span className={line(true, stage >= 1)}>
                Data Science student working across data engineering,
                analytics, and AI.
              </span>
              <span className={`${line(stage >= 1, stage >= 2)} mt-3`}>
                I turn raw data into pipelines, analyses, and models.
              </span>
              <span className={`${line(stage >= 2, false)} mt-3`}>
                I turn raw data into pipelines people can use.
              </span>
            </h1>

            <div
              className={`mt-10 max-w-2xl rounded-md border border-line p-6 ${late(stage >= 2)}`}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Ships with the last edit
              </p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="text-xl font-medium tracking-tight">
                    Olist E-Commerce Pipeline
                  </h2>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                    Daily Airflow pipeline on real Brazilian e-commerce data,
                    with data quality checks gating each run and a Metabase
                    dashboard on top.
                  </p>
                </div>
                {featured.metric?.count && (
                  <div className="shrink-0">
                    <p className="font-mono text-xs uppercase tracking-wide text-muted">
                      {featured.metric.label}
                    </p>
                    <p className="mt-1 text-4xl font-medium tracking-tight">
                      <CountUp
                        to={featured.metric.count.to}
                        prefix={featured.metric.count.prefix ?? ""}
                        suffix={featured.metric.count.suffix ?? ""}
                        decimals={featured.metric.count.decimals ?? 0}
                        active={stage >= 2}
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={`mt-8 flex flex-wrap gap-6 ${late(stage >= 2)}`}>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                download
                onClick={() => {
                  track("Download CV");
                  sendAnalyticsEvent("cv_download");
                }}
                className="nav-link font-mono text-sm text-ink"
              >
                Download CV ↓
              </a>
              <a
                href="https://github.com/Jereldavin"
                target="_blank"
                rel="noreferrer"
                className="nav-link font-mono text-sm text-muted hover:text-ink"
              >
                GitHub →
              </a>
              <a
                href="#projects"
                className="nav-link font-mono text-sm text-muted hover:text-ink"
              >
                See the work →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

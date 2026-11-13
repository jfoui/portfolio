"use client";

import { track } from "@vercel/analytics";
import { sendAnalyticsEvent } from "@/components/AnalyticsBeacon";
import { profile } from "@/data/content";

const edits = [
  { n: "01", label: "First draft" },
  { n: "02", label: "Say what I build" },
  { n: "03", label: "Shorter" },
];

export default function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-24 pt-36 md:grid-cols-[200px_1fr] md:pt-44">
        <aside data-enter className="hidden md:block">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            History of this headline
          </p>
          <ol className="relative mt-6 space-y-5 border-l border-line pl-5">
            {edits.map((edit) => (
              <li key={edit.n} className="relative">
                <span
                  className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-muted">{edit.n}</p>
                <p className="mt-0.5 text-sm text-muted">{edit.label}</p>
              </li>
            ))}
          </ol>
        </aside>

        <div>
          <h1 className="text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            <span
              data-enter
              className="block text-muted line-through decoration-muted/60"
            >
              Data Science student working across data engineering, analytics,
              and AI.
            </span>
            <span
              data-enter="1"
              className="mt-3 block text-muted line-through decoration-muted/60"
            >
              I turn raw data into pipelines, analyses, and models.
            </span>
            <span data-enter="2" className="mt-3 block">
              I turn raw data into pipelines people can use.
            </span>
          </h1>

          <div
            data-enter="3"
            className="mt-14 max-w-2xl rounded-md border border-line p-6"
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
              <div className="shrink-0">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  Orders processed
                </p>
                <p className="mt-1 text-4xl font-medium tracking-tight">
                  ~100K
                </p>
              </div>
            </div>
          </div>

          <div data-enter="3" className="mt-8 flex flex-wrap gap-6">
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
    </section>
  );
}

"use client";

import { track } from "@vercel/analytics";
import { sendAnalyticsEvent } from "@/components/AnalyticsBeacon";
import { profile } from "@/data/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen items-center border-b border-line"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-32 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p
            data-enter
            className="font-mono text-sm text-muted"
          >
            {profile.location}
          </p>
          <h1
            data-enter="1"
            className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>
          <p
            data-enter="2"
            className="mt-5 text-xl font-medium text-accent sm:text-2xl"
          >
            {profile.role}
          </p>
          <p
            data-enter="3"
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.tagline}
          </p>
          <div data-enter="3" className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="btn rounded-md bg-accent px-5 py-3 text-sm font-medium text-paper hover:bg-accent-hover"
            >
              View projects
            </a>
            <a
              href="https://github.com/Jereldavin"
              target="_blank"
              rel="noreferrer"
              className="btn rounded-md border border-line bg-surface px-5 py-3 text-sm font-medium hover:border-ink"
            >
              GitHub →
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              download
              onClick={() => {
                track("Download CV");
                sendAnalyticsEvent("cv_download");
              }}
              className="btn rounded-md border border-line bg-surface px-5 py-3 text-sm font-medium hover:border-ink"
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

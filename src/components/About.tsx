import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <p className="font-mono text-sm text-muted">01 / About</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {about.heading}
        </h2>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium">How data flows through my work</p>
            <ol className="mt-5 flex flex-col gap-0">
              {about.pipeline.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex flex-col items-center">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-xs font-semibold">
                      {i + 1}
                    </span>
                    {i < about.pipeline.length - 1 && (
                      <span className="h-6 w-px bg-line" aria-hidden="true" />
                    )}
                  </span>
                  <span className="pt-2 text-[15px] font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

import { timeline } from "@/data/content";

export default function Education() {
  return (
    <section id="education" className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <p className="font-mono text-sm text-muted">04 / Education</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Education &amp; experience
        </h2>
        <ol className="mt-10 space-y-6">
          {timeline.map((entry, i) => (
            <li
              key={i}
              className="grid gap-2 rounded-lg border border-line bg-surface p-6 sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              <p className="font-mono text-sm text-muted">{entry.period}</p>
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  {entry.placeholder && (
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                      Placeholder
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[15px] font-medium">{entry.place}</p>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {entry.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { skillGroups } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:py-36">
        <h2 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">
          What I work with.
        </h2>
        <div className="mt-12">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-2 border-t border-line py-6 md:grid-cols-[240px_1fr] md:gap-6"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="text-lg font-medium tracking-tight">
                  {group.title}
                </h3>
                {group.note && (
                  <span className="font-mono text-xs text-muted">
                    {group.note}
                  </span>
                )}
              </div>
              <p className="font-mono text-sm leading-relaxed text-muted">
                {group.skills
                  .map(
                    (skill) =>
                      skill.name + (skill.learning ? " (learning)" : ""),
                  )
                  .join("  ·  ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

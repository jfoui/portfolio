import { skillGroups } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <p className="font-mono text-sm text-muted">02 / Skills</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What I work with
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                {group.note && (
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                    {group.note}
                  </span>
                )}
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-md border border-line bg-paper px-3 py-1.5 text-sm"
                  >
                    {skill.name}
                    {skill.learning && (
                      <span className="ml-2 font-mono text-xs text-muted">
                        learning
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

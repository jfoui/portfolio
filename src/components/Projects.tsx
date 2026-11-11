import { projects, type Project } from "@/data/content";

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      {/* Photo slot — add a screenshot to public/ and a link in content.ts. */}
      <div className="placeholder-frame flex h-44 items-center justify-center border-b border-line">
        <span className="max-w-[240px] text-center text-sm leading-relaxed text-muted">
          Add your project photo
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          {project.placeholder && (
            <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-paper px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        {project.placeholder && (
          <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
            Add this project in src/data/content.ts
          </p>
        )}
      </div>
    </>
  );

  const className =
    "card-link flex flex-col overflow-hidden rounded-lg border border-line bg-surface";
  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={`${project.title}, open link`}
    >
      {inner}
    </a>
  ) : (
    <article className={className}>{inner}</article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <p className="font-mono text-sm text-muted">03 / Projects</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Six slots, waiting for real projects. Each one is filled from
          src/data/content.ts.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

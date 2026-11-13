import CountUp from "@/components/CountUp";
import MedallionFlow from "@/components/MedallionFlow";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/content";

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const body = (
    <div className="grid gap-6 py-8 md:grid-cols-[1fr_auto] md:items-start">
      <div>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          of {String(projects.length).padStart(2, "0")}
          {project.placeholder && (
            <span className="ml-3 rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
              Coming soon
            </span>
          )}
        </p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
            {project.tags.join("  ·  ")}
          </p>
        )}
        {project.link && (
          <p className="mt-4 font-mono text-sm text-ink">Open case ↗</p>
        )}
      </div>
      {project.metric && (
        <div className="shrink-0 md:text-right">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            {project.metric.label}
          </p>
          <p className="mt-2 text-4xl font-medium tracking-tight">
            {project.metric.from && (
              <span className="mr-3 text-muted line-through decoration-muted/60">
                {project.metric.from}
              </span>
            )}
            {project.metric.count ? (
              <CountUp
                to={project.metric.count.to}
                decimals={project.metric.count.decimals ?? 0}
                prefix={project.metric.count.prefix ?? ""}
                suffix={project.metric.count.suffix ?? ""}
              />
            ) : (
              project.metric.value
            )}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            {project.metric.caption}
          </p>
        </div>
      )}
      {project.medallionFlow && (
        <div className="shrink-0 md:flex md:justify-end">
          <MedallionFlow />
        </div>
      )}
    </div>
  );

  const className = "row-link block border-t border-line px-2 sm:px-4";
  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={`${project.title}, open link`}
    >
      {body}
    </a>
  ) : (
    <article className={className}>{body}</article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:py-36">
        <h2 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">
          Selected work.
        </h2>
        <p className="mt-3 text-lg text-muted">
          What changed, line by line.
        </p>
        <div className="mt-12">
          {projects.map((project, i) => (
            <Reveal key={i} delay={Math.min(i, 5) * 60}>
              <ProjectRow project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

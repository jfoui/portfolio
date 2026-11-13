import { contact, profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <p className="font-mono text-sm text-muted">05 / Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          The fastest way to see my work is GitHub. For anything else, reach
          out.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="card-link rounded-lg border border-line bg-surface p-6"
          >
            <p className="font-mono text-sm text-muted">GitHub</p>
            <p className="mt-2 font-medium">{contact.githubLabel} →</p>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="card-link rounded-lg border border-line bg-surface p-6"
          >
            <p className="font-mono text-sm text-muted">Email</p>
            <p className="mt-2 break-all font-medium">{contact.email}</p>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="card-link rounded-lg border border-line bg-surface p-6"
          >
            <p className="font-mono text-sm text-muted">LinkedIn</p>
            <p className="mt-2 font-medium">linkedin.com/in/jereldavin →</p>
          </a>
        </div>
      </div>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <p className="text-sm text-muted">
            © 2026 {profile.name}. Built with Next.js and Tailwind CSS.
          </p>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="nav-link text-sm text-muted hover:text-ink"
          >
            GitHub →
          </a>
        </div>
      </footer>
    </section>
  );
}

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
          out. Add your real email below.
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
          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="font-mono text-sm text-muted">
              Email{" "}
              <span className="rounded-full border border-line px-2 py-0.5 text-xs">
                Placeholder
              </span>
            </p>
            <p className="mt-2 font-medium">{contact.email}</p>
            <p className="mt-1 text-sm text-muted">
              Replace with your email in src/data/content.ts
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="font-mono text-sm text-muted">
              LinkedIn{" "}
              <span className="rounded-full border border-line px-2 py-0.5 text-xs">
                Placeholder
              </span>
            </p>
            <p className="mt-2 break-all font-medium">{contact.linkedin}</p>
            <p className="mt-1 text-sm text-muted">
              Replace with your profile in src/data/content.ts
            </p>
          </div>
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

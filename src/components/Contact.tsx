import { contact, profile } from "@/data/content";
import LoadTime from "@/components/LoadTime";

const links = [
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    value: contact.email,
    external: false,
  },
  {
    label: "GitHub",
    href: contact.github,
    value: contact.githubLabel,
    external: true,
  },
  {
    label: "LinkedIn",
    href: contact.linkedin,
    value: "linkedin.com/in/jereldavin",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:py-36">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Get in touch.
        </h2>
        <div className="mt-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="row-link flex items-baseline justify-between gap-4 border-t border-line px-2 py-5 sm:px-4"
            >
              <span className="font-mono text-sm text-muted">
                {link.label}
              </span>
              <span className="text-[15px]">
                {link.value}{" "}
                {link.external && <span className="text-muted">↗</span>}
              </span>
            </a>
          ))}
        </div>
      </div>
      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <p className="text-4xl font-medium tracking-tight sm:text-5xl">
            {profile.name}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Data Science student at Binus University, working across data
            engineering, analytics, and AI.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="nav-link text-sm text-muted hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="nav-link text-sm text-muted hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="nav-link text-sm text-muted hover:text-ink"
            >
              Email
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="font-mono text-xs text-muted">
              © 2026 {profile.name}. Built with Next.js and Tailwind CSS.
            </p>
            <LoadTime />
          </div>
        </div>
      </footer>
    </section>
  );
}

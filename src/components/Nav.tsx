import { nav, profile } from "@/data/content";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink font-mono text-sm font-semibold text-paper">
            {profile.initials}
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            {profile.name}
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm text-muted hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="https://github.com/Jereldavin"
          target="_blank"
          rel="noreferrer"
          className="btn rounded-md bg-accent px-4 py-2 text-sm font-medium text-paper hover:bg-accent-hover"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

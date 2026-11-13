import { nav, profile } from "@/data/content";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <a
          href="#top"
          className="text-[15px] font-medium tracking-tight hover:text-muted"
        >
          {profile.name}
        </a>
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Sections"
        >
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
          href="#contact"
          className="nav-link text-sm text-muted hover:text-ink md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

import { nav } from "@/data/content";

// Bottom navigation bar, mobile only: all five sections one tap away,
// no dropdown. Desktop keeps the links in the top header.
export default function MobileNavBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/90 backdrop-blur md:hidden"
      aria-label="Sections"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-5 px-2">
        {nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link whitespace-nowrap py-3.5 text-center font-mono text-[11px] text-muted hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

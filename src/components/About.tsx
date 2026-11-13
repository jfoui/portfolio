import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {about.heading}
        </h2>
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { about, profile } from "@/data/content";

const facts = [
  { label: "Based in", value: "Jakarta, Indonesia" },
  { label: "Studying", value: "Data Science, Binus University" },
  { label: "Focus", value: "Data engineering, analytics, AI" },
  { label: "Looking for", value: "Data & AI internships" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:py-36">
        <h2 className="mt-6 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Data pipelines, analyses, and models, built from raw data.
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_280px]">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            {profile.photo && (
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={280}
                height={350}
                className="h-[350px] w-[280px] rounded-md border border-line object-cover"
              />
            )}
            <dl className="mt-8">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-t border-line py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

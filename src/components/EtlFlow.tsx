// Extract → Transform → Load flow for the NYC Taxi ETL card.
// Right side of the row, where other cards show a metric.
const stages = [
  { name: "Extract", detail: "Trip records", highlight: false },
  { name: "Transform", detail: "Pandas", highlight: false },
  { name: "Load", detail: "PostgreSQL", highlight: true },
];

export default function EtlFlow() {
  return (
    <div
      className="flex items-stretch"
      aria-label="Extract, transform, load stages"
    >
      {stages.map((stage, i) => (
        <div key={stage.name} className="flex items-stretch">
          <div
            className={`rounded-md border px-3 py-2.5 ${
              stage.highlight ? "border-accent/60" : "border-line"
            }`}
          >
            <p
              className={`font-mono text-xs uppercase tracking-widest ${
                stage.highlight ? "text-accent" : "text-ink"
              }`}
            >
              {stage.name}
            </p>
            <p className="mt-1 whitespace-nowrap text-xs text-muted">
              {stage.detail}
            </p>
          </div>
          {i < stages.length - 1 && (
            <span
              className="mx-2 self-center font-mono text-sm text-muted"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

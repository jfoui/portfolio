// Bronze → Silver → Gold flow for the medallion architecture card.
// Right side of the row, where other cards show a metric.
const layers = [
  { name: "Bronze", detail: "Raw CSVs", highlight: false },
  { name: "Silver", detail: "Cleaned + typed", highlight: false },
  { name: "Gold", detail: "Revenue + delivery", highlight: true },
];

export default function MedallionFlow() {
  return (
    <div
      className="flex items-stretch"
      aria-label="Bronze, silver, gold layers"
    >
      {layers.map((layer, i) => (
        <div key={layer.name} className="flex items-stretch">
          <div
            className={`rounded-md border px-3 py-2.5 ${
              layer.highlight ? "border-accent/60" : "border-line"
            }`}
          >
            <p
              className={`font-mono text-xs uppercase tracking-widest ${
                layer.highlight ? "text-accent" : "text-ink"
              }`}
            >
              {layer.name}
            </p>
            <p className="mt-1 whitespace-nowrap text-xs text-muted">
              {layer.detail}
            </p>
          </div>
          {i < layers.length - 1 && (
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

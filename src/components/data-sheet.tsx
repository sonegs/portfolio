// The block of specifications in the header: a term on the left, its value right
// aligned, one hairline per row.
function DataSheet({ children, className }: { children: React.ReactNode; className?: string }) {
  return <dl className={className}>{children}</dl>;
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-rule/60 py-2">
      <dt className="label text-[0.68rem] text-ink-soft">{term}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

DataSheet.Row = Row;

export { DataSheet };

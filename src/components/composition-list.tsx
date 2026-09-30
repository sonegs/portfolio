import type { composition } from "@/content";
import type { Translate } from "@/i18n";

function CompositionList({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

function Material({ item, t }: { item: (typeof composition)[number]; t: Translate }) {
  const name = t(item.material);
  const share = `${item.percentage}%`;
  const bar = { width: share };

  return (
    <li className="border-b border-rule/60 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <span translate="no">{name}</span>
        <span className="text-ink-soft">{share}</span>
      </div>
      <div aria-hidden className="mt-2 h-[2px] bg-dye" style={bar} />
    </li>
  );
}

CompositionList.Material = Material;

export { CompositionList };

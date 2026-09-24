import type { composition } from "@/content";
import type { Translate } from "@/i18n";

function CompositionList({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

function Material({ item, t }: { item: (typeof composition)[number]; t: Translate }) {
  return (
    <li className="border-b border-rule/60 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <span translate="no">{t(item.material)}</span>
        <span className="text-ink-soft">{item.percentage}%</span>
      </div>
      <div aria-hidden className="mt-2 h-[2px] bg-dye" style={{ width: `${item.percentage}%` }} />
    </li>
  );
}

CompositionList.Material = Material;

export { CompositionList };

import type { composition } from "@/content";
import { getT, type Language } from "@/i18n";

function CompositionMaterial({ item, lang }: { item: (typeof composition)[number]; lang: Language }) {
  const t = getT(lang);
  const share = `${item.percentage}%`;

  return (
    <li className="border-b border-rule/60 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <span translate="no">{t(item.material)}</span>
        <span className="text-ink-soft">{share}</span>
      </div>
      <div aria-hidden className="mt-2 h-[2px] bg-dye" style={{ width: share }} />
    </li>
  );
}

export default CompositionMaterial;

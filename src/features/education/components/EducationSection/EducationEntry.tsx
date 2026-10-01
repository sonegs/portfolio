import type { education } from "@/content";
import { getT, type Language } from "@/i18n";

function EducationEntry({ entry, lang }: { entry: (typeof education)[number]; lang: Language }) {
  const t = getT(lang);
  // A course that starts and ends the same year is one year, not a range.
  const period = entry.from === entry.to ? entry.from : `${entry.from} — ${entry.to}`;

  return (
    <li className="col-span-12 border-t border-rule/60 pt-4 md:col-span-4">
      <p className="label text-[0.68rem] text-ink-soft">{period}</p>
      <h3 className="pt-2 text-xl md:text-2xl">{t(`EDUCATION_${entry.key}_TITLE`)}</h3>
      <p className="text-ink-soft" translate="no">
        {entry.school}
      </p>
    </li>
  );
}

export default EducationEntry;

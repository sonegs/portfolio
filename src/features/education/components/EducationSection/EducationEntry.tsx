import type { education } from "@/content";
import { getT, type Language } from "@/i18n";

function EducationEntry({ entry, lang }: { entry: (typeof education)[number]; lang: Language }) {
  const t = getT(lang);
  const period = `${entry.from} — ${entry.to}`;
  const title = t(`EDUCATION_${entry.key}_TITLE`);

  return (
    <li className="col-span-12 border-t border-rule/60 pt-4 md:col-span-4">
      <p className="label text-[0.68rem] text-ink-soft">{period}</p>
      <h3 className="pt-2 text-xl md:text-2xl">{title}</h3>
      <p className="text-ink-soft" translate="no">
        {entry.school}
      </p>
    </li>
  );
}

export default EducationEntry;

import type { skills } from "@/content";
import { getT, type Language } from "@/i18n";

function SkillRow({ skill, lang }: { skill: (typeof skills)[number]; lang: Language }) {
  const t = getT(lang);
  const share = `${skill.percentage}%`;

  return (
    <li className="skill-row border-b border-rule/60 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <span translate="no">{t(skill.name)}</span>
        <span className="text-ink-soft">{share}</span>
      </div>
      <div aria-hidden className="bar mt-2 h-[2px] bg-dye" style={{ width: share }} />
    </li>
  );
}

export default SkillRow;

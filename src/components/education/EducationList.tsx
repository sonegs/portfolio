import type { education } from "@/content";
import type { Translate } from "@/i18n";

function EducationList({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-12 gap-x-8 gap-y-8 pt-8">{children}</ul>;
}

function Entry({ entry, t }: { entry: (typeof education)[number]; t: Translate }) {
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

EducationList.Entry = Entry;

export default EducationList;

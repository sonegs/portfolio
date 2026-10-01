import { Rule } from "@/components/Rule";
import { Section, SectionHeader, SectionTitle } from "@/components/Section";
import { education } from "@/content";
import { getT, type Language } from "@/i18n";
import EducationEntry from "./EducationEntry";

function EducationSection({ lang }: { lang: Language }) {
  const t = getT(lang);

  if (education.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t("EDUCATION")}</SectionTitle>
      </SectionHeader>
      <Rule delay={80} />
      <ul className="grid grid-cols-12 gap-x-8 gap-y-8 pt-8">
        {education.map((entry) => (
          <EducationEntry key={entry.key} entry={entry} lang={lang} />
        ))}
      </ul>
    </Section>
  );
}

export default EducationSection;

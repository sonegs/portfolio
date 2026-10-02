import { Rule } from "@/components/Rule";
import { SectionHeader, SectionTitle } from "@/components/Section";
import { skills } from "@/content";
import { getT, type Language } from "@/i18n";
import SkillRow from "./SkillRow";

function SkillsPanel({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <div>
      <SectionHeader>
        <SectionTitle>{t("SKILLS")}</SectionTitle>
      </SectionHeader>
      <Rule delay={80} />
      <ul>
        {skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} lang={lang} />
        ))}
      </ul>
    </div>
  );
}

export default SkillsPanel;

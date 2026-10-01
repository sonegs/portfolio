import { Rule } from "@/components/Rule";
import { SectionHeader, SectionTitle } from "@/components/Section";
import { careInstructions } from "@/content";
import { getT, type Language } from "@/i18n";
import CareInstruction from "./CareInstruction";

function CarePanel({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <div className="col-span-12 md:col-span-5 md:col-start-8">
      <SectionHeader>
        <SectionTitle>{t("CARE_INSTRUCTIONS")}</SectionTitle>
      </SectionHeader>
      <Rule delay={80} />
      <ul>
        {careInstructions.map((instruction) => (
          <CareInstruction key={instruction}>{t(instruction)}</CareInstruction>
        ))}
      </ul>
    </div>
  );
}

export default CarePanel;

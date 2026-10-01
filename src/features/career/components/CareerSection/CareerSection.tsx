import { Rule } from "@/components/Rule";
import { Section, SectionHeader, SectionTitle } from "@/components/Section";
import { career } from "@/content";
import { getT, type Language } from "@/i18n";
import CareerEntry from "./CareerEntry";

// A timeline on a rail rather than one more ruled table. The feature owns its data, so
// the page only decides where the band sits.
function CareerSection({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t("CAREER")}</SectionTitle>
      </SectionHeader>
      <Rule delay={80} />
      <ol className="timeline pt-8">
        {career.map((stage) => (
          <CareerEntry key={stage.key} stage={stage} lang={lang} />
        ))}
      </ol>
    </Section>
  );
}

export default CareerSection;

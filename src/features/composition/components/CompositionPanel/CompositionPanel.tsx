import { Rule } from "@/components/Rule";
import { SectionHeader, SectionTitle } from "@/components/Section";
import { composition } from "@/content";
import { getT, type Language } from "@/i18n";
import CompositionMaterial from "./CompositionMaterial";

function CompositionPanel({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <div className="col-span-12 md:col-span-6">
      <SectionHeader>
        <SectionTitle>{t("COMPOSITION")}</SectionTitle>
      </SectionHeader>
      <Rule delay={80} />
      <ul>
        {composition.map((item) => (
          <CompositionMaterial key={item.material} item={item} lang={lang} />
        ))}
      </ul>
    </div>
  );
}

export default CompositionPanel;

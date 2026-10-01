import { Rule } from "@/components/Rule";
import { SectionHeader, SectionTitle } from "@/components/Section";
import { composition } from "@/content";
import { getT, type Language } from "@/i18n";
import CompositionMaterial from "./CompositionMaterial";

// A panel, not a band: it shares a Section with the care instructions, and the page
// owns that two-column grid.
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

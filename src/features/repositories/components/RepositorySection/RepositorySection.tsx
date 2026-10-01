import { Rule } from "@/components/Rule";
import { Section, SectionHeader, SectionLink, SectionTitle } from "@/components/Section";
import { profile, repositories } from "@/content";
import { getT, type Language } from "@/i18n";
import RepositoryRow from "./RepositoryRow";

function RepositorySection({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t("PUBLIC_CODE")}</SectionTitle>
        <SectionLink href={profile.github} translate="no">
          github.com/sonegs
        </SectionLink>
      </SectionHeader>
      <Rule delay={80} />
      <ul>
        {repositories.map((repository) => (
          <RepositoryRow key={repository.key} repository={repository} lang={lang} />
        ))}
      </ul>
    </Section>
  );
}

export default RepositorySection;

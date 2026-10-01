import { Rule } from "@/components/Rule";
import { Section, SectionHeader, SectionLink, SectionTitle } from "@/components/Section";
import { profile, testimonials } from "@/content";
import { getT, type Language } from "@/i18n";
import TestimonialCard from "./TestimonialCard";

function TestimonialSection({ lang }: { lang: Language }) {
  const t = getT(lang);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t("TESTIMONIALS")}</SectionTitle>
        <SectionLink href={profile.linkedin}>{t("TESTIMONIALS_SOURCE")}</SectionLink>
      </SectionHeader>
      <Rule delay={80} />
      <div className="rail pt-8" tabIndex={0} role="group" aria-label={t("TESTIMONIALS")}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.key} testimonial={testimonial} lang={lang} />
        ))}
      </div>
    </Section>
  );
}

export default TestimonialSection;

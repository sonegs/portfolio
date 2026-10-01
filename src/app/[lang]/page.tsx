import { Portrait } from "@/components/Portrait";
import { Rule } from "@/components/Rule";
import { Section, SectionHeader, SectionLink, SectionTitle } from "@/components/Section";
import { SheetFooter } from "@/components/SheetFooter";
import { SheetHeader } from "@/components/SheetHeader";
import { notFound } from "next/navigation";
import { CareList } from "@/components/care";
import { CareerTimeline } from "@/components/career";
import { CompositionList } from "@/components/composition";
import { EducationList } from "@/components/education";
import { RepositoryList } from "@/components/repositories";
import { TestimonialRail } from "@/components/testimonials";
import { career, careInstructions, composition, education, profile, repositories, testimonials } from "@/content";
import { getT, isLanguage } from "@/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = getT(lang);
  const hasEducation = education.length > 0;
  const hasTestimonials = testimonials.length > 0;

  return (
    <main className="mx-auto max-w-[78rem] overflow-x-clip px-5 pb-28 md:px-10">
      <SheetHeader lang={lang} />

      <Section className="grid grid-cols-12 items-start gap-x-8 gap-y-8 pt-16 md:pt-24">
        <div className="col-span-12 md:col-span-3 md:pt-[0.7rem]">
          <Portrait lang={lang} />
        </div>
        <p className="col-span-12 min-w-0 max-w-[62ch] text-pretty text-lg leading-[1.55] md:col-span-9 md:text-[1.35rem]">
          {t("SUMMARY")}
        </p>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{t("CAREER")}</SectionTitle>
        </SectionHeader>
        <Rule delay={80} />
        <CareerTimeline>
          {career.map((stage) => (
            <CareerTimeline.Entry key={stage.key} stage={stage} lang={lang} />
          ))}
        </CareerTimeline>
      </Section>

      {hasEducation && (
        <Section>
          <SectionHeader>
            <SectionTitle>{t("EDUCATION")}</SectionTitle>
          </SectionHeader>
          <Rule delay={80} />
          <EducationList>
            {education.map((entry) => (
              <EducationList.Entry key={entry.key} entry={entry} lang={lang} />
            ))}
          </EducationList>
        </Section>
      )}

      <Section>
        <SectionHeader>
          <SectionTitle>{t("PUBLIC_CODE")}</SectionTitle>
          <SectionLink href={profile.github} translate="no">
            github.com/sonegs
          </SectionLink>
        </SectionHeader>
        <Rule delay={80} />
        <RepositoryList>
          {repositories.map((repository) => (
            <RepositoryList.Item key={repository.key} repository={repository} lang={lang} />
          ))}
        </RepositoryList>
      </Section>

      {hasTestimonials && (
        <Section>
          <SectionHeader>
            <SectionTitle>{t("TESTIMONIALS")}</SectionTitle>
            <SectionLink href={profile.linkedin}>{t("TESTIMONIALS_SOURCE")}</SectionLink>
          </SectionHeader>
          <Rule delay={80} />
          <TestimonialRail lang={lang}>
            {testimonials.map((testimonial) => (
              <TestimonialRail.Card key={testimonial.key} testimonial={testimonial} lang={lang} />
            ))}
          </TestimonialRail>
        </Section>
      )}

      <Section className="grid grid-cols-12 gap-x-8 gap-y-14 pt-20 md:pt-28">
        <div className="col-span-12 md:col-span-6">
          <SectionHeader>
            <SectionTitle>{t("COMPOSITION")}</SectionTitle>
          </SectionHeader>
          <Rule delay={80} />
          <CompositionList>
            {composition.map((item) => (
              <CompositionList.Material key={item.material} item={item} lang={lang} />
            ))}
          </CompositionList>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <SectionHeader>
            <SectionTitle>{t("CARE_INSTRUCTIONS")}</SectionTitle>
          </SectionHeader>
          <Rule delay={80} />
          <CareList>
            {careInstructions.map((instruction) => (
              <CareList.Instruction key={instruction}>{t(instruction)}</CareList.Instruction>
            ))}
          </CareList>
        </div>
      </Section>

      <SheetFooter lang={lang} />
    </main>
  );
}

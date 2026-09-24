import { notFound } from "next/navigation";
import { CareList } from "@/components/care-list";
import { CareerTimeline } from "@/components/career-timeline";
import { CompositionList } from "@/components/composition-list";
import { EducationList } from "@/components/education-list";
import { RepositoryList } from "@/components/repository-list";
import { Section } from "@/components/section";
import { SheetFooter } from "@/components/sheet-footer";
import { SheetHeader } from "@/components/sheet-header";
import { TestimonialRail } from "@/components/testimonial-rail";
import { career, careInstructions, composition, education, profile, repositories, testimonials } from "@/content";
import { getT, isLanguage } from "@/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await getT(lang);

  return (
    <main className="mx-auto max-w-[78rem] overflow-x-clip px-5 pb-28 md:px-10">
      <SheetHeader t={t} lang={lang} />

      <Section className="grid grid-cols-12 gap-x-8 pt-16 md:pt-24">
        <p className="col-span-12 min-w-0 max-w-[62ch] text-pretty text-lg leading-[1.55] md:col-span-9 md:col-start-4 md:text-[1.35rem]">
          {t("SUMMARY")}
        </p>
      </Section>

      <Section>
        <Section.Header>
          <Section.Title>{t("CAREER")}</Section.Title>
        </Section.Header>
        <Section.Rule delay={80} />
        <CareerTimeline>
          {career.map((stage) => (
            <CareerTimeline.Entry key={stage.key} stage={stage} t={t} />
          ))}
        </CareerTimeline>
      </Section>

      {education.length > 0 && (
        <Section>
          <Section.Header>
            <Section.Title>{t("EDUCATION")}</Section.Title>
          </Section.Header>
          <Section.Rule delay={80} />
          <EducationList>
            {education.map((entry) => (
              <EducationList.Entry key={entry.key} entry={entry} t={t} />
            ))}
          </EducationList>
        </Section>
      )}

      <Section>
        <Section.Header>
          <Section.Title>{t("PUBLIC_CODE")}</Section.Title>
          <Section.Link href={profile.github} translate="no">
            github.com/sonegs
          </Section.Link>
        </Section.Header>
        <Section.Rule delay={80} />
        <RepositoryList>
          {repositories.map((repository) => (
            <RepositoryList.Item key={repository.key} repository={repository} t={t} />
          ))}
        </RepositoryList>
      </Section>

      {testimonials.length > 0 && (
        <Section>
          <Section.Header>
            <Section.Title>{t("TESTIMONIALS")}</Section.Title>
            <Section.Link href={profile.linkedin}>{t("TESTIMONIALS_SOURCE")}</Section.Link>
          </Section.Header>
          <Section.Rule delay={80} />
          <TestimonialRail label={t("TESTIMONIALS")}>
            {testimonials.map((testimonial) => (
              <TestimonialRail.Card key={testimonial.key} testimonial={testimonial} t={t} />
            ))}
          </TestimonialRail>
        </Section>
      )}

      <Section className="grid grid-cols-12 gap-x-8 gap-y-14 pt-20 md:pt-28">
        <div className="col-span-12 md:col-span-6">
          <Section.Header>
            <Section.Title>{t("COMPOSITION")}</Section.Title>
          </Section.Header>
          <Section.Rule delay={80} />
          <CompositionList>
            {composition.map((item) => (
              <CompositionList.Material key={item.material} item={item} t={t} />
            ))}
          </CompositionList>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <Section.Header>
            <Section.Title>{t("CARE_INSTRUCTIONS")}</Section.Title>
          </Section.Header>
          <Section.Rule delay={80} />
          <CareList>
            {careInstructions.map((instruction) => (
              <CareList.Instruction key={instruction}>{t(instruction)}</CareList.Instruction>
            ))}
          </CareList>
        </div>
      </Section>

      <SheetFooter t={t} />
    </main>
  );
}

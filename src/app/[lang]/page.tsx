import { notFound } from "next/navigation";
import { Portrait } from "@/components/Portrait";
import { Section } from "@/components/Section";
import { SheetFooter } from "@/components/SheetFooter";
import { SheetHeader } from "@/components/SheetHeader";
import { CarePanel } from "@/features/care/components/CarePanel";
import { CareerSection } from "@/features/career/components/CareerSection";
import { CompositionPanel } from "@/features/composition/components/CompositionPanel";
import { EducationSection } from "@/features/education/components/EducationSection";
import { RepositorySection } from "@/features/repositories/components/RepositorySection";
import { TestimonialSection } from "@/features/testimonials/components/TestimonialSection";
import { getT, isLanguage } from "@/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = getT(lang);

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

      <CareerSection lang={lang} />
      <EducationSection lang={lang} />
      <RepositorySection lang={lang} />
      <TestimonialSection lang={lang} />

      <Section className="grid grid-cols-12 gap-x-8 gap-y-14 pt-20 md:pt-28">
        <CompositionPanel lang={lang} />
        <CarePanel lang={lang} />
      </Section>

      <SheetFooter lang={lang} />
    </main>
  );
}

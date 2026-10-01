import { Separator } from "@/components/ui/separator";
import type { testimonials } from "@/content";
import { getT, type Language } from "@/i18n";
import { toParagraphs } from "@/lib/paragraphs";

function TestimonialCard({ testimonial, lang }: { testimonial: (typeof testimonials)[number]; lang: Language }) {
  const t = getT(lang);
  const paragraphs = toParagraphs(t(`TESTIMONIAL_${testimonial.key}_TEXT`));

  return (
    <figure className="rounded-lg border border-rule/60 p-6 md:p-8">
      <blockquote className="space-y-4 text-pretty text-lg leading-[1.5] md:text-xl">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
      <figcaption className="pt-6">
        <Separator className="bg-rule/60" />
        <p className="pt-4 text-lg" translate="no">
          {testimonial.name}
        </p>
        <p className="text-ink-soft" translate="no">
          {testimonial.role}
        </p>
        <p className="label pt-2 text-[0.68rem] text-dye">{t(`TESTIMONIAL_${testimonial.key}_RELATION`)}</p>
      </figcaption>
    </figure>
  );
}

export default TestimonialCard;

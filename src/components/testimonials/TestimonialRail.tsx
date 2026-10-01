import { Separator } from "@/components/ui/separator";
import type { testimonials } from "@/content";
import { getT, type Language } from "@/i18n";

// Scroll snapping does the carousel: one card today, a swipeable rail the moment there
// is a second, with no JavaScript either way. The container takes focus so it can also
// be walked with the keyboard.
function TestimonialRail({ lang, children }: { lang: Language; children: React.ReactNode }) {
  const label = getT(lang)("TESTIMONIALS");

  return (
    <div className="rail pt-8" tabIndex={0} role="group" aria-label={label}>
      {children}
    </div>
  );
}

function Card({ testimonial, lang }: { testimonial: (typeof testimonials)[number]; lang: Language }) {
  const t = getT(lang);
  const paragraphs = t(`TESTIMONIAL_${testimonial.key}_TEXT`).split("\n\n");
  const relation = t(`TESTIMONIAL_${testimonial.key}_RELATION`);

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
        <p className="label pt-2 text-[0.68rem] text-dye">{relation}</p>
      </figcaption>
    </figure>
  );
}

TestimonialRail.Card = Card;

export default TestimonialRail;

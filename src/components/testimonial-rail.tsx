import { Separator } from "@/components/ui/separator";
import type { testimonials } from "@/content";
import type { Translate } from "@/i18n";

// Scroll snapping does the carousel: one card today, a swipeable rail the moment there
// is a second, with no JavaScript either way. The container takes focus so it can also
// be walked with the keyboard.
function TestimonialRail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rail pt-8" tabIndex={0} role="group" aria-label={label}>
      {children}
    </div>
  );
}

function Card({ testimonial, t }: { testimonial: (typeof testimonials)[number]; t: Translate }) {
  return (
    <figure className="border border-rule/60 p-6 md:p-8">
      <blockquote className="text-pretty text-lg leading-[1.5] md:text-xl">
        {t(`TESTIMONIAL_${testimonial.key}_TEXT`)
          .split("\n\n")
          .map((paragraph, index) => (
            <p key={paragraph} className={index > 0 ? "pt-4" : undefined}>
              {paragraph}
            </p>
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

TestimonialRail.Card = Card;

export { TestimonialRail };

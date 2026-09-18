import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { career, careerStart, careInstructions, composition, profile, repositories, testimonials } from "@/content";
import { getT, isLanguage, languages, type Language } from "@/i18n";

function Rule({ delay = 0 }: { delay?: number }) {
  return <Separator className="rule-in bg-rule" style={{ animationDelay: `${delay}ms` }} />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="label text-xs text-ink-soft">{children}</h2>;
}

function DataRow({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-rule/60 py-2">
      <dt className="label text-[0.68rem] text-ink-soft">{term}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

function LanguagePicker({ current }: { current: Language }) {
  return (
    <ul className="flex gap-3">
      {languages.map((language) => (
        <li key={language}>
          <Link
            href={`/${language}`}
            hrefLang={language}
            aria-current={language === current ? "page" : undefined}
            className={
              language === current ? "text-ink" : "text-ink-soft transition-colors duration-200 hover:text-dye"
            }
          >
            {language.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await getT(lang);
  const years = new Date().getFullYear() - careerStart;

  return (
    <main className="mx-auto max-w-[78rem] overflow-x-clip px-5 pb-28 md:px-10">
      <header className="pt-6">
        <div className="label flex items-baseline justify-between gap-4 pb-3 text-[0.68rem] text-ink-soft">
          <span>{t("SHEET_REVISION")}</span>
          <div className="flex items-baseline gap-6">
            <LanguagePicker current={lang} />
            <ThemeToggle label={t("THEME_TOGGLE")} />
          </div>
        </div>
        <Rule />

        <div className="grid grid-cols-12 gap-x-8 gap-y-10 pt-8 md:pt-14">
          <div className="col-span-12 min-w-0 md:col-span-7">
            <h1 className="display settle text-[clamp(2.5rem,11vw,8.5rem)]" translate="no">
              {profile.name}
            </h1>
            <p className="label settle pt-5 text-[0.78rem] text-dye" style={{ animationDelay: "120ms" }}>
              {t("ROLE")}
            </p>
          </div>
          <dl className="col-span-12 self-end text-[0.95rem] md:col-span-4 md:col-start-9">
            <DataRow term={t("BASED_IN")} value={t("BASED_IN_VALUE")} />
            <DataRow term={t("EXPERIENCE")} value={t("EXPERIENCE_VALUE", { years })} />
            <DataRow term={t("FOCUS")} value={<span translate="no">{profile.focus}</span>} />
            <DataRow
              term={t("EMAIL")}
              value={
                <a
                  className="underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
                  href={`mailto:${profile.email}`}
                  translate="no"
                >
                  {profile.email}
                </a>
              }
            />
          </dl>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-x-8 pt-16 md:pt-24">
        <p className="col-span-12 min-w-0 max-w-[62ch] text-pretty text-lg leading-[1.55] md:col-span-9 md:col-start-4 md:text-[1.35rem]">
          {t("SUMMARY")}
        </p>
      </section>

      <section className="pt-20 md:pt-28">
        <div className="flex items-baseline justify-between gap-4 pb-3">
          <SectionTitle>{t("PUBLIC_CODE")}</SectionTitle>
          <a
            className="label text-[0.68rem] text-ink-soft underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
            href={profile.github}
            translate="no"
          >
            github.com/sonegs
          </a>
        </div>
        <Rule delay={80} />
        <ul>
          {repositories.map((repository) => (
            <li key={repository.key} className="entry group relative border-b border-rule/60">
              <a
                className="grid grid-cols-12 items-baseline gap-x-6 py-5 md:py-6"
                href={`${profile.github}/${repository.name}`}
              >
                <h3 className="col-span-9 min-w-0 text-xl md:col-span-4 md:text-2xl" translate="no">
                  {repository.name}
                  <span aria-hidden className="arrow inline-block pl-2 text-dye">
                    ↗
                  </span>
                </h3>
                <span className="col-span-3 text-right text-ink-soft md:order-last md:col-span-1">
                  {repository.year}
                </span>
                <p className="col-span-12 min-w-0 max-w-[48ch] pt-2 text-ink-soft md:col-span-4 md:pt-0">
                  {t(`REPO_${repository.key}_DESCRIPTION`)}
                </p>
                <span className="col-span-12 pt-2 text-ink-soft md:col-span-3 md:pt-0" translate="no">
                  {repository.stack}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-20 md:pt-28">
        <div className="pb-3">
          <SectionTitle>{t("CAREER")}</SectionTitle>
        </div>
        <Rule delay={80} />
        <ol className="timeline pt-8">
          {career.map((stage) => (
            <li key={stage.key} className="grid grid-cols-12 gap-x-6 pb-10 last:pb-0" data-current={stage.to === null}>
              <span className="label col-span-12 pt-[0.15rem] text-[0.68rem] text-ink-soft md:col-span-3">
                {stage.from} — {stage.to ?? t("TODAY")}
              </span>
              <h3 className="col-span-12 pt-2 text-xl md:col-span-4 md:pt-0 md:text-2xl">
                {t(`CAREER_${stage.key}_ROLE`)}
                <span className="block text-base text-ink-soft md:text-lg">{t(`CAREER_${stage.key}_COMPANY`)}</span>
              </h3>
              <p className="col-span-12 min-w-0 max-w-[48ch] pt-2 text-ink-soft md:col-span-5 md:pt-0">
                {t(`CAREER_${stage.key}_DETAIL`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {testimonials.length > 0 && (
        <section className="pt-20 md:pt-28">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <SectionTitle>{t("TESTIMONIALS")}</SectionTitle>
            <a
              className="label text-[0.68rem] text-ink-soft underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
              href={profile.linkedin}
            >
              {t("TESTIMONIALS_SOURCE")}
            </a>
          </div>
          <Rule delay={80} />
          {/* Scroll snapping does the carousel: it is one card today and a swipeable
              rail the moment there is a second, with no JavaScript either way. The
              container takes focus so it can also be walked with the keyboard. */}
          <div className="rail pt-8" tabIndex={0} role="group" aria-label={t("TESTIMONIALS")}>
            {testimonials.map((testimonial) => (
              <figure key={testimonial.key} className="border border-rule/60 p-6 md:p-8">
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
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-12 gap-x-8 gap-y-14 pt-20 md:pt-28">
        <div className="col-span-12 md:col-span-6">
          <div className="pb-3">
            <SectionTitle>{t("COMPOSITION")}</SectionTitle>
          </div>
          <Rule delay={80} />
          <ul>
            {composition.map((item) => (
              <li key={item.material} className="border-b border-rule/60 py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span translate="no">{t(item.material)}</span>
                  <span className="text-ink-soft">{item.percentage}%</span>
                </div>
                <div aria-hidden className="mt-2 h-[2px] bg-dye" style={{ width: `${item.percentage}%` }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <div className="pb-3">
            <SectionTitle>{t("CARE_INSTRUCTIONS")}</SectionTitle>
          </div>
          <Rule delay={80} />
          <ul>
            {careInstructions.map((instruction) => (
              <li key={instruction} className="flex gap-3 border-b border-rule/60 py-3 text-ink-soft">
                <span aria-hidden className="mt-[0.55em] h-[6px] w-[6px] shrink-0 bg-dye" />
                {t(instruction)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="pt-24 md:pt-32">
        <Rule delay={80} />
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-5">
          <p className="display text-[clamp(2rem,7vw,4.5rem)]">{t("LETS_TALK")}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-lg">
            {[
              { text: t("LINK_EMAIL"), url: `mailto:${profile.email}` },
              { text: "GitHub", url: profile.github },
              { text: "LinkedIn", url: profile.linkedin },
            ].map((link) => (
              <li key={link.text}>
                <a
                  className="underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
                  href={link.url}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </main>
  );
}

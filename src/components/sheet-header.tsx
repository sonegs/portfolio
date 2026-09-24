import { DataSheet } from "@/components/data-sheet";
import { InlineLink } from "@/components/inline-link";
import { LanguagePicker } from "@/components/language-picker";
import { Rule } from "@/components/rule";
import { ThemeToggle } from "@/components/theme-toggle";
import { careerStart, profile } from "@/content";
import type { Language, Translate } from "@/i18n";

export function SheetHeader({ t, lang }: { t: Translate; lang: Language }) {
  const years = new Date().getFullYear() - careerStart;

  return (
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
        <DataSheet className="col-span-12 self-end text-[0.95rem] md:col-span-4 md:col-start-9">
          <DataSheet.Row term={t("BASED_IN")}>{t("BASED_IN_VALUE")}</DataSheet.Row>
          <DataSheet.Row term={t("EXPERIENCE")}>{t("EXPERIENCE_VALUE", { years })}</DataSheet.Row>
          <DataSheet.Row term={t("FOCUS")}>
            <span translate="no">{profile.focus}</span>
          </DataSheet.Row>
          <DataSheet.Row term={t("EMAIL")}>
            <InlineLink href={`mailto:${profile.email}`} translate="no">
              {profile.email}
            </InlineLink>
          </DataSheet.Row>
        </DataSheet>
      </div>
    </header>
  );
}

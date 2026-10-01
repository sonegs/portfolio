import { DataSheet, DataSheetRow } from "@/components/DataSheet";
import { InlineLink } from "@/components/InlineLink";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Rule } from "@/components/Rule";
import { ThemeToggle } from "@/components/ThemeToggle";
import { careerStart, profile } from "@/content";
import { getT, type Language } from "@/i18n";

function SheetHeader({ lang }: { lang: Language }) {
  const t = getT(lang);
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
          <DataSheetRow term={t("BASED_IN")}>{t("BASED_IN_VALUE")}</DataSheetRow>
          <DataSheetRow term={t("EXPERIENCE")}>{t("EXPERIENCE_VALUE", { years })}</DataSheetRow>
          <DataSheetRow term={t("FOCUS")}>
            <span translate="no">{profile.focus}</span>
          </DataSheetRow>
          <DataSheetRow term={t("EMAIL")}>
            <InlineLink href={`mailto:${profile.email}`} translate="no">
              {profile.email}
            </InlineLink>
          </DataSheetRow>
        </DataSheet>
      </div>
    </header>
  );
}

export default SheetHeader;

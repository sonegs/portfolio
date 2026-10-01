import type { Language } from "@/i18n";

function LanguageLink({ language, current }: { language: Language; current: Language }) {
  const isCurrent = language === current;
  const ariaCurrent = isCurrent ? "page" : undefined;
  const className = isCurrent ? "text-ink" : "text-ink-soft transition-colors duration-200 hover:text-dye";

  return (
    <a href={`/${language}`} hrefLang={language} aria-current={ariaCurrent} className={className}>
      {language.toUpperCase()}
    </a>
  );
}

export default LanguageLink;

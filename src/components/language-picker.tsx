import { languages, type Language } from "@/i18n";

// A plain anchor, not next/link, on purpose. The root layout lives under [lang], so a
// soft navigation would re-render it on the client: React then meets the <script> that
// next-themes renders to apply the theme before paint and warns about it, and the lang
// attribute on <html> is left stale. Changing language changes the document, so it is
// a document navigation.
function LanguageLink({ language, current }: { language: Language; current: Language }) {
  const isCurrent = language === current;
  const href = `/${language}`;
  const label = language.toUpperCase();
  const ariaCurrent = isCurrent ? "page" : undefined;
  const className = isCurrent ? "text-ink" : "text-ink-soft transition-colors duration-200 hover:text-dye";

  return (
    <a href={href} hrefLang={language} aria-current={ariaCurrent} className={className}>
      {label}
    </a>
  );
}

export function LanguagePicker({ current }: { current: Language }) {
  return (
    <ul className="flex gap-3">
      {languages.map((language) => (
        <li key={language}>
          <LanguageLink language={language} current={current} />
        </li>
      ))}
    </ul>
  );
}

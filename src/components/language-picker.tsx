import { languages, type Language } from "@/i18n";

// A plain anchor, not next/link, on purpose. The root layout lives under [lang], so a
// soft navigation would re-render it on the client: React then meets the <script> that
// next-themes renders to apply the theme before paint and warns about it, and the lang
// attribute on <html> is left stale. Changing language changes the document, so it is
// a document navigation.
export function LanguagePicker({ current }: { current: Language }) {
  return (
    <ul className="flex gap-3">
      {languages.map((language) => (
        <li key={language}>
          <a
            href={`/${language}`}
            hrefLang={language}
            aria-current={language === current ? "page" : undefined}
            className={
              language === current ? "text-ink" : "text-ink-soft transition-colors duration-200 hover:text-dye"
            }
          >
            {language.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
}

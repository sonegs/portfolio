import Link from "next/link";
import { languages, type Language } from "@/i18n";

export function LanguagePicker({ current }: { current: Language }) {
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

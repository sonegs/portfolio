import { languages, type Language } from "@/i18n";
import LanguageLink from "./LanguageLink";

function LanguagePicker({ current }: { current: Language }) {
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

export default LanguagePicker;

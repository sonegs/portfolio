import { notFound } from "next/navigation";
import { isLanguage, type Language } from "@/i18n";

// Lives here rather than in i18n.ts so the i18n module stays free of Next imports.
export function toLanguage(value: string): Language {
  if (!isLanguage(value)) {
    notFound();
  }

  return value;
}

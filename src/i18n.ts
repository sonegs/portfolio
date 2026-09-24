import { createInstance } from "i18next";
import en from "../public/locales/en/common.json";
import es from "../public/locales/es/common.json";

export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = "es";

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

export type Translate = Awaited<ReturnType<typeof getT>>;

// One instance per render: there is no language state to share between requests.
export async function getT(language: Language) {
  const instance = createInstance();
  await instance.init({
    lng: language,
    fallbackLng: defaultLanguage,
    defaultNS: "common",
    resources: { es: { common: es }, en: { common: en } },
    // Flat keys: a dot inside a key must not become a nested lookup.
    keySeparator: false,
    interpolation: { escapeValue: false },
  });
  return instance.getFixedT(language);
}

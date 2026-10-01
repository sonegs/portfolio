import { createInstance, type TFunction } from "i18next";
import en from "../public/locales/en/common.json";
import es from "../public/locales/es/common.json";

export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = "es";

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

export type Translate = TFunction<"common">;

const instances = new Map<Language, Translate>();

// Synchronous on purpose. i18next only awaits when it has to fetch resources, and ours
// are imported, so init has already finished by the time it returns a promise. Keeping
// it sync is what lets a component resolve its own copy without becoming async, which
// Jest cannot render. One instance per language, reused: there is no per-request state.
export function getT(language: Language): Translate {
  const cached = instances.get(language);
  if (cached) {
    return cached;
  }

  const instance = createInstance();
  void instance.init({
    lng: language,
    fallbackLng: defaultLanguage,
    defaultNS: "common",
    resources: { es: { common: es }, en: { common: en } },
    // Flat keys: a dot inside a key must not become a nested lookup.
    keySeparator: false,
    interpolation: { escapeValue: false },
  });

  if (!instance.isInitialized) {
    throw new Error("i18n: init did not settle synchronously, so the locales are no longer bundled");
  }

  const t = instance.getFixedT(language);
  instances.set(language, t);
  return t;
}

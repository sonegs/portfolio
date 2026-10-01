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

import { getT, isLanguage, languages } from "@/i18n";

describe("isLanguage", () => {
  it("should accept every language the site ships", () => {
    for (const language of languages) {
      expect(isLanguage(language)).toBe(true);
    }
  });

  it("should reject anything else, including a locale that only looks right", () => {
    expect(isLanguage("fr")).toBe(false);
    expect(isLanguage("es-ES")).toBe(false);
    expect(isLanguage("")).toBe(false);
  });
});

describe("getT", () => {
  it("should resolve a key in the language it was asked for", () => {
    const es = getT("es");
    const en = getT("en");

    expect(es("CAREER")).toBe("Trayectoria");
    expect(en("CAREER")).toBe("Career");
  });

  it("should interpolate without escaping: React already escapes, doing it twice mangles the text", () => {
    const t = getT("es");

    // & and ' are the characters i18next's escaper does touch, so this fails if
    // escapeValue is ever turned back on.
    expect(t("COPYRIGHT", { year: 2026, name: "O'Brien & Co" })).toContain("O'Brien & Co");
  });

  it("should hand back a key it does not know, which is how a missing translation shows up on the page", () => {
    const t = getT("es");

    expect(t("A_KEY_THAT_DOES_NOT_EXIST")).toBe("A_KEY_THAT_DOES_NOT_EXIST");
  });
});

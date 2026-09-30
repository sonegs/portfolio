import { getT, isLanguage, languages } from "@/i18n";

describe("isLanguage", () => {
  it("accepts every language the site ships", () => {
    for (const language of languages) {
      expect(isLanguage(language)).toBe(true);
    }
  });

  it("rejects anything else, including a locale that only looks right", () => {
    expect(isLanguage("fr")).toBe(false);
    expect(isLanguage("es-ES")).toBe(false);
    expect(isLanguage("")).toBe(false);
  });
});

describe("getT", () => {
  it("resolves a key in the language it was asked for", async () => {
    const es = await getT("es");
    const en = await getT("en");

    expect(es("CAREER")).toBe("Trayectoria");
    expect(en("CAREER")).toBe("Career");
  });

  it("keeps dots inside a key instead of reading them as nesting", async () => {
    const t = await getT("es");

    // keySeparator is off: a missing key comes back whole, not split on the dot.
    expect(t("A.KEY.THAT.DOES.NOT.EXIST")).toBe("A.KEY.THAT.DOES.NOT.EXIST");
  });

  it("interpolates without escaping, so an accent survives", async () => {
    const t = await getT("es");

    expect(t("COPYRIGHT", { year: 2026, name: "Miguel Cobo Martínez" })).toContain("Miguel Cobo Martínez");
    expect(t("COPYRIGHT", { year: 2026, name: "x" })).toContain("2026");
  });
});

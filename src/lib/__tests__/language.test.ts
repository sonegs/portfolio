import { notFound } from "next/navigation";
import { languages } from "@/i18n";
import { toLanguage } from "@/lib/language";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("toLanguage", () => {
  it("should hand back every language the site ships", () => {
    for (const language of languages) {
      expect(toLanguage(language)).toBe(language);
    }
  });

  it("should send anything else to the not found page", () => {
    expect(() => toLanguage("fr")).toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("should not accept a regional tag, the routes only exist for the base ones", () => {
    expect(() => toLanguage("es-ES")).toThrow("NEXT_NOT_FOUND");
  });
});

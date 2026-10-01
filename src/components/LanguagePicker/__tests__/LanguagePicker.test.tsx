import { readFileSync } from "node:fs";
import { LanguagePicker } from "@/components/LanguagePicker";
import { render, screen } from "@testing-library/react";
import { languages } from "@/i18n";

describe("LanguagePicker", () => {
  it("should list every language the site is translated into", () => {
    render(<LanguagePicker current="es" />);

    for (const language of languages) {
      expect(screen.getByRole("link", { name: language.toUpperCase() })).toBeInTheDocument();
    }
  });

  it("should mark only the current language as the current page", () => {
    render(<LanguagePicker current="en" />);

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "ES" })).not.toHaveAttribute("aria-current");
  });

  it("should point each link at its own language and declare it", () => {
    render(<LanguagePicker current="es" />);

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("hreflang", "en");
  });
});

describe("the language links", () => {
  it("should navigate the document rather than soft navigate, so <html lang> is not left stale", () => {
    const source = readFileSync("src/components/LanguagePicker/LanguageLink.tsx", "utf8");

    expect(source).not.toMatch(/from "next\/link"/);
  });
});

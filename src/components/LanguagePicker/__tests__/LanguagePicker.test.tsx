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

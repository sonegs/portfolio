import { render, screen } from "@testing-library/react";
import { LanguagePicker } from "@/components/header";
import { languages } from "@/i18n";

describe("LanguagePicker", () => {
  it("lists every language the site is translated into", () => {
    render(<LanguagePicker current="es" />);

    for (const language of languages) {
      expect(screen.getByRole("link", { name: language.toUpperCase() })).toBeInTheDocument();
    }
  });

  it("marks only the current language as the current page", () => {
    render(<LanguagePicker current="en" />);

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "ES" })).not.toHaveAttribute("aria-current");
  });

  it("points each link at its own language and declares it", () => {
    render(<LanguagePicker current="es" />);

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("hreflang", "en");
  });
});

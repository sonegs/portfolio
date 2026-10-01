import { SheetHeader } from "@/components/SheetHeader";
import { render, screen } from "@testing-library/react";
import { careerStart, profile } from "@/content";
import { getT } from "@/i18n";

const t = getT("es");

describe("SheetHeader", () => {
  it("gives the page its one first-level heading, and it is the name", () => {
    render(<SheetHeader lang="es" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
  });

  it("counts the years from the start of the career, so the figure cannot rot", () => {
    jest.useFakeTimers().setSystemTime(new Date("2031-04-02"));
    render(<SheetHeader lang="es" />);
    jest.useRealTimers();

    expect(screen.getByText(t("EXPERIENCE_VALUE", { years: 2031 - careerStart }))).toBeInTheDocument();
  });

  it("writes the address as a mailto so a click opens the mail client", () => {
    render(<SheetHeader lang="es" />);

    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("sits in a banner landmark", () => {
    render(<SheetHeader lang="es" />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});

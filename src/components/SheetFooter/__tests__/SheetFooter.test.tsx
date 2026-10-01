import { SheetFooter } from "@/components/SheetFooter";
import { render, screen } from "@testing-library/react";
import { profile } from "@/content";
import { getT } from "@/i18n";

const t = getT("es");

describe("SheetFooter", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should claim whatever year it is run in, not a year frozen in the source", () => {
    jest.useFakeTimers().setSystemTime(new Date("2031-04-02"));
    render(<SheetFooter lang="es" />);

    expect(screen.getByText(/2031/)).toBeInTheDocument();
  });

  it("should put the name in the notice from the data, not from the copy", () => {
    render(<SheetFooter lang="es" />);

    expect(screen.getByText(new RegExp(profile.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeInTheDocument();
  });

  it("should offer the three ways of reaching him, and the mail one as a mailto", () => {
    render(<SheetFooter lang="es" />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", profile.github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", profile.linkedin);
    expect(screen.getByRole("link", { name: t("LINK_EMAIL") })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("should sit in a footer landmark", () => {
    render(<SheetFooter lang="es" />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

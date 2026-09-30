import { render, screen } from "@testing-library/react";
import { SheetFooter } from "@/components/footer";
import { profile } from "@/content";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

describe("SheetFooter", () => {
  it("claims the current year, not a year frozen in the source", () => {
    render(<SheetFooter t={t} />);

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("puts the name in the notice from the data, not from the copy", () => {
    render(<SheetFooter t={t} />);

    expect(screen.getByText(new RegExp(profile.name))).toBeInTheDocument();
  });

  it("offers the three ways of reaching him, and the mail one as a mailto", () => {
    render(<SheetFooter t={t} />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", profile.github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", profile.linkedin);
    expect(screen.getByRole("link", { name: t("LINK_EMAIL") })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("sits in a footer landmark", () => {
    render(<SheetFooter t={t} />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

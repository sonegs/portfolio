import { render, screen } from "@testing-library/react";
import { SheetHeader } from "@/components/header";
import { careerStart, profile } from "@/content";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

describe("SheetHeader", () => {
  it("gives the page its one first-level heading, and it is the name", () => {
    render(<SheetHeader t={t} lang="es" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
  });

  it("counts the years of experience instead of hardcoding a number that rots", () => {
    render(<SheetHeader t={t} lang="es" />);

    const years = new Date().getFullYear() - careerStart;
    expect(screen.getByText(t("EXPERIENCE_VALUE", { years }))).toBeInTheDocument();
  });

  it("writes the address as a mailto so a click opens the mail client", () => {
    render(<SheetHeader t={t} lang="es" />);

    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("sits in a banner landmark", () => {
    render(<SheetHeader t={t} lang="es" />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { career } from "@/content";
import { CareerSection } from "@/features/career/components/CareerSection";
import { getT } from "@/i18n";

const t = getT("es");

describe("CareerSection", () => {
  it("titles the band and renders every stage", () => {
    render(<CareerSection lang="es" />);

    expect(screen.getByRole("heading", { level: 2, name: t("CAREER") })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(career.length);
  });

  it("closes an open period with the word for today, not with a blank", () => {
    render(<CareerSection lang="es" />);

    const open = career.find((stage) => stage.to === null)!;
    expect(screen.getByText(`${open.from} — hoy`)).toBeInTheDocument();
  });

  it("flags exactly one stage as current, so the rail lights one node", () => {
    const { container } = render(<CareerSection lang="es" />);

    expect(container.querySelectorAll('[data-current="true"]')).toHaveLength(1);
  });

  it("splits a detail on blank lines only, so a single newline stays inside its paragraph", () => {
    const expected = t("CAREER_SENIOR_DETAIL").split("\n\n");
    expect(expected.length).toBeGreaterThan(1); // the fixture this test rests on

    const { container } = render(<CareerSection lang="es" />);
    const rendered = [...container.querySelectorAll("li[data-current='true'] p")].map((n) => n.textContent);

    expect(rendered).toEqual(expected);
  });

  it("translates, so the English sheet is not the Spanish one", () => {
    render(<CareerSection lang="en" />);

    expect(screen.getByRole("heading", { level: 2, name: getT("en")("CAREER") })).toBeInTheDocument();
  });
});

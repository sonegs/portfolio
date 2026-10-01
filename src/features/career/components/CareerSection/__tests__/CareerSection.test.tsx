import { render, screen } from "@testing-library/react";
import { career } from "@/content";
import { CareerSection } from "@/features/career/components/CareerSection";
import { getT } from "@/i18n";

const t = getT("es");

describe("CareerSection", () => {
  it("should title the band and render every stage", () => {
    render(<CareerSection lang="es" />);

    expect(screen.getByRole("heading", { level: 2, name: t("CAREER") })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(career.length);
  });

  it("should close an open period with the word for today, not with a blank", () => {
    render(<CareerSection lang="es" />);

    const open = career.find((stage) => stage.to === null)!;
    expect(screen.getByText(`${open.from} — hoy`)).toBeInTheDocument();
  });

  it("should show both ends of a period that has already closed", () => {
    render(<CareerSection lang="es" />);

    const closed = career.find((stage) => stage.to !== null);
    expect(closed).toBeDefined();
    expect(screen.getByText(`${closed!.from} — ${closed!.to}`)).toBeInTheDocument();
  });

  it("should mark the stages that are over as not current, not merely absent", () => {
    const { container } = render(<CareerSection lang="es" />);

    expect(container.querySelectorAll('[data-current="false"]')).toHaveLength(career.length - 1);
  });

  it("should flag exactly one stage as current, so the rail lights one node", () => {
    const { container } = render(<CareerSection lang="es" />);

    expect(container.querySelectorAll('[data-current="true"]')).toHaveLength(1);
  });

  it("should split a detail on blank lines only, so a single newline stays inside its paragraph", () => {
    const open = career.find((stage) => stage.to === null)!;
    const expected = t(`CAREER_${open.key}_DETAIL`).split("\n\n");
    expect(expected.length).toBeGreaterThan(1); // the fixture this test rests on

    const { container } = render(<CareerSection lang="es" />);
    const rendered = [...container.querySelectorAll("li[data-current='true'] p")].map((n) => n.textContent);

    expect(rendered).toEqual(expected);
  });

  it("should translate, so the English sheet is not the Spanish one", () => {
    render(<CareerSection lang="en" />);

    expect(screen.getByRole("heading", { level: 2, name: getT("en")("CAREER") })).toBeInTheDocument();
  });
});

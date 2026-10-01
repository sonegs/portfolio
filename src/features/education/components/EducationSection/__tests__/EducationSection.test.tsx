import { render, screen } from "@testing-library/react";
import { education } from "@/content";
import { EducationSection } from "@/features/education/components/EducationSection";
import { getT } from "@/i18n";

const t = getT("es");

describe("EducationSection", () => {
  it("should title the band and render every entry", () => {
    render(<EducationSection lang="es" />);

    expect(screen.getByRole("heading", { level: 2, name: t("EDUCATION") })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(education.length);
  });

  it("should name the school and the qualification for each one", () => {
    render(<EducationSection lang="es" />);

    for (const entry of education) {
      expect(screen.getByText(t(`EDUCATION_${entry.key}_TITLE`))).toBeInTheDocument();
    }
    expect(screen.getAllByText("Lemoncoders")).toHaveLength(2);
  });

  it("should write a single year as a year, not as a range of one", () => {
    const single = education.find((entry) => entry.from === entry.to);
    expect(single).toBeDefined();

    render(<EducationSection lang="es" />);

    expect(screen.getAllByText(single!.from).length).toBeGreaterThan(0);
    expect(screen.queryByText(`${single!.from} — ${single!.to}`)).not.toBeInTheDocument();
  });

  it("should write a real range with both ends", () => {
    const range = education.find((entry) => entry.from !== entry.to)!;

    render(<EducationSection lang="es" />);

    expect(screen.getByText(`${range.from} — ${range.to}`)).toBeInTheDocument();
  });
});

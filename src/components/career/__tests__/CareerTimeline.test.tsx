import { render, screen } from "@testing-library/react";
import { CareerTimeline } from "@/components/career";
import { getT } from "@/i18n";

const t = getT("es");

const current = { key: "SENIOR", from: "2023", to: null };
const past = { key: "AGENCY", from: "2016", to: "2019" };

describe("CareerTimeline.Entry", () => {
  it("closes an open period with the word for today, not with a blank", () => {
    render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} lang="es" />
      </CareerTimeline>,
    );

    expect(screen.getByText("2023 — hoy")).toBeInTheDocument();
  });

  it("shows both ends of a period that has already closed", () => {
    render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={past} lang="es" />
      </CareerTimeline>,
    );

    expect(screen.getByText("2016 — 2019")).toBeInTheDocument();
  });

  it("flags the open stage so the timeline can fill its node", () => {
    const { container } = render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} lang="es" />
        <CareerTimeline.Entry stage={past} lang="es" />
      </CareerTimeline>,
    );

    expect(container.querySelectorAll('[data-current="true"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-current="false"]')).toHaveLength(1);
  });

  it("splits a detail on blank lines only, so a single newline stays inside its paragraph", () => {
    const expected = t("CAREER_SENIOR_DETAIL").split("\n\n");
    expect(expected.length).toBeGreaterThan(1); // the fixture this test rests on

    const { container } = render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} lang="es" />
      </CareerTimeline>,
    );

    const paragraphs = [...container.querySelectorAll("p")].map((node) => node.textContent);
    expect(paragraphs).toEqual(expected);
  });
});

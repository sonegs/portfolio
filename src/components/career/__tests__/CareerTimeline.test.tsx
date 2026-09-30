import { render, screen } from "@testing-library/react";
import { CareerTimeline } from "@/components/career";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

const current = { key: "SENIOR", from: "2023", to: null };
const past = { key: "AGENCY", from: "2016", to: "2019" };

describe("CareerTimeline.Entry", () => {
  it("closes an open period with the word for today, not with a blank", () => {
    render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} t={t} />
      </CareerTimeline>,
    );

    expect(screen.getByText("2023 — hoy")).toBeInTheDocument();
  });

  it("shows both ends of a period that has already closed", () => {
    render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={past} t={t} />
      </CareerTimeline>,
    );

    expect(screen.getByText("2016 — 2019")).toBeInTheDocument();
  });

  it("flags the open stage so the timeline can fill its node", () => {
    const { container } = render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} t={t} />
        <CareerTimeline.Entry stage={past} t={t} />
      </CareerTimeline>,
    );

    expect(container.querySelectorAll('[data-current="true"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-current="false"]')).toHaveLength(1);
  });

  it("breaks a detail written as several paragraphs into several paragraphs", () => {
    const { container } = render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} t={t} />
      </CareerTimeline>,
    );

    // CAREER_SENIOR_DETAIL is the one entry written with a blank line in it.
    expect(container.querySelectorAll("p").length).toBeGreaterThan(1);
  });

  it("orders the list so a reader gets the most recent role first", () => {
    render(
      <CareerTimeline>
        <CareerTimeline.Entry stage={current} t={t} />
        <CareerTimeline.Entry stage={past} t={t} />
      </CareerTimeline>,
    );

    const periods = screen.getAllByText(/^\d{4} — /).map((node) => node.textContent);
    expect(periods).toEqual(["2023 — hoy", "2016 — 2019"]);
  });
});

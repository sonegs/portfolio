import { render, screen } from "@testing-library/react";
import { TestimonialRail } from "@/components/testimonials";
import { testimonials } from "@/content";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

const [first] = testimonials;

describe("TestimonialRail", () => {
  it("names the rail so a keyboard user knows what they scrolled into", () => {
    render(<TestimonialRail label="Opiniones">{null}</TestimonialRail>);

    expect(screen.getByRole("group", { name: "Opiniones" })).toBeInTheDocument();
  });

  it("takes focus, because a scrollable region with no focusable child is a keyboard trap in reverse", () => {
    render(<TestimonialRail label="Opiniones">{null}</TestimonialRail>);

    expect(screen.getByRole("group")).toHaveAttribute("tabindex", "0");
  });
});

describe("TestimonialRail.Card", () => {
  it("attributes the quote to a person and a role", () => {
    render(
      <TestimonialRail label="Opiniones">
        <TestimonialRail.Card testimonial={first} t={t} />
      </TestimonialRail>,
    );

    expect(screen.getByText(first.name)).toBeInTheDocument();
    expect(screen.getByText(first.role)).toBeInTheDocument();
  });

  it("splits a recommendation on its blank lines instead of running it together", () => {
    const { container } = render(
      <TestimonialRail label="Opiniones">
        <TestimonialRail.Card testimonial={first} t={t} />
      </TestimonialRail>,
    );

    const expected = t(`TESTIMONIAL_${first.key}_TEXT`).split("\n\n").length;
    expect(container.querySelectorAll("blockquote p")).toHaveLength(expected);
  });

  it("quotes with the element a browser and a reader both understand", () => {
    const { container } = render(
      <TestimonialRail label="Opiniones">
        <TestimonialRail.Card testimonial={first} t={t} />
      </TestimonialRail>,
    );

    expect(container.querySelector("figure blockquote")).toBeInTheDocument();
    expect(container.querySelector("figure figcaption")).toBeInTheDocument();
  });
});

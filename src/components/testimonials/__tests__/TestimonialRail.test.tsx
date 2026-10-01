import { render, screen } from "@testing-library/react";
import { TestimonialRail } from "@/components/testimonials";
import { testimonials } from "@/content";
import { getT } from "@/i18n";

const t = getT("es");

const [first] = testimonials;

describe("TestimonialRail", () => {
  it("names the rail so a keyboard user knows what they scrolled into", () => {
    render(<TestimonialRail lang="es">{null}</TestimonialRail>);

    expect(screen.getByRole("group", { name: "Opiniones" })).toBeInTheDocument();
  });

  it("takes focus, because a scrollable region with no focusable child is a keyboard trap in reverse", () => {
    render(<TestimonialRail lang="es">{null}</TestimonialRail>);

    expect(screen.getByRole("group")).toHaveAttribute("tabindex", "0");
  });
});

describe("TestimonialRail.Card", () => {
  it("attributes the quote to a person and a role", () => {
    render(
      <TestimonialRail lang="es">
        <TestimonialRail.Card testimonial={first} lang="es" />
      </TestimonialRail>,
    );

    expect(screen.getByText(first.name)).toBeInTheDocument();
    expect(screen.getByText(first.role)).toBeInTheDocument();
  });

  it("splits a recommendation on its blank lines instead of running it together", () => {
    const { container } = render(
      <TestimonialRail lang="es">
        <TestimonialRail.Card testimonial={first} lang="es" />
      </TestimonialRail>,
    );

    const expected = t(`TESTIMONIAL_${first.key}_TEXT`).split("\n\n").length;
    expect(container.querySelectorAll("blockquote p")).toHaveLength(expected);
  });

  it("quotes with the element a browser and a reader both understand", () => {
    const { container } = render(
      <TestimonialRail lang="es">
        <TestimonialRail.Card testimonial={first} lang="es" />
      </TestimonialRail>,
    );

    expect(container.querySelector("figure blockquote")).toBeInTheDocument();
    expect(container.querySelector("figure figcaption")).toBeInTheDocument();
  });
});

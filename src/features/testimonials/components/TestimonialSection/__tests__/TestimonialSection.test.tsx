import { render, screen } from "@testing-library/react";
import { testimonials } from "@/content";
import { TestimonialSection } from "@/features/testimonials/components/TestimonialSection";
import { getT } from "@/i18n";

const t = getT("es");
const [first] = testimonials;

describe("TestimonialSection", () => {
  it("names the rail so a keyboard user knows what they scrolled into", () => {
    render(<TestimonialSection lang="es" />);

    expect(screen.getByRole("group", { name: t("TESTIMONIALS") })).toHaveAttribute("tabindex", "0");
  });

  it("attributes each quote to a person and a role", () => {
    render(<TestimonialSection lang="es" />);

    expect(screen.getByText(first.name)).toBeInTheDocument();
    expect(screen.getByText(first.role)).toBeInTheDocument();
  });

  it("splits a recommendation on its blank lines instead of running it together", () => {
    const { container } = render(<TestimonialSection lang="es" />);

    const expected = t(`TESTIMONIAL_${first.key}_TEXT`).split("\n\n");
    expect(container.querySelectorAll("blockquote p")).toHaveLength(expected.length);
  });

  it("quotes with the elements a browser and a reader both understand", () => {
    const { container } = render(<TestimonialSection lang="es" />);

    expect(container.querySelector("figure blockquote")).toBeInTheDocument();
    expect(container.querySelector("figure figcaption")).toBeInTheDocument();
  });
});

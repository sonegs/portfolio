import { Portrait } from "@/components/Portrait";
import { render, screen } from "@testing-library/react";
import { profile } from "@/content";

describe("Portrait", () => {
  it("should describe itself with the name, interpolated and not left as a placeholder", () => {
    render(<Portrait lang="es" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAccessibleName(expect.stringContaining(profile.name));
    expect(image.getAttribute("alt")).not.toContain("{{");
  });

  it("should carry its intrinsic size, so the page does not jump when it loads", () => {
    render(<Portrait lang="es" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("width");
    expect(image).toHaveAttribute("height");
  });

  it("should not be lazy: it is the first thing above the fold", () => {
    render(<Portrait lang="es" />);

    expect(screen.getByRole("img")).not.toHaveAttribute("loading", "lazy");
  });
});

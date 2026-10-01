import { render, screen } from "@testing-library/react";
import { Portrait } from "@/components/portrait";
import { profile } from "@/content";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

describe("Portrait", () => {
  it("describes itself with the name, interpolated and not left as a placeholder", () => {
    render(<Portrait t={t} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAccessibleName(expect.stringContaining(profile.name));
    expect(image.getAttribute("alt")).not.toContain("{{");
  });

  it("carries its intrinsic size, so the page does not jump when it loads", () => {
    render(<Portrait t={t} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("width");
    expect(image).toHaveAttribute("height");
  });

  it("is not lazy: it is the first thing above the fold", () => {
    render(<Portrait t={t} />);

    expect(screen.getByRole("img")).not.toHaveAttribute("loading", "lazy");
  });
});

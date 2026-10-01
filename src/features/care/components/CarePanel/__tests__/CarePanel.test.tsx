import { render, screen } from "@testing-library/react";
import { careInstructions } from "@/content";
import { CarePanel } from "@/features/care/components/CarePanel";
import { getT } from "@/i18n";

const t = getT("es");

describe("CarePanel", () => {
  it("lists every instruction, translated", () => {
    render(<CarePanel lang="es" />);

    for (const instruction of careInstructions) {
      expect(screen.getByText(t(instruction))).toBeInTheDocument();
    }
  });

  it("keeps the bullets out of the reading, they are marks and not words", () => {
    const { container } = render(<CarePanel lang="es" />);

    expect(container.querySelectorAll("li > span[aria-hidden]")).toHaveLength(careInstructions.length);
  });
});

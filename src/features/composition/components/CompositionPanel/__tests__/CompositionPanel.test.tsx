import { render, screen } from "@testing-library/react";
import { composition } from "@/content";
import { CompositionPanel } from "@/features/composition/components/CompositionPanel";
import { getT } from "@/i18n";

const t = getT("es");

describe("CompositionPanel", () => {
  it("draws every bar to the width its percentage claims", () => {
    const { container } = render(<CompositionPanel lang="es" />);

    const bars = [...container.querySelectorAll("li > div[aria-hidden]")];
    expect(bars).toHaveLength(composition.length);
    bars.forEach((bar, index) => {
      expect(bar).toHaveStyle({ width: `${composition[index].percentage}%` });
    });
  });

  it("hides the bars from readers, the number beside each already says it", () => {
    render(<CompositionPanel lang="es" />);

    expect(screen.getByText(`${composition[0].percentage}%`)).toBeInTheDocument();
  });

  it("resolves a material written as a key and leaves a plain name alone", () => {
    render(<CompositionPanel lang="es" />);

    expect(screen.getByText(t("COMPOSITION_OTHER"))).toBeInTheDocument();
    expect(screen.getByText("Node")).toBeInTheDocument();
  });
});

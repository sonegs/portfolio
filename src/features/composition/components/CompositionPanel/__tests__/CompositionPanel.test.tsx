import { render, screen } from "@testing-library/react";
import { composition } from "@/content";
import { CompositionPanel } from "@/features/composition/components/CompositionPanel";
import { getT } from "@/i18n";

const t = getT("es");

describe("CompositionPanel", () => {
  it("should draw every bar to the width its percentage claims", () => {
    const { container } = render(<CompositionPanel lang="es" />);

    const bars = [...container.querySelectorAll("li > div[aria-hidden]")];
    expect(bars).toHaveLength(composition.length);
    bars.forEach((bar, index) => {
      expect(bar).toHaveStyle({ width: `${composition[index].percentage}%` });
    });
  });

  it("should show the percentage beside every bar", () => {
    render(<CompositionPanel lang="es" />);

    expect(screen.getByText(`${composition[0].percentage}%`)).toBeInTheDocument();
  });

  it("should resolve every material, whether it is a plain name or a translation key", () => {
    render(<CompositionPanel lang="es" />);

    for (const item of composition) {
      expect(screen.getByText(t(item.material))).toBeInTheDocument();
    }
  });
});

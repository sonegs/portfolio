import { render, screen } from "@testing-library/react";
import { CompositionList } from "@/components/composition";
import { composition } from "@/content";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

describe("CompositionList.Material", () => {
  it("draws the bar to the width the percentage claims", () => {
    const item = { material: "React / Next.js", percentage: 45 };
    const { container } = render(
      <CompositionList>
        <CompositionList.Material item={item} t={t} />
      </CompositionList>,
    );

    expect(container.querySelector("[aria-hidden]")).toHaveStyle({ width: "45%" });
  });

  it("hides the bar from readers, the number beside it already says the same", () => {
    const item = { material: "TypeScript", percentage: 25 };
    const { container } = render(
      <CompositionList>
        <CompositionList.Material item={item} t={t} />
      </CompositionList>,
    );

    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("resolves a material written as a key and leaves a plain name alone", () => {
    const { rerender } = render(
      <CompositionList>
        <CompositionList.Material item={{ material: "COMPOSITION_OTHER", percentage: 5 }} t={t} />
      </CompositionList>,
    );
    expect(screen.getByText("Otros")).toBeInTheDocument();

    rerender(
      <CompositionList>
        <CompositionList.Material item={{ material: "Node", percentage: 10 }} t={t} />
      </CompositionList>,
    );
    expect(screen.getByText("Node")).toBeInTheDocument();
  });
});

describe("the composition data", () => {
  it("adds up to a whole, or the bars are lying about a proportion", () => {
    const total = composition.reduce((sum, item) => sum + item.percentage, 0);
    expect(total).toBe(100);
  });
});

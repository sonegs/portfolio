import { render, screen } from "@testing-library/react";
import { skills } from "@/content";
import { SkillsPanel } from "@/features/skills/components/SkillsPanel";
import { getT } from "@/i18n";

// The real list is all plain names, so a key has to be stood up here for the
// panel to prove it resolves one.
jest.mock("../../../../../content", () => ({
  skills: [
    { name: "TypeScript", percentage: 70 },
    { name: "FOCUS", percentage: 30 },
  ],
}));

const t = getT("es");

describe("SkillsPanel", () => {
  it("should draw every bar to the width its percentage claims", () => {
    const { container } = render(<SkillsPanel lang="es" />);

    const bars = [...container.querySelectorAll("li > div[aria-hidden]")];
    expect(bars).toHaveLength(skills.length);
    bars.forEach((bar, index) => {
      expect(bar).toHaveStyle({ width: `${skills[index].percentage}%` });
    });
  });

  it("should show the percentage beside every bar", () => {
    render(<SkillsPanel lang="es" />);

    expect(screen.getByText(`${skills[0].percentage}%`)).toBeInTheDocument();
  });

  it("should leave a plain name alone", () => {
    render(<SkillsPanel lang="es" />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("should resolve a name written as a translation key, instead of printing the key", () => {
    render(<SkillsPanel lang="es" />);

    expect(screen.getByText(t("FOCUS"))).toBeInTheDocument();
    expect(screen.queryByText("FOCUS")).not.toBeInTheDocument();
  });
});

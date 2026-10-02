import { render, screen } from "@testing-library/react";
import { skills } from "@/content";
import { SkillsPanel } from "@/features/skills/components/SkillsPanel";
import { getT } from "@/i18n";

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

  it("should resolve every skill, whether it is a plain name or a translation key", () => {
    render(<SkillsPanel lang="es" />);

    for (const skill of skills) {
      expect(screen.getByText(t(skill.name))).toBeInTheDocument();
    }
  });
});

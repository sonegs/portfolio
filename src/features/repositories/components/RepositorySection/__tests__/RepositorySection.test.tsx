import { render, screen } from "@testing-library/react";
import { profile, repositories } from "@/content";
import { RepositorySection } from "@/features/repositories/components/RepositorySection";
import { getT } from "@/i18n";

const t = getT("es");

describe("RepositorySection", () => {
  it("should link the heading to the profile the rows hang off", () => {
    render(<RepositorySection lang="es" />);

    expect(screen.getByRole("heading", { level: 2, name: t("PUBLIC_CODE") })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github.com/sonegs" })).toHaveAttribute("href", profile.github);
  });

  it("should point each row at its own repository", () => {
    render(<RepositorySection lang="es" />);

    for (const repository of repositories) {
      expect(screen.getByRole("link", { name: new RegExp(repository.name) })).toHaveAttribute(
        "href",
        `${profile.github}/${repository.name}`,
      );
    }
  });

  it("should open the rows in a new tab without handing it a live opener", () => {
    render(<RepositorySection lang="es" />);

    const row = screen.getByRole("link", { name: new RegExp(repositories[0].name) });
    expect(row).toHaveAttribute("target", "_blank");
    expect(row).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should make the whole row the link, not just the name", () => {
    render(<RepositorySection lang="es" />);

    const [repository] = repositories;
    const row = screen.getByRole("link", { name: new RegExp(repository.name) });
    expect(row).toHaveTextContent(repository.stack);
    expect(row).toHaveTextContent(repository.year);
    expect(row).toHaveTextContent(t(`REPO_${repository.key}_DESCRIPTION`));
  });

  it("should keep the arrow out of the accessible name, it is decoration", () => {
    render(<RepositorySection lang="es" />);

    const row = screen.getByRole("link", { name: new RegExp(repositories[0].name) });
    expect(row).toHaveAccessibleName(expect.not.stringContaining("↗"));
  });
});

import { render, screen } from "@testing-library/react";
import { RepositoryList } from "@/components/repositories";
import { profile, repositories } from "@/content";
import { getT, type Translate } from "@/i18n";

let t: Translate;

beforeAll(async () => {
  t = await getT("es");
});

const [repository] = repositories;

describe("RepositoryList.Item", () => {
  it("points the row at the repository under the profile it belongs to", () => {
    render(
      <RepositoryList>
        <RepositoryList.Item repository={repository} t={t} />
      </RepositoryList>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", `${profile.github}/${repository.name}`);
  });

  it("opens in a new tab without handing it a live opener", () => {
    render(
      <RepositoryList>
        <RepositoryList.Item repository={repository} t={t} />
      </RepositoryList>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("makes the whole row the link, not just the name", () => {
    render(
      <RepositoryList>
        <RepositoryList.Item repository={repository} t={t} />
      </RepositoryList>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(repository.name);
    expect(link).toHaveTextContent(repository.stack);
    expect(link).toHaveTextContent(repository.year);
  });

  it("keeps the arrow out of the accessible name, it is decoration", () => {
    render(
      <RepositoryList>
        <RepositoryList.Item repository={repository} t={t} />
      </RepositoryList>,
    );

    expect(screen.getByRole("link").getAttribute("aria-hidden")).toBeNull();
    expect(screen.getByText("↗")).toHaveAttribute("aria-hidden", "true");
  });
});

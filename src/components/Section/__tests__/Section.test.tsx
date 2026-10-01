import { Section, SectionHeader, SectionLink, SectionTitle } from "@/components/Section";
import { render, screen } from "@testing-library/react";

describe("Section", () => {
  it("should title a band with a second-level heading, under the page's h1", () => {
    render(
      <Section>
        <SectionHeader>
          <SectionTitle>Trayectoria</SectionTitle>
        </SectionHeader>
      </Section>,
    );

    expect(screen.getByRole("heading", { level: 2, name: "Trayectoria" })).toBeInTheDocument();
  });

  it("should let a band leave out the link on the right rather than pass an empty one", () => {
    render(
      <Section>
        <SectionHeader>
          <SectionTitle>Trayectoria</SectionTitle>
        </SectionHeader>
      </Section>,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should carry the link when a band has one", () => {
    render(
      <Section>
        <SectionHeader>
          <SectionTitle>Código público</SectionTitle>
          <SectionLink href="https://github.com/sonegs">github.com/sonegs</SectionLink>
        </SectionHeader>
      </Section>,
    );

    expect(screen.getByRole("link", { name: "github.com/sonegs" })).toHaveAttribute(
      "href",
      "https://github.com/sonegs",
    );
  });
});

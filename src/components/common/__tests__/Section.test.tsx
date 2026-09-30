import { render, screen } from "@testing-library/react";
import { DataSheet, InlineLink, Section } from "@/components/common";

describe("Section", () => {
  it("titles a band with a second-level heading, under the page's h1", () => {
    render(
      <Section>
        <Section.Header>
          <Section.Title>Trayectoria</Section.Title>
        </Section.Header>
      </Section>,
    );

    expect(screen.getByRole("heading", { level: 2, name: "Trayectoria" })).toBeInTheDocument();
  });

  it("lets a band leave out the link on the right rather than pass an empty one", () => {
    render(
      <Section>
        <Section.Header>
          <Section.Title>Trayectoria</Section.Title>
        </Section.Header>
      </Section>,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("carries the link when a band has one", () => {
    render(
      <Section>
        <Section.Header>
          <Section.Title>Código público</Section.Title>
          <Section.Link href="https://github.com/sonegs">github.com/sonegs</Section.Link>
        </Section.Header>
      </Section>,
    );

    expect(screen.getByRole("link", { name: "github.com/sonegs" })).toHaveAttribute(
      "href",
      "https://github.com/sonegs",
    );
  });
});

describe("DataSheet", () => {
  it("pairs each term with its value as a description list", () => {
    const { container } = render(
      <DataSheet>
        <DataSheet.Row term="Base">Málaga, España</DataSheet.Row>
      </DataSheet>,
    );

    expect(container.querySelector("dl dt")).toHaveTextContent("Base");
    expect(container.querySelector("dl dd")).toHaveTextContent("Málaga, España");
  });
});

describe("InlineLink", () => {
  it("passes through the attributes a caller adds", () => {
    render(
      <InlineLink href="mailto:sonegs@hotmail.com" translate="no">
        sonegs@hotmail.com
      </InlineLink>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "mailto:sonegs@hotmail.com");
    expect(link).toHaveAttribute("translate", "no");
  });
});

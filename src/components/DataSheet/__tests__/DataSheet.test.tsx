import { render } from "@testing-library/react";
import { DataSheet } from "@/components/DataSheet";

describe("DataSheet", () => {
  it("should pair each term with its value as a description list", () => {
    const { container } = render(
      <DataSheet>
        <DataSheet.Row term="Base">Málaga, España</DataSheet.Row>
      </DataSheet>,
    );

    expect(container.querySelector("dl dt")).toHaveTextContent("Base");
    expect(container.querySelector("dl dd")).toHaveTextContent("Málaga, España");
  });
});

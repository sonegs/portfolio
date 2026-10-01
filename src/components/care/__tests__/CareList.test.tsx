import { render, screen } from "@testing-library/react";
import { CareList } from "@/components/care";

describe("CareList.Instruction", () => {
  it("shows the instruction", () => {
    render(
      <CareList>
        <CareList.Instruction>Accesible desde el primer commit.</CareList.Instruction>
      </CareList>,
    );

    expect(screen.getByText("Accesible desde el primer commit.")).toBeInTheDocument();
  });

  it("keeps the bullet out of the reading, it is a mark and not a word", () => {
    const { container } = render(
      <CareList>
        <CareList.Instruction>Cualquier cosa</CareList.Instruction>
      </CareList>,
    );

    expect(container.querySelector("li > span[aria-hidden]")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("Cualquier cosa");
  });
});

import { render, screen } from "@testing-library/react";
import { InlineLink } from "@/components/InlineLink";

describe("InlineLink", () => {
  it("should pass through the attributes a caller adds", () => {
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

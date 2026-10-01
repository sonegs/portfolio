import { toParagraphs } from "@/lib/paragraphs";

describe("toParagraphs", () => {
  it("should split on a blank line", () => {
    expect(toParagraphs("uno\n\ndos")).toEqual(["uno", "dos"]);
  });

  it("should leave a single newline inside its paragraph", () => {
    expect(toParagraphs("uno\nsigue\n\ndos")).toEqual(["uno\nsigue", "dos"]);
  });

  it("should give one paragraph back when there is no blank line", () => {
    expect(toParagraphs("solo uno")).toEqual(["solo uno"]);
  });

  it("should keep a trailing blank line visible as an empty paragraph rather than guessing", () => {
    expect(toParagraphs("uno\n\n")).toEqual(["uno", ""]);
  });
});

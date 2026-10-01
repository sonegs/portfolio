import { readFileSync } from "node:fs";
import { palette } from "@/theme";

// The stylesheet is the palette the page renders with; palette.ts is the copy the
// metadata and the social card render with. This reads the first and compares, so the
// two cannot drift without a test going red.
const css = readFileSync("src/app/theme.css", "utf8");

function tokensOf(selector: string) {
  const block = new RegExp(`${selector}\\s*\\{([^}]*)\\}`).exec(css);
  expect(block).not.toBeNull();
  return Object.fromEntries(
    [...block![1].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/g)].map(([, name, value]) => [name, value]),
  );
}

const EXPECTED = {
  paper: "paper",
  paperShade: "paper-shade",
  ink: "ink",
  inkSoft: "ink-soft",
  rule: "rule",
  dye: "dye",
} as const;

describe("palette", () => {
  it("should match the light values in the stylesheet", () => {
    const css = tokensOf(":root");
    for (const [key, token] of Object.entries(EXPECTED)) {
      expect(css[token]).toBe(palette.light[key as keyof typeof palette.light]);
    }
  });

  it("should match the dark values in the stylesheet", () => {
    const css = tokensOf("\\.dark");
    for (const [key, token] of Object.entries(EXPECTED)) {
      expect(css[token]).toBe(palette.dark[key as keyof typeof palette.dark]);
    }
  });

  it("should keep the system fallback the 404 uses in step with the dark theme", () => {
    const fallback = tokensOf("\\.theme-auto");
    for (const [key, token] of Object.entries(EXPECTED)) {
      expect(fallback[token]).toBe(palette.dark[key as keyof typeof palette.dark]);
    }
  });

  it("should register the light values as the initial value of each token", () => {
    for (const [key, token] of Object.entries(EXPECTED)) {
      const registered = new RegExp(`@property --${token}\\s*\\{[^}]*initial-value:\\s*(#[0-9a-f]{6})`).exec(css);
      expect(registered?.[1]).toBe(palette.light[key as keyof typeof palette.light]);
    }
  });
});

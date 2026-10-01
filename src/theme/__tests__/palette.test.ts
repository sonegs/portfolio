import { readFileSync } from "node:fs";
import { viewport as notFoundViewport } from "@/app/global-not-found";
import { palette } from "@/theme";

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

describe("the stylesheet cascade", () => {
  const at = (selector: string) => css.search(new RegExp(selector));

  it("should declare the dark palette after the light one, which is what makes it win", () => {
    expect(at("\\.dark \\{")).toBeGreaterThan(at(":root \\{"));
  });

  it("should declare the system fallback after the dark palette", () => {
    expect(at("\\.theme-auto \\{")).toBeGreaterThan(at("\\.dark \\{"));
  });

  it("should map the shadcn tokens last, so they beat the defaults shadcn ships", () => {
    expect(css.lastIndexOf(":root,")).toBeGreaterThan(at("\\.theme-auto \\{"));
  });
});

describe("the not found page", () => {
  it("should declare the same theme colour as the layout, which never runs for it", () => {
    const colours = notFoundViewport.themeColor as { media: string; color: string }[];

    expect(colours.map((entry) => entry.color)).toEqual([palette.light.paper, palette.dark.paper]);
  });
});

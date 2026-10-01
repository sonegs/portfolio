// The palette in TypeScript, for the two places that cannot read a stylesheet: the
// theme-color metadata, which Next emits as a meta tag before any CSS applies, and the
// social card, which Satori renders from inline styles.
//
// src/app/theme.css holds the same values for the page itself. CSS custom properties
// do not exist until a browser applies the sheet, so there is no way to read them from
// here; the copy is unavoidable. What is avoidable is the copies drifting apart, which
// is what src/theme/__tests__/palette.test.ts is for.
export const palette = {
  light: {
    paper: "#e8e9e4",
    paperShade: "#dfe0d9",
    ink: "#16181a",
    inkSoft: "#5c6064",
    rule: "#b7bab0",
    dye: "#2f3a8f",
  },
  dark: {
    paper: "#15171a",
    paperShade: "#1e2126",
    ink: "#e8e9e4",
    inkSoft: "#9ba1a3",
    rule: "#3c4045",
    dye: "#9aa7ff",
  },
} as const;

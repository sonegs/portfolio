import type { CSSProperties } from "react";
import { palette } from "@/theme";

// Satori renders the card, so the style has to reach it as inline objects: there is no
// document to attach a stylesheet to. Naming them keeps the markup readable all the same.
export const sheet: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: palette.light.paper,
  color: palette.light.ink,
  padding: "64px 72px",
  fontFamily: "Archivo",
};

export const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 26,
  letterSpacing: 4,
};

export const revision: CSSProperties = { color: palette.light.inkSoft };

export const body: CSSProperties = { display: "flex", flexDirection: "column" };

export const rule: CSSProperties = { display: "flex", height: 2, backgroundColor: palette.light.rule };

export const role: CSSProperties = {
  display: "flex",
  fontSize: 120,
  lineHeight: 1.05,
  paddingTop: 40,
  textTransform: "uppercase",
};

export const footer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 30,
  color: palette.light.inkSoft,
};

export const email: CSSProperties = { color: palette.light.dye };

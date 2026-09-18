import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { profile } from "@/content";
import { getT, isLanguage, languages } from "@/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Spec sheet";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

// The same sheet, cropped to a card: the role in condensed Archivo (SIL OFL) over
// paper, one rule, and the data row underneath.
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }

  const t = await getT(lang);
  const archivo = await readFile(join(process.cwd(), "assets/archivo-condensed-700.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#e8e9e4",
        color: "#16181a",
        padding: "64px 72px",
        fontFamily: "Archivo",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 4 }}>
        <span>{profile.name.toUpperCase()}</span>
        <span style={{ color: "#5c6064" }}>{t("SHEET_REVISION").toUpperCase()}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 2, backgroundColor: "#b7bab0" }} />
        <div style={{ display: "flex", fontSize: 120, lineHeight: 1.05, paddingTop: 40, textTransform: "uppercase" }}>
          {t("ROLE")}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#5c6064" }}>
        <span>{t("BASED_IN_VALUE")}</span>
        <span style={{ color: "#2f3a8f" }}>{profile.email}</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 700, style: "normal" }] },
  );
}

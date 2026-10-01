import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { profile } from "@/content";
import { palette } from "@/theme";
import { getT, isLanguage, languages } from "@/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Spec sheet";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }

  const t = getT(lang);
  const archivo = await readFile(join(process.cwd(), "assets/archivo-condensed-700.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: palette.light.paper,
        color: palette.light.ink,
        padding: "64px 72px",
        fontFamily: "Archivo",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 4 }}>
        <span>{profile.name.toUpperCase()}</span>
        <span style={{ color: palette.light.inkSoft }}>{t("SHEET_REVISION").toUpperCase()}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 2, backgroundColor: palette.light.rule }} />
        <div style={{ display: "flex", fontSize: 120, lineHeight: 1.05, paddingTop: 40, textTransform: "uppercase" }}>
          {t("ROLE")}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: palette.light.inkSoft }}>
        <span>{t("BASED_IN_VALUE")}</span>
        <span style={{ color: palette.light.dye }}>{profile.email}</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 700, style: "normal" }] },
  );
}

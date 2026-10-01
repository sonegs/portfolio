import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { profile } from "@/content";
import { getT, isLanguage, languages } from "@/i18n";
import { body, email, footer, header, revision, role, rule, sheet } from "./opengraph-image.styles";

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
    <div style={sheet}>
      <div style={header}>
        <span>{profile.name.toUpperCase()}</span>
        <span style={revision}>{t("SHEET_REVISION").toUpperCase()}</span>
      </div>

      <div style={body}>
        <div style={rule} />
        <div style={role}>{t("ROLE")}</div>
      </div>

      <div style={footer}>
        <span>{t("BASED_IN_VALUE")}</span>
        <span style={email}>{profile.email}</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 700, style: "normal" }] },
  );
}

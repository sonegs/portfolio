import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { profile } from "@/content";
import { getT, isLanguage, languages } from "@/i18n";
import * as styles from "./opengraph-image.styles";

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
    <div style={styles.sheet}>
      <div style={styles.header}>
        <span>{profile.name.toUpperCase()}</span>
        <span style={styles.revision}>{t("SHEET_REVISION").toUpperCase()}</span>
      </div>

      <div style={styles.body}>
        <div style={styles.rule} />
        <div style={styles.role}>{t("ROLE")}</div>
      </div>

      <div style={styles.footer}>
        <span>{t("BASED_IN_VALUE")}</span>
        <span style={styles.email}>{profile.email}</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 700, style: "normal" }] },
  );
}

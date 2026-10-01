import { Archivo } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { defaultLanguage, getT } from "@/i18n";
import { palette } from "@/theme";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette.light.paper },
    { media: "(prefers-color-scheme: dark)", color: palette.dark.paper },
  ],
};

export function generateMetadata(): Metadata {
  const t = getT(defaultLanguage);
  return { title: t("NOT_FOUND_TITLE"), description: t("NOT_FOUND_LEAD") };
}

export default function GlobalNotFound() {
  const t = getT(defaultLanguage);
  const home = `/${defaultLanguage}`;
  const label = t("NOT_FOUND_LABEL");
  const lead = t("NOT_FOUND_LEAD");
  const back = t("NOT_FOUND_BACK");

  return (
    <html lang={defaultLanguage} className={`${archivo.variable} theme-auto antialiased`}>
      <body className="font-sans">
        <main className="mx-auto flex min-h-dvh max-w-[78rem] flex-col justify-center px-5 pb-24 md:px-10">
          <p className="label text-[0.68rem] text-ink-soft">{label}</p>
          <h1 className="display pt-4 text-[clamp(4rem,22vw,14rem)] text-dye">404</h1>
          <p className="max-w-[46ch] text-pretty pt-6 text-lg md:text-xl">{lead}</p>
          <p className="pt-8">
            <a
              className="label text-[0.68rem] underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
              href={home}
            >
              {back}
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}

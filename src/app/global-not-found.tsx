import { Archivo } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { defaultLanguage, getT } from "@/i18n";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

// The layout never runs here, so the theme colour it declares has to be declared again
// or the browser chrome stays light while the page is dark.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e9e4" },
    { media: "(prefers-color-scheme: dark)", color: "#15171a" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT(defaultLanguage);
  return { title: t("NOT_FOUND_TITLE"), description: t("NOT_FOUND_LEAD") };
}

// This file is served instead of rendering, so the layout never runs: it brings its
// own document, styles and font. There is no language in the URL either, so the sheet
// falls back to the default one, and the theme to whatever the system asks for.
export default async function GlobalNotFound() {
  const t = await getT(defaultLanguage);

  return (
    <html lang={defaultLanguage} className={`${archivo.variable} theme-auto antialiased`}>
      <body className="font-sans">
        <main className="mx-auto flex min-h-dvh max-w-[78rem] flex-col justify-center px-5 pb-24 md:px-10">
          <p className="label text-[0.68rem] text-ink-soft">{t("NOT_FOUND_LABEL")}</p>
          <h1 className="display pt-4 text-[clamp(4rem,22vw,14rem)] text-dye">404</h1>
          <p className="max-w-[46ch] text-pretty pt-6 text-lg md:text-xl">{t("NOT_FOUND_LEAD")}</p>
          <p className="pt-8">
            <a
              className="label text-[0.68rem] underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
              href={`/${defaultLanguage}`}
            >
              {t("NOT_FOUND_BACK")}
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}

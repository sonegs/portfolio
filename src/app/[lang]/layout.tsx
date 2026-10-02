import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { profile } from "@/content";
import { palette } from "@/theme";
import { toLanguage } from "@/lib/language";
import { getT, languages } from "@/i18n";
import { siteUrl } from "@/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette.light.paper },
    { media: "(prefers-color-scheme: dark)", color: palette.dark.paper },
  ],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = toLanguage((await params).lang);
  const t = getT(lang);

  const title = `${profile.name} — ${t("ROLE")}`;

  return {
    metadataBase: siteUrl,
    title,
    description: t("SUMMARY"),
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(languages.map((language) => [language, `/${language}`])),
    },
    openGraph: { title, description: t("SUMMARY"), url: `/${lang}`, locale: lang, type: "profile" },
    twitter: { card: "summary_large_image", title, description: t("SUMMARY") },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = toLanguage((await params).lang);

  return (
    <html lang={lang} className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <SmoothScroll />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

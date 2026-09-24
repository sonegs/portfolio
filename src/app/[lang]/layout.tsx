import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/content";
import { getT, isLanguage, languages } from "@/i18n";
import { siteUrl } from "@/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e9e4" },
    { media: "(prefers-color-scheme: dark)", color: "#15171a" },
  ],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await getT(lang);

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
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

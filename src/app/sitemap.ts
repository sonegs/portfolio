import type { MetadataRoute } from "next";
import { languages } from "@/i18n";
import { siteUrl } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = Object.fromEntries(languages.map((language) => [language, new URL(`/${language}`, siteUrl).href]));

  return languages.map((language) => ({
    url: new URL(`/${language}`, siteUrl).href,
    lastModified: new Date(),
    alternates: { languages: alternates },
  }));
}

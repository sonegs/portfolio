// The canonical origin. Vercel fills its own domain in; anything else sets the env var.
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? (productionUrl ? `https://${productionUrl}` : "http://localhost:3000"),
);

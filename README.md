# web-personal

Miguel Cobo's personal page. Next.js (App Router) + TypeScript + Tailwind v4.

```bash
pnpm dev             # http://localhost:3000
pnpm build           # next build + typecheck
pnpm lint            # eslint, no warnings allowed
pnpm typecheck
pnpm format          # prettier
pnpm check:locales   # same keys in every language, none left untranslated
```

A husky pre-commit hook runs `format:check`, `lint` and `check:locales`.
`AGENTS.md` holds the conventions.

## Where to edit what

- `public/locales/<language>/common.json` — all the copy, with uppercase keys as in the other projects. Adding a language means creating the folder and listing it in `languages` in `src/i18n.ts`.
- `src/content.ts` — the data that is never translated: names, dates, technologies, percentages and repositories. A value in SCREAMING_SNAKE_CASE is a translation key.
  Identifiers, comments and this file are written in English; the copy lives in the language files.
- `src/app/globals.css` — the design tokens: paper, ink, rule, dye, in light and dark, plus the load animation. The shadcn tokens hang off those same colours.
- `src/app/[lang]/page.tsx` — the composition of the sheet.

## Languages and theme

i18next on the server: `getT(language)` creates one instance per render and the page
is static for `/es` and `/en`. `/` redirects using `Accept-Language` (`src/middleware.ts`).
There is no client provider because no client component translates anything.

The theme is handled by `next-themes` (a `class` on `<html>`, following the system by
default) and switches with the button in the top corner. Components come from shadcn/ui
(`pnpm dlx shadcn@latest add <component>`) and use the sheet's palette, with radius 0.

## Publishing

`NEXT_PUBLIC_SITE_URL` is read **at build time** for `robots.txt`, `sitemap.xml` and the
social card, so it has to be set before `pnpm build` (see `.env.example`). On Vercel the
deployment URL is picked up on its own.

```bash
npx vercel          # first deploy, links the project
npx vercel --prod
```

The social card is generated per language at `/<lang>/opengraph-image`, from
`assets/archivo-condensed-700.ttf` (Archivo, SIL OFL).

## The design

A spec sheet: data aligned in rows separated by hairline rules, a single family
(variable Archivo, whose width axis serves as both condensed display and running text),
grey-green paper, near-black ink and one indigo dye. A single moment of motion on
load; everything else stays still.

`.claude/skills/` holds the design skills used to build it (frontend-design,
ui-ux-pro-max, animate, emil-design-eng, web-design-guidelines).

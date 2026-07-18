# Project Context - B-Fancy Astro

## What This Project Is

B-Fancy is a multilingual Astro 6 marketing website for a beauty salon. It serves brochure-style pages (home, services, jobs), localized content in 4 languages (`pl`, `en`, `uk`, `ru`), and lead capture forms that submit to a PHP backend (`public/send.php`) which sends notifications to Telegram with email fallback.

## Runtime Model

- Frontend is Astro static-first with selective React islands for interactivity.
- Styling is Tailwind CSS 4 with Starwind UI primitives.
- Client-side state for service filtering uses Nanostores.
- Content comes from Astro collections:
  - `services` from MDX (`src/content/services/**/*.mdx`)
  - `jobs` from Markdown (`src/content/jobs/**/*.md`)

## i18n and Routing Shape

- Default locale is Polish at root (`/`) because `prefixDefaultLocale: false`.
- Polish root pages live in `src/pages/...`.
- Other locales are generated through `src/pages/[lang]/...` with `getStaticPaths()`.
- Translation modules are merged in `src/i18n/ui.ts`; new UI keys must exist for all locales and be wired into this file.

## Forms and Submission Flow

The form contract spans four coupled layers and must stay in sync:

1. Astro form components (`src/components/forms/ContactForm.astro`, `src/components/forms/SpecialOffer.astro`)
2. Zod schemas (`src/schemas/forms/index.ts`) used by `validateFormBySchema(...)`
3. Client submit payload (`src/lib/handle-form-submit.ts`, `FormData` POST)
4. PHP backend field handling (`public/send.php`)

Contact form and special-offer form both post to `/send.php` (or `http://localhost:8000/send.php` in dev).

## Deployment and Build Targets

- Core commands: `pnpm dev`, `pnpm build`, `pnpm preview`.
- `BUILD_TARGET` changes Astro `site`/`base` behavior:
  - `github-pages`: GitHub Pages path handling.
  - `production`: canonical site settings (`https://bfancy.pl`).
- GitHub Actions use Node `23.11.0`; local Volta pin is Node `24.14.0`.
- GitHub Pages build writes `dist/robots.txt` with `Disallow: /` (preview deploy is intentionally non-indexable).

## Key Entry Points

- `astro.config.mjs` - i18n, build target behavior, integrations, redirects, fonts.
- `src/layouts/Layout.astro` - global shell, dialogs, cookie popup, locale data on `<body data-current-locale>`.
- `src/content.config.ts` - content collection loaders + schemas.
- `src/components/forms/*` + `src/lib/handle-form-*.ts` - validation/submission pipeline.
- `src/stores/catalog-store/services-store.ts` - services catalog state/filtering.
- `public/send.php` - production form processing and outbound notifications.

## Verification Expectations

- Minimum post-change verification is `pnpm build`.
- For i18n/routing edits, verify `/`, `/en/`, `/uk/`, `/ru/`.
- For form edits, verify success and validation-error flows, then re-check backend field compatibility in `public/send.php`.

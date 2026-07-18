# B-Fancy Astro

## Fast Commands

- `pnpm dev` - local dev server
- `pnpm build` - required verification step (also validates Astro content schemas)
- `pnpm preview` - preview built site
- `pnpm astro ...` - run Astro CLI tasks directly

## Critical Repo Rules

- Default locale is Polish at root (`/`), not `/pl/` (`prefixDefaultLocale: false` in `astro.config.mjs`).
- Dynamic locale routes are handled via `src/pages/[lang]/...`; root pages are Polish equivalents in `src/pages/...`.
- Keep i18n complete: any new key must exist for `pl`, `en`, `uk`, `ru` in `src/i18n/translations/*.ts` and be wired through `src/i18n/ui.ts`.
- Form field changes are contract-sensitive across 4 layers: Astro form components -> Zod schema (`src/schemas/forms/index.ts`) -> client submit payload (`src/lib/handle-form-submit.ts`) -> PHP backend (`public/send.php`).
- React interactivity in Astro requires `client:*` on the component usage site; missing hydration looks like "JS not working".
- Prefer `@/` imports (configured in `tsconfig.json`).

## Architecture Landmarks

- `src/layouts/Layout.astro` - global shell, dialogs, cookie popup, shared scripts, and locale data on `<body data-current-locale>`.
- `src/pages/` and `src/pages/[lang]/` - static page entrypoints + localized variants.
- `src/content.config.ts` - Astro collections source of truth (`services` from `**/*.mdx`, `jobs` from `**/*.md`).
- `src/components/forms/ContactForm.astro` and `src/components/forms/SpecialOffer.astro` - client-side validation + submit flow.
- `src/stores/catalog-store/services-store.ts` - Nanostore state for services catalog filtering.
- `public/send.php` - production form processing + Telegram/email notifications.

## Tooling And Environment Gotchas

- Local Node target is pinned via Volta to `24.14.0` (`package.json`), but GitHub workflows build with Node `23.11.0`.
- Build behavior depends on `BUILD_TARGET`:
  - `github-pages` sets Astro `base`/`site` for Pages path handling.
  - `production` builds canonical site settings (`https://bfancy.pl`).
- GitHub Pages workflow writes `dist/robots.txt` with `Disallow: /`; do not treat Pages deploy as indexable production output.

## Change Verification

- Minimum check after any meaningful change: `pnpm build`.
- For routing/i18n changes: verify `/`, `/en/`, `/uk/`, `/ru/` paths.
- For form changes: test both success and validation-error flows (Contact + Special Offer), then confirm `public/send.php` still matches posted fields.

## Deep Context

- Extended playbooks and file-level guidance live in `.github/copilot-instructions.md`.
- Project overview and execution flow summary live in `PROJECT_CONTEXT.md`.

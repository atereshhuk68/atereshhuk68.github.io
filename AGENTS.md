# B-Fancy Astro

## Fast Commands

- `pnpm dev` - dev server
- `pnpm build` - required verification (validates content schemas)
- `pnpm preview` - preview built site
- `pnpm astro ...` - Astro CLI
- `pnpm lint` - oxlint src/
- `pnpm lint:fix` - oxlint --fix src/

## Critical Repo Rules

- **i18n**: pl(root, `prefixDefaultLocale:false`), en, uk, ru. `src/pages/[lang]/...` for localized routes. Root pages (`src/pages/...`) = Polish.
- **i18n complete**: any new key → all 4 locales in `src/i18n/translations/*.ts` + wired in `src/i18n/ui.ts`.
- **Form contract** (4 layers): Astro form → Zod schema (`src/schemas/forms/index.ts`) → client submit (`src/lib/handle-form-submit.ts`) → PHP (`public/send.php`). Change any → update all 4.
- **Phone validation**: Polish +48 `^[0-9]+$`, exactly 11 chars, starts with "48".
- **Styling**: Tailwind CSS 4 + Starwind UI primitives + `tailwind-variants`.
- **Islands**: pure Astro islands (astro-island in `<head>` via custom hook). `client:*` directives for interactive zones. No React/Nanostores in codebase.
- **Imports**: `@/` → `src/`.
- **Content collections**: services (`**/*.mdx`), jobs (`**/*.md`), legal (`**/*.md`). Validate with `pnpm build`.
- **Build output**: static SSG, `trailingSlash: "always"`, `compressHTML: true`, `inlineStylesheets: "never"`.
- **Environment**: `BUILD_TARGET` env var:
  - `github-pages` → Astro base=`/repo`/`/`, site=`https://{owner}.github.io`
  - `production` (default) → site=`https://bfancy.pl`
- **CI Node**: 23.11.0 (GitHub Actions). Local pin: Volta 24.14.0.

## Architecture

- `src/layouts/Layout.astro` - global shell (head, header, footer, dialogs, cookie popup, locale on `<body data-current-locale>`).
- `src/pages/[lang]/{index,jobs/*,services/*,privacy-policy}.astro` - localized pages mirroring root.
- `src/content.config.ts` - collection defs + Zod schemas.
- `src/components/forms/ContactForm.astro` + `SpecialOffer.astro` - client validation + submit.
- `src/hooks/move-island-styles-to-head.ts` - build hook moving astro-island styles into `<head>`.
- `src/constants/redirects/redirects.ts` - `/careers/` → `/jobs/` across locales.
- `public/send.php` + `public/send.config.example.php` - form backend (Telegram/email). Gitignored: `send.config.php`, `send.config.local.php`.
- `skills-lock.json` - registered skills: astro, starwind-ui, zod, frontend-nomos, etc.
- `.opencode/` has `@opencode-ai/plugin`.

## Tooling Gotchas

- Linter: **Oxlint** (not ESLint). Config in `.oxlintrc.json`.
- Formatter: Prettier with `prettier-plugin-astro` + `prettier-plugin-tailwindcss`.
- Package manager: pnpm. `.npmrc`: `auto-install-peers=true`, `node-linker=hoisted`.
- Fonts: Gropled (700) + Inter (100-900, 4 subset files) via local Astro font provider.
- CSP enabled in Astro config.
- `prefetchAll: true`, default strategy `"tap"`.
- sitemap excludes `/mystery/` path.
- DevToolBar disabled.
- `contentIntellisense` experimental feature on.

## Deploy

- **GitHub Pages**: auto on push to `master`/`dev`. Overwrites `dist/robots.txt` with `Disallow: /`.
- **SFTP**: manual dispatch only. Excludes `mystery/`. Requires `FTP_*` secrets.

## Change Verification

- Minimum: `pnpm build`.
- Routing/i18n changes: verify `/`, `/en/`, `/uk/`, `/ru/`.
- Form changes: success + validation-error flows for both Contact and SpecialOffer. Confirm `public/send.php` matches posted fields.

## Skills

- `src/agents/skills/astro/SKILL.md` - Astro conventions.
- `src/agents/skills/frontend-nomos/SKILL.md` - TS/React/CSS/a11y/testing.
- More in `skills-lock.json` (starwind-ui, zod, seo-optimizer, etc.)

## Deep Context

Extended playbooks in `.github/copilot-instructions.md`.

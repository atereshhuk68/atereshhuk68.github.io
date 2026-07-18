# Copilot Instructions

## Goal Of This File

This file is the primary onboarding and operating guide for current and future agents working in this repository.

Use it to:

- quickly understand architecture and constraints,
- find the right files for a task fast,
- avoid common regressions,
- follow consistent implementation and verification steps.

## Project Summary

- Product: multilingual beauty salon website (content + lead forms + jobs pages).
- Framework: Astro 6, static-first with selective islands hydration.
- UI runtime: Astro components + React 19 for interactive sections.
- Styling: Tailwind CSS 4, Starwind UI primitives, `tailwind-variants`.
- State: Nanostores.
- Content: Astro content collections (`services` JSON, `jobs` Markdown).
- Integrations: PHP form backend in `public/send.php`.

## Stack And Runtime Facts

- Astro config: `astro.config.mjs`
  - `trailingSlash: "always"`
  - i18n locales: `pl`, `en`, `uk`, `ru`
  - default locale: `pl`
  - `prefixDefaultLocale: false` (root URL is Polish)
- Scripts: `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm astro`
- Alias: `@/` -> `src/` (do not use long relative imports when alias is possible)

## Mandatory Read Order For New Agents

Read these files first before making non-trivial changes:

1. `astro.config.mjs`
2. `package.json`
3. `src/content.config.ts`
4. `src/constants/langs/index.ts`
5. `src/types/locales/index.ts`
6. `src/layouts/Layout.astro`
7. `src/i18n/ui.ts`
8. `src/lib/handle-ui-translations.ts`
9. `src/schemas/forms/index.ts`
10. `src/lib/handle-form-validation.ts`
11. `src/lib/handle-form-submit.ts`
12. `src/stores/catalog-store/services-store.ts`
13. `src/components/forms/ContactForm.astro`
14. `src/components/forms/SpecialOffer.astro`
15. `src/components/sections/SectionServices.astro`
16. `src/components/sections/Services/Catalog.tsx`
17. `src/i18n/translations/headerTranslations.ts`
18. `src/pages/index.astro`
19. `src/pages/en/index.astro`
20. `public/send.php`

## Architecture Map

### 1) Pages And Layouts

- `src/pages/`:
  - root pages are default locale (`pl`),
  - localized pages are under `src/pages/{locale}/`.
- `src/layouts/Layout.astro`:
  - global shell (head, header, footer, dialogs),
  - typical integration point for cross-page UI changes.

### 2) Components

- `src/components/sections/`:
  - page section composition,
  - include interactive islands when needed.
- `src/components/forms/`:
  - form markup and client handlers.
- `src/components/starwind/`:
  - reusable UI primitives and variant-driven building blocks.
- `src/components/schema/` and `src/components/head/parts/`:
  - SEO/meta/schema outputs.

### 3) I18n

- `src/i18n/translations/*.ts`: translation modules by feature area.
- `src/i18n/ui.ts`: merges all translation modules into locale maps.
- `src/lib/handle-ui-translations.ts`: `useTranslations(...)` helper and locale utilities.
- `src/constants/langs/index.ts`: language metadata and defaults.

### 4) Content Collections

- `src/content.config.ts`: collection definitions and schemas.
- `src/content/services/{locale}/services.json`: services data per locale.
- `src/content/jobs/{locale}/*.md`: job entries per locale.
- `src/schemas/collections/index.ts`: service schema details.

### 5) Forms And Validation

- `src/schemas/forms/index.ts`: locale-aware Zod schemas.
- `src/lib/handle-form-validation.ts`: form validation orchestration.
- `src/lib/handle-errors.ts`: field-level and form-level rendering of errors.
- `src/lib/handle-submit-button.ts`: submit state toggling.
- `src/lib/handle-dialogs.ts`: dialog open/close event helpers.
- `src/lib/handle-form-submit.ts`: HTTP post to backend endpoint.
- `public/send.php`: backend contract and notification formatting/sending.

### 6) Client State

- `src/stores/catalog-store/services-store.ts`:
  - `$services`, `$activeServiceType`, `$servicesFiltered`,
  - `initServicesStore(...)` and `setActiveServiceType(...)`.

## Golden Rules For Changes

### Rule 1: Keep Locale Behavior Correct

- Root path is Polish (`pl`) by design.
- All locale-aware links must preserve this rule.
- When changing routing/navigation, verify paths for all locales.

### Rule 2: Translation Keys Must Be Complete

- Adding/changing key -> update all four locales.
- Keep key namespaces coherent (by feature/module).
- Avoid introducing orphan keys that are never used.

### Rule 3: Form Changes Must Stay Contract-Safe

- If form fields change, update all related layers:
  1. Astro form markup,
  2. Zod schema,
  3. client submit payload,
  4. PHP input handling in `public/send.php`.
- Never assume backend ignores unknown/missing keys safely.

### Rule 4: Islands Need Explicit Hydration

- React components require `client:*` directive where rendered.
- If UI appears static after changes, check hydration first.

### Rule 5: Content Must Match Schemas

- Changes in `src/content/services` and `src/content/jobs` must satisfy collection schemas.
- Validate with build after content edits.

## Task Playbooks

### Playbook: Add New Locale

1. Add locale in `astro.config.mjs` i18n config.
2. Extend locale metadata in `src/constants/langs/index.ts`.
3. Update locale union in `src/types/locales/index.ts`.
4. Add locale values for all keys in translation modules and merged maps.
5. Add localized content folders under `src/content/services` and `src/content/jobs`.
6. Add localized pages under `src/pages/{locale}` according to existing structure.
7. Validate nav, breadcrumbs, canonical/hreflang behavior.

### Playbook: Modify Contact/Special Offer Forms

1. Update field component usage in `src/components/forms/...`.
2. Update validation in `src/schemas/forms/index.ts`.
3. Update any field error handling assumptions.
4. Ensure payload mapping still matches `public/send.php` expectations.
5. Test both success and validation-failure flows for each locale.

### Playbook: Update Services Catalog UI

1. Review `src/components/sections/SectionServices.astro`.
2. Review `src/components/sections/Services/Catalog.tsx` and `ServiceCard.tsx`.
3. Review store behavior in `src/stores/catalog-store/services-store.ts`.
4. Confirm service type filtering still aligns with content values.

### Playbook: Add Job/Service Content

1. Add/modify content file in locale folder.
2. Ensure schema-required fields are present.
3. Build and open affected pages in dev.
4. Verify locale-specific links and breadcrumbs.

### Playbook: SEO/Schema Changes

1. Inspect `src/components/head/parts/*` and `src/components/schema/*`.
2. Keep locale metadata and canonical data consistent.
3. Validate structured data format and output placement.

## Fast Search Map (Where To Look First)

- Header/nav/lang switcher:
  - `src/components/header/Header.astro`
  - `src/components/header/components/*`
- Footer:
  - `src/components/footer/Footer.astro`
  - `src/components/footer/*`
- Form behavior:
  - `src/components/forms/*`
  - `src/lib/handle-form-validation.ts`
  - `src/lib/handle-form-submit.ts`
  - `public/send.php`
- Translation issues:
  - `src/i18n/ui.ts`
  - `src/i18n/translations/*`
  - `src/lib/handle-ui-translations.ts`
- Content schema/build errors:
  - `src/content.config.ts`
  - `src/schemas/collections/index.ts`
  - `src/content/services/*`
  - `src/content/jobs/*`
- Services catalog/island issues:
  - `src/components/sections/SectionServices.astro`
  - `src/components/sections/Services/*`
  - `src/stores/catalog-store/services-store.ts`

## Common Pitfalls In This Repository

- Forgetting `prefixDefaultLocale: false` implications in links.
- Updating translation in only one locale.
- Changing form fields without syncing PHP backend inputs.
- Missing `client:*` directive for interactive React island.
- Breaking content schema with seemingly small JSON/frontmatter edits.

## Pre-Change Checklist

- Read relevant files from the mandatory list.
- Confirm whether task is locale-sensitive.
- Confirm whether task touches form contract or content schema.
- Identify all layers impacted (UI, schema, payload, backend, translation).

## Post-Change Checklist

- Run `pnpm build`.
- Run `pnpm dev` and verify affected UI path(s).
- Validate behavior for all impacted locales.
- For forms: validate both happy and error paths.
- Check for console errors in interactive sections.

## Implementation Preferences For Agents

- Prefer minimal, targeted changes over broad refactors.
- Preserve existing architecture and naming patterns.
- Keep Astro components static-first; hydrate only when needed.
- Use `@/` imports.
- Keep changes consistent with existing style and file organization.

## When Unsure

- Trace from page -> section component -> helper/store -> schema/content/backend.
- Search for existing pattern in neighboring feature before creating a new one.
- If a change could impact multiple locales or backend contract, validate explicitly before finalizing.

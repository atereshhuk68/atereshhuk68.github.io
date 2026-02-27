# Copilot Instructions

## Project Context
- **Framework**: Astro 5 (Static Site Generation + partial hydration).
- **UI Library**: React 19 (via `@astrojs/react`) for interactive islands; Astro components for static layout.
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite`), `tailwind-variants` for component variants, `starwind.css`.
- **State Management**: Nanostores (`nanostores`, `@nanostores/react`).
- **I18n**: Custom file-based routing + translation hooks.

## Architecture & Patterns

### Internationalization (I18n)
- **Routing**: Folder-based approach.
  - Default locale (`pl`) lives at root: `src/pages/index.astro`.
  - Other locales: `src/pages/{lang}/...` (e.g., `src/pages/en/`).
- **Translation Usage**:
  - In Astro components:
    ```astro
    ---
    import { useTranslations } from "@/lib/handle-ui-translations";
    import type { Locales } from "@/types";

    const { currentLocale = "pl" } = Astro;
    const t = useTranslations(currentLocale as Locales);
    ---
    <h1>{t("hero.title")}</h1>
    ```
  - **Keys**: Managed in `src/i18n/ui.ts` / `src/i18n/translations/*.ts`.

### Styling Strategy
- **Tailwind 4**: Used for all styling. Configured via Vite plugin in `astro.config.mjs`.
- **Component Variants**: Using Starwind UI with `tailwind-variants` (imported as `tv`) to define reusable UI configurations.
  - Example (`src/components/starwind/button/Button.astro`):
    ```ts
    const button = tv({
      base: "...",
      variants: { variant: { ... } }
    });
    ```
- **Fonts**: Loaded via `experimental.fonts` in `astro.config.mjs`.

### State Management
- **Nanostores**: Used for shared state across React islands and Astro scripts.
- **Convention**: Stores defined in `src/stores` with `$` prefix for atoms.
  - Export getter/setter helpers alongside atoms (e.g., `getServices`, `setActiveServiceType`).

### Content & Data
- **Collections**: Defined in `src/content/config.ts`.
  - `services`: JSON files.
  - `jobs`: Markdown files (requires Zod schema validation).
- **Forms**:
  - Submissions are handled by `src/lib/handle-form-submit.ts`.
  - Uses `ky` to POST to `/send.php` (PHP backend for emails).

## Development Conventions
- **Path Aliases**: Always use `@/` to reference `src/`.
- **File Structure**:
  - `src/components/starwind`: Reusable, styled UI primitives.
  - `src/layouts`: Layout wrappers (pass `metaTitle`, `metaDescription` props).
- **Hooks**: Custom logic often resides in `src/hooks` (e.g., `move-island-styles-to-head.ts`).

## Critical Workflows
- **Dev Server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint/Typecheck**: Standard `astro check` (implied).

## Known Constraints
- **PHP Integration**: The project interfaces with an external PHP script (`send.php`) in the `public` folder for form handling. Ensure payload structures match PHP expectations.
- **Islands**: Use `client:*` directives sparingly, only for interactive components (React).

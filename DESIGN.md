# BFancy Design System

> Beauty salon website — Astro 7, Tailwind CSS 4, Starwind UI.
> Live: [bfancy.pl](https://bfancy.pl) | i18n: pl (root), en, uk, ru.

---

## 1. Design Tokens

### 1.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `black-900` | `#333c47` | Primary text, primary button bg |
| `black-700` | `#4a596d` | Secondary text |
| `black-600` | `#516278` | Tertiary text |
| `black-500` | `#667a91` | Muted text |
| `black-300` | `#b0bbc9` | Borders (lighter) |
| `black-200` | `#d5dbe2` | Input borders / dividers |
| `black-100` | `#eceff2` | Card backgrounds, table headers |
| `golden-200` | `#ffce6b` | Accent, secondary buttons, active filters, decorative |
| `cove-50` | `#f3f7fb` | Light blue background tint |
| `cove-600` | `#5b76b5` | Link hover, interactive accent |
| `cove-700` | `#5065a5` | Hover state for cove-600 |
| `shell-50` | `#faf7f6` | Page background (warm off-white) |
| `shell-300` | `#debdb4` | Decorative / card border accent |
| `white` | `#fefefe` | Card surfaces |

### 1.2 Semantic Color Aliases

All mapped in `@theme inline` block. Standard shadcn-style mapping:

| Variable | Maps to | Used in |
|---|---|---|
| `--background` | `black-100` | Page-level backgrounds |
| `--foreground` | `black-900` | Body text |
| `--primary` | `black-900` | Primary buttons |
| `--primary-foreground` | `black-100` | Primary button text |
| `--secondary` | `golden-200` | Golden accent elements |
| `--border` | `neutral-200` | Borders |
| `--input` | `neutral-200` | Form input borders |
| `--outline` | `blue-700` | Focus-visible ring |
| `--radius` | `0.5rem` | Base border radius |

### 1.3 Typography

| Property | Value | Usage |
|---|---|---|
| `--font-sans` | `Inter`, sans-serif | Body text (100–900 weight) |
| `--font-heading` | `Gropled`, serif | Display/heading text (700 weight) |

Font files: 5 local `.woff2` files in `src/assets/fonts/` — Gropled (1 file) + Inter (4 subset files: latin, latin-ext, cyrillic, cyrillic-ext w/ unicode-range).

### 1.4 Border Radius

| Token | Value |
|---|---|
| `radius-xs` | `0.125rem` |
| `radius-sm` | `0.25rem` |
| `radius-md` | `0.375rem` |
| `radius-lg` | `0.5rem` (base) |
| `radius-xl` | `0.75rem` |
| `radius-2xl` | `1rem` |
| `radius-3xl` | `1.5rem` |

---

## 2. Component Architecture

### 2.1 Layer Model

```
Starwind UI Primitives  (badge, button, dialog, carousel, dropdown, image, native-select)
       ↓
Application Components  (forms, cards, sections, dialogs, first-screen)
       ↓
Page Templates          (ServiceDetailsPage)
       ↓
Page Compositions       (src/pages/*.astro)
```

### 2.2 Starwind UI Primitives (7 registered)

Registered in `starwind.config.json`:

| Component | Version | Key Features |
|---|---|---|
| `button` | 2.3.3 | 8 variants × 6 sizes; polymorphic button/a |
| `badge` | 1.4.3 | 8 variants × 3 sizes; polymorphic div/a |
| `dialog` | 1.5.0 | Compound (9 parts); `<dialog>` HTML element; WeakMap state management; nested dialog support; scroll lock |
| `carousel` | 1.0.3 | Compound (5 parts); embla-carousel; auto-init; keyboard nav |
| `dropdown` | 2.0.0 | Compound (12 parts); 1000+ line client JS; click/hover/context-menu modes; keyboard nav; submenus; checkbox items; portal support |
| `image` | 1.0.2 | Thin wrapper over Astro `<Image />`; optional size inference |
| `native-select` | 1.0.1 | Compound (3 parts); wrapper over `<select>` with ChevronDown icon |

All starwind components use `tailwind-variants` (`tv()`) for variant management.

### 2.3 Application Components

#### 2.3.1 Layout Components

| Component | Role |
|---|---|
| `Layout.astro` | Global shell — `<head>`, `<header>`, `<main>`, `<footer>`, dialogs, cookie popup, SpecialOffer |
| `TextContentLayout.astro` | Thin wrapper for prose pages (privacy policy) |

#### 2.3.2 Head Components

| Component | Props |
|---|---|
| `Head.astro` | `metaTitle`, `metaDescription`, `currentLocale` |
| `Favicons.astro` | — |
| `Canonical.astro` | — |
| `OpenGraph.astro` | `metaTitle`, `metaDescription`, `currentLocale` |
| `GTM.astro` | — (prod only) |
| `Clarity.astro` | — (prod only) |
| `Ahrefs.astro` | — (prod only) |

#### 2.3.3 Header Components

| Component | Elements |
|---|---|
| `Header.astro` | Container, grid with logo + menu + CTA + lang switcher |
| `HeaderLogo.astro` | SVG logo (desktop: `bfancy-logo-w220.svg`, mobile: `bfancy-square-w96.svg`) |
| `HeaderMenu.astro` | Nav links: Usługi, O nas, Kariera |
| `HeaderCTA.auto` | "Umów wizytę" → Booksy external link |
| `HeaderLangs.astro` | Language switcher (en, uk, ru) |

#### 2.3.4 Footer Components

| Component | Role |
|---|---|
| `Footer.astro` | Grid container |
| `FooterLogo.astro` | SVG logo, links to homepage |
| `FooterMenu.astro` | Language links (excluding current locale) |
| `FooterLegal.astro` | Privacy policy link |
| `FooterCopyright.astro` | `© {currentYear}` |

#### 2.3.5 Section Components (Homepage)

| Component | Grid Area | Content |
|---|---|---|
| `SectionFirstScreen.astro` | Container | Composes Intro, Slider, AboutUs, ViewReviews |
| `FirstScreenIntro.astro` | `intro` | H1, CTA, decorative rotating star |
| `FirstScreenSlider.astro` | `slider` | 12-image PhotoSwipe carousel (embla) |
| `FirstScreenAboutUs.astro` | `aboutus` | About text, social links (IG, FB, TG, WA, Viber) |
| `FirstScreenViewReviews.astro` | `reviews` | Google Maps reviews link |
| `SectionOurWorks.astro` | — | 45-image portfolio gallery; autoplay on desktop |
| `SectionServices.astro` | — | Grouped service cards grid |
| `SectionContact.astro` | — | Contact form + decorative rotating text |

#### 2.3.6 Form Components

4-layer contract: Astro → Zod → client submit (`postFormPayload`) → PHP (`public/send.php`).

| Component | Fields | Schema |
|---|---|---|
| `ContactForm.astro` | Name, Phone (+48 mask), Email, Message | `getContactFormSchema` |
| `SpecialOffer.astro` | Name, Phone (+48 mask), ServiceCategory | `getOfferFormSchema` |
| `UserName.astro` | `<input type="text">` | — |
| `UserPhone.astro` | `<input type="tel">` + Maska mask (`+48 ### ### ###`) | — |
| `UserEmail.astro` | `<input type="email">` | — |
| `UserMessage.astro` | `<textarea>` | — |
| `UserServiceCategory.astro` | `<NativeSelect>` populated from content collection | — |

Form states: idle → validating (Zod, client-side) → submitting (button disabled) → success (`SuccessDialog`) / error (`ErrorDialog`).

#### 2.3.7 Dialog Components

| Component | Content |
|---|---|
| `SuccessDialog.astro` | Success message + "Świetnie" button |
| `ErrorDialog.astro` | Error message + "Zrozumiałem" button |
| `CookiePopup.astro` | Cookie consent (Web Animations API, 365d cookie) |

#### 2.3.8 Card Components

| Component | Props | Display |
|---|---|---|
| `ServiceCard.astro` | `{ type, items }` | Categorized list of services with badge + hover effects |
| `CareerCard.astro` | `{ title, country, city, slug, isJobActive }` | Job card with Briefcase icon, location, status badge |

#### 2.3.9 Other Components

| Component | Role |
|---|---|
| `Breadcrumbs.astro` | `astro-breadcrumbs` wrapper with i18n builder |
| `ServicePriceTable.astro` | HTML `<table>` with title + description + price + currency |
| `ServiceDetailsPage.astro` | Full service detail: gallery carousel, MDX content, price table, inline offer form, JSON-LD |

---

## 3. Layout System

### 3.1 Global Structure

```
<body>
  <Header />                  ← fixed/shrink: grid-rows-[auto_1fr_auto]
  <main class="pb-20">
    <Breadcrumbs />           ← hidden on homepage / 404
    <slot />
  </main>
  <Footer />
  <SpecialOffer />            ← hidden on 404
  <SuccessDialog />
  <ErrorDialog />
  <CookiePopup />
```

### 3.2 First Screen Grid (`[data-first-screen]`)

```
Mobile:                    lg:                     xl:
┌──────────┐              ┌─────┬─────────┐       ┌────────┬────────┬────────┬─────────┐
│  intro   │              │intro│  slider │       │ intro  │ intro  │ slider │  slider  │
├──────────┤              ├─────┼─────────┤       ├────────┼────────┼────────┼─────────┤
│  slider  │              │about│ reviews │       │ about  │ about  │ about  │ reviews  │
├──────────┤              └─────┴─────────┘       └────────┴────────┴────────┴─────────┘
│ aboutus  │
├──────────┤
│ reviews  │
└──────────┘
```

### 3.3 Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 768px | Single column, stacked |
| `md` | 768px | 2-col grids, desktop autoplay |
| `lg` | 1024px | First screen 2-col |
| `xl` | 1280px | 3-col grids, first screen 4-col |

### 3.4 Container Utility

```
.container: margin-inline: auto, padding: 20px (mobile) / 1rem (sm+)
```

---

## 4. Interactive Patterns

### 4.1 Client-Side Architecture

- **Pure Astro islands** — no React, no Nanostores
- Each interactive component has its own `<script>` block or import
- Initialization via `<script>` at bottom of component/layout

### 4.2 Key Libraries

| Library | Used In |
|---|---|
| `embla-carousel` | Carousel (hero + portfolio) |
| `embla-carousel-autoplay` | Portfolio carousel (desktop only, 4s delay) |
| `photoswipe` / `photoswipe/lightbox` | Image lightbox (hero slider + portfolio) |
| `maska` | Phone input mask (`+48 ### ### ###`) |
| `typescript-cookie` | Cookie popup consent storage |
| `astro-breadcrumbs` | Breadcrumb navigation |
| `@tailwindcss/forms` | Form input reset |
| `@tailwindcss/typography` | Prose styling for content pages |
| `tw-animate-css` | Dialog animation utilities |

### 4.3 Dialog System

- `<dialog>` HTML element with custom `DialogHandler` class
- Open/close via custom events: `dialog:open`, `dialog:close`, `dialog:toggle`
- WeakMap per-instance state tracking
- Nested dialog support, Escape key, click-outside to close
- Scroll lock via `overflow-hidden` on `<body>`
- `aria-labelledby` auto-linked to first heading

### 4.4 Animation Patterns

| Element | Animation |
|---|---|
| Decorative star (intro) | `rotate 360deg / 20s linear infinite` |
| Rotating text (contact) | `rotate -360deg / 20s linear infinite` via Web Animations API |
| Dialog | Tailwind `animate-in` / `animate-out` (200ms) |
| Service card hover | Background + border color transition |
| Custom list items | Star marker rotates 90deg, changes to cove-600 |
| Cookie popup | Scale + opacity via Web Animations API (cubic-bezier) |
| Special offer trigger | Hover scale transform |

---

## 5. Visual Elements

### 5.1 Decorative Elements

| Class | Type | Source |
|---|---|---|
| `decor-star-w300` | Mask | `decor-star-w300.svg` |
| `decor-blur-blue-star-w770` | Background | `decor-blur-blue-star-w770.svg` |
| `decor-blur-yellow-star-w770` | Background | `decor-blur-yellow-star-w770.svg` |
| `rotated-sentence-w550` | Background | `rotated-sentence-w550.webp` |
| `footer-logo-w160` | Background | `footer-logo-w160.svg` |

All managed via `lazy-bg.css` — lazy-loaded via `backgroundImageLazyLoader` utility.

### 5.2 Service Icons

| Class | Service |
|---|---|
| `service-list-w64` | List (generic) |
| `service-nails-w64` | Nails |
| `service-visage-w64` | Visage / face |
| `service-massage-w64` | Massage |
| `service-eyelashes-w64` | Eyelashes |
| `service-hair-w64` | Hair |

All 64×64 SVG icons, applied as CSS background images.

### 5.3 Logo Assets

| File | Usage |
|---|---|
| `bfancy-logo-w220.svg` | Header (desktop) |
| `bfancy-square-w96.svg` | Header (mobile) |
| `footer-logo-w160.svg` | Footer |

### 5.4 Image Assets

| Collection | Count | Format | Path |
|---|---|---|---|
| Hero slider images | 12 | `.webp` | `src/assets/images/pixel/2026/` |
| Portfolio examples | 45 | `.webp` | `src/assets/images/pixel/examples/` |
| Person photos | 9 | `.webp` | `src/assets/images/pixel/persons/` |

---

## 6. Page Templates

| Route | Layout | Components |
|---|---|---|
| `/` (pl) / `/[lang]/` | `Layout` | SectionFirstScreen, SectionOurWorks, SectionServices, SectionContact |
| `/services/` / `/[lang]/services/` | `Layout` | ServiceCard grid |
| `/services/[slug]/` / `/[lang]/services/[slug]/` | `Layout` | ServiceDetailsPage (gallery, MDX, price table, form, JSON-LD) |
| `/jobs/` / `/[lang]/jobs/` | `Layout` | CareerCard grid |
| `/jobs/[slug]/` / `/[lang]/jobs/[slug]/` | `Layout` | MDX content + SchemaJobPosting |
| `/privacy-policy/` / `/[lang]/privacy-policy/` | `TextContentLayout` | MDX content |
| `/404/` | `Layout` | 404 card with CTA |

---

## 7. i18n & SEO

### 7.1 Locale Structure

- pl (default, `prefixDefaultLocale: false`) — root routes
- en, uk, ru — `/[lang]/` prefixed routes

### 7.2 Translation Architecture

`src/i18n/translations/*.ts` → `src/i18n/ui.ts` (merged by locale) → consumed via `useTranslations(currentLocale)`.

10 translation modules: header, hero, about, services, ourWorks, sliders, contact, specialOffer, dialog, other.

### 7.3 SEO Components

| Component | Output |
|---|---|
| `SchemaWebsite.astro` | `WebSite` + `Organization` JSON-LD (homepage only) |
| `SchemaService.astro` | `BeautySalon` + `hasOfferCatalog` JSON-LD |
| `SchemaJobPosting.astro` | `JobPosting` JSON-LD |
| `Canonical.astro` | Canonical + hreflang alternates for all 4 locales + x-default |
| `OpenGraph.astro` | OG + Twitter Card meta |
| `GTM.astro` | Google Analytics 4 (prod only) |
| `Clarity.astro` | Microsoft Clarity (prod only) |
| `Ahrefs.astro` | Ahrefs analytics (prod only) |

---

## 8. Form System Contract

```
┌──────────────────────────────────────────────────────────────────┐
│  Astro Component (.astro)                                        │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Zod Schema (src/schemas/forms/index.ts)                   │  │
│  │  → validates client-side before submit                     │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ↓                                                               │
│  Client Submit (src/lib/handle-form-submit.ts)                   │
│  → fetch POST to /send.php                                       │
│  ↓                                                               │
│  PHP Backend (public/send.php)                                   │
│  → Telegram notification + email                                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## 9. Styling Strategy

| Method | Used For |
|---|---|
| `@theme` in `starwind.css` | Design tokens (colors, fonts, keyframes) |
| `tailwind-variants` | Starwind component variants (button, badge, dialog, etc.) |
| CSS Modules | Complex layout components (Breadcrumbs, ServiceCard, SectionServices) |
| Inline Tailwind | Simple components |
| CSS layer (`@layer base`) | Global resets, focus-visible outlines |
| CSS layer (`@layer utilities`) | Custom transition classes |

---

## 10. Data Flow

- **Static SSG** — all content at build time via `astro:content`
- Content collections: `services` (`**/*.mdx`), `jobs` (`**/*.md`), `legal` (`**/*.md`)
- No runtime data fetching (except form POSTs to PHP)
- Forms POST to `/send.php` (PHP) — no client-side state persistence

---

## 11. Build & Deploy Specifics

| Config | Production | GitHub Pages |
|---|---|---|
| `site` | `https://bfancy.pl` | `https://{owner}.github.io/{repo}/` |
| `base` | `/` | `/{repo}/` |
| `trailingSlash` | `"always"` | `"always"` |
| `compressHTML` | `true` | `true` |
| `inlineStylesheets` | `"never"` | `"never"` |
| Image service | Sharp | Sharp |
| `assetsInlineLimit` | `0` | `0` |

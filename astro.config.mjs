// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import moveIslandsStyle from "./src/hooks/move-island-styles-to-head.ts";

import react from "@astrojs/react";
import { DEFAULT_LANG, LOCALES_SETTING, SITE } from "./src/constants";
import { redirectsConfig } from "./src/constants/redirects/redirects.ts";

// Determine environment-specific configuration
const buildTarget = process.env.BUILD_TARGET ?? "production";
const isGitHubPages = buildTarget === "github-pages";
const githubOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "atereshhuk68";
const githubRepo =
  process.env.GITHUB_REPOSITORY?.split("/")?.[1] ?? "bfancy-astro";

const siteUrl = isGitHubPages
  ? `https://${githubOwner}.github.io`
  : "https://bfancy.pl";

const isUserPagesRepo = githubRepo === `${githubOwner}.github.io`;

const base = isGitHubPages
  ? isUserPagesRepo
    ? "/"
    : `/${githubRepo}`
  : undefined;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: base,
  trailingSlash: "always",
  redirects: redirectsConfig,
  i18n: {
    locales: ["pl", "en", "uk", "ru"],
    defaultLocale: "pl",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== `${SITE}/admin/`,
      i18n: {
        defaultLocale: DEFAULT_LANG,
        locales: Object.fromEntries(
          Object.entries(LOCALES_SETTING).map(([key, value]) => [
            key,
            value.lang ?? key,
          ]),
        ),
      },
    }),
    moveIslandsStyle(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.local(),
        name: "Gropled",
        cssVariable: "--font-gropled",
        display: "swap",
        stretch: "100%",
        optimizedFallbacks: false,
        options: {
          variants: [
            {
              weight: "700",
              style: "normal",
              src: ["./src/assets/fonts/gropled.woff2"],
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: "Inter",
        cssVariable: "--font-inter",
        options: {
          variants: [
            {
              weight: "100 900",
              style: "normal",
              src: ["./src/assets/fonts/inter-cyrillic-critical.woff2"],
            },
            {
              weight: "100 900",
              style: "normal",
              src: ["./src/assets/fonts/inter-cyrillic-ext-critical.woff2"],
            },
            {
              weight: "100 900",
              style: "normal",
              src: ["./src/assets/fonts/inter-latin-critical.woff2"],
            },
            {
              weight: "100 900",
              style: "normal",
              src: ["./src/assets/fonts/inter-latin-ext-critical.woff2"],
            },
          ],
        },
        display: "swap",
        stretch: "100%",
        subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
        optimizedFallbacks: false,
        unicodeRange: [
          "U+A,U+20,U+21,U+28,U+29,U+2C-3A,U+3F-47,U+49-50,U+52-57,U+5A,U+61-70,U+72-7A,U+F3,U+105,U+107,U+119,U+141,U+142,U+144,U+15A,U+15B,U+17A,U+17C,U+400-45F,U+2013,U+2116",
        ],
      },
    ],
  },
});

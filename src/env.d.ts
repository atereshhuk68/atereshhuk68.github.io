/* oxlint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

// Astro types, not necessary if you already have a `tsconfig.json`
/// <reference path="../.astro/types.d.ts" />

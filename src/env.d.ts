/* eslint-disable @typescript-eslint/no-explicit-any */
export type {};

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

// Astro types, not necessary if you already have a `tsconfig.json`
/// <reference path="../.astro/types.d.ts" />

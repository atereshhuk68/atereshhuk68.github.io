import type { RedirectConfig } from "astro";

export const redirectsConfig: Record<string, RedirectConfig> = {
  "/careers/": "/jobs/",
  "/en/careers/": "/en/jobs/",
  "/ru/careers/": "/ru/jobs/",
  "/uk/careers/": "/uk/jobs/",
  "/careers/[slug]": "/jobs/[slug]",
  "/en/careers/[slug]": "/en/jobs/[slug]",
  "/ru/careers/[slug]": "/ru/jobs/[slug]",
  "/uk/careers/[slug]": "/uk/jobs/[slug]",
};

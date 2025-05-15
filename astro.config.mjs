// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: "https://bfancy.pl",
	trailingSlash: "always",
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
	integrations: [react(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			assetsInlineLimit: 0,
		},
	},
});

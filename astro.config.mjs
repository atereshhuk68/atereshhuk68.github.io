// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

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
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: "Inter",
				cssVariable: "--font-inter",
				weights: ["100 900"],
				subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
				unicodeRange: [
					"U+A,U+20,U+21,U+28,U+29,U+2C-3A,U+3F-47,U+49-50,U+52-57,U+5A,U+61-70,U+72-7A,U+F3,U+105,U+107,U+119,U+141,U+142,U+144,U+15A,U+15B,U+17A,U+17C,U+400-45F,U+2013,U+2116",
				],
			},
		],
	},
});

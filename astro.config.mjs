// @ts-check
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://atereshhuk68.github.io',
	devToolbar: {
		enabled: false,
	},
	integrations: [react(), tailwind()],
});

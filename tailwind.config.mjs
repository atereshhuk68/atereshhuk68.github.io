const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
		},
		colors: {
			black: {
				100: '#ECEFF2',
				300: '#B0BBC9',
				600: '#516278',
				900: '#333C47',
			},
			golden: {
				200: '#FFCE6B',
			},
			cove: {
				600: '#5B76B5',
				700: '#5065A5',
			},
			shell: {
				50: '#FAF7F6',
				300: '#DEBDB4',
			},
		},
	},
	plugins: [heroui()],
};

import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const careers = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/careers' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		location: z.string(),
	}),
});

export const collections = { careers };

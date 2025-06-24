import { defineCollection, z } from 'astro:content';
import { servicesCollectionsSchema } from '@/schemas/collections';
import { glob } from 'astro/loaders';

export const collections = {
	services: defineCollection({
		loader: glob({
			pattern: '**/*.json',
			base: 'src/content/services',
			generateId: ({ entry }) => entry.replace(/\.json$/, ''),
		}),
		schema: z.array(servicesCollectionsSchema),
	}),
};

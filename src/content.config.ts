import { file, glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const careers = defineCollection({
	loader: glob({ pattern: '**/*.md', base: 'src/data/careers' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		location: z.string(),
	}),
});

const services = defineCollection({
	loader: file('src/data/services.json'),
	schema: z.object({
		id: z.number(),
		name: z.string(),
		services: z.array(
			z.object({
				title: z.string(),
				price: z.union([z.string(), z.number()]),
				currency: z.string().optional(),
				description: z.string().optional(),
			}),
		),
		type: z.string(),
	}),
});

export const collections = { careers, services };

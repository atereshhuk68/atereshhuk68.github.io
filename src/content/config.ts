import { defineCollection, z } from 'astro:content';
import { servicesCollectionsSchema } from '@/schemas/collections';

export const collections = {
	services: defineCollection({
		type: 'data',
		schema: z.array(servicesCollectionsSchema),
	}),
};

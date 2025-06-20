import { servicesCollectionsSchema } from '@/schemas/collections';
import { defineCollection, z } from 'astro:content';

export const collections = {
	services: defineCollection({
		type: 'data',
		schema: z.array(servicesCollectionsSchema),
	}),
};

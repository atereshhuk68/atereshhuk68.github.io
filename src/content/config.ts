import { defineCollection, z } from 'astro:content';
import { servicesCollectionsSchema } from 'src/schemas';

export const collections = {
	services: defineCollection({
		type: 'data',
		schema: z.array(servicesCollectionsSchema),
	}),
};

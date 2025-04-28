import { defineCollection, z } from 'astro:content';

const serviceListItemSchema = z.object({
	title: z.string(),
	price: z.union([z.number(), z.string()]),
	description: z.string().optional(),
	currency: z.string().optional(),
});

const servicesCollection = defineCollection({
	type: 'data',
	schema: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			list: z.array(serviceListItemSchema),
			type: z.enum(['visage', 'massage', 'nails', 'all']),
		}),
	),
});

export const collections = {
	services: servicesCollection,
};

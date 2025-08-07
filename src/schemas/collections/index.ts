import { z } from 'zod';

const serviceListItemSchema = z.object({
	title: z.string(),
	price: z.union([z.number(), z.string()]),
	description: z.string().optional(),
	currency: z.string().optional(),
});

export const servicesCollectionsSchema = z.object({
	id: z.number(),
	name: z.string(),
	list: z.array(serviceListItemSchema),
	type: z.enum(['visage', 'massage', 'nails', 'eyelashes', 'hair']),
});

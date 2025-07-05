import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { servicesCollectionsSchema } from "@/schemas/collections";

export const collections = {
	services: defineCollection({
		loader: glob({
			pattern: "**/*.json",
			base: "src/content/services",
			generateId: ({ entry }) => entry.replace(/\.json$/, ""),
		}),
		schema: z.array(servicesCollectionsSchema),
	}),
};

import { servicesCollectionsSchema } from "@/schemas/collections";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  services: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "src/content/services",
      generateId: ({ entry }) => entry.replace(/\.json$/, ""),
    }),
    schema: z.array(servicesCollectionsSchema),
  }),
  jobs: defineCollection({
    loader: glob({
      pattern: "**/*.md",
      base: "src/content/jobs",
      generateId: ({ entry }) => entry.replace(/\.md$/, ""),
    }),
    schema: z.object({
      title: z.string(),
      publishedDate: z.date(),
      slug: z.string(),
      isJobActive: z.boolean().default(true),
      metaTitle: z.string().optional(),
      metaDescription: z.string(),
      city: z.string(),
      country: z.string(),
    }),
  }),
};

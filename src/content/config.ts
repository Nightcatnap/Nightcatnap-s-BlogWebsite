import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    series: z.string().optional(),
    series_description: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { posts };

import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    img: z.string().optional(),
    img_alt: z.string().optional(),
  }),
});

export const collections = { work };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Um arquivo por idioma: src/content/cases/{pt,en}/{slug}.mdx
const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    client: z.string(),
    live: z.boolean().default(true),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    results: z.array(z.object({ value: z.string(), label: z.string() })).max(4),
  }),
});

export const collections = { cases };

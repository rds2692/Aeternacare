import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    fecha: z.coerce.date(),
    autor: z.string().default('Equipo Aeterna Care'),
    lectura: z.string().default('5 min'),
  }),
});

export const collections = { blog };

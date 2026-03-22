import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'completed', 'concept']).optional().default('active'),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    caption: z.string().optional(),
    category: z.string().optional(),
    imagePath: z.string(),
    isPanoramic: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { posts, essays, projects, gallery };

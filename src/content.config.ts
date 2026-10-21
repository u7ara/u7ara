import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', retainBody: true }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/** Dates may be written as `2016` (number) or `Jan 2024` (string) in YAML. */
const yearOrDate = z.union([z.string(), z.number()]).transform(String);

const cv = defineCollection({
  loader: glob({ pattern: 'cv.yaml', base: './src/content' }),
  schema: z.object({
    basics: z.object({
      name: z.string(),
      title: z.string(),
      email: z.string(),
      location: z.string(),
      website: z.string().optional(),
      summary: z.string(),
    }),
    experience: z.array(
      z.object({
        role: z.string(),
        org: z.string(),
        start: yearOrDate,
        end: yearOrDate.nullable(),
        location: z.string().optional(),
        highlights: z.array(z.string()).default([]),
      }),
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        start: yearOrDate,
        end: yearOrDate.nullable(),
        details: z.string().optional(),
      }),
    ),
    projects: z.array(
      z.object({
        name: z.string(),
        url: z.string().optional(),
        description: z.string(),
      }),
    ),
    skills: z.array(
      z.object({
        group: z.string(),
        items: z.array(z.string()),
      }),
    ),
  }),
});

export const collections = { blog, cv };

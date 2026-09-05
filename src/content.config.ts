import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const news = defineCollection({
  loader: glob({pattern: '**/*.md', base: './src/content/news'}),
  schema: z.object({
    id: z.string(),
    job: z.number(),
    slug: z.string(),
    title: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    summary: z.string(),
    sourceSha256: z.string(),
    published: z.boolean(),
  }),
});

export const collections = {news};

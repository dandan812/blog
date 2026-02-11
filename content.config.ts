import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()).optional(),
        category: z.union([z.string(), z.array(z.string())]).optional(),
        cover: z.string().optional(),
        readingTime: z.number().optional(),
      }),
    }),
  },
})

import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
   interface ContentCollectionItem extends PageCollectionItemBase {
    title: string
    description: string
    date: string
    tags?: string[]
    category?: (string | string[])
    cover?: string
    readingTime?: number
  }
  

  interface PageCollections {
    content: ContentCollectionItem
  }

  interface Collections {
    content: ContentCollectionItem
  }
}

interface Post {
  path: string
  title: string
  description: string
  meta?: {
    date?: string
    tags?: string[]
    readingTime?: number
  }
}

export const usePosts = () => {
  const getLatestPosts = async (limit = 3): Promise<Post[]> => {
    const posts = await queryCollection('content').all()
    if (!Array.isArray(posts)) return []

    return [...posts]
      .sort((a, b) => {
        const dateA = new Date(String(a?.meta?.date || '1970-01-01'))
        const dateB = new Date(String(b?.meta?.date || '1970-01-01'))
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, limit) as Post[]
  }

  const getPostBySlug = async (slug: string): Promise<Post | null> => {
    return queryCollection('content').path(`/blog/${slug}`).first() as Promise<Post | null>
  }

  const getAllPosts = async (): Promise<Post[]> => {
    return queryCollection('content').all() as Promise<Post[]>
  }

  const getRelatedPosts = async (currentPath: string, limit = 3): Promise<Post[]> => {
    return queryCollection('content')
      .where('path', '<>', currentPath)
      .limit(limit)
      .all() as Promise<Post[]>
  }

  return {
    getLatestPosts,
    getPostBySlug,
    getAllPosts,
    getRelatedPosts,
  }
}

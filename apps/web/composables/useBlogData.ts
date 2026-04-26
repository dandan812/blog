import type { Post, PostsResponse } from '~/composables/usePosts'

interface ContentPost {
  id?: string
  path?: string
  title: string
  description: string
  date: string
  excerpt?: string
  cover?: string
  author?: string
  readingTime?: number
  tags?: string[]
  body?: unknown
}

interface LegacyArticle {
  id: number | string
  title: string
  content: string
  description?: string | null
  tags?: string[] | string | null
  cover?: string | null
  category?: string | null
  created_at?: string
  updated_at?: string
}

interface LegacyArticlesResponse {
  success: boolean
  data: LegacyArticle[]
}

const API_TIMEOUT = 1200

/**
 * 统一封装博客 API 请求，失败时返回 null，交由内容兜底处理。
 */
async function fetchBlogApi<T>(path: string): Promise<T | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl || 'http://localhost:3001'

    const isLocalClient = import.meta.client && window.location.hostname === 'localhost'
    const isLocalServer = import.meta.server && useRequestURL().hostname === 'localhost'

    if ((isLocalClient || isLocalServer) && !apiBaseUrl.includes('localhost')) {
      return null
    }

    const response = await $fetch(`${apiBaseUrl}/api${path}`, {
      signal: controller.signal,
    })
    return response as T
  }
  catch {
    return null
  }
  finally {
    clearTimeout(timer)
  }
}

/**
 * 将 Nuxt Content 文档映射为现有前端使用的文章结构。
 */
function mapContentPost(item: ContentPost): Post {
  const path = item.path || ''
  const slug = path.split('/').filter(Boolean).pop() || item.id || ''

  return {
    id: item.id || path || slug,
    title: item.title,
    slug,
    content: item.excerpt || item.description || '',
    excerpt: item.excerpt || item.description || '',
    coverImage: item.cover || null,
    published: true,
    viewCount: 0,
    authorId: item.author || 'content-author',
    createdAt: item.date,
    updatedAt: item.date,
    tags: (item.tags || []).map(tag => ({
      id: tag,
      name: tag,
      slug: tag,
    })),
  }
}

/**
 * 兼容旧版 blog-api 的 articles 数据结构。
 */
function mapLegacyArticle(item: LegacyArticle): Post {
  const id = String(item.id)
  let rawTags: string[] = []

  if (Array.isArray(item.tags)) {
    rawTags = item.tags
  }
  else if (typeof item.tags === 'string') {
    try {
      rawTags = JSON.parse(item.tags || '[]') as string[]
    }
    catch {
      rawTags = []
    }
  }

  return {
    id,
    title: item.title,
    slug: id,
    content: item.content || '',
    excerpt: item.description || item.content?.slice(0, 160) || '',
    coverImage: item.cover || null,
    published: true,
    viewCount: 0,
    authorId: 'legacy-api',
    createdAt: item.created_at || '',
    updatedAt: item.updated_at || item.created_at || '',
    tags: rawTags.map(tag => ({
      id: tag,
      name: tag,
      slug: tag,
    })),
  }
}

/**
 * 读取本地 Markdown 文章列表，作为线上 API 不可用时的兜底数据源。
 */
export async function fetchContentPosts(): Promise<Array<ContentPost & { path: string }>> {
  if (import.meta.client) {
    return await $fetch<Array<ContentPost & { path: string }>>('/api/content-posts')
  }

  const posts = await queryCollection('content')
    .order('date', 'DESC')
    .all()

  return (posts || [])
    .filter(item => Boolean(item?.path))
    .map(item => item as ContentPost & { path: string })
}

/**
 * 获取文章列表，优先走后端 API，失败或为空时回退到 content/ 目录。
 */
export async function fetchPostsWithFallback(params?: {
  page?: number
  pageSize?: number
  published?: boolean
}): Promise<PostsResponse> {
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const query = new URLSearchParams()

  query.set('page', String(page))
  query.set('pageSize', String(pageSize))
  if (params?.published !== undefined) {
    query.set('published', String(params.published))
  }

  const apiResponse = await fetchBlogApi<PostsResponse>(`/posts?${query.toString()}`)
  if (apiResponse?.data?.length) {
    return apiResponse
  }

  const legacyResponse = await fetchBlogApi<LegacyArticlesResponse>('/articles')
  if (legacyResponse?.data?.length) {
    const legacyPosts = legacyResponse.data.map(mapLegacyArticle)
    const total = legacyPosts.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize

    return {
      data: legacyPosts.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages,
    }
  }

  const contentPosts = (await fetchContentPosts()).map(mapContentPost)
  const total = contentPosts.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize

  return {
    data: contentPosts.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  }
}

/**
 * 获取单篇文章，优先走 API，失败时回退到本地 Markdown。
 */
export async function fetchPostWithFallback(slug: string): Promise<{
  apiPost: Post | null
  contentPost: (ContentPost & { path: string }) | null
}> {
  const apiPost = await fetchBlogApi<Post>(`/posts/${slug}`)
  if (apiPost) {
    return { apiPost, contentPost: null }
  }

  if (import.meta.client) {
    const contentPost = await $fetch<(ContentPost & { path: string }) | null>(`/api/content-posts/${slug}`)
      .catch(() => null)

    return {
      apiPost: null,
      contentPost,
    }
  }

  const contentPost = await queryCollection('content')
    .path(`/blog/${slug}`)
    .first()

  return {
    apiPost: null,
    contentPost: (contentPost as (ContentPost & { path: string }) | null) || null,
  }
}

/**
 * 供搜索或导航等场景读取全部文章。
 */
export async function fetchAllPostsForUi(): Promise<Post[]> {
  const apiResponse = await fetchBlogApi<PostsResponse>('/posts?page=1&pageSize=100&published=true')
  if (apiResponse?.data?.length) {
    return apiResponse.data
  }

  return (await fetchContentPosts()).map(mapContentPost)
}

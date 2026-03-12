import type { Ref } from 'vue'

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  published: boolean
  viewCount: number
  authorId: string
  createdAt: string
  updatedAt: string
  author?: { id: string; name: string | null; email: string }
  tags?: { id: string; name: string; slug: string }[]
  comments?: Comment[]
  _count?: { comments: number }
}

export interface PostsResponse {
  data: Post[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface Comment {
  id: string
  content: string
  author: string
  email: string
  website: string | null
  status: string
  postId: string
  parentId: string | null
  createdAt: string
  replies?: Comment[]
}

export interface Tag {
  id: string
  name: string
  slug: string
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

function getApiBase(): string {
  if (import.meta.client || import.meta.server) {
    return useRuntimeConfig().public.apiBaseUrl || 'http://localhost:3001'
  }
  return 'http://localhost:3001'
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const apiBase = getApiBase()
  const response = await fetch(`${apiBase}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '请求失败' }))
    throw new ApiError(error.error || '请求失败', response.status)
  }

  return response.json()
}

export const usePosts = () => {
  const posts: Ref<Post[]> = ref([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  const fetchPosts = async (params?: { page?: number; pageSize?: number; published?: boolean }) => {
    pending.value = true
    error.value = null
    try {
      const query = new URLSearchParams()
      if (params?.page) query.set('page', String(params.page))
      if (params?.pageSize) query.set('pageSize', String(params.pageSize))
      if (params?.published !== undefined) query.set('published', String(params.published))
      const res = await fetchApi<PostsResponse>(`/posts?${query}`)
      posts.value = res.data
      return res
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载失败'
      return null
    } finally {
      pending.value = false
    }
  }

  return { posts, pending, error, fetchPosts }
}

export const usePost = (slug: string) => {
  const post: Ref<Post | null> = ref(null)
  const pending = ref(false)
  const error = ref<string | null>(null)

  const fetchPost = async () => {
    pending.value = true
    error.value = null
    try {
      post.value = await fetchApi<Post>(`/posts/${slug}`)
      return post.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载失败'
      return null
    } finally {
      pending.value = false
    }
  }

  return { post, pending, error, fetchPost }
}

export const usePopularPosts = () => {
  const posts: Ref<Post[]> = ref([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  const fetchPopular = async (limit = 5) => {
    pending.value = true
    error.value = null
    try {
      posts.value = await fetchApi<Post[]>(`/stats/popular?limit=${limit}`)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载失败'
    } finally {
      pending.value = false
    }
  }

  return { posts, pending, error, fetchPopular }
}

export const useComments = (postId: string) => {
  const comments: Ref<Comment[]> = ref([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  const fetchComments = async () => {
    pending.value = true
    error.value = null
    try {
      comments.value = await fetchApi<Comment[]>(`/comments/post/${postId}`)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载失败'
    } finally {
      pending.value = false
    }
  }

  const submitComment = async (data: {
    content: string
    author: string
    email: string
    website?: string
    parentId?: string
  }) => {
    try {
      const newComment = await fetchApi<Comment>('/comments', {
        method: 'POST',
        body: JSON.stringify({ ...data, postId }),
      })
      return newComment
    } catch (e) {
      throw e instanceof Error ? e : new Error('提交失败')
    }
  }

  return { comments, pending, error, fetchComments, submitComment }
}

export const useRecordView = () => {
  const recordView = async (postId: string) => {
    try {
      await fetchApi(`/stats/view/${postId}`, { method: 'POST' })
    } catch {}
  }

  return { recordView }
}
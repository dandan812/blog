/**
 * usePosts - 文章数据获取 Composable
 * 
 * 这是 Vue 3 Composition API 的自定义组合函数
 * 封装了文章相关的数据获取逻辑，可在多个组件中复用
 * 
 * 主要功能：
 * - 获取文章列表
 * - 获取单篇文章
 * - 获取热门文章
 * - 获取和提交评论
 * - 记录浏览量
 */

import type { Ref } from 'vue'

/**
 * 文章数据类型（前端使用）
 * 与 ApiPost 类似，但适配前端使用场景
 */
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

/**
 * 文章列表响应类型
 */
export interface PostsResponse {
  data: Post[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 评论数据类型
 */
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
  replies?: Comment[]  // 支持嵌套回复
}

/**
 * 标签数据类型
 */
export interface Tag {
  id: string
  name: string
  slug: string
}

/**
 * 自定义 API 错误类
 * 包含 HTTP 状态码
 */
class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

/**
 * 获取 API 基础 URL
 * 根据运行环境（客户端/服务端）返回正确的地址
 * 
 * @returns API 基础 URL
 */
function getApiBase(): string {
  // import.meta.client 或 import.meta.server 判断运行环境
  if (import.meta.client || import.meta.server) {
    // 从 Nuxt 运行时配置读取
    return useRuntimeConfig().public.apiBaseUrl || 'http://localhost:3001'
  }
  return 'http://localhost:3001'
}

/**
 * 通用 API 请求函数
 * 封装了 fetch，统一处理请求和错误
 * 
 * @template T 响应数据类型
 * @param path API 路径（不带 /api 前缀）
 * @param options fetch 选项
 * @returns Promise<T> 解析后的 JSON 数据
 * @throws ApiError 请求失败时抛出
 */
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const apiBase = getApiBase()
  
  // 发起请求
  const response = await fetch(`${apiBase}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  // 检查响应状态
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '请求失败' }))
    throw new ApiError(error.error || '请求失败', response.status)
  }

  return response.json()
}

/**
 * 获取文章列表
 * 
 * 返回一个包含响应式数据的对象，可在组件中使用
 * 
 * @example
 * const { posts, pending, error, fetchPosts } = usePosts()
 * 
 * // 在组件中调用
 * onMounted(() => {
 *   fetchPosts({ page: 1, pageSize: 10 })
 * })
 */
export const usePosts = () => {
  // 使用 ref 创建响应式数据
  const posts: Ref<Post[]> = ref([])           // 文章列表
  const pending = ref(false)                   // 加载状态
  const error = ref<string | null>(null)       // 错误信息

  /**
   * 获取文章列表
   * @param params 查询参数（分页、发布状态等）
   */
  const fetchPosts = async (params?: { page?: number; pageSize?: number; published?: boolean }) => {
    pending.value = true   // 开始加载
    error.value = null     // 重置错误
    
    try {
      // 构建查询字符串
      const query = new URLSearchParams()
      if (params?.page) query.set('page', String(params.page))
      if (params?.pageSize) query.set('pageSize', String(params.pageSize))
      if (params?.published !== undefined) query.set('published', String(params.published))
      
      // 调用 API
      const res = await fetchApi<PostsResponse>(`/posts?${query}`)
      posts.value = res.data
      return res
    } catch (e) {
      // 错误处理
      error.value = e instanceof Error ? e.message : '加载失败'
      return null
    } finally {
      pending.value = false  // 加载结束
    }
  }

  return { posts, pending, error, fetchPosts }
}

/**
 * 获取单篇文章
 * 
 * @param slug 文章 slug（URL 标识）
 * @example
 * const { post, pending, error, fetchPost } = usePost('hello-world')
 */
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

/**
 * 获取热门文章
 * 
 * @example
 * const { posts, fetchPopular } = usePopularPosts()
 * fetchPopular(5)  // 获取前 5 篇热门文章
 */
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

/**
 * 评论相关操作
 * 
 * @param postId 文章 ID
 * @example
 * const { comments, fetchComments, submitComment } = useComments('post-id')
 */
export const useComments = (postId: string) => {
  const comments: Ref<Comment[]> = ref([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  /**
   * 获取评论列表
   */
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

  /**
   * 提交评论
   * @param data 评论数据
   */
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

/**
 * 记录文章浏览量
 * 
 * @example
 * const { recordView } = useRecordView()
 * recordView('post-id')  // 异步记录，无需等待
 */
export const useRecordView = () => {
  const recordView = async (postId: string) => {
    try {
      await fetchApi(`/stats/view/${postId}`, { method: 'POST' })
    } catch {
      // 静默失败，不影响用户体验
    }
  }

  return { recordView }
}

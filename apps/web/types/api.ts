export interface ApiPost {
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
  author: {
    id: string
    name: string | null
    email: string
  }
  tags: ApiTag[]
  _count?: {
    comments: number
  }
}

export interface ApiTag {
  id: string
  name: string
  slug: string
}

export interface ApiComment {
  id: string
  content: string
  author: string
  email: string
  website: string | null
  status: string
  postId: string
  parentId: string | null
  createdAt: string
  updatedAt: string
  replies?: ApiComment[]
}

export interface ApiUser {
  id: string
  email: string
  name: string | null
  role: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  error: string
  details?: unknown
}

export interface CreatePostInput {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  tagIds?: string[]
}

export interface UpdatePostInput {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  tagIds?: string[]
}

export interface CreateCommentInput {
  content: string
  author: string
  email: string
  website?: string
  postId: string
  parentId?: string
}

export interface PostsQueryParams {
  page?: number
  pageSize?: number
  published?: boolean
}

export interface DashboardStats {
  totalPosts: number
  totalComments: number
  totalViews: number
  recentPosts: ApiPost[]
  popularPosts: ApiPost[]
}
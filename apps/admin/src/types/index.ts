export interface User {
  id: string
  email: string
  name: string
  role: string
}

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
  tags: Tag[]
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Comment {
  id: string
  content: string
  author: string
  email: string
  website: string | null
  status: 'pending' | 'approved' | 'rejected'
  postId: string
  post?: { id: string; title: string }
  createdAt: string
}

export interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalComments: number
  pendingComments: number
  totalViews: number
  recentPosts: PopularPost[]
  viewsTrend: ViewsTrendItem[]
}

export interface PopularPost {
  id: string
  title: string
  slug: string
  viewCount: number
}

export interface ViewsTrendItem {
  date: string
  _count: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  totalPages?: number
}

export interface ApiError {
  error: string
  statusCode?: number
}
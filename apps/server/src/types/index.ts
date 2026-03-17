export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages?: number
}

export interface JwtPayload {
  userId: string
  email: string
  role: string
}

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: string
}

export interface PostQuery {
  page?: number
  pageSize?: number
  published?: boolean
}

export interface CommentQuery {
  page?: number
  pageSize?: number
  status?: 'pending' | 'approved' | 'rejected'
}

export type CommentStatus = 'pending' | 'approved' | 'rejected'
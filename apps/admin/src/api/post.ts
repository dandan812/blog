import api from './index'
import type { Post, PaginatedResponse } from '@/types'

export interface CreatePostParams {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  tagIds?: string[]
}

export interface PostListParams {
  page?: number
  pageSize?: number
  published?: boolean
}

export const postApi = {
  getList: (params?: PostListParams) =>
    api.get<any, PaginatedResponse<Post>>('/posts', { params }),

  getBySlug: (slug: string) =>
    api.get<any, Post>(`/posts/${slug}`),

  create: (data: CreatePostParams) =>
    api.post<any, Post>('/posts', data),

  update: (id: string, data: Partial<CreatePostParams>) =>
    api.put<any, Post>(`/posts/${id}`, data),

  delete: (id: string) =>
    api.delete(`/posts/${id}`),
}
import api from './index'

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
  tags: { id: string; name: string; slug: string }[]
}

export interface CreatePostParams {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  tagIds?: string[]
}

export const postApi = {
  getList: (params?: { page?: number; pageSize?: number; published?: boolean }) =>
    api.get<any, { data: Post[]; total: number; totalPages: number }>('/posts', { params }),
  getBySlug: (slug: string) => api.get<any, Post>(`/posts/${slug}`),
  create: (data: CreatePostParams) => api.post<any, Post>('/posts', data),
  update: (id: string, data: Partial<CreatePostParams>) => api.put<any, Post>(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
}

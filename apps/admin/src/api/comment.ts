import api from './index'

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

export const commentApi = {
  getList: (params?: { page?: number; pageSize?: number; status?: string }) =>
    api.get<any, { data: Comment[]; total: number }>('/comments', { params }),
  updateStatus: (id: string, status: string) =>
    api.patch<any, Comment>(`/comments/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/comments/${id}`),
}

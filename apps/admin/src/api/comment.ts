import api from './index'
import type { Comment, PaginatedResponse } from '@/types'

export interface CommentListParams {
  page?: number
  pageSize?: number
  status?: 'pending' | 'approved' | 'rejected'
}

export const commentApi = {
  getList: (params?: CommentListParams) =>
    api.get<any, PaginatedResponse<Comment>>('/comments', { params }),

  updateStatus: (id: string, status: Comment['status']) =>
    api.patch<any, Comment>(`/comments/${id}/status`, { status }),

  delete: (id: string) =>
    api.delete(`/comments/${id}`),
}
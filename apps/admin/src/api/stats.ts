import api from './index'
import type { DashboardStats, PopularPost } from '@/types'

export const statsApi = {
  getDashboard: () =>
    api.get<any, DashboardStats>('/stats/dashboard'),

  getPopular: (limit?: number) =>
    api.get<any, PopularPost[]>('/stats/popular', { params: { limit } }),
}
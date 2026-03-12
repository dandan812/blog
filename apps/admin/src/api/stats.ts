import api from './index'

export const statsApi = {
  getDashboard: () =>
    api.get<
      any,
      {
        totalPosts: number
        publishedPosts: number
        draftPosts: number
        totalComments: number
        pendingComments: number
        totalViews: number
        recentPosts: any[]
        viewsTrend: any[]
      }
    >('/stats/dashboard'),
  getPopular: (limit?: number) => api.get<any, any[]>('/stats/popular', { params: { limit } }),
}

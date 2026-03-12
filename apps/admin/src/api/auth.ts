import api from './index'

export interface LoginParams {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export const authApi = {
  login: (data: LoginParams) => api.post<any, { user: User; token: string }>('/auth/login', data),
  register: (data: LoginParams & { name?: string }) => api.post('/auth/register', data),
  getCurrentUser: () => api.get<any, User>('/auth/me'),
}

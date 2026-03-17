import api from './index'
import type { User } from '@/types'

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams extends LoginParams {
  name?: string
}

export interface LoginResponse {
  user: User
  token: string
}

export const authApi = {
  login: (data: LoginParams) => api.post<any, LoginResponse>('/auth/login', data),

  register: (data: RegisterParams) => api.post<any, User>('/auth/register', data),

  getCurrentUser: () => api.get<any, User>('/auth/me'),
}
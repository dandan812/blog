import { Response } from 'express'
import type { ApiResponse } from '../types/index.js'

export function success<T>(res: Response, data: T, status = 200): void {
  res.status(status).json({ success: true, data } as ApiResponse<T>)
}

export function error(res: Response, message: string, status = 400, details?: unknown): void {
  res.status(status).json({ success: false, error: message, details } as ApiResponse)
}

export function notFound(res: Response, message = '资源不存在'): void {
  error(res, message, 404)
}

export function unauthorized(res: Response, message = '未授权访问'): void {
  error(res, message, 401)
}

export function forbidden(res: Response, message = '权限不足'): void {
  error(res, message, 403)
}

export function serverError(res: Response, message = '服务器错误'): void {
  error(res, message, 500)
}
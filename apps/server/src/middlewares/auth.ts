import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.js'
import { unauthorized, forbidden } from '../utils/response.js'
import type { JwtPayload } from '../types/index.js'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return unauthorized(res, '未授权访问')
  }

  const token = authHeader.substring(7)
  const payload = verifyToken(token)

  if (!payload) {
    return unauthorized(res, 'Token 无效或已过期')
  }

  req.user = payload
  next()
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== 'admin') {
    return forbidden(res, '需要管理员权限')
  }
  next()
}
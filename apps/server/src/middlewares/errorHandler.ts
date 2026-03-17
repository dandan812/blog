import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { error, serverError } from '../utils/response.js'
import { logger } from '../utils/logger.js'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    return error(res, '输入数据格式错误', 400, err.errors)
  }

  logger.error('Unhandled error:', err)
  serverError(res, '服务器内部错误')
}
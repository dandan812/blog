import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config, validateConfig } from './utils/config.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { logger } from './utils/logger.js'

validateConfig()

const app: Express = express()

app.use(helmet())
app.use(
  cors({
    origin: [...config.cors.origins],
    credentials: true,
  })
)
app.use(express.json())
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: { success: false, error: '请求过于频繁，请稍后再试' },
  })
)

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
  })
})

app.use('/api/auth', (await import('./routes/auth.js')).default)
app.use('/api/posts', (await import('./routes/posts.js')).default)
app.use('/api/comments', (await import('./routes/comments.js')).default)
app.use('/api/stats', (await import('./routes/stats.js')).default)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' })
})

app.use(errorHandler)

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} (${config.nodeEnv})`)
})

export default app
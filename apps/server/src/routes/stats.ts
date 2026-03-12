import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { recordView, getPopularPosts, getDashboardStats } from '../controllers/statsController.js'
import { authMiddleware, requireAdmin } from '../middlewares/auth.js'

const router: RouterType = Router()

router.post('/view/:postId', recordView)
router.get('/popular', getPopularPosts)
router.get('/dashboard', authMiddleware, requireAdmin, getDashboardStats)

export default router

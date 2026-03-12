import { Router } from 'express'
import type { Router as RouterType } from 'express'
import {
  getCommentsByPost,
  createComment,
  getComments,
  updateCommentStatus,
  deleteComment,
} from '../controllers/commentController.js'
import { authMiddleware, requireAdmin } from '../middlewares/auth.js'

const router: RouterType = Router()

router.get('/post/:postId', getCommentsByPost)
router.post('/', createComment)
router.get('/', authMiddleware, requireAdmin, getComments)
router.patch('/:id/status', authMiddleware, requireAdmin, updateCommentStatus)
router.delete('/:id', authMiddleware, requireAdmin, deleteComment)

export default router

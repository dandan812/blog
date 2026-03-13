/**
 * API 类型定义
 *
 * 这个文件定义了与后端 API 交互的所有数据类型
 * 确保前后端数据类型的一致性
 */

/**
 * 文章数据类型
 * 对应后端数据库的 Post 模型
 */
export interface ApiPost {
  id: string // 唯一标识符
  title: string // 文章标题
  slug: string // URL 友好的标识（用于生成链接）
  content: string // 文章内容（Markdown/HTML）
  excerpt: string | null // 文章摘要
  coverImage: string | null // 封面图片 URL
  published: boolean // 是否已发布
  viewCount: number // 浏览次数
  authorId: string // 作者 ID
  createdAt: string // 创建时间（ISO 格式）
  updatedAt: string // 更新时间
  author: { // 作者信息
    id: string
    name: string | null
    email: string
  }
  tags: ApiTag[] // 文章标签列表
  _count?: { // 关联计数（可选）
    comments: number // 评论数量
  }
}

/**
 * 标签数据类型
 * 用于文章分类和检索
 */
export interface ApiTag {
  id: string
  name: string // 标签显示名称
  slug: string // URL 友好的标识
}

/**
 * 评论数据类型
 * 支持嵌套回复（树形结构）
 */
export interface ApiComment {
  id: string
  content: string // 评论内容
  author: string // 评论者名称
  email: string // 评论者邮箱
  website: string | null // 评论者网站（可选）
  status: string // 评论状态（pending/approved/rejected）
  postId: string // 所属文章 ID
  parentId: string | null // 父评论 ID（用于回复）
  createdAt: string
  updatedAt: string
  replies?: ApiComment[] // 子评论（回复）列表
}

/**
 * 用户数据类型
 */
export interface ApiUser {
  id: string
  email: string
  name: string | null
  role: string // 角色（admin/user）
}

/**
 * 分页响应类型
 * 泛型 T 表示数据项类型
 */
export interface PaginatedResponse<T> {
  data: T[] // 数据列表
  total: number // 总数
  page: number // 当前页码
  pageSize: number // 每页数量
  totalPages: number // 总页数
}

/**
 * API 错误响应类型
 */
export interface ApiError {
  error: string // 错误信息
  details?: unknown // 详细错误（可选）
}

/**
 * 创建文章输入类型
 */
export interface CreatePostInput {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  tagIds?: string[] // 关联的标签 ID 列表
}

/**
 * 更新文章输入类型
 * 所有字段都是可选的，支持部分更新
 */
export interface UpdatePostInput {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  tagIds?: string[]
}

/**
 * 创建评论输入类型
 */
export interface CreateCommentInput {
  content: string
  author: string
  email: string
  website?: string
  postId: string // 所属文章
  parentId?: string // 父评论 ID（回复时使用）
}

/**
 * 文章查询参数
 * 用于列表页筛选
 */
export interface PostsQueryParams {
  page?: number
  pageSize?: number
  published?: boolean // 是否只查询已发布文章
}

/**
 * 仪表盘统计数据
 * 管理后台使用
 */
export interface DashboardStats {
  totalPosts: number // 总文章数
  totalComments: number // 总评论数
  totalViews: number // 总浏览量
  recentPosts: ApiPost[] // 最新文章
  popularPosts: ApiPost[] // 热门文章
}

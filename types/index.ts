type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>

export interface ArticleMeta {
  date?: string
  readingTime?: number
  cover?: string
  tags?: string[]
  category?: string | string[]
  [key: string]: unknown
}

export interface Article {
  _path?: string
  path?: string
  title: string
  description: string
  date: string
  cover?: string
  tags?: string[]
  readingTime?: number
  meta?: ArticleMeta
}

export interface ArticleCardProps {
  article: Article
}

export interface ArticleQueryOptions {
  limit?: number
  offset?: number
  sort?: string
  order?: 'asc' | 'desc'
  where?: Record<string, unknown>
}

export interface FilterState {
  category: string
  searchQuery: string
  currentPage: number
}

export interface PaginationState {
  itemsPerPage: number
  totalItems: number
  currentPage: number
}

export interface ShareOptions {
  title: string
  text: string
  url: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface NavigationItem {
  label: string
  path: string
  icon?: string
  children?: NavigationItem[]
}

export interface SEOConfig {
  title: string
  description?: string
  ogImage?: string
  noindex?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  socialLinks: SocialLink[]
}

export interface UserConfig {
  name: string
  avatar?: string
  bio?: string
  socialLinks: SocialLink[]
}

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ')
}

export function formatDate(date: string | number | Date, locale = 'zh-CN'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRelativeTime(date: string | number | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diff = now.getTime() - target.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return '今天'
  }
  else if (days === 1) {
    return '昨天'
  }
  else if (days < 7) {
    return `${days}天前`
  }
  else if (days < 30) {
    const weeks = Math.floor(days / 7)
    return `${weeks}周前`
  }
  else if (days < 365) {
    const months = Math.floor(days / 30)
    return `${months}个月前`
  }
  else {
    const years = Math.floor(days / 365)
    return `${years}年前`
  }
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateExcerpt(content: string, maxLength = 160): string {
  const plainText = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  return truncateText(plainText, maxLength)
}

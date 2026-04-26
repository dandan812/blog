import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const contentDir = join(process.cwd(), 'content', 'blog')
const blogRoutes = existsSync(contentDir)
  ? readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => `/blog/${file.replace(/\.md$/i, '')}`)
  : []
const contentPostApiRoutes = [
  '/api/content-posts',
  ...blogRoutes.map(route => route.replace('/blog/', '/api/content-post/')),
]

/**
 * Nuxt 4 配置文件
 */
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
  ],

  devtools: { enabled: false },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  content: {
    watch: { enabled: false },
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'json', 'bash', 'markdown', 'yaml'],
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001',
      giscus: {
        repo: process.env.NUXT_PUBLIC_GISCUS_REPO || '',
        repoId: process.env.NUXT_PUBLIC_GISCUS_REPO_ID || '',
        category: process.env.NUXT_PUBLIC_GISCUS_CATEGORY || '',
        categoryId: process.env.NUXT_PUBLIC_GISCUS_CATEGORY_ID || '',
        mapping: process.env.NUXT_PUBLIC_GISCUS_MAPPING || 'pathname',
        lang: process.env.NUXT_PUBLIC_GISCUS_LANG || 'zh-CN',
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/about': { prerender: true },
    '/_nuxt/**': { cache: { maxAge: 60 * 60 * 24 * 365 } },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },

  compatibilityDate: '2025-02-10',

  nitro: {
    compressPublicAssets: true,
    prerender: {
      // 静态部署时也需要保留客户端兜底读取 Markdown 的 API。
      routes: ['/', '/about', '/blog', ...blogRoutes, ...contentPostApiRoutes],
      crawlLinks: true,
    },
  },

  vite: {
    build: {
      target: 'esnext',
    },
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
})

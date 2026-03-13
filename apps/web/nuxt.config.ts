/**
 * Nuxt 4 配置文件
 * 
 * 这是整个 Nuxt 应用的核心配置文件，定义了：
 * - 加载的模块
 * - 应用元数据（SEO、页面过渡等）
 * - 开发工具配置
 * - 构建优化设置
 */
export default defineNuxtConfig({
  /**
   * 加载的 Nuxt 模块
   * 这些模块为应用提供额外功能
   */
  modules: [
    '@nuxt/content',    // 内容管理，支持 Markdown
    '@nuxt/image',      // 图片优化和响应式图片
    '@nuxt/eslint',     // ESLint 代码检查
    '@nuxt/icon',       // 图标系统（Lucide 图标）
    '@nuxtjs/color-mode', // 深色/浅色模式切换
  ],

  // 关闭 Nuxt DevTools（开发工具）
  devtools: { enabled: false },

  /**
   * 运行时配置
   * public 中的配置可以在客户端和服务器端访问
   */
  runtimeConfig: {
    public: {
      // API 基础 URL，从环境变量读取，默认为本地开发地址
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001',
    },
  },

  /**
   * 应用级配置
   */
  app: {
    // 页面过渡动画配置
    pageTransition: { 
      name: 'page',      // 过渡名称
      mode: 'out-in'     // 先出后进模式
    },
    
    // HTML head 配置（SEO、Meta 标签等）
    head: {
      htmlAttrs: { lang: 'zh-CN' },  // 设置 HTML 语言
      charset: 'utf-8',              // 字符编码
      viewport: 'width=device-width, initial-scale=1',  // 响应式视口
      // 网站图标
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // 全局 CSS 样式文件
  css: ['~/assets/css/main.css'],

  /**
   * 颜色模式配置（深色/浅色主题）
   */
  colorMode: {
    classSuffix: '',          // 不加后缀（如 .dark）
    preference: 'system',     // 优先跟随系统设置
    fallback: 'light',        // 默认浅色模式
  },

  /**
   * Nuxt Content 模块配置
   * 用于管理 Markdown 内容
   */
  content: {
    watch: { enabled: false },  // 禁用文件监听（提高性能）
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',  // 代码高亮主题
          langs: [               // 支持的语言
            'javascript',
            'typescript',
            'vue',
            'html',
            'css',
            'json',
            'bash',
            'markdown',
            'yaml',
          ],
        },
      },
    },
  },

  /**
   * 路由规则配置
   * 预渲染（SSG）指定路由，提高首屏加载速度
   */
  routeRules: {
    '/': { prerender: true },      // 首页预渲染
    '/blog/**': { prerender: true }, // 博客文章页预渲染
    '/about': { prerender: true },   // 关于页预渲染
  },

  /**
   * 未来兼容性设置
   */
  future: {
    compatibilityVersion: 4,  // Nuxt 4 兼容性版本
  },

  /**
   * 实验性功能
   */
  experimental: {
    payloadExtraction: false,      // 禁用 payload 提取
    renderJsonPayloads: true,      // 启用 JSON payload 渲染
  },

  // 兼容性日期
  compatibilityDate: '2025-02-10',

  /**
   * Nitro 引擎配置（Nuxt 的服务器引擎）
   */
  nitro: {
    compressPublicAssets: true,    // 压缩静态资源
    prerender: {
      routes: ['/'],               // 预渲染首页
      crawlLinks: true,            // 自动爬取链接
    },
  },

  /**
   * Vite 构建配置
   */
  vite: {
    build: {
      target: 'esnext',  // 目标 ES 版本
    },
  },

  /**
   * PostCSS 配置
   * 用于 Tailwind CSS 处理
   */
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  /**
   * Nuxt Image 模块配置
   * 图片优化设置
   */
  image: {
    quality: 80,              // 默认图片质量
    format: ['webp', 'avif'], // 优先格式
    screens: {                // 响应式断点
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
})

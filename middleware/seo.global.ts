// middleware/seo.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // 为不同路由设置不同的页面标题后缀
  const defaultTitle = 'My Blog'

  let title = defaultTitle
  let description = '探索前端开发的边界，记录技术成长的轨迹'

  if (to.fullPath.startsWith('/blog/')) {
    // 对于博客文章页面，我们将在页面内部设置标题
    title = defaultTitle
    description = '阅读关于前端开发、Vue 生态和软件工程的技术文章'
  } else if (to.name === 'blog' || to.fullPath === '/blog') {
    title = '博客文章 - My Blog'
    description = '探索关于前端开发、Vue 生态和软件工程的技术文章'
  } else if (to.fullPath === '/about') {
    title = '关于 - My Blog'
    description = '了解更多关于这个博客和技术作者的信息'
  } else if (to.fullPath === '/') {
    title = '主页 - My Blog'
    description =
      '个人技术博客，用 Nuxt 4 + Nuxt Content 3 搭建的。支持 Markdown 写作、SSR/SSG 和自动化部署。'
  }

  // 更新默认标题和描述
  if (!useSeoMeta) return

  useSeoMeta({
    title,
    description,
    ogSiteName: 'My Blog',
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
  })

  // 为 Google Analytics 追踪页面浏览
  if (process.client) {
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: to.fullPath,
        page_title: title,
      })
    }
  }
})

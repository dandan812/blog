// middleware/performance.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // 添加页面切换前的性能度量
  if (process.client) {
    // 开始页面加载计时
    ;(window as any).__PAGE_LOAD_START__ = performance.now()

    // 设置页面标识
    document.documentElement.setAttribute('data-page', to.path.replace(/\//g, '-'))
  }
})

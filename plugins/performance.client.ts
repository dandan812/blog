// plugins/performance.client.ts
export default defineNuxtPlugin({
  name: 'performance-client',
  setup() {
    if (import.meta.client) {
      // 页面加载完成后的性能测量
      onNuxtReady(() => {
        setTimeout(() => {
          // 记录页面加载完成时间
          if ((window as any).__PAGE_LOAD_START__) {
            const loadTime = performance.now() - (window as any).__PAGE_LOAD_START__
            console.log(`Page loaded in ${Math.round(loadTime)}ms`)

            // 可选：发送性能数据到分析工具（如果有的话）
            // useTrackPerformance('page_load_time', loadTime)
          }

          // 清除标记
          delete (window as any).__PAGE_LOAD_START__
        }, 100)
      })

      // 注册滚动优化，实现真正的懒加载
      const lazyLoadImages = () => {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement
                if (img.dataset.src) {
                  img.src = img.dataset.src!
                  img.removeAttribute('data-src')
                  imageObserver.unobserve(img)
                }
              }
            })
          })

          // 观察所有带有data-src属性的图片
          document.querySelectorAll('img[data-src]').forEach((img) => {
            imageObserver.observe(img)
          })
        }
      }

      // 页面完全加载后执行懒加载初始化
      onNuxtReady(() => {
        nextTick(() => {
          lazyLoadImages()
        })
      })
    }
  },
})

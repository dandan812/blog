export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    // 检测用户的配色方案偏好
    const preferredTheme = localStorage.getItem('nuxt-color-mode') || 'system'

    // 应用初始主题
    const applyTheme = () => {
      const isDark
        = preferredTheme === 'dark'
          || (preferredTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

      if (isDark) {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }
    }

    applyTheme()

    // 监听主题变化来同步
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
  }
})

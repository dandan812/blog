export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // 检测用户的配色方案偏好
    const preferredTheme = localStorage.getItem('nuxt-color-mode') || 'system'

    // 应用初始主题
    const applyTheme = () => {
      const isDark
        = preferredTheme === 'dark'
          || (preferredTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

      document.documentElement.classList.toggle('dark', isDark)
    }

    applyTheme()
  }
})

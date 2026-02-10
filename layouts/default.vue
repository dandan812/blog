<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col font-sans">
    <!-- 导航栏 -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900">
          My Blog
        </NuxtLink>

        <div class="flex items-center gap-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            active-class="text-primary font-medium"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- 搜索按钮 -->
          <button
            @click="isSearchOpen = true"
            class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="lucide:search" class="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>

    <!-- 主内容 -->
    <main class="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-gray-200 py-8 mt-auto">
      <div class="max-w-4xl mx-auto px-4 text-center text-gray-600">
        <p>© {{ new Date().getFullYear() }} My Blog. Built with Nuxt 4.</p>
      </div>
    </footer>

    <!-- 搜索模态框 -->
    <SearchModal v-model:open="isSearchOpen" />
  </div>
</template>

<script setup lang="ts">
const isSearchOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '关于', path: '/about' },
]

// 键盘快捷键 Ctrl+K 打开搜索
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isSearchOpen.value = true
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
</script>

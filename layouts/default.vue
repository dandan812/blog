<template>
  <div class="min-h-screen flex flex-col font-sans bg-[#fafafa] dark:bg-gray-900">
    <!-- 导航栏 -->
    <header
      class="sticky top-0 z-50 bg-[#fafafa]/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-black/5 dark:border-white/10"
    >
      <nav class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-lg font-bold text-black dark:text-white tracking-tight pl-0 md:-ml-2"
        >
          Blog<span class="text-amber-500">.</span>
        </NuxtLink>

        <div class="flex items-center gap-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-sm text-black/40 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors tracking-widest uppercase"
            active-class="text-black dark:text-white"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- 搜索按钮 -->
          <button
            class="p-2 text-black/30 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            @click="isSearchOpen = true"
          >
            <Icon name="lucide:search" class="w-4 h-4" />
          </button>

          <!-- 深色模式切换 -->
          <ClientOnly>
            <ColorModeToggle />
            <template #fallback>
              <div class="w-4 h-4" />
            </template>
          </ClientOnly>
        </div>
      </nav>
    </header>

    <!-- 主内容 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-black/5 dark:border-white/10 py-12 mt-auto">
      <div class="max-w-6xl mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-sm text-black/30 dark:text-white/60">
            © {{ new Date().getFullYear() }} Blog<span class="text-amber-500">.</span> All rights
            reserved.
          </div>
          <div class="flex items-center gap-6">
            <a
              href="https://github.com/dandan812"
              target="_blank"
              class="text-black/30 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              <Icon name="lucide:github" class="w-4 h-4" />
            </a>
            <a
              href="mailto:hu_liang2027@163.com"
              class="text-black/30 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              <Icon name="lucide:mail" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>

    <EnhancedSearchModal v-model:open="isSearchOpen" />
  </div>
</template>

<script setup lang="ts">
  const isSearchOpen = ref(false)

  const navItems = [
    { name: '首页', path: '/' },
    { name: '博客', path: '/blog' },
    { name: '关于', path: '/about' },
  ]

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

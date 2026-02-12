<template>
  <div class="min-h-screen flex flex-col font-sans bg-[#fafafa]">
    <!-- 导航栏 -->
    <header class="sticky top-0 z-50 bg-[#fafafa]/95 backdrop-blur-sm border-b border-black/5">
      <nav class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-lg font-bold text-black tracking-tight"
        >
          Blog<span class="text-amber-500">.</span>
        </NuxtLink>

        <div class="flex items-center gap-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-sm text-black/40 hover:text-black transition-colors tracking-widest uppercase"
            active-class="text-black"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- 搜索按钮 -->
          <button
            class="p-2 text-black/30 hover:text-black transition-colors"
            @click="isSearchOpen = true"
          >
            <Icon
              name="lucide:search"
              class="w-4 h-4"
            />
          </button>
        </div>
      </nav>
    </header>

    <!-- 主内容 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-black/5 py-12 mt-auto">
      <div class="max-w-6xl mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-sm text-black/30">
            © {{ new Date().getFullYear() }} Blog<span class="text-amber-500">.</span> All rights reserved.
          </div>
          <div class="flex items-center gap-6">
            <a
              href="https://github.com/dandan812"
              target="_blank"
              class="text-black/30 hover:text-black transition-colors"
            >
              <Icon
                name="lucide:github"
                class="w-4 h-4"
              />
            </a>
            <a
              href="mailto:hu_liang2027@163.com"
              class="text-black/30 hover:text-black transition-colors"
            >
              <Icon
                name="lucide:mail"
                class="w-4 h-4"
              />
            </a>
          </div>
        </div>
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

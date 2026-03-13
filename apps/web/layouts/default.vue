<template>
  <!-- 
    默认布局组件 (layouts/default.vue)
    
    所有页面都会使用这个布局，包含：
    - 顶部导航栏（sticky 定位）
    - 主内容区域（通过 <slot /> 渲染页面内容）
    - 底部页脚
    - 全局搜索模态框
  -->
  <div class="min-h-screen flex flex-col font-sans bg-[#fafafa] dark:bg-gray-900">
    <!-- 
      导航栏
      sticky: 滚动时固定在顶部
      backdrop-blur: 背景模糊效果
      dark: 深色模式下的样式
    -->
    <header
      class="sticky top-0 z-50 bg-[#fafafa]/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-black/5 dark:border-white/10"
    >
      <nav class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <!-- Logo/网站名称 -->
        <NuxtLink
          to="/"
          class="text-lg font-bold text-black dark:text-white tracking-tight pl-0 md:-ml-2"
        >
          Blog<span class="text-amber-500">.</span>
        </NuxtLink>

        <!-- 导航链接和工具 -->
        <div class="flex items-center gap-8">
          <!-- 导航菜单 -->
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-sm text-black/40 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors tracking-widest uppercase"
            active-class="text-black dark:text-white"  <!-- 当前页面高亮 -->
          >
            {{ item.name }}
          </NuxtLink>

          <!-- 搜索按钮 - 点击打开搜索模态框 -->
          <button
            class="p-2 text-black/30 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            @click="isSearchOpen = true"
          >
            <Icon
              name="lucide:search"
              class="w-4 h-4"
            />
          </button>

          <!-- 
            深色模式切换
            ClientOnly: 只在客户端渲染（避免服务端/客户端不匹配）
          -->
          <ClientOnly>
            <ColorModeToggle />
            <template #fallback>
              <!-- 服务端渲染时的占位符 -->
              <div class="w-4 h-4" />
            </template>
          </ClientOnly>
        </div>
      </nav>
    </header>

    <!-- 
      主内容区域
      flex-1: 占据剩余空间，确保页脚在底部
      <slot /> 是页面内容的插入点
    -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-black/5 dark:border-white/10 py-12 mt-auto">
      <div class="max-w-6xl mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- 版权信息 -->
          <div class="text-sm text-black/30 dark:text-white/60">
            © {{ new Date().getFullYear() }} Blog<span class="text-amber-500">.</span> All rights
            reserved.
          </div>
          
          <!-- 社交链接 -->
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

    <!-- 
      全局搜索模态框
      v-model:open 双向绑定控制显示/隐藏
    -->
    <EnhancedSearchModal v-model:open="isSearchOpen" />
  </div>
</template>

<script setup lang="ts">
/**
 * Default Layout - 默认布局组件
 * 
 * 这是所有页面的基础布局，提供：
 * 1. 统一的导航栏
 * 2. 页脚
 * 3. 全局搜索功能
 * 4. 深色模式支持
 */

// 搜索模态框显示状态
const isSearchOpen = ref(false)

// 导航菜单项配置
const navItems = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '关于', path: '/about' },
]

// 设置页面 head（预连接字体）
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
  ],
})

// 组件挂载后添加键盘快捷键
onMounted(() => {
  /**
   * 键盘快捷键：Cmd/Ctrl + K 打开搜索
   * @param e 键盘事件
   */
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()  // 阻止默认行为
      isSearchOpen.value = true
    }
  }
  
  // 监听键盘事件
  window.addEventListener('keydown', handleKeydown)
  
  // 组件卸载时清理事件监听
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
</script>

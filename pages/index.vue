<!-- https://nuxt.com/docs/getting-started/installation -->
<template>
  <div class="space-y-20">
    <!-- Hero 区域 - 增强版 -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 md:py-32">
      <!-- 动态背景效果 -->
      <div class="absolute inset-0">
        <!-- 网格背景 -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <!-- 渐变光晕 -->
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s;"
        />

        <!-- 浮动粒子效果 -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float" />
          <div
            class="absolute top-1/3 right-1/3 w-3 h-3 bg-white/10 rounded-full animate-float"
            style="animation-delay: 0.5s;"
          />
          <div
            class="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-float"
            style="animation-delay: 1s;"
          />
          <div
            class="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white/10 rounded-full animate-float"
            style="animation-delay: 1.5s;"
          />
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="relative container mx-auto px-4 text-center">
        <!-- 徽章 -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-8 animate-fade-in-up"
        >
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          基于 Nuxt 4 + Vue 3.6
        </div>

        <!-- 主标题 -->
        <h1
          class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up stagger-1"
        >
          <span class="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            探索技术与创意
          </span>
        </h1>

        <!-- 副标题 -->
        <p
          class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2"
        >
          分享关于前端开发、Vue 生态和工程化实践的见解与经验。
          <br class="hidden md:block">
          构建现代化、高性能的技术博客。
        </p>

        <!-- CTA 按钮组 -->
        <div
          class="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up stagger-3"
        >
          <NuxtLink
            to="/blog"
            class="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            <Icon
              name="lucide:book-open"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
            />
            浏览文章
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </NuxtLink>

          <a
            href="https://github.com/dandan812/blog"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            <Icon
              name="lucide:github"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
            />
            查看源码
            <Icon
              name="lucide:external-link"
              class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>

        <!-- 统计数据 -->
      </div>

      <!-- 底部装饰 -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>

    <!-- 特性展示 - 玻璃拟态设计 -->
    <section class="relative py-20">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-3xl" />
      <div class="absolute top-10 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
      <div class="absolute bottom-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

      <div class="relative container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            技术栈特性
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            探索现代 Web 开发的最佳实践
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature) in features"
            :key="feature.title"
            class="group relative p-8 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <!-- 悬停效果 -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

            <!-- 图标容器 -->
            <div class="relative w-16 h-16 mb-6">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform" />
              <div class="absolute inset-0 bg-white rounded-2xl flex items-center justify-center">
                <Icon
                  :name="feature.icon"
                  class="w-8 h-8 text-primary"
                />
              </div>
            </div>

            <h3 class="relative text-xl font-bold text-gray-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="relative text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- 箭头指示器 -->
            <div class="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon
                  name="lucide:arrow-right"
                  class="w-5 h-5 text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 py-16">
      <!-- 装饰背景 -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div class="relative container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          准备好开始了吗？
        </h2>
        <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          探索更多技术文章，了解最新的开发趋势和最佳实践
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Icon
              name="lucide:book-open"
              class="w-5 h-5"
            />
            开始阅读
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Feature } from '~/types'

useHead({
  title: 'My Blog - 探索技术与创意',
  meta: [
    { name: 'description', content: '使用 Nuxt 4 + Vue 3.6 构建的现代化技术博客' },
  ],
})

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const features: Feature[] = [
  {
    icon: 'lucide:zap',
    title: '极速性能',
    description: '基于 Nitro 引擎，支持 SSR/SSG/ISR 多种渲染模式',
  },
  {
    icon: 'lucide:file-text',
    title: '内容驱动',
    description: 'Nuxt Content 3 提供强大的 Markdown 内容管理能力',
  },
  {
    icon: 'lucide:search',
    title: '全文搜索',
    description: '内置内容搜索，支持模糊匹配和实时预览',
  },
]
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.stagger-1 {
  animation-delay: 0.1s;
}

.stagger-2 {
  animation-delay: 0.2s;
}

.stagger-3 {
  animation-delay: 0.3s;
}

.stagger-4 {
  animation-delay: 0.4s;
}

.stagger-5 {
  animation-delay: 0.5s;
}
</style>

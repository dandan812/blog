<!-- https://nuxt.com/docs/getting-started/installation -->
<template>
  <div class="space-y-16">
    <!-- Hero 区域 -->
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-white to-primary/10 py-20 md:py-32">
      <div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div class="relative container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          探索技术与创意
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          分享关于前端开发、Vue 生态和工程化实践的见解与经验。
          使用 Nuxt 4 + Vue 3.6 构建的现代化博客。
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Icon
              name="lucide:book-open"
              class="w-5 h-5"
            />
            浏览文章
          </NuxtLink>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <Icon
              name="lucide:github"
              class="w-5 h-5"
            />
            GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">
          最新文章
        </h2>
        <NuxtLink
          to="/blog"
          class="group inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium"
        >
          查看全部
          <Icon
            name="lucide:arrow-right"
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </NuxtLink>
      </div>

      <div
        v-if="latestArticles?.length"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ArticleCard
          v-for="article in latestArticles"
          :key="article.path"
          :article="{ ...article, date: article.meta?.date as string || '' }"
        />
      </div>

      <div
        v-else
        class="text-center py-12"
      >
        <Icon
          name="lucide:file-x"
          class="w-12 h-12 text-gray-300 mx-auto mb-4"
        />
        <p class="text-gray-500">
          暂无文章
        </p>
      </div>
    </section>

    <!-- 特性展示 -->
    <section class="py-12 border-t border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
        技术栈特性
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
        >
          <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon
              :name="feature.icon"
              class="w-6 h-6 text-primary"
            />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2 text-center">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 text-sm text-center">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Feature } from '~/types'

useHead({
  title: 'My Blog - 探索技术与创意',
  meta: [
    { name: 'description', content: '使用 Nuxt 4 + Vue 3.6 构建的现代化技术博客' },
  ],
})

const { data: latestArticles } = await useAsyncData('latest-posts', () =>
  queryCollection('content')
    .limit(6)
    .all(),
)

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

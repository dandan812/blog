<!-- components/ArticleCard.vue -->
<template>
  <NuxtLink
    :to="articlePath"
    class="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
  >
    <!-- 封面图容器 -->
    <div
      v-if="article.cover"
      class="relative aspect-[16/10] overflow-hidden"
    >
      <!-- 图片 -->
      <NuxtImg
        :src="article.cover"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
        placeholder
      />
      
      <!-- 渐变覆盖层 -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      <!-- 标签 -->
      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-gray-700"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- 悬浮时显示的阅读按钮 -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <Icon
            name="lucide:arrow-right"
            class="w-6 h-6 text-white"
          />
        </div>
      </div>
    </div>

    <!-- 无封面图时的占位符 -->
    <div
      v-else
      class="relative aspect-[16/10] bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center"
    >
      <div class="absolute inset-0 opacity-50">
        <div class="absolute top-4 left-4 w-12 h-12 bg-purple-200/50 rounded-lg blur-xl" />
        <div class="absolute bottom-4 right-4 w-16 h-16 bg-blue-200/50 rounded-lg blur-xl" />
      </div>
      <Icon
        name="lucide:file-text"
        class="w-16 h-16 text-purple-300/50"
      />
      
      <!-- 标签 -->
      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-gray-700"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-1 flex flex-col p-5">
      <!-- 元信息 -->
      <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <div class="flex items-center gap-1">
          <Icon name="lucide:calendar" class="w-3.5 h-3.5" />
          <time :datetime="article.date">
            {{ formattedDate }}
          </time>
        </div>
        <span v-if="article.readingTime" class="flex items-center gap-1">
          <Icon name="lucide:clock" class="w-3.5 h-3.5" />
          {{ article.readingTime }} 分钟
        </span>
      </div>

      <!-- 标题 -->
      <h3 class="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
        {{ article.title }}
      </h3>

      <!-- 描述 -->
      <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
        {{ article.description }}
      </p>

      <!-- 底部链接 -->
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <span class="text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
          阅读全文
        </span>
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <Icon
            name="lucide:arrow-right"
            class="w-4 h-4 text-primary"
          />
        </div>
      </div>
    </div>

    <!-- 边框光效 -->
    <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
      <div class="absolute inset-0 rounded-2xl border-2 border-primary/30" />
      <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-10 blur-sm" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '~/types'

defineOptions({
  name: 'ArticleCard',
})

const props = defineProps<{
  article: Article
}>()

const articlePath = computed(() => {
  return props.article._path || props.article.path || '#'
})

const formattedDate = computed(() => {
  if (!props.article.date) return ''
  return new Date(props.article.date).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
})

const displayTags = computed(() => {
  return props.article.tags?.slice(0, 2) || []
})
</script>

<style scoped>
.card {
  will-change: transform, box-shadow;
}
</style>

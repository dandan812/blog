<!-- components/ArticleCard.vue -->
<template>
  <NuxtLink
    :to="articlePath"
    class="card group hover:shadow-md transition-all duration-300 flex flex-col h-full"
  >
    <!-- 封面图 -->
    <div
      v-if="article.cover"
      class="relative aspect-video mb-4 overflow-hidden rounded-lg"
    >
      <NuxtImg
        :src="article.cover"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        placeholder
      />
      <div class="absolute top-2 left-2">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="inline-block px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-md mr-1"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 内容 -->
    <div class="flex-1 flex flex-col">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <time :datetime="article.date">
          {{ formattedDate }}
        </time>
        <span v-if="article.readingTime">· {{ article.readingTime }} 分钟阅读</span>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {{ article.title }}
      </h3>

      <p class="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
        {{ article.description }}
      </p>

      <div class="flex items-center text-primary text-sm font-medium mt-auto">
        阅读更多
        <Icon
          name="lucide:arrow-right"
          class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '~/types'

const props = defineProps<{
  article: Article
}>()

const articlePath = computed(() => {
  return props.article._path || props.article.path || '#'
})

const formattedDate = computed(() => {
  if (!props.article.date) return ''
  return new Date(props.article.date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const displayTags = computed(() => {
  return props.article.tags?.slice(0, 3) || []
})
</script>

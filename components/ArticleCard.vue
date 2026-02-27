<template>
  <NuxtLink
    :to="articlePath"
    class="group relative p-8 bg-[#fafafa] dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-500 block"
  >
    <!-- 标签 -->
    <div v-if="displayTags.length" class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in displayTags"
        :key="tag"
        class="px-2 py-1 text-xs text-black/40 dark:text-white/60 border border-black/10 dark:border-white/20"
      >
        {{ tag }}
      </span>
    </div>

    <!-- 日期和阅读时间 -->
    <div class="flex items-center gap-2 text-xs text-black/30 dark:text-white/50 mb-3">
      <time :datetime="article.date">
        {{ formattedDate }}
      </time>
      <span>·</span>
      <span v-if="article.readingTime">{{ article.readingTime }} 分钟</span>
    </div>

    <!-- 标题 -->
    <h3
      class="text-xl font-bold text-black dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3 line-clamp-2"
    >
      {{ article.title }}
    </h3>

    <!-- 描述 -->
    <p class="text-black/50 dark:text-white/70 text-sm leading-relaxed line-clamp-2 mb-6">
      {{ article.description }}
    </p>

    <!-- 阅读更多 -->
    <div
      class="flex items-center gap-2 text-xs text-black/30 dark:text-white/50 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors"
    >
      <span>阅读更多</span>
      <Icon
        name="lucide:arrow-right"
        class="w-3 h-3 group-hover:translate-x-1 transition-transform"
      />
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

<!-- pages/blog/[slug].vue -->
<template>
  <article
    v-if="post"
    class="max-w-3xl mx-auto"
  >
    <!-- 文章头部 -->
    <header class="mb-8 text-center">
      <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
        <NuxtLink
          to="/blog"
          class="hover:text-primary flex items-center gap-1"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-4 h-4"
          />
          返回列表
        </NuxtLink>
        <span>·</span>
        <time :datetime="post.meta?.date as string">{{ formatDate((post.meta?.date as string) || '') }}</time>
        <span v-if="post.meta?.readingTime">· {{ post.meta?.readingTime }} 分钟阅读</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {{ post.title }}
      </h1>

      <p class="text-xl text-gray-600 mb-6">
        {{ post.description }}
      </p>

      <div class="flex items-center justify-center gap-2">
        <span
          v-for="tag in post.meta?.tags"
          :key="tag"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 封面图 -->
      <div
        v-if="post.meta?.cover"
        class="mt-8 aspect-video rounded-2xl overflow-hidden"
      >
        <NuxtImg
          :src="post.meta?.cover as string"
          :alt="post.title"
          class="w-full h-full object-cover"
          priority
        />
      </div>
    </header>

    <!-- 文章内容 -->
    <div class="prose prose-lg max-w-none">
      <ContentRenderer :value="post" />
    </div>

    <!-- 文章底部 -->
    <footer class="mt-12 pt-8 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            class="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            @click="shareArticle"
          >
            <Icon
              name="lucide:share-2"
              class="w-5 h-5"
            />
            分享
          </button>
        </div>

        <!-- 上一篇/下一篇导航 -->
        <div class="flex items-center gap-4">
          <NuxtLink
            v-if="prevPost"
            :to="prevPost.path"
            class="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Icon
              name="lucide:arrow-left"
              class="w-4 h-4"
            />
            <span class="hidden md:inline">上一篇</span>
          </NuxtLink>
          <NuxtLink
            v-if="nextPost"
            :to="nextPost.path"
            class="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <span class="hidden md:inline">下一篇</span>
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>
        </div>
      </div>
    </footer>

    <!-- 相关文章 -->
    <section
      v-if="relatedPosts?.length"
      class="mt-12"
    >
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        相关文章
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <ArticleCard
          v-for="article in relatedPosts"
          :key="article.path"
          :article="{ ...article, path: article.path, date: (article.meta?.date as string) || '', tags: (article.meta?.tags) as string[], readingTime: (article.meta?.readingTime) as number }"
        />
      </div>
    </section>
  </article>

  <!-- 404 状态 -->
  <div
    v-else
    class="text-center py-20"
  >
    <Icon
      name="lucide:file-x"
      class="w-16 h-16 text-gray-300 mx-auto mb-4"
    />
    <h1 class="text-2xl font-bold text-gray-900 mb-2">
      文章未找到
    </h1>
    <p class="text-gray-500 mb-6">
      这篇文章可能已被删除或移动
    </p>
    <NuxtLink
      to="/blog"
      class="btn"
    >
      返回博客列表
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('content').path(`/blog/${slug}`).first(),
)

const { data: allPosts } = await useAsyncData(`all-posts-${slug}`, () =>
  queryCollection('content')
    .all(),
)
const { data: relatedPosts } = await useAsyncData(`related-${slug}`, async () => {
  const tags = post.value?.meta?.tags
  if (!tags || !Array.isArray(tags) || tags.length === 0) return []
  return queryCollection('content')
    .where('path', '<>', `/blog/${slug}`)
    .limit(4)
    .all()
})

const currentIndex = computed(() => {
  if (!allPosts.value || !post.value?.path) return -1
  return allPosts.value.findIndex(p => p.path === post.value?.path)
})

const prevPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value || currentIndex.value >= allPosts.value.length - 1) return null
  return allPosts.value[currentIndex.value + 1]
})

const nextPost = computed(() => {
  if (currentIndex.value <= 0 || !allPosts.value) return null
  return allPosts.value[currentIndex.value - 1]
})

const shareTitle = computed(() => post.value?.title || '')
const shareDescription = computed(() => post.value?.description || '')
const shareUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '')

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useHead(() => ({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description || '' },
    { property: 'og:image', content: (post.value?.meta?.cover as string) || '' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
}))

const shareArticle = async () => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: shareTitle.value,
        text: shareDescription.value,
        url: shareUrl.value,
      })
    }
    catch {
      await copyToClipboard(shareUrl.value)
    }
  }
  else {
    await copyToClipboard(shareUrl.value)
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  }
  catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
</script>

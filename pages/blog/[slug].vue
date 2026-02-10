<!-- pages/blog/[slug].vue -->
<template>
  <article
    v-if="post"
    class="relative"
  >
    <!-- Hero 头部 - 增强版 -->
    <header class="relative mb-12">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden rounded-3xl">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      </div>

      <!-- 粒子效果 -->
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
      </div>

      <div class="relative container mx-auto px-4 py-20">
        <!-- 导航返回 -->
        <div class="mb-8">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
          >
            <Icon
              name="lucide:arrow-left"
              class="w-4 h-4"
            />
            返回博客
          </NuxtLink>
        </div>

        <!-- 文章元信息 -->
        <div class="flex flex-wrap items-center gap-4 mb-6 text-white/70">
          <div class="flex items-center gap-2">
            <Icon
              name="lucide:calendar"
              class="w-4 h-4"
            />
            <time :datetime="post.meta?.date as string">
              {{ formatDate((post.meta?.date as string) || '') }}
            </time>
          </div>
          <span
            v-if="post.meta?.readingTime"
            class="flex items-center gap-2"
          >
            <Icon
              name="lucide:clock"
              class="w-4 h-4"
            />
            {{ post.meta?.readingTime }} 分钟阅读
          </span>
        </div>

        <!-- 标题 -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {{ post.title }}
        </h1>

        <!-- 描述 -->
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-8">
          {{ post.description }}
        </p>

        <!-- 标签 -->
        <div class="flex flex-wrap items-center gap-3">
          <span
            v-for="tag in post.meta?.tags"
            :key="tag"
            class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 作者信息 -->
        <div class="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <p class="text-white font-medium">
              dandan812
            </p>
            <p class="text-white/60 text-sm">
              技术博主 & 开发者
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- 封面图 -->
        <div
          v-if="post.meta?.cover"
          class="mb-12 aspect-video rounded-2xl overflow-hidden shadow-2xl"
        >
          <NuxtImg
            :src="post.meta?.cover as string"
            :alt="post.title"
            class="w-full h-full object-cover"
            priority
          />
        </div>

        <!-- 文章内容 - 增强排版 -->
        <div class="prose prose-lg prose-slate max-w-none">
          <ContentRenderer :value="post" />
        </div>

        <!-- 文章底部 - 增强版 -->
        <footer class="mt-16 pt-12 border-t border-gray-200">
          <!-- 分享区域 -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                分享文章
              </h3>
              <p class="text-gray-600">
                如果这篇文章对你有帮助，欢迎分享给更多人
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                class="group relative w-12 h-12 bg-gray-100 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                @click="shareToTwitter"
              >
                <Icon
                  name="lucide:twitter"
                  class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors"
                />
              </button>
              <button
                class="group relative w-12 h-12 bg-gray-100 hover:bg-green-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                @click="shareToWechat"
              >
                <Icon
                  name="lucide:message-circle"
                  class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors"
                />
              </button>
              <button
                class="group relative w-12 h-12 bg-gray-100 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                @click="shareToLinkedin"
              >
                <Icon
                  name="lucide:linkedin"
                  class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors"
                />
              </button>
              <button
                class="group relative w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                @click="copyLink"
              >
                <Icon
                  name="lucide:link"
                  class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors"
                />
              </button>
            </div>
          </div>

          <!-- 导航卡片 - 增强版 -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- 上一篇 -->
            <NuxtLink
              v-if="prevPost"
              :to="prevPost.path"
              class="group relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 hover:-translate-x-2"
            >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div class="relative flex items-start gap-4">
                <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Icon
                    name="lucide:arrow-left"
                    class="w-5 h-5 text-gray-600"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500 mb-1">
                    上一篇
                  </p>
                  <p class="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {{ prevPost.title }}
                  </p>
                </div>
              </div>
            </NuxtLink>

            <!-- 下一篇 -->
            <NuxtLink
              v-if="nextPost"
              :to="nextPost.path"
              class="group relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 hover:translate-x-2"
            >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div class="relative flex items-start gap-4 text-right">
                <div class="flex-1">
                  <p class="text-sm text-gray-500 mb-1">
                    下一篇
                  </p>
                  <p class="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {{ nextPost.title }}
                  </p>
                </div>
                <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Icon
                    name="lucide:arrow-right"
                    class="w-5 h-5 text-gray-600"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>
        </footer>

        <!-- 相关文章 - 增强版 -->
        <section
          v-if="relatedPosts?.length"
          class="mt-16 pt-12 border-t border-gray-200"
        >
          <div class="mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              相关文章
            </h2>
            <p class="text-gray-600">
              探索更多相似主题的内容
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ArticleCard
              v-for="article in relatedPosts"
              :key="article.path"
              :article="{ ...article, path: article.path, date: (article.meta?.date as string) || '', tags: (article.meta?.tags) as string[], readingTime: (article.meta?.readingTime) as number }"
              class="transform transition-all duration-500 hover:-translate-y-2"
            />
          </div>
        </section>
      </div>
    </div>
  </article>

  <!-- 404 状态 - 增强版 -->
  <div
    v-else
    class="min-h-[60vh] flex items-center justify-center"
  >
    <div class="text-center">
      <div class="relative inline-block mb-8">
        <div class="w-40 h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
          <Icon
            name="lucide:file-x"
            class="w-20 h-20 text-purple-400"
          />
        </div>
        <div class="absolute -top-2 -right-2 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <Icon
            name="lucide:x"
            class="w-8 h-8 text-red-500"
          />
        </div>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        文章未找到
      </h1>
      <p class="text-gray-500 mb-8 max-w-md">
        这篇文章可能已被删除或移动到其他位置
      </p>
      <div class="flex items-center justify-center gap-4">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-5 h-5"
          />
          返回博客
        </NuxtLink>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <Icon
            name="lucide:home"
            class="w-5 h-5"
          />
          返回首页
        </NuxtLink>
      </div>
    </div>
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

const shareUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '')
const shareTitle = computed(() => post.value?.title || '')

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

const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(shareUrl.value)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

const shareToWechat = () => {
  alert('请使用微信扫描二维码分享')
}

const shareToLinkedin = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
  }
  catch {
    const textarea = document.createElement('textarea')
    textarea.value = shareUrl.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0)
  }
  50% {
    transform: translateY(-10px)
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite
}
</style>

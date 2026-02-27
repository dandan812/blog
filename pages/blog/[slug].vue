<template>
  <article
    v-if="post"
    class="min-h-screen"
  >
    <!-- Hero 头部 -->
    <header class="relative py-24 md:py-32 bg-[#0a0a0a] dark:bg-gray-900">
      <!-- 网格线 -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0"
          style="
            background-image:
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 80px 80px;
          "
        />
      </div>

      <div class="relative container mx-auto px-6 md:px-12 max-w-4xl">
        <!-- 导航返回 -->
        <div class="mb-12">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm tracking-widest uppercase"
          >
            <Icon
              name="lucide:arrow-left"
              class="w-4 h-4"
            />
            返回
          </NuxtLink>
        </div>

        <!-- 标签 -->
        <div
          v-if="(post.meta?.tags as string[])?.length"
          class="flex flex-wrap gap-2 mb-6"
        >
          <span
            v-for="tag in post.meta?.tags as string[]"
            :key="tag"
            class="px-3 py-1 text-xs text-white/60 border border-white/10 dark:text-gray-300 dark:border-gray-600"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 标题 -->
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-gray-100 leading-[0.95] tracking-tight mb-6"
        >
          {{ post.title }}
        </h1>

        <!-- 描述 -->
        <p
          class="text-lg md:text-xl text-white/50 dark:text-gray-300 max-w-2xl leading-relaxed mb-8"
        >
          {{ post.description }}
        </p>

        <!-- 元信息 -->
        <div class="flex items-center gap-6 text-sm text-white/30 dark:text-gray-400">
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
            {{ post.meta?.readingTime }} 分钟
          </span>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <div class="py-16 bg-[#fafafa] dark:bg-gray-900">
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-3xl mx-auto">
          <!-- 目录侧边栏 -->
          <div class="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 w-64">
            <TableOfContents :headings="headings" />
          </div>

          <!-- 文章内容 -->
          <div class="prose prose-lg max-w-none dark:prose-invert">
            <ContentRenderer :value="post" />
          </div>

          <!-- 文章底部 -->
          <footer class="mt-16 pt-12 border-t border-black/5 dark:border-gray-700">
            <!-- 分享区域 -->
            <div class="flex items-center justify-between mb-12">
              <div class="text-sm text-black/40 dark:text-gray-400 tracking-widest uppercase">
                分享
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-gray-600 hover:border-black dark:hover:border-gray-400 hover:bg-black hover:text-white dark:hover:bg-gray-700 transition-all"
                  @click="shareToTwitter"
                >
                  <Icon
                    name="lucide:twitter"
                    class="w-4 h-4"
                  />
                </button>
                <button
                  class="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-gray-600 hover:border-black dark:hover:border-gray-400 hover:bg-black hover:text-white dark:hover:bg-gray-700 transition-all"
                  @click="copyLink"
                >
                  <Icon
                    name="lucide:link"
                    class="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            <!-- 导航卡片 -->
            <div class="grid md:grid-cols-2 gap-px bg-black/5 dark:bg-gray-700">
              <!-- 上一篇 -->
              <NuxtLink
                v-if="prevPost"
                :to="prevPost.path"
                class="group p-6 bg-[#fafafa] dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div
                  class="text-xs text-black/30 dark:text-gray-500 mb-2 tracking-widest uppercase"
                >
                  上一篇
                </div>
                <div class="flex items-center gap-3">
                  <Icon
                    name="lucide:arrow-left"
                    class="w-4 h-4 text-black/20 dark:text-gray-500 group-hover:text-amber-500 transition-colors"
                  />
                  <span
                    class="font-medium text-black dark:text-gray-200 group-hover:text-amber-600 transition-colors line-clamp-1"
                  >
                    {{ prevPost.title }}
                  </span>
                </div>
              </NuxtLink>
              <div
                v-else
                class="p-6 bg-[#fafafa] dark:bg-gray-800"
              />

              <!-- 下一篇 -->
              <NuxtLink
                v-if="nextPost"
                :to="nextPost.path"
                class="group p-6 bg-[#fafafa] dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 text-right"
              >
                <div
                  class="text-xs text-black/30 dark:text-gray-500 mb-2 tracking-widest uppercase"
                >
                  下一篇
                </div>
                <div class="flex items-center justify-end gap-3">
                  <span
                    class="font-medium text-black dark:text-gray-200 group-hover:text-amber-600 transition-colors line-clamp-1"
                  >
                    {{ nextPost.title }}
                  </span>
                  <Icon
                    name="lucide:arrow-right"
                    class="w-4 h-4 text-black/20 dark:text-gray-500 group-hover:text-amber-500 transition-colors"
                  />
                </div>
              </NuxtLink>
              <div
                v-else
                class="p-6 bg-[#fafafa] dark:bg-gray-800"
              />
            </div>
          </footer>

          <!-- 相关文章 -->
          <section
            v-if="relatedPosts?.length"
            class="mt-16 pt-12 border-t border-black/5 dark:border-gray-700"
          >
            <div
              class="inline-flex items-center gap-3 mb-8 text-black/40 dark:text-gray-400 text-sm tracking-widest uppercase"
            >
              <span class="w-8 h-px bg-amber-500" />
              <span>相关文章</span>
            </div>

            <div class="space-y-px bg-black/5 dark:bg-gray-700">
              <NuxtLink
                v-for="article in relatedPosts"
                :key="article.path"
                :to="article.path"
                class="group flex items-center gap-6 p-6 bg-[#fafafa] dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div class="flex-1">
                  <h3
                    class="font-bold text-black dark:text-gray-200 group-hover:text-amber-600 transition-colors mb-1"
                  >
                    {{ article.title }}
                  </h3>
                  <p class="text-black/40 dark:text-gray-400 text-sm line-clamp-1">
                    {{ article.description }}
                  </p>
                </div>
                <Icon
                  name="lucide:arrow-right"
                  class="w-4 h-4 text-black/20 dark:text-gray-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                />
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  </article>

  <!-- 404 状态 -->
  <div
    v-else
    class="min-h-[60vh] flex items-center justify-center bg-[#fafafa] dark:bg-gray-900"
  >
    <div class="text-center">
      <div class="text-8xl font-bold text-black/10 dark:text-white/10 mb-6">
        404
      </div>
      <h1 class="text-2xl font-bold text-black dark:text-white mb-4">
        文章未找到
      </h1>
      <p class="text-black/40 dark:text-gray-400 mb-8">
        这篇文章可能已被删除或移动
      </p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-gray-700 text-white hover:bg-black/80 dark:hover:bg-gray-600 transition-colors"
      >
        <Icon
          name="lucide:arrow-left"
          class="w-4 h-4"
        />
        返回博客
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取当前路由参数
const route = useRoute()
const slug = route.params.slug as string

// 获取当前文章详情
const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('content').path(`/blog/${slug}`).first(),
)

// 获取所有文章（用于上一篇/下一篇导航）
const { data: allPosts } = await useAsyncData(`all-posts-${slug}`, () =>
  queryCollection('content').all(),
)

// 获取相关文章
const { data: relatedPosts } = await useAsyncData(`related-${slug}`, async () => {
  const tags = post.value?.meta?.tags
  if (!tags || !Array.isArray(tags) || tags.length === 0) return []
  return queryCollection('content').where('path', '<>', `/blog/${slug}`).limit(4).all()
})

// 计算当前文章在所有文章中的索引
const currentIndex = computed(() => {
  if (!allPosts.value || !post.value?.path) return -1
  return allPosts.value.findIndex(p => p.path === post.value?.path)
})

// 上一篇文章（按时间顺序）
const prevPost = computed(() => {
  if (
    currentIndex.value === -1
    || !allPosts.value
    || currentIndex.value >= allPosts.value.length - 1
  )
    return null
  return allPosts.value[currentIndex.value + 1]
})

// 下一篇文章（按时间顺序）
const nextPost = computed(() => {
  if (currentIndex.value <= 0 || !allPosts.value) return null
  return allPosts.value[currentIndex.value - 1]
})

// 分享链接和标题
const shareUrl = computed(() => (typeof window !== 'undefined' ? window.location.href : ''))
const shareTitle = computed(() => post.value?.title || '')

// 提取文章标题
// 注意：目前 content 模块不会直接暴露 markdown 内容给客户端，因此我们需要使用其他方法
const headings = computed(() => {
  // 在构建时预处理的内容里提取标题
  if ((post.value as any)?.excerpt) {
    // 这里简化了提取逻辑，实际场景中可能需要使用 Nuxt Content 提供的摘要处理
    return []
  }
  // 退回到空数组，TOC 将不显示
  return []
})

// 格式化日期
const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 优化元数据以提升 SEO
useHead(() => ({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: shareUrl.value },
    { property: 'article:published_time', content: post.value?.date },
    ...(Array.isArray((post.value as any)?.meta?.tags)
      ? (post.value as any).meta.tags.map((tag: string) => ({
          property: 'article:tag',
          content: tag,
        }))
      : []),
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  script: [
    // Schema.org 结构化数据
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.value?.title,
        'description': post.value?.description,
        'datePublished': post.value?.date,
        'author': {
          '@type': 'Person',
          'name': 'Author Name', // 这里应该从具体文章或配置中读取
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'My Blog',
          'logo': {
            '@type': 'ImageObject',
            'url': '/logo.png',
          },
        },
      }),
    },
  ],
}))

// 分享到 Twitter
const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(shareUrl.value)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

// 复制链接到剪贴板
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    // 可以在这里添加 UI 反馈，比如 Toast 提示
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

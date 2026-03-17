<template>
  <div class="min-h-screen">
    <UiHero label="关于">
      关于博客
      <template #subtitle>
        基于 Nuxt 4 + Nuxt Content 的个人技术博客
      </template>
    </UiHero>

    <UiContentSection max-width="3xl">
      <!-- 介绍 -->
      <div class="mb-16">
        <UiSectionTitle label="简介" />
        <div class="space-y-4 text-lg text-black/70 dark:text-white/70 leading-relaxed">
          <p>
            欢迎来到我的博客！这是一个使用
            <span class="text-black dark:text-white font-medium">Nuxt 4</span> +
            <span class="text-black dark:text-white font-medium">Vue 3</span> +
            <span class="text-black dark:text-white font-medium">Nuxt Content 3</span> +
            <span class="text-black dark:text-white font-medium">Tailwind CSS 4</span>
            构建的现代化技术博客。
          </p>
          <p>本博客支持 Markdown 写作、SSR/SSG 与自动化部署。</p>
        </div>
      </div>

      <!-- 特性 -->
      <div class="mb-16">
        <UiSectionTitle label="特性" />
        <UiCardGrid :cols="2">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="group p-6 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="text-2xl font-bold text-black/10 dark:text-white/20 group-hover:text-amber-500/30 transition-colors">
                0{{ index + 1 }}
              </div>
              <div>
                <h3 class="font-bold text-black dark:text-white mb-1">
                  {{ feature.title }}
                </h3>
                <p class="text-black/50 dark:text-white/50 text-sm">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </UiCardGrid>
      </div>

      <!-- 技术栈 -->
      <div class="mb-16">
        <UiSectionTitle label="技术栈" />
        <div class="space-y-px bg-black/5 dark:bg-white/10">
          <div
            v-for="(tech, index) in techStack"
            :key="tech.name"
            class="group flex items-center gap-6 p-6 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
          >
            <div class="text-3xl font-bold text-black/10 dark:text-white/20 group-hover:text-amber-500/30 transition-colors w-12">
              0{{ index + 1 }}
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-black dark:text-white mb-1">
                {{ tech.name }}
              </h3>
              <p class="text-black/50 dark:text-white/50 text-sm">
                {{ tech.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div>
        <UiSectionTitle label="联系" />
        <div class="space-y-px bg-black/5 dark:bg-white/10">
          <a
            href="https://github.com/dandan812"
            target="_blank"
            class="group flex items-center gap-6 p-6 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
          >
            <div class="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all">
              <Icon
                name="lucide:github"
                class="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-white transition-colors"
              />
            </div>
            <div class="flex-1">
              <div class="text-sm text-black/40 dark:text-white/40 mb-1">GitHub</div>
              <div class="text-black dark:text-white font-medium">github.com/dandan812</div>
            </div>
            <Icon
              name="lucide:external-link"
              class="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-amber-500 transition-colors"
            />
          </a>

          <a
            href="mailto:hu_liang2027@163.com"
            class="group flex items-center gap-6 p-6 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
          >
            <div class="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all">
              <Icon
                name="lucide:mail"
                class="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-white transition-colors"
              />
            </div>
            <div class="flex-1">
              <div class="text-sm text-black/40 dark:text-white/40 mb-1">Email</div>
              <div class="text-black dark:text-white font-medium">hu_liang2027@163.com</div>
            </div>
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
            />
          </a>
        </div>
      </div>
    </UiContentSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - My Blog',
  meta: [
    { name: 'description', content: '关于这个基于 Nuxt 4 + Nuxt Content 的个人技术博客' },
    { name: 'keywords', content: '关于博客, 博客技术栈, nuxt, vue, 开发者信息' },
    { property: 'og:title', content: '关于 - My Blog' },
    { property: 'og:description', content: '关于这个基于 Nuxt 4 + Nuxt Content 的个人技术博客' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://blog-eight-gamma-66.vercel.app/about' },
  ],
  link: [{ rel: 'canonical', href: 'https://blog-eight-gamma-66.vercel.app/about' }],
})

const features = [
  { title: 'Markdown 写作', description: '支持 Markdown 格式，代码高亮' },
  { title: 'SSR/SSG', description: '服务端渲染与静态生成' },
  { title: '自动化部署', description: '持续集成与自动部署' },
  { title: '响应式设计', description: '适配各种设备屏幕' },
]

const techStack = [
  { name: 'Nuxt 4', description: '基于 Vue 3 的全栈框架，支持 SSR/SSG/ISR' },
  { name: 'Vue 3', description: '渐进式 JavaScript 框架' },
  { name: 'Nuxt Content 3', description: '基于 Git 的内容管理系统' },
  { name: 'Tailwind CSS 4', description: '原子化 CSS 框架' },
]
</script>

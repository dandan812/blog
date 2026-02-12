<template>
  <div class="min-h-screen">
    <!-- Hero 区域 -->
    <section class="relative py-24 md:py-32 bg-[#0a0a0a]">
      <!-- 网格线 -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0"
          style="background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 80px 80px;"
        />
      </div>

      <div class="relative container mx-auto px-6 md:px-12">
        <!-- 状态标签 -->
        <div class="inline-flex items-center gap-3 mb-8 text-white/40 text-sm tracking-widest uppercase">
          <span class="w-8 h-px bg-amber-500" />
          <span>关于</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-6">
          关于博客
        </h1>
        <p class="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light">
          基于 Nuxt 4 + Nuxt Content 的个人技术博客
        </p>
      </div>
    </section>

    <!-- 内容区域 -->
    <section class="py-20 bg-[#fafafa]">
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-3xl">
          <!-- 介绍 -->
          <div class="mb-16">
            <div class="inline-flex items-center gap-3 mb-6 text-black/40 text-sm tracking-widest uppercase">
              <span class="w-8 h-px bg-amber-500" />
              <span>简介</span>
            </div>
            <div class="space-y-4 text-lg text-black/70 leading-relaxed">
              <p>
                欢迎来到我的博客！这是一个使用 <span class="text-black font-medium">Nuxt 4</span> + <span class="text-black font-medium">Vue 3</span> + <span class="text-black font-medium">Nuxt Content 3</span> + <span class="text-black font-medium">Tailwind CSS 4</span> 构建的现代化技术博客。
              </p>
              <p>
                本博客支持 Markdown 写作、SSR/SSG 与自动化部署。致力于探索前端开发的边界，记录技术成长的轨迹。
              </p>
            </div>
          </div>

          <!-- 特性 -->
          <div class="mb-16">
            <div class="inline-flex items-center gap-3 mb-8 text-black/40 text-sm tracking-widest uppercase">
              <span class="w-8 h-px bg-amber-500" />
              <span>特性</span>
            </div>

            <div class="grid md:grid-cols-2 gap-px bg-black/5">
              <div
                v-for="(feature, index) in features"
                :key="feature.title"
                class="group p-6 bg-[#fafafa] hover:bg-white transition-all duration-300"
              >
                <div class="flex items-start gap-4">
                  <div class="text-2xl font-bold text-black/5 group-hover:text-amber-500/20 transition-colors">
                    0{{ index + 1 }}
                  </div>
                  <div>
                    <h3 class="font-bold text-black mb-1">
                      {{ feature.title }}
                    </h3>
                    <p class="text-black/50 text-sm">
                      {{ feature.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 技术栈 -->
          <div class="mb-16">
            <div class="inline-flex items-center gap-3 mb-8 text-black/40 text-sm tracking-widest uppercase">
              <span class="w-8 h-px bg-amber-500" />
              <span>技术栈</span>
            </div>

            <div class="space-y-px bg-black/5">
              <div
                v-for="(tech, index) in techStack"
                :key="tech.name"
                class="group flex items-center gap-6 p-6 bg-[#fafafa] hover:bg-white transition-all duration-300"
              >
                <div class="text-3xl font-bold text-black/5 group-hover:text-amber-500/20 transition-colors w-12">
                  0{{ index + 1 }}
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-black mb-1">
                    {{ tech.name }}
                  </h3>
                  <p class="text-black/50 text-sm">
                    {{ tech.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 联系方式 -->
          <div>
            <div class="inline-flex items-center gap-3 mb-8 text-black/40 text-sm tracking-widest uppercase">
              <span class="w-8 h-px bg-amber-500" />
              <span>联系</span>
            </div>

            <div class="space-y-px bg-black/5">
              <a
                href="https://github.com/dandan812"
                target="_blank"
                class="group flex items-center gap-6 p-6 bg-[#fafafa] hover:bg-white transition-all duration-300"
              >
                <div class="w-10 h-10 flex items-center justify-center border border-black/10 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all">
                  <Icon
                    name="lucide:github"
                    class="w-5 h-5 text-black/40 group-hover:text-white transition-colors"
                  />
                </div>
                <div class="flex-1">
                  <div class="text-sm text-black/40 mb-1">GitHub</div>
                  <div class="text-black font-medium">github.com/dandan812</div>
                </div>
                <Icon
                  name="lucide:external-link"
                  class="w-4 h-4 text-black/20 group-hover:text-amber-500 transition-colors"
                />
              </a>

              <a
                href="mailto:hu_liang2027@163.com"
                class="group flex items-center gap-6 p-6 bg-[#fafafa] hover:bg-white transition-all duration-300"
              >
                <div class="w-10 h-10 flex items-center justify-center border border-black/10 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all">
                  <Icon
                    name="lucide:mail"
                    class="w-5 h-5 text-black/40 group-hover:text-white transition-colors"
                  />
                </div>
                <div class="flex-1">
                  <div class="text-sm text-black/40 mb-1">Email</div>
                  <div class="text-black font-medium">hu_liang2027@163.com</div>
                </div>
                <Icon
                  name="lucide:arrow-right"
                  class="w-4 h-4 text-black/20 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - My Blog',
  meta: [
    { name: 'description', content: '基于 Nuxt 4 + Nuxt Content 的个人技术博客，支持 Markdown 写作、SSR/SSG 与自动化部署' },
  ],
})

const features = [
  {
    title: 'Markdown 写作',
    description: '支持 Markdown 格式，代码高亮',
  },
  {
    title: 'SSR/SSG',
    description: '服务端渲染与静态生成',
  },
  {
    title: '自动化部署',
    description: '持续集成与自动部署',
  },
  {
    title: '响应式设计',
    description: '适配各种设备屏幕',
  },
]

const techStack = [
  {
    name: 'Nuxt 4',
    description: '基于 Vue 3 的全栈框架，支持 SSR/SSG/ISR',
  },
  {
    name: 'Vue 3',
    description: '渐进式 JavaScript 框架',
  },
  {
    name: 'Nuxt Content 3',
    description: '基于 Git 的内容管理系统',
  },
  {
    name: 'Tailwind CSS 4',
    description: '原子化 CSS 框架',
  },
]
</script>

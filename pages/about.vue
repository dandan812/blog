<!-- pages/about.vue -->
<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">
      关于
    </h1>

    <div class="prose prose-lg">
      <p>
        欢迎来到我的博客！这是一个使用 Nuxt 4 + Vue 3.6 + Nuxt Content 3 + Tailwind 4 构建的现代化技术博客。
      </p>

      <h2>关于技术栈</h2>

      <p>本博客采用最新的前端技术栈：</p>

      <ul>
        <li><strong>Nuxt 4</strong> - 基于 Vue 3 的全栈框架，支持 SSR/SSG/ISR</li>
        <li><strong>Vue 3.6</strong> - 渐进式 JavaScript 框架</li>
        <li><strong>Nuxt Content 3</strong> - 基于 Git 的内容管理系统</li>
        <li><strong>Tailwind CSS 4</strong> - 原子化 CSS 框架</li>
      </ul>

      <h2>联系方式</h2>

      <p>如果你有任何问题或建议，欢迎通过以下方式联系我：</p>

      <ul>
        <li>
          GitHub: <a
            href="https://github.com/dandan812"
            target="_blank"
          >github.com/dandan812</a>
        </li>
        <li>Email: <a href="mailto:hu_liang2027@163.com">hu_liang2027@163.com</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - My Blog',
  meta: [
    { name: 'description', content: '关于本博客和技术栈的介绍' },
  ],
})
</script>

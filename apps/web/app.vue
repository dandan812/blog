<template>
  <!-- 
    应用根组件
    所有页面都包裹在 NuxtLayout 中
    NuxtPage 是动态路由渲染组件
  -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
/**
 * App.vue - 应用根组件
 * 
 * 这是 Nuxt 应用的入口组件，所有页面都会在这里渲染
 * 
 * 主要结构：
 * - <NuxtLayout>: 使用 layouts/default.vue 布局
 * - <NuxtPage>: 根据路由动态渲染对应页面
 */
</script>

<template>
  <el-container class="h-full">
    <el-aside width="200px" class="bg-gray-800">
      <div
        class="h-14 flex items-center justify-center text-white text-lg font-bold border-b border-gray-700"
      >
        博客管理
      </div>
      <el-menu
        :default-active="$route.path"
        router
        background-color="#1f2937"
        text-color="#9ca3af"
        active-text-color="#fff"
      >
        <el-menu-item index="/dashboard">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据看板</span>
        </el-menu-item>
        <el-menu-item index="/posts">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/comments">
          <el-icon><ChatDotRound /></el-icon>
          <span>评论管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="flex items-center justify-between border-b bg-white">
        <span class="text-lg">{{ pageTitle }}</span>
        <div class="flex items-center gap-4">
          <span class="text-gray-500">{{ authStore.user?.email }}</span>
          <el-button type="danger" text @click="authStore.logout()">
            <el-icon><SwitchButton /></el-icon>
            退出
          </el-button>
        </div>
      </el-header>
      <el-main class="bg-gray-50">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const route = useRoute()
  const authStore = useAuthStore()

  const pageTitle = computed(() => {
    const titles: Record<string, string> = {
      '/dashboard': '数据看板',
      '/posts': '文章管理',
      '/posts/create': '新建文章',
      '/comments': '评论管理',
    }
    return titles[route.path] || '博客管理'
  })
</script>

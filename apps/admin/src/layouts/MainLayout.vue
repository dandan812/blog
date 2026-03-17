<template>
  <el-container class="h-full">
    <el-aside width="200px" class="sidebar">
      <div class="sidebar-header">
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
      <el-header class="header">
        <span class="text-lg">{{ pageTitle }}</span>
        <div class="flex items-center gap-4">
          <span class="text-gray-500">{{ authStore.user?.email }}</span>
          <el-button type="danger" text @click="authStore.logout()">
            <el-icon><SwitchButton /></el-icon>
            退出
          </el-button>
        </div>
      </el-header>
      <el-main class="main-content">
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

<style scoped>
.sidebar {
  background-color: #1f2937;
}
.sidebar-header {
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  border-bottom: 1px solid #374151;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
}
.main-content {
  background-color: #f9fafb;
}
</style>
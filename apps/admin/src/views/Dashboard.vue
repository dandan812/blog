<template>
  <div class="space-y-6">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-value text-blue-500">{{ stats.totalPosts }}</div>
            <div class="stat-label">文章总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-value text-green-500">{{ stats.publishedPosts }}</div>
            <div class="stat-label">已发布</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-value text-orange-500">{{ stats.pendingComments }}</div>
            <div class="stat-label">待审核评论</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-value text-purple-500">{{ stats.totalViews }}</div>
            <div class="stat-label">总浏览量</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card header="访问趋势">
          <div ref="chartRef" class="h-64" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="热门文章">
          <div class="space-y-3">
            <div
              v-for="post in stats.recentPosts"
              :key="post.id"
              class="popular-item"
            >
              <span class="truncate flex-1">{{ post.title }}</span>
              <el-tag size="small">{{ post.viewCount }} 阅读</el-tag>
            </div>
            <div v-if="!stats.recentPosts?.length" class="text-gray-400 text-center py-4">
              暂无数据
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { statsApi } from '@/api/stats'
import type { DashboardStats } from '@/types'

const chartRef = ref<HTMLElement>()

const stats = ref<DashboardStats>({
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  totalComments: 0,
  pendingComments: 0,
  totalViews: 0,
  recentPosts: [],
  viewsTrend: [],
})

onMounted(async () => {
  try {
    stats.value = await statsApi.getDashboard()
    initChart()
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
  }
})

function initChart() {
  if (!chartRef.value) return

  const chart = echarts.init(chartRef.value)
  const trend = stats.value.viewsTrend || []

  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: trend.map((item, i) => item.date || `Day ${i + 1}`),
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '浏览量',
        type: 'line',
        smooth: true,
        data: trend.map(item => item._count),
        areaStyle: { opacity: 0.3 },
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}
</script>

<style scoped>
.stat-card {
  text-align: center;
}
.stat-value {
  font-size: 2rem;
  font-weight: bold;
}
.stat-label {
  color: #6b7280;
  margin-top: 0.5rem;
}
.popular-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
.popular-item:hover {
  background-color: #f9fafb;
}
</style>
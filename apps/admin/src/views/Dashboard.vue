<template>
  <div class="space-y-6">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-500">{{ stats.totalPosts }}</div>
            <div class="text-gray-500 mt-2">文章总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-500">{{ stats.publishedPosts }}</div>
            <div class="text-gray-500 mt-2">已发布</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-500">{{ stats.pendingComments }}</div>
            <div class="text-gray-500 mt-2">待审核评论</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-500">{{ stats.totalViews }}</div>
            <div class="text-gray-500 mt-2">总浏览量</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card header="访问趋势">
          <div ref="chartRef" class="h-64"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="热门文章">
          <div class="space-y-3">
            <div
              v-for="post in stats.recentPosts"
              :key="post.id"
              class="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
            >
              <span class="truncate flex-1">{{ post.title }}</span>
              <el-tag size="small">{{ post.viewCount }} 阅读</el-tag>
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

  const chartRef = ref<HTMLElement>()
  const stats = ref({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    totalViews: 0,
    recentPosts: [] as any[],
    viewsTrend: [] as any[],
  })

  onMounted(async () => {
    stats.value = await statsApi.getDashboard()
    initChart()
  })

  function initChart() {
    if (!chartRef.value) return
    const chart = echarts.init(chartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: stats.value.viewsTrend.map((_, i) => `Day ${i + 1}`),
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: '浏览量',
          type: 'line',
          smooth: true,
          data: stats.value.viewsTrend.map((v: any) => v._count),
          areaStyle: { opacity: 0.3 },
        },
      ],
    })
  }
</script>

<template>
  <div class="space-y-4">
    <el-radio-group v-model="statusFilter" @change="handleFilterChange">
      <el-radio-button label="">全部</el-radio-button>
      <el-radio-button label="pending">待审核</el-radio-button>
      <el-radio-button label="approved">已通过</el-radio-button>
      <el-radio-button label="rejected">已拒绝</el-radio-button>
    </el-radio-group>

    <el-table :data="comments" v-loading="loading" stripe>
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="content" label="内容" min-width="200" show-overflow-tooltip />
      <el-table-column label="文章" width="150">
        <template #default="{ row }">
          <span v-if="row.post">{{ row.post.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusInfo(row.status).type">
            {{ getStatusInfo(row.status).text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="row.status !== 'approved'"
            text
            type="success"
            @click="handleStatus(row.id, 'approved')"
          >
            通过
          </el-button>
          <el-button
            v-if="row.status !== 'rejected'"
            text
            type="warning"
            @click="handleStatus(row.id, 'rejected')"
          >
            拒绝
          </el-button>
          <el-popconfirm title="确定删除？" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button text type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="page"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      @current-change="fetchComments"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { commentApi } from '@/api/comment'
import type { Comment } from '@/types'
import { formatDate } from '@/composables'

const loading = ref(false)
const comments = ref<Comment[]>([])
const statusFilter = ref<Comment['status'] | ''>('')
const page = ref(1)
const pageSize = 20
const total = ref(0)

const statusMap: Record<Comment['status'], { type: 'success' | 'warning' | 'danger'; text: string }> = {
  pending: { type: 'warning', text: '待审核' },
  approved: { type: 'success', text: '已通过' },
  rejected: { type: 'danger', text: '已拒绝' },
}

function getStatusInfo(status: Comment['status']) {
  return statusMap[status]
}

onMounted(fetchComments)

async function fetchComments() {
  loading.value = true
  try {
    const res = await commentApi.getList({
      page: page.value,
      pageSize,
      status: statusFilter.value as Comment['status'] | undefined || undefined,
    })
    comments.value = res.data
    total.value = res.total
  } finally {
    loading.value = false
  }
}

function handleFilterChange() {
  page.value = 1
  fetchComments()
}

async function handleStatus(id: string, status: Comment['status']) {
  await commentApi.updateStatus(id, status)
  ElMessage.success('状态已更新')
  fetchComments()
}

async function handleDelete(id: string) {
  await commentApi.delete(id)
  ElMessage.success('删除成功')
  fetchComments()
}
</script>
<template>
  <div class="space-y-4">
    <el-radio-group v-model="filter.status" @change="fetchComments">
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
          <el-tag :type="statusMap[row.status].type">
            {{ statusMap[row.status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="时间" width="160">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString() }}
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
      v-model:current-page="pagination.page"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="prev, pager, next"
      @current-change="fetchComments"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { commentApi, type Comment } from '@/api/comment'

  const loading = ref(false)
  const comments = ref<Comment[]>([])
  const filter = reactive({ status: '' })
  const pagination = reactive({ page: 1, pageSize: 20, total: 0 })

  const statusMap: Record<string, { type: string; text: string }> = {
    pending: { type: 'warning', text: '待审核' },
    approved: { type: 'success', text: '已通过' },
    rejected: { type: 'danger', text: '已拒绝' },
  }

  onMounted(fetchComments)

  async function fetchComments() {
    loading.value = true
    try {
      const res = await commentApi.getList({
        page: pagination.page,
        pageSize: pagination.pageSize,
        status: filter.status || undefined,
      })
      comments.value = res.data
      pagination.total = res.total
    } finally {
      loading.value = false
    }
  }

  async function handleStatus(id: string, status: string) {
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

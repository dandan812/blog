<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <el-radio-group v-model="filter.status" @change="fetchPosts">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="true">已发布</el-radio-button>
        <el-radio-button label="false">草稿</el-radio-button>
      </el-radio-group>
      <el-button type="primary" @click="$router.push('/posts/create')">
        <el-icon><Plus /></el-icon>
        新建文章
      </el-button>
    </div>

    <el-table :data="posts" v-loading="loading" stripe>
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="viewCount" label="浏览" width="80" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.published ? 'success' : 'info'">
            {{ row.published ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button text type="primary" @click="$router.push(`/posts/${row.slug}/edit`)">
            编辑
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
      @current-change="fetchPosts"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { postApi, type Post } from '@/api/post'

  const loading = ref(false)
  const posts = ref<Post[]>([])
  const filter = reactive({ status: '' })
  const pagination = reactive({ page: 1, pageSize: 10, total: 0 })

  onMounted(fetchPosts)

  async function fetchPosts() {
    loading.value = true
    try {
      const res = await postApi.getList({
        page: pagination.page,
        pageSize: pagination.pageSize,
        published: filter.status ? filter.status === 'true' : undefined,
      })
      posts.value = res.data
      pagination.total = res.total
    } finally {
      loading.value = false
    }
  }

  async function handleDelete(id: string) {
    await postApi.delete(id)
    ElMessage.success('删除成功')
    fetchPosts()
  }
</script>

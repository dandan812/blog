<template>
  <div class="space-y-4">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="摘要" prop="excerpt">
        <el-input v-model="form.excerpt" type="textarea" :rows="2" placeholder="文章摘要" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <div class="w-full border rounded overflow-hidden">
          <Editor :value="form.content" :plugins="plugins" @change="handleChange" />
        </div>
      </el-form-item>
      <el-form-item label="封面图">
        <el-input v-model="form.coverImage" placeholder="封面图片URL" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.published" active-text="发布" inactive-text="草稿" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          {{ isEdit ? '更新' : '创建' }}
        </el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { Editor } from '@bytemd/vue-next'
  import gfm from '@bytemd/plugin-gfm'
  import highlight from '@bytemd/plugin-highlight'
  import 'bytemd/dist/index.css'
  import 'highlight.js/styles/github.css'
  import { postApi } from '@/api/post'

  const route = useRoute()
  const router = useRouter()
  const formRef = ref<FormInstance>()
  const loading = ref(false)
  const isEdit = computed(() => !!route.params.slug)

  const plugins = [gfm(), highlight()]

  const form = reactive({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    published: false,
  })

  const rules: FormRules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  }

  function handleChange(v: string) {
    form.content = v
  }

  let postId = ''

  onMounted(async () => {
    if (isEdit.value) {
      const slug = route.params.slug as string
      const post = await postApi.getBySlug(slug)
      postId = post.id
      form.title = post.title
      form.content = post.content
      form.excerpt = post.excerpt || ''
      form.coverImage = post.coverImage || ''
      form.published = post.published
    }
  })

  async function handleSubmit() {
    const valid = await formRef.value?.validate()
    if (!valid) return

    loading.value = true
    try {
      if (isEdit.value) {
        await postApi.update(postId, form)
        ElMessage.success('更新成功')
      } else {
        await postApi.create(form)
        ElMessage.success('创建成功')
      }
      router.push('/posts')
    } finally {
      loading.value = false
    }
  }
</script>

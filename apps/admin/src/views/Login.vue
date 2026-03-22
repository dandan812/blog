<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">博客管理后台</h1>
        <p class="login-subtitle">欢迎回来，请登录您的账户</p>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="handleLogin" class="login-form">
        <el-form-item prop="email" label="邮箱">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱地址"
            prefix-icon="User"
            size="large"
            autocomplete="email"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
            autocomplete="current-password"
          />
        </el-form-item>
        <el-form-item class="login-button-wrapper">
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            size="large"
            class="login-button"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' },
  ],
}

async function handleLogin() {
  const valid = await formRef.value?.validate()
  if (!valid) return

  loading.value = true
  try {
    await authStore.login(form.email, form.password)
    ElMessage.success('登录成功')
    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  min-height: 100dvh; /* 使用 dvh 避免移动端浏览器地址栏问题 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.login-page::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, -20px); }
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.login-subtitle {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.login-form {
  margin-top: 1.5rem;
}

/* 表单项标签优化 */
.login-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #2d3748;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

/* 输入框优化 - 确保足够的触摸目标 */
.login-form :deep(.el-input__wrapper) {
  min-height: 48px; /* 移动端最小触摸目标 */
  border-radius: 8px;
  transition: all 0.2s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #667eea;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #667eea;
}

/* 按钮优化 */
.login-button-wrapper {
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.login-button {
  width: 100%;
  min-height: 48px; /* 移动端最小触摸目标 */
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

/* 移动端优化 */
@media (max-width: 640px) {
  .login-page {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
    max-width: 100%;
  }

  .login-title {
    font-size: 1.5rem;
  }

  .login-subtitle {
    font-size: 0.8125rem;
  }
}

/* 小屏幕优化 */
@media (max-width: 375px) {
  .login-card {
    padding: 1.5rem 1rem;
  }

  .login-title {
    font-size: 1.375rem;
  }
}

/* 触摸设备优化 - 增加间距 */
@media (hover: none) and (pointer: coarse) {
  .login-form :deep(.el-form-item) {
    margin-bottom: 1.25rem;
  }

  .login-form :deep(.el-input__wrapper) {
    min-height: 52px; /* 触摸设备更大的触摸目标 */
  }

  .login-button {
    min-height: 52px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .login-card {
    border: 2px solid #000;
    background: #fff;
  }

  .login-title {
    color: #000;
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  .login-card,
  .login-page::before,
  .login-button,
  .login-form :deep(.el-input__wrapper) {
    animation: none;
    transition: none;
  }
}
</style>
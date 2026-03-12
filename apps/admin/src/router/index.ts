import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard' },
        { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue') },
        { path: 'posts', name: 'Posts', component: () => import('@/views/Posts.vue') },
        {
          path: 'posts/create',
          name: 'PostCreate',
          component: () => import('@/views/PostEdit.vue'),
        },
        {
          path: 'posts/:slug/edit',
          name: 'PostEdit',
          component: () => import('@/views/PostEdit.vue'),
        },
        { path: 'comments', name: 'Comments', component: () => import('@/views/Comments.vue') },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth !== false && !authStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && authStore.isLoggedIn) {
    next('/dashboard')
  } else {
    if (authStore.isLoggedIn && !authStore.user) {
      await authStore.fetchUser()
    }
    next()
  }
})

export default router

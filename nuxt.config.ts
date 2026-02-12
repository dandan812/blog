// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
  ],

  devtools: { enabled: false },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  content: {
    watch: { enabled: false },
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'json', 'bash', 'markdown', 'yaml'],
        },
      },
    },
  },

  routeRules: {
    '/': { prerender: false },
    '/blog/**': { isr: false },
    '/about': { prerender: false },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },

  compatibilityDate: '2025-02-10',

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', '@nuxt/content'],
      noDiscovery: true,
    },
    esbuild: {
      legalComments: 'none',
    },
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
})

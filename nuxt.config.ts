// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/icon',
  ],
  devtools: { enabled: true },

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
  },

  routeRules: {
    '/': { prerender: true },
    '/blog/**': { isr: 60 },
    '/about': { prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },

  compatibilityDate: '2025-02-10',

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
    },
  },

  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', '@nuxt/content'],
    },
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  fonts: {
    families: [],
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

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // 为深色模式准备额外的颜色
      },
    },
  },
  darkMode: 'class', // 或 'media' 设置深色模式策略
  plugins: [],
}

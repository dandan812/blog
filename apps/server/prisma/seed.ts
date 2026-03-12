import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'admin@blog.com' },
    update: {},
    create: {
      email: 'admin@blog.com',
      password,
      name: '管理员',
      role: 'admin',
    },
  })
  console.log('创建用户:', user)

  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'javascript' },
      update: {},
      create: { name: 'JavaScript', slug: 'javascript' },
    }),
    prisma.tag.upsert({
      where: { slug: 'vue' },
      update: {},
      create: { name: 'Vue', slug: 'vue' },
    }),
    prisma.tag.upsert({
      where: { slug: 'nuxt' },
      update: {},
      create: { name: 'Nuxt', slug: 'nuxt' },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: { name: 'TypeScript', slug: 'typescript' },
    }),
  ])
  console.log('创建标签:', tags)

  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'hello-world' },
      update: {},
      create: {
        title: 'Hello World - 我的第一篇博客',
        slug: 'hello-world',
        content: `# Hello World

这是我的第一篇博客文章。

## 简介

欢迎来到我的技术博客！

\`\`\`javascript
console.log('Hello, World!')
\`\`\``,
        excerpt: '这是我的第一篇博客文章',
        published: true,
        viewCount: 100,
        authorId: user.id,
        tags: { connect: [{ id: tags[0].id }, { id: tags[2].id }] },
      },
    }),
    prisma.post.upsert({
      where: { slug: 'nuxt4-guide' },
      update: {},
      create: {
        title: 'Nuxt 4 完全指南',
        slug: 'nuxt4-guide',
        content: `# Nuxt 4 完全指南

Nuxt 4 是最新的版本。

\`\`\`bash
npx nuxi@latest init my-app
\`\`\``,
        excerpt: 'Nuxt 4 完全指南',
        published: true,
        viewCount: 256,
        authorId: user.id,
        tags: { connect: [{ id: tags[1].id }, { id: tags[2].id }] },
      },
    }),
  ])
  console.log('创建文章:', posts)

  console.log('\n✅ 种子数据创建完成！')
  console.log('管理员账号: admin@blog.com / admin123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

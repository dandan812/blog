import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null

  const frontmatter: Record<string, unknown> = {}
  const lines = match[1].split('\n')
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()
      
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1)
      } else if (value.startsWith('[') && value.endsWith(']')) {
        const arrayValue = value
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        frontmatter[key] = arrayValue
        continue
      }
      
      frontmatter[key] = value
    }
  }

  return {
    frontmatter,
    body: match[2]
  }
}

async function main() {
  console.log('🌱 开始种子数据...')

  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@blog.com' },
    update: {},
    create: {
      email: 'admin@blog.com',
      password: adminPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  console.log('✅ 创建管理员用户:', admin.email)

  const defaultTags = ['Nuxt', 'Vue', 'Tailwind', 'TypeScript', 'JavaScript', '前端开发']
  const tagMap: Record<string, string> = {}
  
  for (const tagName of defaultTags) {
    const tag = await prisma.tag.upsert({
      where: { slug: tagName.toLowerCase() },
      update: {},
      create: {
        name: tagName,
        slug: tagName.toLowerCase(),
      },
    })
    tagMap[tagName] = tag.id
  }
  console.log('✅ 创建标签:', Object.keys(tagMap))

  const contentDir = path.resolve(__dirname, '../../web/content/blog')
  
  if (!fs.existsSync(contentDir)) {
    console.log('⚠️  内容目录不存在，跳过文章迁移')
    return
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))
  console.log(`📁 发现 ${files.length} 篇文章`)

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const parsed = parseFrontmatter(content)

    if (!parsed) {
      console.log(`⚠️  跳过 ${file}: 无法解析 frontmatter`)
      continue
    }

    const { frontmatter, body } = parsed
    const title = String(frontmatter.title || file.replace('.md', ''))
    const slug = generateSlug(title)

    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags.filter((t) => tagMap[String(t)]).map((t) => tagMap[String(t)])
      : []

    const post = await prisma.post.upsert({
      where: { slug },
      update: {
        title,
        content: body,
        excerpt: String(frontmatter.description || frontmatter.excerpt || ''),
        coverImage: String(frontmatter.cover || ''),
        published: true,
        tags: { connect: tags.map((id) => ({ id })) },
      },
      create: {
        title,
        slug,
        content: body,
        excerpt: String(frontmatter.description || frontmatter.excerpt || ''),
        coverImage: String(frontmatter.cover || ''),
        published: true,
        authorId: admin.id,
        tags: { connect: tags.map((id) => ({ id })) },
      },
    })

    console.log(`✅ 迁移文章: ${post.title}`)
  }

  console.log('🎉 种子数据完成!')
  console.log('\n📝 管理员账号:')
  console.log('   邮箱: admin@blog.com')
  console.log('   密码: admin123')
}

main()
  .catch((e) => {
    console.error('❌ 种子数据失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
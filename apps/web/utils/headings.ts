export const extractHeadings = (html: string): { id: string, text: string, level: number }[] => {
  // 使用正则表达式查找h2到h4标签
  const headingsRegex = /<(h[2-4])\s+id=["']([^"']*)["'][^>]*>(.*?)<\/\1>/gi
  const headings: { id: string, text: string, level: number }[] = []

  let match
  while ((match = headingsRegex.exec(html)) !== null) {
    const level = parseInt(match[1].charAt(1)) // 获取级别数字 (2, 3, 或 4)
    const id = match[2] // id 属性值
    // 去除 HTML 标签，获取纯文本
    const text = match[3].replace(/<[^>]*>/g, '').trim()

    headings.push({ id, text, level })
  }

  return headings
}

// 解析markdown内容获取标题
export const parseMarkdownHeadings = (
  content: string,
): { id: string, text: string, level: number }[] => {
  // 匹配markdown格式的标题
  const markdownHeadingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: { id: string, text: string, level: number }[] = []

  let match
  while ((match = markdownHeadingRegex.exec(content)) !== null) {
    const level = match[1].length // 获取 # 符号的数量即为标题级别
    let text = match[2].trim()

    // 移除可能的链接标记
    text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1')

    // 生成 id - 将文本转换为URL友好的格式
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff\s-]/g, '') // 保留中文字符、字母、数字、空格和连字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .replace(/^-+|-+$/g, '') // 去除开头和结尾的连字符

    headings.push({ id, text, level })
  }

  return headings
}

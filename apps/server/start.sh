#!/bin/bash

# 启动脚本 - 带错误处理和调试

set -e  # 遇到错误立即退出

echo "=== 启动脚本开始 ==="
echo "当前目录: $(pwd)"
echo "Node版本: $(node --version)"
echo "检查环境变量..."

# 检查必要的环境变量
if [ -z "$DATABASE_URL" ]; then
  echo "❌ 错误: DATABASE_URL 未设置"
  exit 1
fi

if [ -z "$JWT_SECRET" ]; then
  echo "❌ 错误: JWT_SECRET 未设置"
  exit 1
fi

echo "✅ 环境变量检查通过"
echo "DATABASE_URL: ${DATABASE_URL:0:50}..."
echo "JWT_SECRET: ${JWT_SECRET:0:10}..."

# 运行数据库迁移
echo "=== 运行数据库迁移 ==="
if npx prisma migrate deploy --schema=./prisma/schema.prisma; then
  echo "✅ 数据库迁移成功"
else
  echo "⚠️  数据库迁移失败，但继续启动服务..."
fi

# 启动应用
echo "=== 启动应用 ==="
echo "监听端口: ${PORT:-3001}"
exec node dist/app.js

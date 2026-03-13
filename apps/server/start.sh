#!/bin/bash
# 确保环境变量已加载
export DATABASE_URL="${DATABASE_URL}"
export JWT_SECRET="${JWT_SECRET}"
export JWT_EXPIRES_IN="${JWT_EXPIRES_IN}"
export NODE_ENV="${NODE_ENV}"
export FRONTEND_URL="${FRONTEND_URL}"
export ADMIN_URL="${ADMIN_URL}"

# 运行数据库迁移
node node_modules/.bin/prisma migrate deploy

# 启动应用
node dist/app.js

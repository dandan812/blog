# API 文档导入说明

后端接口的 OpenAPI 文档已整理到：

- `docs/api/openapi.yaml`

适合直接导入 Apifox，推荐方式：

1. 在 Apifox 新建项目或打开已有项目。
2. 选择“导入”或“数据导入”。
3. 选择 OpenAPI/Swagger。
4. 导入 `docs/api/openapi.yaml`。

当前覆盖范围：

- 健康检查
- 鉴权
- 文章
- 评论
- 统计

说明：

- 认证方式是 `Bearer Token`
- 默认服务地址是 `http://localhost:3001`
- 文档基于 `apps/server` 当前代码整理，不包含旧目录 `blog-api`

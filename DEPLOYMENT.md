# 部署指南

## Vercel 部署（推荐）

### 方法 1：通过 Vercel 网站部署

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 导入 GitHub 仓库 `heatsing/Image-to`
5. Vercel 会自动检测 Next.js 项目
6. 点击 "Deploy" 开始部署
7. 几分钟后即可在线访问

### 方法 2：使用 Vercel CLI

```bash
npm i -g vercel
cd C:\Users\heats\Desktop\tojpg
vercel
```

### 环境变量

本项目不需要环境变量，所有转换都在客户端完成。

### 构建配置

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Netlify 部署

1. 访问 [Netlify](https://netlify.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. 点击 "Deploy site"

## 常见部署问题

### 问题 1：构建失败 - generateStaticParams 错误

**解决方案**：
- 确保 `lib/formats.ts` 正确导出 `FORMAT_SLUGS`
- 检查动态路由页面中的 `generateStaticParams` 函数

### 问题 2：动态路由 404

**解决方案**：
- 确保 `dynamicParams = false` 已设置
- 检查 `generateStaticParams` 返回正确的格式

### 问题 3：图片优化错误

**解决方案**：
- 已在 `next.config.js` 中设置 `images.unoptimized: true`
- 如果仍有问题，检查 Vercel 的图片优化设置

### 问题 4：构建超时

**解决方案**：
- 减少 `generateStaticParams` 生成的页面数量（如果需要）
- 检查是否有无限循环或性能问题

## 验证部署

部署成功后，访问以下 URL 验证：

- 首页：`https://your-domain.vercel.app/`
- JPG 转换器：`https://your-domain.vercel.app/to-jpg`
- WebP 转换器：`https://your-domain.vercel.app/to-webp`
- PNG 转换器：`https://your-domain.vercel.app/to-png`
- 动态路由示例：`https://your-domain.vercel.app/mng-to-webp`、`https://your-domain.vercel.app/cur-to-jpg`

## GitHub Actions 自动部署

项目已包含 `.github/workflows/deploy.yml`，但需要配置 Vercel secrets：

1. 在 Vercel 获取：
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

2. 在 GitHub 仓库设置中添加 Secrets：
   - Settings → Secrets and variables → Actions
   - 添加上述三个 secrets

3. 推送代码后会自动触发部署

## 本地构建测试

在部署前，建议先本地测试构建：

```bash
npm run build
npm run start
```

如果本地构建成功，部署通常也会成功。

---

## 一键推送并部署

1. **在资源管理器中** 打开 `C:\Users\heats\Desktop\tojpg`
2. **双击运行** `push-and-deploy.bat`
3. 按提示完成（若有弹窗请登录 GitHub，密码用 Personal Access Token）
4. 推送成功后，若已连接 Vercel，会自动触发部署

**注意**：请在 **本机 CMD** 或 **双击 .bat** 运行，不要使用 Cursor 内置终端。

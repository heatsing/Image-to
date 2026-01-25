# Image Converter - Next.js 项目

**GitHub 仓库**: https://github.com/heatsing/Image-to

## 快速开始

### 方法 1：使用启动脚本（推荐）

1. **双击运行** `start-dev.bat`（Windows）
2. 等待终端显示 `Ready` 或 `Local: http://localhost:3002`
3. 在浏览器打开 **http://localhost:3002/**

### 方法 2：手动启动

在 **PowerShell** 或 **CMD**（不要用 Cursor 内置终端）执行：

```bash
cd C:\Users\heats\Desktop\tojpg
npm run dev
```

然后打开 **http://localhost:3002/**

---

## 如果遇到问题

### 问题 1：看到 "Directory listing for /"

**原因**：你使用了静态文件服务器（Live Server、`file://` 等），而不是 Next.js 开发服务器。

**解决**：
- ❌ 不要用 `file://` 打开项目文件夹
- ❌ 不要用 Live Server 打开项目根目录
- ✅ 必须运行 `npm run dev` 启动 Next.js 服务器
- ✅ 然后访问 **http://localhost:3002/**

### 问题 2：spawn EPERM 错误

**原因**：Next.js 在部分环境（如 Cursor 内置终端）无法创建 worker 进程。

**解决**：
1. 在 **外部 PowerShell/CMD** 运行（不要用 Cursor 终端）
2. 或运行诊断：
   ```bash
   .\check-dev.ps1
   ```
3. 如果仍失败，尝试：
   ```bash
   set NODE_OPTIONS=--no-experimental-fetch
   npm run dev
   ```

### 问题 3：端口 3002 被占用

**解决**：
```bash
# 查看占用进程
netstat -ano | findstr :3002

# 或修改端口（编辑 package.json 的 dev 脚本）
npm run dev -- -p 3003
```

---

## 项目结构

```
tojpg/
├── app/                    # Next.js 页面
│   ├── page.tsx           # 首页
│   ├── to-jpg/            # JPG 转换器
│   ├── to-webp/           # WebP 转换器
│   └── to-png/            # PNG 转换器
├── components/            # React 组件
│   ├── Navigation.tsx      # 导航栏
│   └── UniversalImageConverter.tsx  # 转换器组件
├── start-dev.bat          # Windows 启动脚本
├── start-dev.ps1          # PowerShell 启动脚本
└── check-dev.ps1         # 诊断脚本
```

---

## 功能

- ✅ 支持 40+ 图片格式转换
- ✅ 本地转换（文件不离开设备）
- ✅ 拖放上传
- ✅ 实时预览
- ✅ 响应式设计

---

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

---

## 部署到生产环境

### Vercel（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 导入 GitHub 仓库 `heatsing/Image-to`
3. 在 **Settings → Environment Variables** 添加：`NEXT_PUBLIC_SITE_URL` = `https://sckde.com`
4. 绑定自定义域名 **https://sckde.com**（Settings → Domains）
5. Vercel 会自动检测 Next.js 并部署，几分钟后即可在线访问

### GitHub Pages

Next.js 需要服务端渲染，GitHub Pages 不支持。建议使用 Vercel 或 Netlify。

### Netlify

1. 访问 [Netlify](https://netlify.com)
2. 连接 GitHub 仓库
3. 构建命令：`npm run build`
4. 发布目录：`.next`

---

## 项目链接

- **生产站点**: [https://sckde.com](https://sckde.com)
- **GitHub**: https://github.com/heatsing/Image-to
- **本地开发**: http://localhost:3002

## SEO / 域名

- 默认 base URL：`https://sckde.com`（`lib/seo.ts`）
- Sitemap、robots、canonical、Open Graph、Logo 等均使用该域名
- 部署时设置 `NEXT_PUBLIC_SITE_URL=https://sckde.com` 以保持一致

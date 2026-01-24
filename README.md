# Image Converter - Next.js 项目

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

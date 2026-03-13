# 故障排除指南

## 请告诉我具体遇到了什么问题？

### 情况 A：开发服务器无法启动

**症状**：运行 `npm run dev` 后出现错误

**可能错误**：
- `spawn EPERM` → 见下方解决方案
- `Port 3002 is already in use` → 端口被占用
- `Cannot find module` → 依赖未安装

**解决方案**：

1. **spawn EPERM**：
   ```bash
   # 在外部 PowerShell（不要用 Cursor 终端）
   cd C:\Users\heats\Desktop\tojpg
   .\start-dev.ps1
   ```

2. **端口被占用**：
   ```bash
   # 查看占用
   netstat -ano | findstr :3002
   # 或换端口
   npm run dev -- -p 3003
   ```

3. **依赖问题**：
   ```bash
   rmdir /s /q node_modules
   npm install
   ```

---

### 情况 B：服务器启动了，但浏览器显示 "Directory listing"

**症状**：浏览器显示文件列表而不是应用界面

**原因**：你访问的不是 Next.js 服务器

**解决**：
- ❌ 不要用 `file://C:/Users/heats/Desktop/tojpg/` 打开
- ❌ 不要用 Live Server 打开项目根目录
- ✅ 确保 `npm run dev` 正在运行
- ✅ 在浏览器地址栏输入：**http://localhost:3002/**（注意是 `http://` 不是 `file://`）

---

### 情况 C：服务器启动成功，但页面空白或样式错误

**症状**：能看到页面但 UI 不正常

**可能原因**：
1. Tailwind CSS 未编译
2. 浏览器缓存
3. 组件错误

**解决**：
1. 清除浏览器缓存（Ctrl+Shift+Delete）
2. 硬刷新（Ctrl+F5）
3. 检查终端是否有编译错误

---

### 情况 D：其他错误

请提供：
1. 终端显示的完整错误信息
2. 浏览器控制台（F12）的错误信息
3. 你执行的具体命令

---

## 快速诊断

运行诊断脚本：

```powershell
.\check-dev.ps1
```

这会检查：
- Node.js 和 npm 是否安装
- 依赖是否完整
- 端口是否可用
- 尝试启动服务器

---

## 如果所有方法都失败

请提供以下信息：
1. 你运行的具体命令
2. 终端显示的完整错误信息（截图或复制文本）
3. 浏览器地址栏显示的 URL
4. 浏览器控制台（F12）的错误信息

这样我可以更准确地帮你解决问题。

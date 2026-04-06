# GitHub 部署说明

## 当前状态

✅ Git 仓库已初始化  
✅ 所有文件已提交（21 个文件）  
✅ 远程仓库已配置：`https://github.com/heatsing/Image-to.git`  
⏳ 等待推送到 GitHub（需要身份验证）

---

## 推送方法

### 方法 1：使用部署脚本（推荐）

双击运行 **`deploy-to-github.bat`**，按提示操作。

### 方法 2：手动推送

在 **PowerShell** 或 **CMD** 执行：

```bash
cd C:\Users\heats\Desktop\tojpg
git push -u origin main
```

---

## 身份验证

推送时 GitHub 会要求身份验证：

### 使用 HTTPS（默认）

- **用户名**：`heatsing`
- **密码**：**GitHub Personal Access Token**（不是账户密码）

#### 如何创建 Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置名称（如 "Image-to deploy"）
4. 勾选权限：`repo`（完整仓库访问）
5. 点击 "Generate token"
6. **复制 token**（只显示一次）
7. 推送时，密码处粘贴这个 token

### 使用 SSH（推荐，更安全）

1. **生成 SSH 密钥**（如果还没有）：
   ```bash
   ssh-keygen -t ed25519 -C "heatsinghaiqing@gmail.com"
   ```

2. **添加 SSH 密钥到 GitHub**：
   - 复制 `~/.ssh/id_ed25519.pub` 内容
   - 访问：https://github.com/settings/keys
   - 点击 "New SSH key"，粘贴并保存

3. **更改远程 URL**：
   ```bash
   git remote set-url origin git@github.com:heatsing/Image-to.git
   git push -u origin main
   ```

---

## 如果远程仓库已有内容

如果 GitHub 仓库已有文件，需要先拉取：

```bash
git pull origin main --allow-unrelated-histories
# 解决可能的冲突后
git push -u origin main
```

---

## 已提交的文件

- ✅ 所有源代码（app/, components/）
- ✅ 配置文件（next.config.js, package.json, tsconfig.json 等）
- ✅ 文档（README.md, BUILD.md, TROUBLESHOOTING.md）
- ✅ 启动脚本（start-dev.bat, start-dev.ps1, check-dev.ps1）
- ❌ node_modules/（已忽略）
- ❌ .next/（已忽略）

---

## 部署后

推送成功后，可以：

1. **查看仓库**：https://github.com/heatsing/Image-to
2. **设置 GitHub Pages**（如果需要静态部署）
3. **配置 Vercel/Netlify** 自动部署（推荐）

### Vercel 部署（推荐）

1. 访问：https://vercel.com
2. 导入 GitHub 仓库 `heatsing/Image-to`
3. Vercel 会自动检测 Next.js 并部署
4. 几分钟后即可在线访问

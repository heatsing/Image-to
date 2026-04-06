# 部署说明

## ⚠️ 当前状态

由于沙箱环境限制，无法直接执行 git 推送操作。请按照以下步骤在本地完成部署：

## 📋 部署步骤

### 方法 1：使用批处理脚本（推荐）

1. **打开 Windows 资源管理器**
2. **导航到**: `C:\Users\heats\Desktop\tojpg`
3. **双击运行**: `push-and-deploy.bat`
4. **按照提示操作**（如果需要输入 GitHub 凭据）

### 方法 2：手动执行 Git 命令

打开 **CMD** 或 **PowerShell**（不是 Cursor 终端），执行：

```bash
cd C:\Users\heats\Desktop\tojpg

# 1. 清理可能的锁定文件
if exist .git\index.lock del .git\index.lock

# 2. 暂存所有变更
git add -A

# 3. 排除构建文件
git reset HEAD tsconfig.tsbuildinfo

# 4. 提交
git commit -m "feat: 添加完整的多语言支持系统 (18种语言)"

# 5. 推送到 GitHub
git push origin main
```

## 🔐 GitHub 认证

如果遇到认证问题，请：

1. **使用 Personal Access Token (推荐)**
   - 访问: https://github.com/settings/tokens
   - 创建新的 token (需要 `repo` 权限)
   - 使用 token 作为密码

2. **或配置 SSH 密钥**
   ```bash
   git remote set-url origin git@github.com:heatsing/Image-to.git
   ```

## ✅ 验证部署

推送成功后：

1. **检查 GitHub 仓库**: https://github.com/heatsing/Image-to
2. **检查 Vercel 部署**（如果已连接）:
   - 访问 Vercel 仪表板
   - 查看自动部署状态
3. **测试网站**: https://sckde.com
   - 验证多语言切换
   - 检查所有语言版本

## 📝 本次提交包含

- ✅ 18 种语言支持
- ✅ 所有页面迁移到 `app/[locale]/` 结构
- ✅ 语言切换器组件
- ✅ SEO 优化（hreflang、canonical）
- ✅ 中间件自动语言检测
- ✅ 所有组件多语言支持

## 🎯 预期结果

推送成功后，Vercel 会自动：
1. 检测到新的提交
2. 开始构建项目
3. 部署到生产环境

构建时间可能需要几分钟，请耐心等待。

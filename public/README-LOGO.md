# Logo 文件说明

**站点域名**: [https://sckde.com](https://sckde.com)  
Logo 与 Open Graph 图片均使用该域名的绝对路径。

## 需要的文件

### 1. `public/logo.svg` ✅ (已创建示例)
- **用途**: Header 导航栏 Logo
- **推荐尺寸**: 40x40px 或更大（SVG 可缩放）
- **当前**: 已有一个示例 SVG Logo（蓝色渐变背景，白色图标）

### 2. `app/icon.svg` ✅ (已创建)
- **用途**: 浏览器标签页图标（Favicon）
- **推荐尺寸**: 32x32px（SVG 可缩放）
- **当前**: Next.js 会自动处理此文件作为 favicon

### 3. `public/logo.png` ⚠️ (需要添加)
- **用途**: Open Graph 图片（社交媒体分享）、Apple Touch Icon
- **推荐尺寸**: 
  - Open Graph: 1200x630px
  - Apple Touch Icon: 512x512px
- **格式**: PNG，透明背景可选
- **状态**: **请添加你的 Logo PNG 文件**

### 4. `public/favicon.ico` (可选)
- **用途**: 旧版浏览器兼容的 ICO 格式 favicon
- **推荐尺寸**: 16x16px, 32x32px, 48x48px（多尺寸 ICO 文件）
- **格式**: ICO
- **生成工具**: https://favicon.io/ 或 https://realfavicongenerator.net/
- **状态**: 可选，`app/icon.svg` 已足够

## 如何替换

1. **替换 Header Logo**: 直接覆盖 `public/logo.svg` 文件
2. **替换 Favicon**: 直接覆盖 `app/icon.svg` 文件
3. **添加 Open Graph 图片**: 将你的 Logo PNG 文件放入 `public/logo.png`（必需）
4. **添加 ICO Favicon** (可选): 将你的 ICO 文件放入 `public/favicon.ico`

## 当前配置

- **Header Logo**: 使用 `/logo.svg`（通过 Next.js Image 组件）
- **Favicon**: 使用 `app/icon.svg`（Next.js 自动处理）
- **Open Graph**: 使用 `/logo.png`（需要添加）
- **Twitter Card**: 使用 `/logo.png`（需要添加）
- **Apple Touch Icon**: 使用 `/logo.png`（需要添加）

## 注意事项

- 所有 `public/` 文件夹中的文件路径都是相对于网站根路径的
- `app/icon.svg` 会被 Next.js 自动处理为 favicon
- 确保图片文件大小合理（建议 < 500KB）
- Logo 应该清晰，在不同尺寸下都能正常显示
- **重要**: 请添加 `public/logo.png` 文件以启用 Open Graph 和社交媒体分享图片

# 多语言系统迁移指南

## 已完成的工作

### 1. i18n 配置 (`lib/i18n/config.ts`)
- ✅ 定义了 18 种语言
- ✅ 语言切换工具函数（`getLocaleFromPath`, `addLocaleToPath`, `removeLocaleFromPath`）
- ✅ 语言名称和国旗 emoji 映射

### 2. 翻译文件 (`lib/i18n/messages/*.json`)
- ✅ 已创建：en, zh-cn, zh-tw, es, fr, de, ja, ko, pt, it, ru, ar, nl, pl, tr, vi, th, id
- ✅ 统一的 JSON 结构（common, nav, home, converter, benefits, faq, footer）

### 3. 语言切换器 (`components/LanguageSwitcher.tsx`)
- ✅ 下拉菜单，显示所有语言
- ✅ 当前语言高亮
- ✅ 点击切换语言并跳转

### 4. 路由结构
- ✅ 创建了 `app/[locale]/layout.tsx` 和 `app/[locale]/page.tsx`
- ✅ 中间件 (`middleware.ts`) 自动检测语言并重定向

### 5. Navigation 更新
- ✅ 支持多语言文本
- ✅ 集成了 Language Switcher
- ✅ 路由自动添加 locale 前缀

## 待完成的工作

### 需要迁移的页面

以下页面需要移动到 `app/[locale]/` 目录并更新为使用翻译：

1. **`app/convert-to-jpg/page.tsx`** → `app/[locale]/convert-to-jpg/page.tsx`
2. **`app/convert-to-webp/page.tsx`** → `app/[locale]/convert-to-webp/page.tsx`
3. **`app/convert-to-png/page.tsx`** → `app/[locale]/convert-to-png/page.tsx`
4. **`app/[slug]/page.tsx`** → `app/[locale]/[slug]/page.tsx`
5. **`app/about/page.tsx`** → `app/[locale]/about/page.tsx`
6. **`app/contact/page.tsx`** → `app/[locale]/contact/page.tsx`
7. **`app/privacy/page.tsx`** → `app/[locale]/privacy/page.tsx`
8. **`app/security/page.tsx`** → `app/[locale]/security/page.tsx`
9. **`app/terms/page.tsx`** → `app/[locale]/terms/page.tsx`

### 需要更新的组件

1. **`components/Footer.tsx`** - 使用翻译
2. **`components/FAQ.tsx`** - 使用翻译（FAQ_DATA 需要多语言版本）
3. **`components/BenefitsSection.tsx`** - 使用翻译
4. **`components/FormatGrid.tsx`** - 使用翻译

### 需要更新的工具文件

1. **`lib/faq-data.ts`** - 改为多语言结构或创建 `lib/i18n/messages/faq-*.json`
2. **`app/sitemap.ts`** - 为每种语言生成 URL
3. **`app/robots.ts`** - 保持不变（已支持）

## 快速迁移步骤

### 步骤 1: 更新根 layout

将 `app/layout.tsx` 改为简单的包装器，实际布局在 `app/[locale]/layout.tsx`：

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

### 步骤 2: 迁移页面

对于每个页面（如 `convert-to-jpg`），创建 `app/[locale]/convert-to-jpg/page.tsx`：

```tsx
import { type Locale } from '@/lib/i18n/config'
import { getMessages, t } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/i18n/config'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)
  // ... 使用 messages 生成 metadata
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const messages = getMessages(locale)
  // 使用 messages.common.siteName, messages.nav.imagesToJpg 等
}
```

### 步骤 3: 更新组件

所有组件需要接收 `locale` prop 或使用 `usePathname()` 获取 locale。

## 示例：完整的 convert-to-jpg 页面

参考 `app/[locale]/page.tsx` 的实现方式。

## SEO 配置

已在 `app/[locale]/layout.tsx` 中配置：
- ✅ `alternates.languages` - 所有语言版本的 URL
- ✅ `openGraph.alternateLocale` - OG 多语言
- ✅ `canonical` URL 包含 locale（默认语言除外）

## 下一步

1. 迁移所有页面到 `app/[locale]/` 目录
2. 更新所有组件使用翻译
3. 测试所有语言切换
4. 更新 sitemap 包含所有语言版本

# Sitemap.xml 404 错误修复指南

## 问题描述
Google Search Console 在访问 `https://sckde.com/sitemap.xml` 时返回 404 错误。

## 已实施的修复

### 1. 中间件排除逻辑
在 `middleware.ts` 中添加了双重保护：

**函数内部检查**：
```typescript
const seoFiles = ['/sitemap.xml', '/robots.txt', '/sitemap', '/robots']
const isSeoFile = seoFiles.includes(pathname) || 
                  pathname.endsWith('.xml') || 
                  pathname.endsWith('.txt')
if (isSeoFile) {
  return NextResponse.next()
}
```

**Matcher 配置排除**：
```typescript
'/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)'
```

### 2. Sitemap.ts 配置
- 文件位置：`app/sitemap.ts`
- 导出格式：`export default function sitemap(): MetadataRoute.Sitemap`
- 包含所有语言版本和动态页面

## 验证步骤

### 1. 本地测试
```bash
# 启动开发服务器
npm run dev

# 访问以下 URL 应该返回 XML 内容，而不是重定向：
# http://localhost:3000/sitemap.xml
# http://localhost:3000/robots.txt
```

### 2. 生产环境验证
部署后，访问以下 URL 应该直接返回 XML/TXT 内容：
- `https://sckde.com/sitemap.xml` - 应该返回站点地图 XML
- `https://sckde.com/robots.txt` - 应该返回 robots.txt

### 3. Google Search Console 验证
1. 访问 https://search.google.com/search-console
2. 选择你的网站属性
3. 进入 "站点地图" 部分
4. 输入 `sitemap.xml`
5. 点击 "测试" 按钮
6. 应该显示 "成功" 而不是 404 错误

## 可能的问题和解决方案

### 问题 1: 仍然返回 404
**原因**：可能是构建或部署问题
**解决方案**：
1. 确保 `app/sitemap.ts` 文件存在且格式正确
2. 重新构建项目：`npm run build`
3. 检查构建日志中是否有错误
4. 重新部署到 Vercel

### 问题 2: 返回重定向
**原因**：中间件仍然在拦截
**解决方案**：
1. 检查 `middleware.ts` 的 matcher 配置
2. 确保 `sitemap.xml` 和 `robots.txt` 在排除列表中
3. 清除 Vercel 缓存并重新部署

### 问题 3: 返回空内容或错误
**原因**：sitemap.ts 函数执行错误
**解决方案**：
1. 检查 `lib/i18n/config.ts` 中的 `locales` 和 `addLocaleToPath` 函数
2. 检查 `lib/formats.ts` 中的 `ALL_CONVERTER_SLUGS` 导出
3. 检查 `lib/seo.ts` 中的 `getBaseUrl()` 函数
4. 查看服务器日志中的错误信息

## 技术细节

### Next.js App Router Sitemap
在 Next.js App Router 中：
- `app/sitemap.ts` 文件会自动生成 `/sitemap.xml` 路由
- 函数必须导出默认函数
- 返回类型必须是 `MetadataRoute.Sitemap`
- 中间件不应该拦截这个路由

### 中间件执行顺序
1. 请求到达服务器
2. 中间件 matcher 检查路径是否匹配
3. 如果匹配，执行中间件函数
4. 如果路径是 sitemap.xml，函数内部检查并返回 `NextResponse.next()`
5. Next.js 路由处理器处理请求

## 部署检查清单

- [ ] `app/sitemap.ts` 文件存在且格式正确
- [ ] `middleware.ts` 正确排除 sitemap.xml 和 robots.txt
- [ ] 构建成功，无错误
- [ ] 部署到生产环境
- [ ] 访问 `https://sckde.com/sitemap.xml` 返回 XML
- [ ] Google Search Console 测试通过

## 联系支持
如果问题仍然存在，请检查：
1. Vercel 部署日志
2. 浏览器开发者工具的网络请求
3. Google Search Console 的详细错误信息

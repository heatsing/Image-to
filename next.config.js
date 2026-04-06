/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // 对于 Vercel 部署
  },
  // 构建时跳过 ESLint / TypeScript 检查（可单独运行 npm run lint / tsc --noEmit）
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig

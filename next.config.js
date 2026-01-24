/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // 自定义 webpack 会禁用 webpack build worker
  webpack: (config) => config,
  // 构建时跳过 ESLint / TypeScript 检查，避免 Windows 上 worker spawn EPERM（可单独运行 npm run lint / tsc --noEmit）
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // 禁用所有实验性功能，减少 worker 使用
  experimental: {
    webpackBuildWorker: false,
  },
}

module.exports = nextConfig

# 诊断脚本 - 检查开发环境
Write-Host "=== Next.js 开发环境诊断 ===" -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js
Write-Host "1. 检查 Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "   ✓ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   ✗ Node.js 未安装或不在 PATH" -ForegroundColor Red
    exit 1
}

# 检查 npm
Write-Host "2. 检查 npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "   ✓ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "   ✗ npm 未安装" -ForegroundColor Red
    exit 1
}

# 检查依赖
Write-Host "3. 检查项目依赖..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✓ node_modules 存在" -ForegroundColor Green
} else {
    Write-Host "   ✗ node_modules 不存在，需要运行 npm install" -ForegroundColor Red
    exit 1
}

# 检查端口
Write-Host "4. 检查端口 3002..." -ForegroundColor Yellow
$portInUse = Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "   ⚠ 端口 3002 已被占用" -ForegroundColor Yellow
    Write-Host "   占用进程: $($portInUse.OwningProcess)" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ 端口 3002 可用" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== 尝试启动开发服务器 ===" -ForegroundColor Cyan
Write-Host "如果出现 spawn EPERM，请在外部 PowerShell 窗口运行此脚本" -ForegroundColor Yellow
Write-Host ""

$env:NODE_OPTIONS = "--no-experimental-fetch"
npm run dev

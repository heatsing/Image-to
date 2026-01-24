# PowerShell 启动脚本
Write-Host ""
Write-Host "[tojpg] 正在启动 Next.js 开发服务器..." -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

if (-not (Test-Path "node_modules")) {
    Write-Host "未检测到 node_modules，正在安装依赖..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "安装失败。" -ForegroundColor Red
        Read-Host "按 Enter 键退出"
        exit 1
    }
}

Write-Host ""
Write-Host "启动后请在浏览器打开:  http://localhost:3002/" -ForegroundColor Green
Write-Host "勿使用 file:// 或 其他静态服务器预览。" -ForegroundColor Yellow
Write-Host ""

# 设置环境变量禁用 worker
$env:NODE_OPTIONS = "--no-experimental-fetch"
npm run dev

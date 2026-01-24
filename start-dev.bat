@echo off
chcp 65001 >nul
echo.
echo [tojpg] 正在启动 Next.js 开发服务器...
echo.
cd /d "%~dp0"

if not exist "node_modules" (
    echo 未检测到 node_modules，正在安装依赖...
    call npm install
    if errorlevel 1 ( echo 安装失败。 & pause & exit /b 1 )
)

echo.
echo 启动后请在浏览器打开:  http://localhost:3002/
echo 勿使用 file:// 或 其他静态服务器预览。
echo.
call npm run dev
pause

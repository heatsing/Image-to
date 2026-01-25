@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo [推送并部署] Image-to → https://github.com/heatsing/Image-to.git
echo 请在本机 CMD 或资源管理器中双击运行，勿在 Cursor 内置终端运行。
echo.

echo 1. 暂存变更（排除 tsconfig.tsbuildinfo）...
git add -A
git reset HEAD tsconfig.tsbuildinfo 2>nul

echo.
echo 2. 检查状态...
git status

echo.
echo 3. 提交...
git commit -m "SEO: update all meta titles to '[Description] | Sckde.com' format" 2>nul
if errorlevel 1 (
    echo 无新提交或已提交，继续推送...
) else (
    echo 提交完成。
)

echo.
echo 4. 推送到 GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo 推送失败。请检查：
    echo   - 身份验证：用户名 heatsing，密码用 Personal Access Token
    echo   - 或运行: git pull origin main --rebase 后再 push
    echo.
) else (
    echo.
    echo ✓ 推送成功！
    echo 仓库: https://github.com/heatsing/Image-to
    echo Vercel 部署：连接该仓库后会自动部署。
    echo.
)

pause

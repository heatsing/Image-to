@echo off
chcp 65001 >nul
echo.
echo [GitHub 部署] 正在推送到 https://github.com/heatsing/Image-to.git
echo.
cd /d "%~dp0"

echo 检查 Git 状态...
git status

echo.
echo 如果远程仓库已有内容，可能需要先拉取：
echo   git pull origin main --allow-unrelated-histories
echo.
echo 推送代码到 GitHub...
echo 注意：如果提示输入用户名和密码，请使用：
echo   - 用户名：heatsing
echo   - 密码：GitHub Personal Access Token（不是账户密码）
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo 推送失败。可能的原因：
    echo 1. 需要 GitHub 身份验证
    echo 2. 远程仓库已有内容需要先拉取
    echo.
    echo 解决方案：
    echo 1. 使用 Personal Access Token 作为密码
    echo 2. 或运行: git pull origin main --allow-unrelated-histories
    echo 3. 或使用 SSH: git remote set-url origin git@github.com:heatsing/Image-to.git
    echo.
) else (
    echo.
    echo ✓ 部署成功！
    echo 查看仓库: https://github.com/heatsing/Image-to
    echo.
)

pause

@echo off
echo 开始部署到GitHub Pages...

:: 构建
call npm run build

:: 进入构建文件夹
cd dist

:: 初始化Git仓库
git init
git add -A
git commit -m "deploy"

:: 推送到GitHub Pages
git push -f git@github.com:yuluo25/to-do-web.git main:gh-pages

:: 返回上级目录
cd ..

echo 部署完成！ 
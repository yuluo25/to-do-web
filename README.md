# To-Do Web 应用

这是一个基于Vue 3的待办事项Web应用，支持用户注册、登录和任务管理功能。

## 项目设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run serve
```

## GitHub Pages部署

### 自动部署（推荐）

本项目已配置GitHub Actions工作流，当您推送代码到main分支时，会自动构建并部署到GitHub Pages。

1. 将代码推送到GitHub仓库：

```bash
git add .
git commit -m "初始提交"
git push origin main
```

2. 在GitHub仓库设置中启用GitHub Pages，选择gh-pages分支作为源。

### 手动部署

#### Linux/Mac用户

如果您想手动部署，可以使用项目根目录下的`deploy.sh`脚本：

1. 编辑`deploy.sh`文件，将`<USERNAME>`替换为您的GitHub用户名。
2. 确保脚本有执行权限：

```bash
chmod +x deploy.sh
```

3. 运行脚本：

```bash
./deploy.sh
```

#### Windows用户

Windows用户可以使用`deploy.bat`批处理脚本：

1. 编辑`deploy.bat`文件，将`<USERNAME>`替换为您的GitHub用户名。
2. 双击运行脚本或在命令提示符中执行：

```cmd
deploy.bat
```

## 注意事项

- 确保在`vite.config.ts`中的`base`配置与您的GitHub仓库名称一致。
- 如果您更改了仓库名称，请同时更新`vite.config.ts`和`src/router.ts`中的路径。
- 确保您的GitHub仓库已启用GitHub Pages功能，并选择了正确的分支（gh-pages）。 ！
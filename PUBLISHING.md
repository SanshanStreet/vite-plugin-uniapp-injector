# npm 发布步骤指南

## 快速发布命令
```bash
pnpm release
```
此命令会自动执行清理、构建、版本更新和发布流程。

## 详细步骤说明

### 1. 准备工作
```bash
# 检查工作区状态
git status

# 拉取最新代码
git pull origin main

# 安装依赖
pnpm install
```

### 2. 代码检查和构建
```bash
# 清理旧构建文件
pnpm run clean

# 代码格式化和检查
pnpm run format
pnpm run lint

# 构建项目
pnpm run build
```

### 3. 版本更新和发布
```bash
# 检查 npm 登录状态
npm whoami
# 未登录则执行
npm login

# 执行发布流程
pnpm release
```

### 4. 验证发布
```bash
# 检查发布状态
npm view vite-plugin-uniapp-injector

# 验证最新版本
npm install -g vite-plugin-uniapp-injector@latest
```

## 发布注意事项

### 版本号规则
- patch: 0.0.x - 修复问题
- minor: 0.x.0 - 新功能
- major: x.0.0 - 破坏性更新

### 发布前检查清单
1. package.json 版本号正确
2. 依赖版本更新检查
3. README.md 更新检查
4. CHANGELOG.md 更新

### 常见问题处理

1. npm 登录失败
```bash
# 清除缓存
npm cache clean --force
# 重新登录
npm login
```

2. 发布权限问题
```bash
# 检查权限
npm access ls-packages
# 设置公共访问
npm access public vite-plugin-uniapp-injector
```

3. Git 提交失败
```bash
# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

4. 发布失败回滚
```bash
# 删除标签
git tag -d vX.X.X
git push origin :refs/tags/vX.X.X
```

## 命令解析

release 命令执行流程：
1. `pnpm run clean`: 清理构建文件
2. `pnpm run build`: 重新构建项目
3. `npx bumpp`: 交互式更新版本号
4. `git push`: 推送代码
5. `git tag`: 添加标签
6. `git commit`: 提交更改
7. `pnpm publish`: 发布到 npm

## 环境要求
- Node.js >= 16.0.0
- pnpm
- Git

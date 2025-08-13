# vite-plugin-uniapp-injector

一个专为 UniApp (Vue3 + Vite) 项目设计的插件，能在编译阶段自动向页面注入全局组件。完美支持小程序和 App 开发场景，特别适用于需要在所有页面中注入全局消息提示、对话框等组件的场景。

## ✨ 特性

- 🚀 **自动注入** - 编译时自动注入组件，零运行时开销
- 🎯 **精确匹配** - 支持精确的页面匹配和排除
- 📦 **分包支持** - 完整支持小程序分包
- 🛠 **灵活配置** - 支持全局和页面级别的精细化配置
- ⚡️ **高性能** - 智能缓存和增量编译支持
- 🔍 **类型安全** - 完整的 TypeScript 类型支持和智能提示
- 🎨 **路由类型** - 自动生成页面路由类型，支持自定义生成路径
- 💡 **智能提示** - 组件名称和页面路径的自动补全

## 🚀 快速开始

### 安装

```bash
# npm
npm install vite-plugin-uniapp-injector -D

# pnpm
pnpm add vite-plugin-uniapp-injector -D

# yarn
yarn add vite-plugin-uniapp-injector -D
```

### 基础配置

在 `vite.config.ts` 中配置插件：

```typescript
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UniViteRootInjector from 'vite-plugin-uniapp-injector';

//若配置dts，需手动引入
import type { Path } from './types/auto-route'; 

// 定义组件
const components = {
  message: '<gy-message ref="messageRef"></gy-message>',
  dialog: '<gy-dialog ref="dialogRef"></gy-dialog>',
} as const;

export default defineConfig({
  plugins: [
    uni(),
    UniViteRootInjector<Path, typeof components>({
      // 自定义路由类型生成路径
      dts: resolve(__dirname, 'types/auto-route.d.ts'),
      // 组件配置（支持自动类型推断）
      components,
      // 注入配置
      insertPos: {
        mode: 'GLOBAL',
        exclude: ['pages/login/index'],
        handlePos: [
          {
            page: 'pages/home/index', // 自动补全页面路径
            insert: ['message'], // 自动补全组件名称
          },
        ],
      },
    }),
  ],
});
```

### pages.json 配置示例

```json
{
  "pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "演示应用",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  }
}
```

## 📝 配置说明

### 插件配置项

| 配置项     | 说明                   | 类型                     | 默认值                |
| ---------- | ---------------------- | ------------------------ | --------------------- |
| dts        | 路由类型文件生成路径   | `string`                 | `src/auto-route.d.ts` |
| components | 全局组件配置映射       | `Record<string, string>` | `{}`                  |
| includes   | 需要处理的文件路径模式 | `string[]`               | `['src/**/*.vue']`    |
| insertPos  | 插入位置配置           | `InsertPosConfig`        | `{ mode: 'GLOBAL' }`  |
| watchFile  | 监听的文件路径         | `string`                 | `src/pages.json`      |

### InsertPosConfig 配置

| 配置项    | 说明           | 类型              | 默认值     |
| --------- | -------------- | ----------------- | ---------- |
| mode      | 注入模式       | `'GLOBAL'`        | `'GLOBAL'` |
| exclude   | 排除的页面路径 | `string[]`        | `[]`       |
| handlePos | 页面特定配置   | `HandlePosItem[]` | `[]`       |

### HandlePosItem 配置

| 配置项 | 说明               | 类型       | 默认值 |
| ------ | ------------------ | ---------- | ------ |
| page   | 页面路径           | `string`   | -      |
| insert | 需要插入的组件列表 | `string[]` | `[]`   |

## 💡 使用示例

### 基础用法

最简单的配置方式，向所有页面注入全局组件：

```typescript
UniViteRootInjector({
  components: {
    message: '<gy-message ref="messageRef"></gy-message>',
    dialog: '<gy-dialog ref="dialogRef"></gy-dialog>',
  },
});
```

### 排除特定页面

排除不需要注入组件的页面：

```typescript
UniViteRootInjector({
  components: {
    message: '<gy-message ref="messageRef"></gy-message>',
  },
  insertPos: {
    mode: 'GLOBAL',
    exclude: ['pages/login/index', 'pages/register/index'],
  },
});
```

### 页面特定配置

为不同页面配置不同的组件：

```typescript
UniViteRootInjector({
  components: {
    message: '<gy-message ref="messageRef"></gy-message>',
    dialog: '<gy-dialog ref="dialogRef"></gy-dialog>',
    privacy: '<privacy-modal></privacy-modal>',
  },
  insertPos: {
    mode: 'GLOBAL',
    handlePos: [
      {
        page: 'pages/home/index',
        insert: ['message', 'privacy'],
      },
      {
        page: 'pages/user/profile',
        insert: ['dialog'],
      },
    ],
  },
});
```

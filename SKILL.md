---
name: "taro-shadcn-cli-helper"
description: "教用户如何使用 taro-shadcn CLI 初始化项目和添加组件。当用户询问 CLI 用法或如何创建组件时调用。"
---

# Taro Shadcn CLI 助手

本 Skill 旨在指导用户如何使用 `taro-shadcn` CLI 来快速集成 UI 组件到 Taro 项目中。

## 快速开始

### 1. 初始化项目

在使用任何组件之前，你需要先初始化你的项目。这会创建 `components.json` 配置文件并安装基础依赖。

```bash
npx taro-shadcn init
```

在初始化过程中，你可以选择：
- **组件目录**：默认是 `src/components`。
- **Utils 目录**：默认是 `src/lib/utils`。
- **安装基础依赖**：包括 `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react-taro`。

### 2. 添加组件

使用 `add` 命令将组件添加到你的项目中。

```bash
# 添加单个组件
npx taro-shadcn add button

# 一次性添加多个组件
npx taro-shadcn add button accordion badge
```

**常用选项**：
- `-y, --yes`: 跳过所有确认提示。
- `-o, --overwrite`: 如果组件已存在，直接覆盖。

## 目录结构

初始化后，你的项目结构通常如下：

```text
src/
  lib/
    utils/
      index.ts      # 导出的 cn 辅助函数
  components/
    ui/
      button.tsx    # 自动生成的组件
components.json     # CLI 配置文件
```

## 注意事项

- 确保你在一个有效的 Taro 项目根目录下运行命令。
- `taro-shadcn` 依赖于 Tailwind CSS，请确保你的项目已配置好 Tailwind。
- 如果某些组件有额外的依赖（如 `calendar` 依赖 `date-fns`），CLI 会提示你安装。

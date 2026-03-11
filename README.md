# Taro Shadcn UI

> **基于 Taro 4 为小程序带来 shadcn/ui 体验。**

[📖 官方文档](https://taro-shadcn.rocke.top)

[![Taro 4](https://img.shields.io/badge/Taro-4.1.9-blue.svg)](https://docs.taro.zone/)
[![React 18](https://img.shields.io/badge/React-18.0.0-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.1.18-38b2ac.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Taro Shadcn UI** 是一个生产就绪的 UI 组件库，构建于 [Taro 4](https://docs.taro.zone/)、[React](https://reactjs.org/) 和 [Tailwind CSS 4](https://tailwindcss.com/) 之上。它提供了 [shadcn/ui](https://ui.shadcn.com/) 优雅的设计和开发体验，并专门针对小程序生态系统进行了优化。

---

## ✨ 特性

- 🚀 **专为 Taro 4 打造**: 针对最新的 Taro 4 框架进行了优化，支持微信小程序、字节跳动小程序和 H5。
- 📱 **100% 小程序兼容**: 对 Radix UI 或其他重型 DOM 库零依赖。所有组件均使用 Taro 原生组件和 Hook 重新构建。
- 🎨 **Shadcn UI 设计**: 美观、易用且高度可定制的组件，灵感源自 shadcn/ui。
- ⚡ **Tailwind CSS 4**: 利用最新的 Tailwind CSS 4 特性进行样式开发，并配合 `weapp-tailwindcss` 实现无缝的小程序集成。
- 🛠️ **CLI 工具**: 自动化的项目初始化、组件添加和依赖管理。
- 📦 **Monorepo 架构**: 组件、文档和 CLI 工具之间清晰的关注点分离。

---

## AI 助手接入

本项目提供了 [SKILL.md](https://github.com/louisyoungx/taro-shadcn/blob/main/SKILL.md)，方便 AI 助手快速了解如何使用本库。

也可使用 skills CLI 一键安装到你的 AI 助手：

```bash
npx skills add louisyoungx/taro-shadcn
```

---

## 📁 项目结构

本项目是一个由 pnpm 管理的 monorepo：

- [packages/components](packages/components): 核心 UI 组件库。
- [packages/docs](packages/docs): 文档和展示应用 (Taro 4)。
- [packages/cli](packages/cli): 用于向项目添加组件的 CLI 工具。

---

## 🧩 组件

该库包含 40 多个 UI 组件，旨在跨所有支持的平台运行。

| 类别                        | 组件                                                                                                    |
| :-------------------------- | :------------------------------------------------------------------------------------------------------ |
| **通用 (General)**          | Button, Button Group, Badge, Icon (Lucide), Typography                                                  |
| **布局 (Layout)**           | Aspect Ratio, Card, Separator, Resizable, Scroll Area                                                   |
| **导航 (Navigation)**       | Breadcrumb, Navigation Menu, Pagination, Tabs                                                           |
| **表单 (Form)**             | Checkbox, Input, Input Group, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Calendar |
| **数据展示 (Data Display)** | Accordion, Avatar, Carousel, Collapsible, Hover Card, Progress, Table, Tooltip                          |
| **反馈 (Feedback)**         | Alert, Alert Dialog, Dialog, Drawer, Popover, Sheet, Skeleton, Sonner, Toast                            |
| **高级 (Advanced)**         | Command, Context Menu, Menubar, Portal                                                                  |

---

## 🚀 快速开始

### 🛠️ 使用 CLI

CLI 旨在自动化您的工作流程。它处理环境设置、组件复制和依赖安装。

#### 1. 初始化项目

运行 `init` 以设置 `components.json` 并生成必要的工具文件（如 `src/lib/utils/index.ts`）：

```bash
pnpm dlx taro-shadcn@latest init
```

#### 2. 添加组件

向您的项目添加特定组件。CLI 将自动检测并安装所需的依赖项：

```bash
pnpm dlx taro-shadcn@latest add button accordion
```

---

## 💻 开发

### 运行文档应用

您也可以直接访问 [在线预览/文档](https://taro-shadcn.rocke.top/)。

以 H5 模式运行文档应用：

```bash
pnpm dev:docs
```

在其他平台运行：

```bash
cd packages/docs
pnpm dev:weapp    # 微信小程序
pnpm dev:tt       # 字节跳动小程序
```

### 运行测试

我们使用 **Vitest** 进行 CLI 的 E2E 测试：

```bash
pnpm test:cli
```

---

## 📄 许可证

MIT 许可证。有关更多信息，请参阅 [LICENSE](LICENSE)。

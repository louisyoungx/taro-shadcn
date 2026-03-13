<p align="center">
  <a href="https://taro-shadcn.rocke.top">
    <img src="https://github.com/louisyoungx/taro-shadcn/blob/main/packages/docs/src/assets/logo.png" alt="Lucide - Beautiful & consistent icon toolkit made by the community. Open-source project and a fork of Feather Icons." width="120">
  </a>
</p>

<p align="center">
  <a href="https://github.com/louisyoungx/taro-shadcn/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/taro-shadcn?style=flat-square&color=black" alt="license"></a>
  <a href="https://www.npmjs.com/package/taro-shadcn"><img src="https://img.shields.io/npm/v/taro-shadcn?style=flat-square&color=black" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/taro-shadcn"><img src="https://img.shields.io/npm/dm/taro-shadcn?style=flat-square&color=black" alt="npm downloads"></a>
  <a href="https://taro-shadcn.rocke.top"><img src="https://img.shields.io/badge/Docs-latest-black.svg?style=flat-square" alt="docs"></a>
</p>

# Taro Shadcn UI

> **基于 Taro 4 为小程序带来 shadcn/ui 体验。**

**Taro Shadcn UI** 是一个生产就绪的 UI 组件库，构建于 [Taro 4](https://docs.taro.zone/)、[React](https://reactjs.org/) 和 [Tailwind CSS 4](https://tailwindcss.com/) 之上。它提供了 [shadcn/ui](https://ui.shadcn.com/) 优雅的设计和开发体验，并专门针对小程序生态系统进行了优化。

[查看官方文档](https://taro-shadcn.rocke.top)

## 特性

- 🚀 **专为 Taro 4 打造**: 针对最新的 Taro 4 框架进行了优化，支持微信小程序、字节跳动小程序和 H5。
- 📱 **100% 小程序兼容**: 对 Radix UI 或其他重型 DOM 库零依赖。所有组件均使用 Taro 原生组件和 Hook 重新构建。
- 🎨 **Shadcn UI 设计**: 美观、易用且高度可定制的组件，灵感源自 shadcn/ui。
- ⚡ **Tailwind CSS 4**: 利用最新的 Tailwind CSS 4 特性进行样式开发，并配合 `weapp-tailwindcss` 实现无缝的小程序集成。
- 🛠️ **CLI 工具**: 自动化的项目初始化、组件添加和依赖管理。
- 📦 **Monorepo 架构**: 组件、文档和 CLI 工具之间清晰的关注点分离。

## AI 助手接入

本项目提供了 [SKILL.md](https://github.com/louisyoungx/taro-shadcn/blob/main/SKILL.md)，方便 AI 助手快速了解如何使用本库。

也可使用 skills CLI 一键安装到你的 AI 助手：

```bash
npx skills add louisyoungx/taro-shadcn
```

## 快速开始

向项目添加特定组件。CLI 将自动检测并安装所需的依赖项：

```bash
pnpm dlx taro-shadcn@latest add button accordion
```

## 组件

[在线预览所有组件](https://taro-shadcn.rocke.top/)

> 组件源文件（registry）：`packages/docs/src/components/ui/*.tsx`  
> 文档页面路由：`packages/docs/src/app.config.ts`

| 组件名称       | 描述               | 在线预览                   | 安装命令                                          |
| -------------- | ------------------ | -------------------------- | ------------------------------------------------- |
| Accordion      | 折叠面板           | [预览][ui-accordion]       | `pnpm dlx taro-shadcn@latest add accordion`       |
| Alert          | 警告提示           | [预览][ui-alert]           | `pnpm dlx taro-shadcn@latest add alert`           |
| AlertDialog    | 警告对话框         | [预览][ui-alert-dialog]    | `pnpm dlx taro-shadcn@latest add alert-dialog`    |
| AspectRatio    | 固定宽高比容器     | [预览][ui-aspect-ratio]    | `pnpm dlx taro-shadcn@latest add aspect-ratio`    |
| Avatar         | 头像               | [预览][ui-avatar]          | `pnpm dlx taro-shadcn@latest add avatar`          |
| Badge          | 徽标/标签          | [预览][ui-badge]           | `pnpm dlx taro-shadcn@latest add badge`           |
| Breadcrumb     | 面包屑导航         | [预览][ui-breadcrumb]      | `pnpm dlx taro-shadcn@latest add breadcrumb`      |
| Button         | 按钮               | [预览][ui-button]          | `pnpm dlx taro-shadcn@latest add button`          |
| ButtonGroup    | 按钮组             | [预览][ui-button-group]    | `pnpm dlx taro-shadcn@latest add button-group`    |
| Calendar       | 日历选择           | [预览][ui-calendar]        | `pnpm dlx taro-shadcn@latest add calendar`        |
| Card           | 卡片容器           | [预览][ui-card]            | `pnpm dlx taro-shadcn@latest add card`            |
| Carousel       | 轮播               | [预览][ui-carousel]        | `pnpm dlx taro-shadcn@latest add carousel`        |
| Checkbox       | 复选框             | [预览][ui-checkbox]        | `pnpm dlx taro-shadcn@latest add checkbox`        |
| Collapsible    | 可折叠区域         | [预览][ui-collapsible]     | `pnpm dlx taro-shadcn@latest add collapsible`     |
| Command        | 命令面板/快捷搜索  | [预览][ui-command]         | `pnpm dlx taro-shadcn@latest add command`         |
| ContextMenu    | 右键菜单           | [预览][ui-context-menu]    | `pnpm dlx taro-shadcn@latest add context-menu`    |
| Dialog         | 对话框             | [预览][ui-dialog]          | `pnpm dlx taro-shadcn@latest add dialog`          |
| Drawer         | 抽屉               | [预览][ui-drawer]          | `pnpm dlx taro-shadcn@latest add drawer`          |
| DropdownMenu   | 下拉菜单           | [预览][ui-dropdown-menu]   | `pnpm dlx taro-shadcn@latest add dropdown-menu`   |
| Field          | 表单字段容器       | [预览][ui-field]           | `pnpm dlx taro-shadcn@latest add field`           |
| HoverCard      | 悬浮卡片           | [预览][ui-hover-card]      | `pnpm dlx taro-shadcn@latest add hover-card`      |
| Input          | 输入框             | [预览][ui-input]           | `pnpm dlx taro-shadcn@latest add input`           |
| InputGroup     | 输入组             | [预览][ui-input-group]     | `pnpm dlx taro-shadcn@latest add input-group`     |
| InputOTP       | 验证码输入         | [预览][ui-input-otp]       | `pnpm dlx taro-shadcn@latest add input-otp`       |
| Label          | 标签               | [预览][ui-label]           | `pnpm dlx taro-shadcn@latest add label`           |
| Menubar        | 菜单栏             | [预览][ui-menubar]         | `pnpm dlx taro-shadcn@latest add menubar`         |
| NavigationMenu | 导航菜单           | [预览][ui-navigation-menu] | `pnpm dlx taro-shadcn@latest add navigation-menu` |
| Pagination     | 分页               | [预览][ui-pagination]      | `pnpm dlx taro-shadcn@latest add pagination`      |
| Popover        | 气泡弹层           | [预览][ui-popover]         | `pnpm dlx taro-shadcn@latest add popover`         |
| Portal         | 传送门（挂载到根） | —                          | `pnpm dlx taro-shadcn@latest add portal`          |
| Progress       | 进度条             | [预览][ui-progress]        | `pnpm dlx taro-shadcn@latest add progress`        |
| RadioGroup     | 单选组             | [预览][ui-radio-group]     | `pnpm dlx taro-shadcn@latest add radio-group`     |
| Resizable      | 可调整大小面板     | [预览][ui-resizable]       | `pnpm dlx taro-shadcn@latest add resizable`       |
| ScrollArea     | 滚动区域           | [预览][ui-scroll-area]     | `pnpm dlx taro-shadcn@latest add scroll-area`     |
| Select         | 选择器             | [预览][ui-select]          | `pnpm dlx taro-shadcn@latest add select`          |
| Separator      | 分隔线             | [预览][ui-separator]       | `pnpm dlx taro-shadcn@latest add separator`       |
| Sheet          | 侧边面板           | [预览][ui-sheet]           | `pnpm dlx taro-shadcn@latest add sheet`           |
| Skeleton       | 骨架屏             | [预览][ui-skeleton]        | `pnpm dlx taro-shadcn@latest add skeleton`        |
| Slider         | 滑块               | [预览][ui-slider]          | `pnpm dlx taro-shadcn@latest add slider`          |
| Sonner         | Toast 通知         | [预览][ui-toast]           | `pnpm dlx taro-shadcn@latest add sonner`          |
| Switch         | 开关               | [预览][ui-switch]          | `pnpm dlx taro-shadcn@latest add switch`          |
| Table          | 表格               | [预览][ui-table]           | `pnpm dlx taro-shadcn@latest add table`           |
| Tabs           | 标签页             | [预览][ui-tabs]            | `pnpm dlx taro-shadcn@latest add tabs`            |
| Textarea       | 多行输入           | [预览][ui-textarea]        | `pnpm dlx taro-shadcn@latest add textarea`        |
| Toast          | 吐司提示           | [预览][ui-toast]           | `pnpm dlx taro-shadcn@latest add toast`           |
| Toggle         | 切换按钮           | [预览][ui-toggle]          | `pnpm dlx taro-shadcn@latest add toggle`          |
| ToggleGroup    | 切换按钮组         | [预览][ui-toggle-group]    | `pnpm dlx taro-shadcn@latest add toggle-group`    |
| Tooltip        | 文字提示           | [预览][ui-tooltip]         | `pnpm dlx taro-shadcn@latest add tooltip`         |

[ui-accordion]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=accordion
[ui-alert]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=alert
[ui-alert-dialog]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=alert-dialog
[ui-aspect-ratio]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=aspect-ratio
[ui-avatar]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=avatar
[ui-badge]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=badge
[ui-breadcrumb]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=breadcrumb
[ui-button]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=button
[ui-button-group]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=button-group
[ui-calendar]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=calendar
[ui-card]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=card
[ui-carousel]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=carousel
[ui-checkbox]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=checkbox
[ui-collapsible]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=collapsible
[ui-command]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=command
[ui-context-menu]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=context-menu
[ui-dialog]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=dialog
[ui-drawer]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=drawer
[ui-dropdown-menu]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=dropdown-menu
[ui-field]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=field
[ui-hover-card]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=hover-card
[ui-input]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=input
[ui-input-group]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=input-group
[ui-input-otp]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=input-otp
[ui-label]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=label
[ui-menubar]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=menubar
[ui-navigation-menu]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=navigation-menu
[ui-pagination]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=pagination
[ui-popover]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=popover
[ui-progress]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=progress
[ui-radio-group]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=radio-group
[ui-resizable]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=resizable
[ui-scroll-area]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=scroll-area
[ui-select]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=select
[ui-separator]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=separator
[ui-sheet]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=sheet
[ui-skeleton]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=skeleton
[ui-slider]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=slider
[ui-switch]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=switch
[ui-table]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=table
[ui-tabs]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=tabs
[ui-textarea]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=textarea
[ui-toast]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=toast
[ui-toggle]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=toggle
[ui-toggle-group]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=toggle-group
[ui-tooltip]: https://taro-shadcn.rocke.top/#/pages/detail/index?name=tooltip


## 📄 许可证

[MIT LICENSE](LICENSE)。

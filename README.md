# Taro Shadcn UI

> **Bring shadcn/ui to Mini Programs with Taro 4.**

[![Taro 4](https://img.shields.io/badge/Taro-4.1.9-blue.svg)](https://docs.taro.zone/)
[![React 18](https://img.shields.io/badge/React-18.0.0-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.1.18-38b2ac.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Taro Shadcn UI** is a comprehensive, production-ready UI component library built on top of [Taro 4](https://docs.taro.zone/), [React](https://reactjs.org/), and [Tailwind CSS 4](https://tailwindcss.com/). It aims to provide the elegant design and developer experience of [shadcn/ui](https://ui.shadcn.com/) to the cross-platform Mini Program ecosystem.

---

## ✨ Features

- 🚀 **Built for Taro 4**: Optimized for the latest Taro 4 framework with support for WeApp, TT, and H5.
- 🎨 **Shadcn UI Design**: Beautiful, accessible, and highly customizable components inspired by shadcn/ui.
- ⚡ **Tailwind CSS 4**: Leverage the latest Tailwind CSS 4 features for styling with `weapp-tailwindcss` for seamless Mini Program integration.
- 🛠️ **CLI Support**: Easily add components to your project with our CLI, just like shadcn/ui.
- 📦 **Monorepo Architecture**: Clean separation of concerns between components, documentation, and CLI tools.

---

## 📁 Project Structure

This project is a monorepo managed by pnpm:

- [packages/components](packages/components): Core UI component library (components are in `ui` sub-directory).
- [packages/docs](packages/docs): Documentation and showcase application (Taro 4).
- [packages/cli](packages/cli): CLI tool for adding components to projects.

---

## 🧩 Components

The library features 40+ UI components designed to work across all supported platforms.

| Category         | Components                                                                                              |
| :--------------- | :------------------------------------------------------------------------------------------------------ |
| **General**      | Button, Button Group, Badge, Icon (Lucide), Typography                                                  |
| **Layout**       | Aspect Ratio, Card, Separator, Resizable, Scroll Area                                                   |
| **Navigation**   | Breadcrumb, Navigation Menu, Pagination, Tabs                                                           |
| **Form**         | Checkbox, Input, Input Group, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Calendar |
| **Data Display** | Accordion, Avatar, Carousel, Collapsible, Hover Card, Progress, Table, Tooltip                          |
| **Feedback**     | Alert, Alert Dialog, Dialog, Drawer, Popover, Sheet, Skeleton, Sonner, Toast                            |
| **Advanced**     | Command, Context Menu, Menubar, Portal                                                                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Installation

```bash
pnpm install
```

### Development (Documentation App)

To run the documentation app in H5 mode:

```bash
pnpm dev:docs
```

To run the documentation app in other platforms:

```bash
cd packages/docs
pnpm dev:weapp    # WeChat Mini Program
pnpm dev:tt       # ByteDance Mini Program
```

### Using the CLI

You can use the CLI to add components to your project:

```bash
pnpm dlx taro-shadcn@latest add button
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for more information.

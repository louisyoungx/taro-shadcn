# Taro Shadcn

> **Bring shadcn/ui to Mini Programs with Taro 4.**

[![Taro 4](https://img.shields.io/badge/Taro-4.1.9-blue.svg)](https://docs.taro.zone/)
[![React 18](https://img.shields.io/badge/React-18.0.0-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.1.18-38b2ac.svg)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-10.4.15-e0234e.svg)](https://nestjs.com/)

**Taro Shadcn UI** is a comprehensive, production-ready UI component library built on top of [Taro 4](https://docs.taro.zone/), [React](https://reactjs.org/), and [Tailwind CSS 4](https://tailwindcss.com/). It aims to provide the elegant design and developer experience of [shadcn/ui](https://ui.shadcn.com/) to the cross-platform Mini Program ecosystem.

---

## ✨ Features

- 🚀 **Built for Taro 4**: Optimized for the latest Taro 4 framework with support for WeApp, TT, and H5.
- 🎨 **Shadcn UI Design**: Beautiful, accessible, and highly customizable components inspired by shadcn/ui.
- ⚡ **Tailwind CSS 4**: Leverage the latest Tailwind CSS 4 features for styling with `weapp-tailwindcss` for seamless Mini Program integration.
- 📦 **Monorepo Support**: Integrated with a [NestJS](https://nestjs.com/) backend for a complete full-stack development experience.
- 🛠️ **Developer Friendly**: Written in TypeScript with full type safety and modern engineering practices.

## 🛠️ Tech Stack

### Frontend (Taro)
- **Framework**: Taro 4.1.9
- **View**: React 18.0.0
- **Styles**: Tailwind CSS 4.1.18 + `weapp-tailwindcss`
- **Icons**: `lucide-react-taro`
- **State**: Zustand 5.0.9
- **Forms**: React Hook Form + Zod

### Backend (NestJS)
- **Framework**: NestJS 10.4.15
- **ORM**: Drizzle ORM 0.45.1
- **Database**: SQLite / PostgreSQL support
- **Validation**: Zod

---

## 🧩 Components Showcase

The project features 40+ UI components implemented in `src/components/ui`, designed to work across all supported platforms.

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

### Development

Run both the H5 frontend and NestJS backend concurrently:

```bash
pnpm dev
```

- **H5 Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3000

#### Target Platforms

```bash
pnpm dev:web      # H5 / Web
pnpm dev:weapp    # WeChat Mini Program
pnpm dev:tt       # ByteDance Mini Program
pnpm dev:server   # NestJS Backend
```

### Build

```bash
pnpm build        # Build all (Web + WeApp + Server)
pnpm build:web    # Build for Web (output: dist-web)
pnpm build:weapp  # Build for WeApp (output: dist)
pnpm build:server # Build for Backend
```

---

## 📁 Project Structure

```text
├── config/                 # Taro build configurations
├── server/                 # NestJS backend application
│   └── src/                # Backend source code
├── src/                    # Frontend source code
│   ├── components/
│   │   └── ui/             # Core UI components library
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions (utils.ts, routes.ts)
│   ├── network.ts          # Encapsulated network request tool
│   ├── app.config.ts       # Global app configuration
│   └── app.css             # Global styles
├── project.config.json     # WeChat Mini Program config
└── package.json            # Scripts and dependencies
```

## 📄 License

MIT License

# Taro Shadcn UI 组件库 Skill

> shadcn/ui 的 Taro 移植版，支持微信小程序、抖音小程序和 H5 多端运行。所有组件基于 Taro 4 + React 18 + Tailwind CSS 构建，不依赖 Radix UI 等 Web-only 库，而是从零实现了全部交互逻辑。

## 技术栈

- **框架**: Taro 4.1.9 + React 18
- **样式**: Tailwind CSS 4 + `tailwindcss-animate` + CSS Variables (lab 色彩空间)
- **变体系统**: `class-variance-authority` (cva)
- **类名合并**: `clsx` + `tailwind-merge` → 封装为 `cn()` 工具函数
- **图标**: `lucide-react-taro` (Lucide 的 Taro 适配版，非 `lucide-react`)
- **日期**: `date-fns`
- **状态管理**: React Context + `useState` / `useRef`（组件内部使用，不依赖外部状态库）

## 项目结构

```
src/
├── components/ui/     # 所有 UI 组件（49 个）
├── lib/
│   ├── utils.ts       # cn() 类名合并工具
│   ├── platform.ts    # isH5() 平台检测
│   ├── measure.ts     # getRectById / getViewport 元素尺寸测量
│   └── hooks/
│       └── use-keyboard-offset.ts  # 虚拟键盘偏移处理
├── app.css            # CSS Variables 主题定义
└── pages/             # 页面
```

## 核心工具函数

```tsx
// @/lib/utils
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// @/lib/platform — 平台检测
import Taro from "@tarojs/taro"
export const isH5 = () => Taro.getEnv() === Taro.ENV_TYPE.WEB
```

## 关键设计模式

### 1. 平台原语：使用 Taro 组件而非 HTML 元素

所有组件使用 `@tarojs/components` 中的 `View`、`Text`、`Image`、`Input`、`ScrollView`、`Swiper` 等代替 HTML 原生元素：

```tsx
// ✅ 正确 — 使用 Taro View
import { View } from "@tarojs/components"
<View className="flex items-center gap-2">...</View>

// ❌ 错误 — 不要使用 HTML div
<div className="flex items-center gap-2">...</div>
```

### 2. 受控/非受控双模式

大部分有状态组件同时支持受控和非受控模式：

```tsx
// 非受控 — 使用 defaultValue
<Select defaultValue="apple">...</Select>

// 受控 — 使用 value + onValueChange
const [val, setVal] = useState("apple")
<Select value={val} onValueChange={setVal}>...</Select>
```

此模式适用于：`Accordion`、`Checkbox`、`Collapsible`、`Dialog`、`Drawer`、`HoverCard`、`Popover`、`RadioGroup`、`Select`、`Sheet`、`Slider`、`Switch`、`Tabs`、`Toggle`、`ToggleGroup`、`Tooltip`。

### 3. Portal 渲染

弹出层组件（Dialog、Drawer、Sheet、Popover、Tooltip、DropdownMenu 等）通过 `Portal` 组件在视口顶层渲染：
- H5 端：`createPortal(children, document.body)`
- 小程序端：`<RootPortal>{children}</RootPortal>`

### 4. 位置计算与碰撞避免

`Popover`、`Tooltip`、`DropdownMenu`、`HoverCard`、`Select` 使用 `getRectById` + `getViewport` 测量元素尺寸，自动计算弹出位置，避免超出视口。

### 5. hoverClass 代替 CSS hover

Taro 小程序不支持 CSS `:hover`，组件通过 `hoverClass` 属性实现按下态：

```tsx
<View hoverClass="bg-accent" ...>
```

### 6. 图标库

使用 `lucide-react-taro` 而非 `lucide-react`：

```tsx
import { ChevronRight, Mail, X } from "lucide-react-taro"
<Mail size={16} />
<X size={16} color="#737373" />
```

---

## 全部 49 个组件用法

### Accordion 手风琴

支持单项展开 (`type="single"`) 和多项展开 (`type="multiple"`)。

```tsx
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>标题一</AccordionTrigger>
    <AccordionContent>内容一</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>标题二</AccordionTrigger>
    <AccordionContent>内容二</AccordionContent>
  </AccordionItem>
</Accordion>
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `"single" \| "multiple"` | 展开模式 |
| `collapsible` | `boolean` | 单项模式下是否可折叠 |
| `value` | `string \| string[]` | 受控展开值 |
| `defaultValue` | `string \| string[]` | 默认展开值 |
| `onValueChange` | `(value) => void` | 展开项变化回调 |

---

### AlertDialog 警告对话框

不可通过点击遮罩关闭，必须通过 Action 或 Cancel 按钮关闭。

```tsx
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="outline">删除账户</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
      <AlertDialogDescription>
        此操作不可撤销。
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction>继续</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### Alert 警告提示

纯展示组件，支持 `default` 和 `destructive` 两种变体。

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, CircleAlert } from "lucide-react-taro"

<Alert>
  <Terminal size={16} />
  <AlertTitle>提示</AlertTitle>
  <AlertDescription>你可以通过 CLI 添加组件。</AlertDescription>
</Alert>

<Alert variant="destructive">
  <CircleAlert color="#e7000b" size={16} />
  <AlertTitle>错误</AlertTitle>
  <AlertDescription>会话已过期，请重新登录。</AlertDescription>
</Alert>
```

---

### AspectRatio 宽高比

通过 `ratio` 属性控制子元素的宽高比。

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Image } from "@tarojs/components"

<AspectRatio ratio={16 / 9} className="bg-muted">
  <Image
    src="https://example.com/photo.jpg"
    className="h-full w-full rounded-md object-cover"
    mode="aspectFill"
  />
</AspectRatio>
```

| `ratio` 值 | 效果 |
|------------|------|
| `16 / 9` | 宽屏 |
| `4 / 3` | 传统比例 |
| `1 / 1` | 正方形 |

---

### Avatar 头像

图片加载失败时自动显示 Fallback 文字。

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

---

### Badge 徽章

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>默认</Badge>
<Badge variant="secondary">次要</Badge>
<Badge variant="destructive">危险</Badge>
<Badge variant="outline">轮廓</Badge>
```

**变体**: `default` | `secondary` | `destructive` | `outline`

---

### Breadcrumb 面包屑

```tsx
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">组件</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>当前页</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

### Button 按钮

```tsx
import { Button } from "@/components/ui/button"
import { Mail, LoaderCircle, ChevronRight } from "lucide-react-taro"

{/* 变体 */}
<Button>默认</Button>
<Button variant="secondary">次要</Button>
<Button variant="destructive">危险</Button>
<Button variant="outline">轮廓</Button>
<Button variant="ghost">幽灵</Button>
<Button variant="link">链接</Button>

{/* 尺寸 */}
<Button size="sm">小按钮</Button>
<Button size="lg">大按钮</Button>
<Button variant="outline" size="icon">
  <ChevronRight size={16} />
</Button>

{/* 带图标 */}
<Button>
  <Mail className="mr-2" color="#fff" size={16} /> 邮箱登录
</Button>

{/* 加载状态 */}
<Button disabled>
  <LoaderCircle className="mr-2 animate-spin" color="#fff" size={16} />
  请稍候
</Button>
```

| 属性 | 值 |
|------|------|
| `variant` | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `"link"` |
| `size` | `"default"` \| `"sm"` \| `"lg"` \| `"icon"` |
| `disabled` | `boolean` |

---

### ButtonGroup 按钮组

```tsx
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react-taro"

{/* 水平 */}
<ButtonGroup>
  <Button variant="outline">One</Button>
  <Button variant="outline">Two</Button>
  <Button variant="outline">Three</Button>
</ButtonGroup>

{/* 垂直 */}
<ButtonGroup orientation="vertical">
  <Button variant="outline">One</Button>
  <Button variant="outline">Two</Button>
</ButtonGroup>

{/* 带分隔符 */}
<ButtonGroup>
  <Button variant="outline">Save</Button>
  <ButtonGroupSeparator />
  <Button variant="outline" size="icon">
    <ChevronDown size={16} />
  </Button>
</ButtonGroup>
```

---

### Calendar 日历

支持 `single`（单日期）和 `range`（日期范围）模式，可使用 `captionLayout="dropdown"` 启用下拉式年月选择。

```tsx
import { Calendar } from "@/components/ui/calendar"
import * as React from "react"

const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg"
  captionLayout="dropdown"
/>

{/* 范围选择 */}
const [range, setRange] = React.useState<{ from?: Date; to?: Date }>()

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  className="rounded-lg"
/>
```

---

### Card 卡片

```tsx
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<Card className="w-full">
  <CardHeader>
    <CardTitle>创建项目</CardTitle>
    <CardDescription>一键部署你的新项目。</CardDescription>
  </CardHeader>
  <CardContent>
    <View className="grid w-full items-center gap-4">
      <View className="flex flex-col gap-2">
        <Label>名称</Label>
        <Input placeholder="项目名称" />
      </View>
    </View>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">取消</Button>
    <Button>部署</Button>
  </CardFooter>
</Card>
```

---

### Carousel 轮播

基于 Taro `Swiper` 组件实现。

```tsx
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

<Carousel className="mx-auto w-full max-w-xs">
  <CarouselContent className="h-48">
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem key={index}>
        <Card className="h-full">
          <CardContent className="flex h-full items-center justify-center p-6">
            <Text className="text-4xl font-semibold">{index + 1}</Text>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

{/* 多项显示 + 垂直 */}
<Carousel orientation="vertical" opts={{ displayMultipleItems: 2 }}>
  <CarouselContent className="h-[300px]">...</CarouselContent>
</Carousel>
```

| 属性 | 说明 |
|------|------|
| `orientation` | `"horizontal"` \| `"vertical"` |
| `opts.displayMultipleItems` | 同时显示项数 |
| `opts.loop` | 循环 |
| `opts.autoplay` | 自动播放 |
| `opts.interval` | 自动播放间隔 |

---

### Checkbox 复选框

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const [checked, setChecked] = useState(false)

<View className="flex items-center gap-2">
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <Label onClick={() => setChecked(!checked)}>接受条款</Label>
</View>
```

---

### Collapsible 可折叠

```tsx
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react-taro"
import * as React from "react"

const [isOpen, setIsOpen] = React.useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <View className="flex items-center justify-between">
    <Text className="text-sm font-semibold">3 个仓库</Text>
    <CollapsibleTrigger>
      <Button variant="ghost" size="sm">
        <ChevronsUpDown size={16} />
      </Button>
    </CollapsibleTrigger>
  </View>
  <View className="rounded-md border px-4 py-3">始终可见的内容</View>
  <CollapsibleContent className="space-y-2">
    <View className="rounded-md border px-4 py-3">可折叠内容 1</View>
    <View className="rounded-md border px-4 py-3">可折叠内容 2</View>
  </CollapsibleContent>
</Collapsible>
```

---

### Command 命令菜单

搜索/命令面板，支持分组、过滤、键盘快捷键和对话框模式。

```tsx
import {
  Command, CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
  CommandSeparator, CommandShortcut,
} from "@/components/ui/command"
import { Calendar, User } from "lucide-react-taro"

{/* 内嵌模式 */}
<Command className="rounded-lg border">
  <CommandInput placeholder="搜索..." />
  <CommandList>
    <CommandEmpty>无结果</CommandEmpty>
    <CommandGroup heading="建议">
      <CommandItem>
        <Calendar size={16} />
        <Text>日历</Text>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="设置">
      <CommandItem>
        <User size={16} />
        <Text>个人资料</Text>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

{/* 对话框模式 */}
const [open, setOpen] = React.useState(false)

<Button onClick={() => setOpen(true)}>打开命令菜单</Button>
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="搜索..." />
  <CommandList>...</CommandList>
</CommandDialog>
```

---

### ContextMenu 右键/长按菜单

H5 端通过鼠标右键触发，小程序端通过长按触发。

```tsx
import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup,
  ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
const [person, setPerson] = React.useState("pedro")

<ContextMenu>
  <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm">
    长按此处
  </ContextMenuTrigger>
  <ContextMenuContent className="w-50">
    <ContextMenuItem>
      返回 <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>更多工具</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        <ContextMenuItem>保存页面</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem
      checked={bookmarksChecked}
      onClick={() => setBookmarksChecked(!bookmarksChecked)}
    >
      显示书签栏
    </ContextMenuCheckboxItem>
    <ContextMenuRadioGroup value={person}>
      <ContextMenuLabel>人员</ContextMenuLabel>
      <ContextMenuRadioItem
        value="pedro"
        checked={person === "pedro"}
        onClick={() => setPerson("pedro")}
      >
        Pedro
      </ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>
```

---

### Dialog 对话框

点击遮罩或 X 按钮可关闭。支持受控和非受控模式。

```tsx
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

{/* 非受控 */}
<Dialog>
  <DialogTrigger>
    <Button variant="outline">编辑资料</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>编辑资料</DialogTitle>
      <DialogDescription>在这里修改你的资料。</DialogDescription>
    </DialogHeader>
    <View className="grid gap-4 py-4">
      <View className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">名称</Label>
        <Input defaultValue="Pedro" className="col-span-3" />
      </View>
    </View>
    <DialogFooter>
      <Button className="w-full">保存</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* 受控 */}
const [open, setOpen] = React.useState(false)

<Button onClick={() => setOpen(true)}>打开</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>...</DialogContent>
</Dialog>
```

---

### Drawer 抽屉

从屏幕底部滑出的面板。

```tsx
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react-taro"

const [goal, setGoal] = React.useState(350)

<Drawer>
  <DrawerTrigger>
    <Button variant="outline">打开抽屉</Button>
  </DrawerTrigger>
  <DrawerContent>
    <View className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>每日目标</DrawerTitle>
        <DrawerDescription>设置你的每日活动目标。</DrawerDescription>
      </DrawerHeader>
      <View className="p-4">
        <View className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setGoal(goal - 10)}>
            <Minus size={16} />
          </Button>
          <View className="text-7xl font-bold">{goal}</View>
          <Button variant="outline" size="icon" onClick={() => setGoal(goal + 10)}>
            <Plus size={16} />
          </Button>
        </View>
      </View>
      <DrawerFooter>
        <Button>提交</Button>
        <DrawerClose>
          <Button variant="outline">取消</Button>
        </DrawerClose>
      </DrawerFooter>
    </View>
  </DrawerContent>
</Drawer>
```

---

### DropdownMenu 下拉菜单

支持子菜单、CheckboxItem、RadioItem。

```tsx
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">打开菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-44">
    <DropdownMenuLabel>我的账户</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Text>个人资料</Text>
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Text>邀请用户</Text>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40">
          <DropdownMenuItem><Text>邮件</Text></DropdownMenuItem>
          <DropdownMenuItem><Text>消息</Text></DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Field 表单字段组

结构化表单布局组件，支持水平/垂直方向。

```tsx
import {
  Field, FieldDescription, FieldGroup, FieldLabel,
  FieldLegend, FieldSeparator, FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

<FieldGroup>
  <FieldSet>
    <FieldLegend>支付方式</FieldLegend>
    <FieldDescription>所有交易安全加密</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel>持卡人姓名</FieldLabel>
        <Input placeholder="张三" />
      </Field>
      <Field>
        <FieldLabel>卡号</FieldLabel>
        <Input placeholder="1234 5678 9012 3456" />
        <FieldDescription>请输入 16 位卡号</FieldDescription>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <FieldSet>
    <FieldLegend>账单地址</FieldLegend>
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox />
        <FieldLabel className="font-normal">与收货地址相同</FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
</FieldGroup>
```

---

### HoverCard 悬停卡片

H5 端鼠标 hover 触发，小程序端点击触发。

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

<HoverCard>
  <HoverCardTrigger className="inline-block">
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80" side="top" align="start">
    <View className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <View className="space-y-1">
        <View className="text-sm font-semibold">@nextjs</View>
        <View className="text-sm">The React Framework</View>
      </View>
    </View>
  </HoverCardContent>
</HoverCard>
```

| 属性 | 值 |
|------|------|
| `side` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` |
| `align` | `"start"` \| `"center"` \| `"end"` |
| `open` / `onOpenChange` | 受控模式 |

---

### Input 输入框

外层 `View` 处理聚焦样式，内层使用 Taro `Input` 组件。

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<View className="flex w-full max-w-sm flex-col gap-2">
  <Label>邮箱</Label>
  <Input type="text" placeholder="请输入邮箱" />
</View>

{/* 密码 */}
<Input type="text" password placeholder="密码" />

{/* 禁用 */}
<Input disabled placeholder="已禁用" />
```

---

### InputGroup 输入框组

```tsx
import {
  InputGroup, InputGroupAddon, InputGroupButton,
  InputGroupInput, InputGroupText, InputGroupTextarea,
} from "@/components/ui/input-group"
import { Search, Copy, FileCode } from "lucide-react-taro"

{/* 前置 Addon */}
<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput placeholder="用户名" />
</InputGroup>

{/* 后置搜索图标 */}
<InputGroup>
  <InputGroupInput placeholder="搜索..." />
  <InputGroupAddon align="inline-end">
    <Search color="#737373" size={16} />
  </InputGroupAddon>
</InputGroup>

{/* 带按钮 */}
<InputGroup>
  <InputGroupInput placeholder="邮箱" />
  <InputGroupButton>订阅</InputGroupButton>
</InputGroup>

{/* Textarea 模式 */}
<InputGroup>
  <InputGroupTextarea placeholder="代码..." className="font-mono text-sm h-40" />
  <InputGroupAddon align="block-start">
    <FileCode color="#737373" size={16} />
    <InputGroupText className="font-mono">script.js</InputGroupText>
    <InputGroupButton size="icon-xs" className="ml-auto">
      <Copy color="#737373" size={16} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

---

### InputOTP 一次性密码输入

```tsx
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@/components/ui/input-otp"

const [value, setValue] = React.useState("")

{/* 6 位带分隔符 */}
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

{/* 受控 */}
<InputOTP maxLength={4} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>
```

---

### Label 标签

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<View className="grid w-full max-w-sm items-center gap-2">
  <Label>邮箱</Label>
  <Input type="text" placeholder="请输入邮箱" />
</View>
```

---

### Menubar 菜单栏

```tsx
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem,
  MenubarMenu, MenubarRadioGroup, MenubarRadioItem,
  MenubarSeparator, MenubarShortcut, MenubarSub,
  MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>文件</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        新标签页 <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>分享</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>邮件</MenubarItem>
          <MenubarItem>消息</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>视图</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked>显示完整 URL</MenubarCheckboxItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

---

### NavigationMenu 导航菜单

```tsx
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Taro from "@tarojs/taro"
import { cn } from "@/lib/utils"

<NavigationMenu className="w-full justify-start">
  <NavigationMenuList className="flex-wrap gap-1 space-x-0">
    <NavigationMenuItem>
      <NavigationMenuTrigger>快速开始</NavigationMenuTrigger>
      <NavigationMenuContent className="p-2">
        <View className="w-96 space-y-2">
          <NavigationMenuLink
            className="block rounded-md p-3 hover:bg-accent"
            onClick={() => Taro.navigateTo({ url: "/pages/intro/index" })}
          >
            <View className="text-sm font-medium">介绍</View>
            <Text className="text-sm text-muted-foreground">
              基于 Tailwind CSS 的可复用组件。
            </Text>
          </NavigationMenuLink>
        </View>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        onClick={() => Taro.navigateTo({ url: "/pages/intro/index" })}
      >
        文档
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

### Pagination 分页

```tsx
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious /></PaginationItem>
    <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext /></PaginationItem>
  </PaginationContent>
</Pagination>
```

---

### Popover 弹出框

```tsx
import {
  Popover, PopoverContent, PopoverDescription,
  PopoverHeader, PopoverTitle, PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<Popover>
  <PopoverTrigger>
    <Button variant="outline">打开设置</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <PopoverHeader>
      <PopoverTitle>尺寸设置</PopoverTitle>
      <PopoverDescription>设置图层的尺寸。</PopoverDescription>
    </PopoverHeader>
    <View className="grid gap-2">
      <View className="grid grid-cols-3 items-center gap-4">
        <Label>宽度</Label>
        <Input defaultValue="100%" className="col-span-2 h-8" />
      </View>
    </View>
  </PopoverContent>
</Popover>
```

| 属性 | 值 |
|------|------|
| `position` / `side` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` |
| `align` | `"start"` \| `"center"` \| `"end"` |

---

### Progress 进度条

```tsx
import { Progress } from "@/components/ui/progress"

const [progress, setProgress] = React.useState(13)
React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500)
  return () => clearTimeout(timer)
}, [])

<Progress value={progress} />
<Progress value={66} />
```

---

### RadioGroup 单选组

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="comfortable">
  <View className="flex items-center gap-2">
    <RadioGroupItem value="default" />
    <Label>默认</Label>
  </View>
  <View className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" />
    <Label>舒适</Label>
  </View>
  <View className="flex items-center gap-2">
    <RadioGroupItem value="compact" />
    <Label>紧凑</Label>
  </View>
</RadioGroup>
```

---

### Resizable 可调整大小

支持水平、垂直、嵌套布局。

```tsx
import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@/components/ui/resizable"

{/* 水平 */}
<ResizablePanelGroup direction="horizontal" className="min-h-30 rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <View className="flex items-center justify-center p-6">面板一</View>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <View className="flex items-center justify-center p-6">面板二</View>
  </ResizablePanel>
</ResizablePanelGroup>

{/* 嵌套 */}
<ResizablePanelGroup direction="horizontal" className="min-h-45 rounded-lg border">
  <ResizablePanel defaultSize={20}>
    <View className="p-6">侧边栏</View>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={80}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={50}>
        <View className="p-6">头部</View>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <View className="p-6">内容</View>
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>
```

---

### ScrollArea 滚动区域

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

<ScrollArea className="h-72 w-full rounded-md border">
  <View className="p-4">
    <Text className="mb-4 text-sm font-medium">Tags</Text>
    {tags.map((tag) => (
      <View key={tag}>
        <View className="text-sm">{tag}</View>
        <Separator className="my-2" />
      </View>
    ))}
  </View>
</ScrollArea>
```

---

### Select 选择器

```tsx
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="选择水果" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>水果</SelectLabel>
      <SelectItem value="apple">苹果</SelectItem>
      <SelectItem value="banana">香蕉</SelectItem>
      <SelectItem value="blueberry">蓝莓</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

{/* 受控 + 多分组 */}
const [value, setValue] = React.useState("")

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="选择时区" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>北美</SelectLabel>
      <SelectItem value="est">东部标准时间</SelectItem>
      <SelectItem value="cst">中部标准时间</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>欧洲</SelectLabel>
      <SelectItem value="gmt">格林威治时间</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

### Separator 分隔符

```tsx
import { Separator } from "@/components/ui/separator"

{/* 水平 */}
<Separator className="my-4" />

{/* 垂直 */}
<View className="flex h-5 items-center space-x-4 text-sm">
  <Text>博客</Text>
  <Separator orientation="vertical" />
  <Text>文档</Text>
  <Separator orientation="vertical" />
  <Text>源码</Text>
</View>
```

---

### Sheet 侧边栏面板

支持上下左右四个方向滑出。

```tsx
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger>
    <Button variant="outline">右侧面板</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>编辑资料</SheetTitle>
      <SheetDescription>修改你的个人信息。</SheetDescription>
    </SheetHeader>
    <View className="grid gap-4 py-4">
      <Label>名称</Label>
      <Input defaultValue="Pedro" />
    </View>
    <SheetFooter>
      <SheetClose>
        <Button>保存</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

| `side` | 效果 |
|--------|------|
| `"top"` | 从顶部滑出 |
| `"right"` | 从右侧滑出 |
| `"bottom"` | 从底部滑出 |
| `"left"` | 从左侧滑出 |

---

### Skeleton 骨架屏

```tsx
import { Skeleton } from "@/components/ui/skeleton"

{/* 个人资料加载态 */}
<View className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <View className="space-y-2">
    <Skeleton className="h-4 w-30" />
    <Skeleton className="h-4 w-40" />
  </View>
</View>

{/* 卡片加载态 */}
<View className="flex flex-col space-y-3">
  <Skeleton className="h-40 w-full rounded-xl" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
</View>
```

---

### Slider 滑块

```tsx
import { Slider } from "@/components/ui/slider"

{/* 基础 */}
<Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />

{/* 自定义颜色 */}
<Slider
  defaultValue={[50]}
  max={100}
  step={1}
  rangeClassName="bg-green-500"
  thumbClassName="border-green-500 focus:ring-green-500 focus:ring-opacity-30"
/>

{/* 垂直 */}
<View className="h-[200px]">
  <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" />
</View>
```

| 属性 | 说明 |
|------|------|
| `defaultValue` | `number[]` 初始值 |
| `value` / `onValueChange` | 受控模式 |
| `min` / `max` / `step` | 范围和步长 |
| `orientation` | `"horizontal"` \| `"vertical"` |
| `rangeClassName` | 已选范围样式 |
| `thumbClassName` | 滑块手柄样式 |

---

### Switch 开关

```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<View className="flex items-center gap-2">
  <Switch />
  <Label>飞行模式</Label>
</View>

{/* 自定义颜色 */}
<Switch defaultChecked className="data-[state=checked]:bg-green-500" />

{/* 禁用 */}
<Switch disabled />
<Switch disabled defaultChecked />
```

---

### Table 表格

```tsx
import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

const invoices = [
  { invoice: "INV001", status: "已支付", method: "信用卡", amount: "¥250.00" },
  { invoice: "INV002", status: "待处理", method: "PayPal", amount: "¥150.00" },
]

<Table>
  <TableCaption>最近的发票列表</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>发票号</TableHead>
      <TableHead>状态</TableHead>
      <TableHead>方式</TableHead>
      <TableHead className="text-right">金额</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((inv) => (
      <TableRow key={inv.invoice}>
        <TableCell className="font-medium">{inv.invoice}</TableCell>
        <TableCell>{inv.status}</TableCell>
        <TableCell>{inv.method}</TableCell>
        <TableCell className="text-right">{inv.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>合计</TableCell>
      <TableCell className="text-right">¥400.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

---

### Tabs 选项卡

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<Tabs defaultValue="account" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">账户</TabsTrigger>
    <TabsTrigger value="password">密码</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader><CardTitle>账户信息</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <Label>名称</Label>
        <Input defaultValue="Pedro Duarte" />
      </CardContent>
      <CardFooter><Button>保存</Button></CardFooter>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader><CardTitle>修改密码</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <Label>当前密码</Label>
        <Input type="text" password />
        <Label>新密码</Label>
        <Input type="text" password />
      </CardContent>
      <CardFooter><Button>保存</Button></CardFooter>
    </Card>
  </TabsContent>
</Tabs>
```

---

### Textarea 文本域

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea className="h-20" placeholder="请输入内容..." />
<Textarea className="h-40" placeholder="更高的文本域" />
<Textarea disabled placeholder="已禁用" />
```

---

### Toast 吐司通知

全局 API 调用，不需要 Context Provider。需要在页面中放置 `<Toaster />`。

```tsx
import { Toaster, toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

{/* 在页面中放置 Toaster */}
<Toaster position="bottom-right" richColors />

{/* 调用 toast */}
<Button onClick={() => toast("事件已创建")}>默认</Button>
<Button onClick={() => toast.success("操作成功", { description: "周一下午 6 点" })}>成功</Button>
<Button onClick={() => toast.error("操作失败")}>错误</Button>
<Button onClick={() => toast.info("提示信息")}>信息</Button>
<Button onClick={() => toast.warning("警告")}>警告</Button>

{/* 带操作按钮 */}
<Button onClick={() => toast("已创建", {
  action: { label: "撤销", onClick: () => console.log("撤销") },
})}>
  带操作
</Button>

{/* Promise */}
<Button onClick={() => toast.promise(
  () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000)),
  {
    loading: "加载中...",
    success: (data: any) => `${data.name} 已添加`,
    error: "出错了",
  },
)}>
  Promise
</Button>

{/* 自定义组件 */}
<Button onClick={() => toast.custom((t) => (
  <View className="w-full rounded-md border bg-background p-4 shadow-sm">
    <View className="text-sm font-medium">自定义 Toast</View>
    <View className="text-sm text-muted-foreground">ID: {t}</View>
  </View>
))}>
  自定义
</Button>

{/* 加载后更新 */}
<Button onClick={() => {
  const id = toast.loading("加载中...")
  setTimeout(() => {
    toast.dismiss(id)
    toast.success("加载完成！")
  }, 2000)
}}>
  加载与更新
</Button>
```

**Toaster 属性**:

| 属性 | 类型 | 说明 |
|------|------|------|
| `position` | `"top-left"` \| `"top-center"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-center"` \| `"bottom-right"` | 显示位置 |
| `richColors` | `boolean` | 丰富颜色模式 |
| `expand` | `boolean` | 展开所有 toast |
| `closeButton` | `boolean` | 显示关闭按钮 |

**toast API**:
- `toast(message, options?)` — 默认
- `toast.success(message, options?)` — 成功
- `toast.error(message, options?)` — 错误
- `toast.info(message, options?)` — 信息
- `toast.warning(message, options?)` — 警告
- `toast.loading(message)` — 加载中，返回 id
- `toast.promise(promise, { loading, success, error })` — Promise
- `toast.custom((id) => JSX)` — 自定义组件
- `toast.dismiss(id)` — 关闭指定 toast

---

### Toggle 切换按钮

```tsx
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic } from "lucide-react-taro"

<Toggle aria-label="Toggle bold"><Bold size={16} /></Toggle>
<Toggle variant="outline"><Italic size={16} /></Toggle>
<Toggle size="sm"><Italic size={12} /></Toggle>
<Toggle size="lg"><Italic size={20} /></Toggle>
<Toggle disabled><Italic size={16} /></Toggle>
```

| 属性 | 值 |
|------|------|
| `variant` | `"default"` \| `"outline"` |
| `size` | `"sm"` \| `"default"` \| `"lg"` |
| `pressed` / `onPressedChange` | 受控模式 |

---

### ToggleGroup 切换按钮组

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react-taro"

{/* 单选 */}
<ToggleGroup type="single">
  <ToggleGroupItem value="bold"><Bold size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline size={16} /></ToggleGroupItem>
</ToggleGroup>

{/* 多选 + outline */}
<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold"><Bold size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic size={16} /></ToggleGroupItem>
</ToggleGroup>
```

| 属性 | 值 |
|------|------|
| `type` | `"single"` \| `"multiple"` |
| `variant` | `"default"` \| `"outline"` |
| `size` | `"sm"` \| `"default"` \| `"lg"` |

---

### Tooltip 工具提示

H5 端鼠标 hover 触发，小程序端点击触发。需要 `TooltipProvider` 包裹。

```tsx
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger className="inline-block">
      <Button variant="outline">Hover 我</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <View>添加到收藏夹</View>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

| 属性 | 值 |
|------|------|
| `side` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` |
| `align` | `"start"` \| `"center"` \| `"end"` |
| `showArrow` | `boolean` |
| `avoidCollisions` | `boolean` |

---

### CodeBlock 代码块

内置轻量 tokenizer 实现代码高亮，非外部语法高亮库。

```tsx
import { CodeBlock } from "@/components/ui/code-block"

<CodeBlock
  code={`const greeting = "Hello, World!";\nconsole.log(greeting);`}
  language="javascript"
  showCopyButton
/>
```

---

## 组件导入路径速查

所有组件统一从 `@/components/ui/<组件名>` 导入：

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster, toast } from "@/components/ui/toast"
// sonner.tsx 重导出 toast.tsx 的所有内容
import { Toaster, toast } from "@/components/ui/sonner"
```

图标从 `lucide-react-taro` 导入（不是 `lucide-react`）：

```tsx
import { Check, X, ChevronDown, Search, Mail } from "lucide-react-taro"
```

工具函数：

```tsx
import { cn } from "@/lib/utils"
```

## 与 Web 版 shadcn/ui 的关键差异

| 项目 | Web shadcn/ui | Taro shadcn/ui |
|------|--------------|----------------|
| 底层依赖 | Radix UI | 从零实现（无外部 UI 原语库） |
| DOM 元素 | `<div>`, `<button>`, `<input>` | `<View>`, `<Text>`, `<Input>` (Taro) |
| 图标库 | `lucide-react` | `lucide-react-taro` |
| Portal | `createPortal` | H5: `createPortal`; 小程序: `RootPortal` |
| hover 效果 | CSS `:hover` | `hoverClass` 属性 |
| 路由导航 | `<Link>`, `next/link` 等 | `Taro.navigateTo()` |
| 动画 | `tailwindcss-animate` / `framer-motion` | `tailwindcss-animate` + CSS transition |
| CSS 方案 | Tailwind CSS | Tailwind CSS + `weapp-tailwindcss` (小程序适配) |
| Toast | `sonner` 外部包 | 内置实现，API 兼容 sonner |
| Calendar | `react-day-picker` | 内置实现，使用 `date-fns` |
| 样式覆盖 | `className` | `className`（通过 `cn()` 合并） |

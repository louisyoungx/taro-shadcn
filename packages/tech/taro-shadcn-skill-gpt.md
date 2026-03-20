---
name: "taro-shadcn-skill-gpt"
description: "汇总 packages/docs/src/components/ui 全部组件在 Taro(React) 下的正确用法与导入方式，包含受控模式与浮层/测量/Portal 跨端注意事项。当你要在本仓库使用这些 UI 组件写页面/组件时调用。"
---

# Taro Shadcn UI 组件用法全集（GPT 版）

目标：让 AI 在本仓库里写 UI 代码时，能“按真实导出 + 真实 API + Taro 多端约束”生成可直接运行的代码。

## 0. AI 必须遵守的硬规则

1. 只用 `@tarojs/components` 的基础组件：`View` / `Text` / `Image` / `ScrollView` / `Input` / `Textarea` 等；不要输出任何 HTML 标签（`div/span/img/button/input/...`）。
2. 统一从 `@/components/ui/<component-file>` 按导出列表导入；不要凭空捏造子组件名。
3. 样式只用 `className`（Tailwind）。需要拼 class 时用 `cn(...)`（在组件内部已经做了；业务侧只传 className 即可）。
4. 事件使用 Taro/React 的驼峰事件：常见是 `onClick`、输入用 `onInput`（取 `e.detail.value`）。
5. 浮层类组件（Dialog/Popover/Select/Tooltip/Menu 等）必须严格按“父组件 + Trigger/Content”嵌套结构使用，否则 Context 会断。

## 1. 通用受控模式速记

以下模式在很多组件里复用（只要看到这些 props，含义基本一致）：

- 打开/关闭：`open`（受控） + `defaultOpen`（非受控初始值） + `onOpenChange(open)`
- 选中值：`value`（受控） + `defaultValue`（非受控初始值） + `onValueChange(value)`
- 勾选：`checked`（受控） + `defaultChecked`（非受控初始值） + `onCheckedChange(checked)`
- 按下态：`pressed`（受控） + `defaultPressed`（非受控初始值） + `onPressedChange(pressed)`

## 2. 跨端浮层与 Portal 约束（非常关键）

本项目的跨端 Portal 实现见 [portal.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/components/ui/portal.tsx)：

- H5：使用 `react-dom` 的 `createPortal(children, document.body)`。
- 小程序：优先使用 `@tarojs/components` 的 `RootPortal`；如果运行环境没有 `RootPortal`，则降级为原地渲染（可能影响遮罩层覆盖/层级）。

因此：

- 浮层类组件默认已在内部使用 `Portal` 时，不要再额外包一层 Portal。
- 如果你发现小程序端遮罩层无法盖住页面，优先确认运行环境是否支持 `RootPortal`，以及浮层是否处于页面最外层渲染树。

## 3. Demo 参考入口（强烈建议）

大多数组件在 [src/pages/ui](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui) 都有可运行示例（registry 见 [registry.ts](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/registry.ts)）。当你不确定某个子组件怎么嵌套，直接按对应 demo 写。

下面给出“导入方式 + 关键 props + 最小示例 + demo 链接（若有）”。除特别说明外，这些组件都支持 `className`，且大多透传 `View` 的常规 props。

## 4. 组件导出总表（严格对齐 src/components/ui）

- accordion.tsx：`Accordion, AccordionItem, AccordionTrigger, AccordionContent`
- alert.tsx：`Alert, AlertTitle, AlertDescription`
- alert-dialog.tsx：`AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel`
- aspect-ratio.tsx：`AspectRatio`
- avatar.tsx：`Avatar, AvatarImage, AvatarFallback`
- badge.tsx：`Badge, badgeVariants`
- breadcrumb.tsx：`Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis`
- button.tsx：`Button, buttonVariants`
- button-group.tsx：`ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants`
- calendar.tsx：`Calendar, CalendarDayButton`
- card.tsx：`Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent`
- carousel.tsx：`Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext`
- checkbox.tsx：`Checkbox`
- collapsible.tsx：`Collapsible, CollapsibleTrigger, CollapsibleContent`
- code-block.tsx：`CodeBlock`
- command.tsx：`Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator`
- context-menu.tsx：`ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup`
- dialog.tsx：`Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription`
- drawer.tsx：`Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription`
- dropdown-menu.tsx：`DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup`
- field.tsx：`Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle`
- hover-card.tsx：`HoverCard, HoverCardTrigger, HoverCardContent`
- input.tsx：`Input`
- input-group.tsx：`InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea`
- input-otp.tsx：`InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator`
- label.tsx：`Label`
- menubar.tsx：`Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut`
- navigation-menu.tsx：`navigationMenuTriggerStyle, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport`
- pagination.tsx：`Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious`
- popover.tsx：`Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription`
- portal.tsx：`Portal`
- progress.tsx：`Progress`
- radio-group.tsx：`RadioGroup, RadioGroupItem`
- resizable.tsx：`ResizablePanelGroup, ResizablePanel, ResizableHandle`
- scroll-area.tsx：`ScrollArea, ScrollBar`
- select.tsx：`Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton`
- separator.tsx：`Separator`
- sheet.tsx：`Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription`
- skeleton.tsx：`Skeleton`
- slider.tsx：`Slider`
- sonner.tsx：`(re-export) Toaster, toast`
- switch.tsx：`Switch`
- table.tsx：`Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption`
- tabs.tsx：`Tabs, TabsList, TabsTrigger, TabsContent`
- textarea.tsx：`Textarea`
- toast.tsx：`Toaster, toast`
- toggle.tsx：`Toggle, toggleVariants`
- toggle-group.tsx：`ToggleGroup, ToggleGroupItem`
- tooltip.tsx：`Tooltip, TooltipTrigger, TooltipContent, TooltipProvider`

## 5. 组件用法速查（按文件名）

### accordion

导入：

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
```

关键点：
- `Accordion`：`type="single" | "multiple"`，支持 `value/defaultValue/onValueChange`，`collapsible` 控制单选时是否可收起。
- `AccordionItem` 必传 `value`。

最小示例：

```tsx
import { View } from "@tarojs/components"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function AccordionMini() {
  return (
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>Title A</AccordionTrigger>
        <AccordionContent>
          <View className="text-sm text-muted-foreground">Content A</View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

Demo：[accordion.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/accordion.tsx)

### alert

导入：

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
```

关键点：`Alert` 支持 `variant="default" | "destructive"`。

最小示例：

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function AlertMini() {
  return (
    <Alert variant="destructive">
      <AlertTitle>出错了</AlertTitle>
      <AlertDescription>请稍后重试</AlertDescription>
    </Alert>
  )
}
```

Demo：[alert.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/alert.tsx)

### alert-dialog

导入：

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
```

关键点：用法与 `Dialog` 类似，但语义是“强确认”。

最小示例：

```tsx
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

export function AlertDialogMini() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">删除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定删除？</AlertDialogTitle>
          <AlertDialogDescription>此操作无法撤销</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>
            <Button variant="outline" className="w-full">取消</Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button className="w-full">继续</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

Demo：[alert-dialog.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/alert-dialog.tsx)

### aspect-ratio

导入：

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

最小示例：

```tsx
import { Image } from "@tarojs/components"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioMini() {
  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
      <Image className="h-full w-full" mode="aspectFill" src="https://picsum.photos/800/450" />
    </AspectRatio>
  )
}
```

Demo：[aspect-ratio.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/aspect-ratio.tsx)

### avatar

导入：

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
```

最小示例：

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function AvatarMini() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
```

Demo：[avatar.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/avatar.tsx)

### badge

导入：

```tsx
import { Badge } from "@/components/ui/badge"
```

最小示例：

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeMini() {
  return <Badge variant="secondary">New</Badge>
}
```

Demo：[badge.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/badge.tsx)

### breadcrumb

导入：

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
```

最小示例：

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbMini() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/pages/list/index">List</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Detail</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

Demo：[breadcrumb.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/breadcrumb.tsx)

### button

导入：

```tsx
import { Button } from "@/components/ui/button"
```

关键点：
- `variant`：`default | destructive | outline | secondary | ghost | link`
- `size`：`default | sm | lg | icon`
- `asChild` 存在于类型上，但在实现里不会替换渲染节点；不要依赖它做多态渲染。

最小示例：

```tsx
import { Button } from "@/components/ui/button"

export function ButtonMini() {
  return <Button variant="outline" onClick={() => {}}>点击</Button>
}
```

Demo：[button.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/button.tsx)

### button-group

导入：

```tsx
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
```

最小示例：

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"

export function ButtonGroupMini() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="outline">Left</Button>
      <ButtonGroupSeparator />
      <ButtonGroupText className="px-3">or</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button size="sm">Right</Button>
    </ButtonGroup>
  )
}
```

Demo：[button-group.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/button-group.tsx)

### calendar

导入：

```tsx
import { Calendar } from "@/components/ui/calendar"
```

最小示例：

```tsx
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarMini() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
```

Demo：[calendar.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/calendar.tsx)

### card

导入：

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
```

最小示例：

```tsx
import { Text } from "@tarojs/components"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function CardMini() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Desc</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-muted-foreground">Content</Text>
      </CardContent>
    </Card>
  )
}
```

Demo：[card.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/card.tsx)

### carousel

导入：

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
```

最小示例：

```tsx
import { View } from "@tarojs/components"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export function CarouselMini() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {[1, 2, 3].map((n) => (
          <CarouselItem key={n}>
            <View className="h-24 rounded-lg bg-muted flex items-center justify-center">{n}</View>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

Demo：[carousel.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/carousel.tsx)

### checkbox

导入：

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

最小示例：

```tsx
import * as React from "react"
import { View } from "@tarojs/components"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxMini() {
  const [checked, setChecked] = React.useState(false)
  return (
    <View className="flex flex-row items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <View className="text-sm">Agree</View>
    </View>
  )
}
```

Demo：[checkbox.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/checkbox.tsx)

### collapsible

导入：

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
```

最小示例：

```tsx
import { View } from "@tarojs/components"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

export function CollapsibleMini() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>
        <Button variant="outline">Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <View className="text-sm text-muted-foreground p-3">Hidden content</View>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

Demo：[collapsible.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/collapsible.tsx)

### code-block

导入：

```tsx
import { CodeBlock } from "@/components/ui/code-block"
```

最小示例：

```tsx
import { CodeBlock } from "@/components/ui/code-block"

export function CodeBlockMini() {
  return (
    <CodeBlock
      language="tsx"
      code={'export function A(){\n  return <View />\n}\n'}
    />
  )
}
```

### command

导入：

```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
```

最小示例：

```tsx
import * as React from "react"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

export function CommandMini() {
  const [value, setValue] = React.useState("")
  return (
    <Command value={value} onValueChange={setValue}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem value="profile">Profile</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

Demo：[command.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/command.tsx)

### context-menu

导入：

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
```

最小示例：

```tsx
import { View } from "@tarojs/components"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu"

export function ContextMenuMini() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <View className="h-20 rounded-lg bg-muted flex items-center justify-center">Long press / Right click</View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

Demo：[context-menu.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/context-menu.tsx)

### dialog

导入：

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
```

最小示例：

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export function DialogMini() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full">OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

Demo：[dialog.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/dialog.tsx)

### drawer

导入：

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
```

Demo：[drawer.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/drawer.tsx)

### dropdown-menu

导入：

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
```

Demo：[dropdown-menu.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/dropdown-menu.tsx)

### field

导入：

```tsx
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field"
```

关键点：用于表单字段编排；`FieldError` 可展示字符串/数组错误（适配常见表单库 message 结构）。

Demo：[field.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/field.tsx)

### hover-card

导入：

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
```

Demo：[hover-card.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/hover-card.tsx)

### input

导入：

```tsx
import { Input } from "@/components/ui/input"
```

关键点：
- 本组件基于 Taro 的 `Input`；受控输入通常用 `onInput`，值为 `e.detail.value`。
- `autoFocus` 会映射到 `focus`，并驱动外层 focus ring。

最小示例：

```tsx
import * as React from "react"
import { View } from "@tarojs/components"
import { Input } from "@/components/ui/input"

export function InputMini() {
  const [v, setV] = React.useState("")
  return (
    <View className="p-4">
      <Input
        value={v}
        placeholder="Type..."
        onInput={(e) => setV(e.detail.value)}
      />
    </View>
  )
}
```

Demo：[input.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/input.tsx)

### input-group

导入：

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
```

Demo：[input-group.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/input-group.tsx)

### input-otp

导入：

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
```

Demo：[input-otp.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/input-otp.tsx)

### label

导入：

```tsx
import { Label } from "@/components/ui/label"
```

Demo：[label.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/label.tsx)

### menubar

导入：

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar"
```

Demo：[menubar.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/menubar.tsx)

### navigation-menu

导入：

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
```

Demo：[navigation-menu.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/navigation-menu.tsx)

### pagination

导入：

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
```

Demo：[pagination.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/pagination.tsx)

### popover

导入：

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "@/components/ui/popover"
```

Demo：[popover.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/popover.tsx)

### portal

导入：

```tsx
import { Portal } from "@/components/ui/portal"
```

用法：仅在你要手动把内容提升到更高层级时使用（大多数组件内部已经处理好了）。

```tsx
import { View } from "@tarojs/components"
import { Portal } from "@/components/ui/portal"

export function PortalMini() {
  return (
    <Portal>
      <View className="fixed left-0 top-0 h-10 w-full bg-black text-white">Top Layer</View>
    </Portal>
  )
}
```

### progress

导入：

```tsx
import { Progress } from "@/components/ui/progress"
```

Demo：[progress.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/progress.tsx)

### radio-group

导入：

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

Demo：[radio-group.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/radio-group.tsx)

### resizable

导入：

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
```

Demo：[resizable.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/resizable.tsx)

### scroll-area

导入：

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
```

关键点：`ScrollBar` 在本实现里是占位，不要依赖它展示自定义滚动条。

Demo：[scroll-area.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/scroll-area.tsx)

### select

导入：

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select"
```

关键点：
- `Select` 支持 `value/defaultValue/onValueChange` 与 `open/defaultOpen/onOpenChange`。
- `SelectTrigger` 会自动写入内部测量用的 `id`；不要依赖自己传入 `id`。
- `SelectContent` 通过测量 `Trigger` 与内容节点计算定位，并用 `Portal` 渲染浮层。

最小示例：

```tsx
import * as React from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select"

export function SelectMini() {
  const [v, setV] = React.useState("apple")
  return (
    <Select value={v} onValueChange={setV}>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

Demo：[select.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/select.tsx)

### separator

导入：

```tsx
import { Separator } from "@/components/ui/separator"
```

Demo：[separator.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/separator.tsx)

### sheet

导入：

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
```

Demo：[sheet.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/sheet.tsx)

### skeleton

导入：

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

Demo：[skeleton.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/skeleton.tsx)

### slider

导入：

```tsx
import { Slider } from "@/components/ui/slider"
```

Demo：[slider.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/slider.tsx)

### sonner

导入：

```tsx
import { Toaster, toast } from "@/components/ui/sonner"
```

说明：`sonner.tsx` 在本仓库里是对 [toast.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/components/ui/toast.tsx) 的转导出，API 相同。

### switch

导入：

```tsx
import { Switch } from "@/components/ui/switch"
```

Demo：[switch.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/switch.tsx)

### table

导入：

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table"
```

Demo：[table.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/table.tsx)

### tabs

导入：

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

Demo：[tabs.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/tabs.tsx)

### textarea

导入：

```tsx
import { Textarea } from "@/components/ui/textarea"
```

关键点：受控输入通常用 `onInput`（取 `e.detail.value`），和 `Input` 一致。

Demo：[textarea.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/textarea.tsx)

### toast

导入：

```tsx
import { Toaster, toast } from "@/components/ui/toast"
```

关键点：
- 页面或应用根部渲染一次 `<Toaster />`，再在任意地方调用 `toast(...)`。
- `toast` 支持 `title/description/type/duration/action/cancel/...`（以组件类型为准）。

最小示例：

```tsx
import { View } from "@tarojs/components"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/toast"

export function ToastMini() {
  return (
    <View>
      <Toaster />
      <Button
        onClick={() =>
          toast({
            title: "Saved",
            description: "Your changes have been saved.",
          })
        }
      >
        Show Toast
      </Button>
    </View>
  )
}
```

Demo：[toast.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/toast.tsx)

### toggle

导入：

```tsx
import { Toggle } from "@/components/ui/toggle"
```

Demo：[toggle.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/toggle.tsx)

### toggle-group

导入：

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

Demo：[toggle-group.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/toggle-group.tsx)

### tooltip

导入：

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
```

关键点：Tooltip 内部会测量 trigger 并通过 `Portal` 定位浮层；务必保留 `TooltipTrigger` 与 `TooltipContent` 的结构。

Demo：[tooltip.tsx](file:///Users/louis/Developer/AIWorkspace/31-taro-shadcn-ui/packages/docs/src/pages/ui/tooltip.tsx)

## 6. 生成代码时的最终检查清单

- 没有 HTML 标签，只有 `@tarojs/components`。
- import 的组件名完全来自 `src/components/ui/<file>.tsx` 的真实导出。
- 浮层组件的 Trigger/Content/Provider 嵌套没有丢。
- 输入受控用 `onInput={(e)=>setX(e.detail.value)}`。
- Toast 用法包含 `<Toaster />`（放在页面根或 app 根）。

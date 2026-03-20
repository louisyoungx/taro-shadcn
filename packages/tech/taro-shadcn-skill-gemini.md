---
name: "taro-shadcn-skill-gemini"
description: "【终极完整版】Taro Shadcn UI 全部 49 个组件的深度使用指南与代码生成规范。当你需要为小程序或多端生成精美、兼容性强的 UI 界面时，必须严格遵守此文档中的所有用法。"
---

# 🚀 Taro Shadcn UI 全量组件用法宝典 (Gemini 终极版)

> ⚠️ **最高指令**：绝对禁止使用 `div`, `span`, `p`, `img`, `button` 等 HTML 标签。必须使用 `@tarojs/components` 提供的 `View`, `Text`, `Image`, `ScrollView`。
> ⚠️ **图标库**：必须使用 `lucide-react-taro`。

本指南涵盖了项目中 **所有** 组件的详细用法和标准模板，请在生成代码时直接查阅对应的组件模块。

---

## 🧩 Accordion 组件

**必需导入**:
```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,  } from "@/components/ui/accordion"
```

**用法示例**:
```tsx
return (
<Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that matches the other
        components&apos; aesthetic.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>
        Yes. It&apos;s animated by default, but you can disable it if you prefer.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  );
```

---

## 🧩 Alert-dialog 组件

**必需导入**:
```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, , Button } from "@/components/ui/alert-dialog"
```

**用法示例**:
```tsx
return (
<View className="space-y-8">
    <View className="space-y-2">
      <View className="text-sm font-medium">Basic</View>
      <AlertDialog>
        <AlertDialogTrigger >
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>

    <View className="space-y-2">
      <View className="text-sm font-medium">Destructive</View>
      <AlertDialog>
        <AlertDialogTrigger >
          <Button variant="outline">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
```

---

## 🧩 Alert 组件

**必需导入**:
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
```

**用法示例**:
```tsx
return (
<View className="space-y-4">
    <Alert>
      <Terminal size={16
```

---

## 🧩 Aspect-ratio 组件

**必需导入**:
```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

**用法示例**:
```tsx
return (
<View className="grid gap-10">
    <View className="grid gap-2">
      <View className="text-sm font-medium leading-none">16 / 9</View>
      <View className="w-full max-w-[450px]">
        <AspectRatio ratio={16 / 9
```

---

## 🧩 Avatar 组件

**必需导入**:
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

**用法示例**:
```tsx
return (
<View className="flex flex-row gap-4 items-center">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/wojtekmaj.png" />
      <AvatarFallback>WM</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  </View>
  );
```

---

## 🧩 Badge 组件

**必需导入**:
```tsx
import { Badge } from "@/components/ui/badge"
```

**用法示例**:
```tsx
return (
<View className="flex flex-wrap gap-2">
    <Badge>Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </View>
  );
```

---

## 🧩 Breadcrumb 组件

**必需导入**:
```tsx
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,  } from "@/components/ui/breadcrumb"
```

**用法示例**:
```tsx
return (
<View className="grid gap-10">
    <View className="grid gap-2">
      <View className="text-sm font-medium leading-none">Default</View>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </View>

    <View className="grid gap-2">
      <View className="text-sm font-medium leading-none">Custom Separator</View>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <View>/</View>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <View>/</View>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
```

---

## 🧩 Button-group 组件

**必需导入**:
```tsx
import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText,  } from "@/components/ui/button-group"
```

**用法示例**:
```tsx
<View className="space-y-4">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Default</View>
      <ButtonGroup>
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
        <Button variant="outline">Three</Button>
        <Button variant="outline">Four</Button>
        <Button variant="outline">Five</Button>
      </ButtonGroup>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Vertical</View>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
        <Button variant="outline">Three</Button>
      </ButtonGroup>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">With Icons</View>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <Cloud size={16} />
        </Button>
        <Button variant="outline" size="icon">
          <LifeBuoy size={16} />
        </Button>
        <Button variant="outline" size="icon">
          <Github size={16} />
        </Button>
      </ButtonGroup>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Mixed</View>
      <ButtonGroup>
        <Button variant="outline">Save</Button>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Button 组件

**必需导入**:
```tsx
import { Button } from "@/components/ui/button"
```

**用法示例**:
```tsx
return (
<View className="space-y-4">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Default</View>
      <Button>Button</Button>
    </View>
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Secondary</View>
      <Button variant="secondary">Secondary</Button>
    </View>
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Destructive</View>
      <Button variant="destructive">Destructive</Button>
    </View>
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Outline</View>
      <Button variant="outline">Outline</Button>
    </View>
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Ghost</View>
      <Button variant="ghost">Ghost</Button>
    </View>
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Link</View>
      <Button variant="link">Link</Button>
    </View>
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">With Icon</View>
      <Button>
        <Mail className="mr-2" color="#fff" size={16
```

---

## 🧩 Calendar 组件

**必需导入**:
```tsx
import { Calendar } from "@/components/ui/calendar"
```

**用法示例**:
```tsx
const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
<View className="space-y-6">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Single</View>
      <View className="flex justify-center">
        <Calendar
          mode="single"
          selected={date
```

---

## 🧩 Card 组件

**必需导入**:
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, , Button, Input, Label, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/card"
```

**用法示例**:
```tsx
return (
<View className="grid gap-6">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <View className="grid w-full items-center gap-4">
          <View className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input id="name" placeholder="Name of your project" />
          </View>
          <View className="flex flex-col gap-2">
            <Label>Framework</Label>
            <Select defaultValue="next">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="nuxt">Nuxt.js</SelectItem>
              </SelectContent>
            </Select>
          </View>
        </View>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>

    <Card className="w-full">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
```

---

## 🧩 Carousel 组件

**必需导入**:
```tsx
import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,  } from "@/components/ui/carousel"
```

**用法示例**:
```tsx
return (
<View className="space-y-4">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Default</View>
      <View className="w-full px-12">
        <Carousel className="mx-auto w-full max-w-[12rem] sm:max-w-xs">
          <CarouselContent className="h-48">
            {Array.from({ length: 5
```

---

## 🧩 Checkbox 组件

**必需导入**:
```tsx
import { Checkbox, Label } from "@/components/ui/checkbox"
```

**用法示例**:
```tsx
const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
<View className="space-y-4">
  <View className="flex items-center gap-2">
    <Checkbox
      id="terms"
      checked={checked1
```

---

## 🧩 Collapsible 组件

**必需导入**:
```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger, , Button } from "@/components/ui/collapsible"
```

**用法示例**:
```tsx
const [isOpen, setIsOpen] = React.useState(false);

  return (
<Collapsible
  open={isOpen
```

---

## 🧩 Command 组件

**必需导入**:
```tsx
import { Button, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,  } from "@/components/ui/command"
```

**用法示例**:
```tsx
const [open, setOpen] = React.useState(false);
  const iconSize = 16;
  const handleSelect = React.useCallback(() => setOpen(false), []);

  return (
<View className="flex flex-col gap-4">
  <Button onClick={() => setOpen(true)
```

---

## 🧩 Context-menu 组件

**必需导入**:
```tsx
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,  } from "@/components/ui/context-menu"
```

**用法示例**:
```tsx
<View className="space-y-8 p-4">
    <View className="space-y-2">
      <Text className="text-sm font-medium">Basic Context Menu</Text>
      <ContextMenu>
        <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm">
          Long press here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-50">
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem 
            checked={bookmarksChecked}
            onClick={() => setBookmarksChecked(!bookmarksChecked)}
          >
            Show Bookmarks Bar
          </ContextMenuCheckboxItem>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Dialog 组件

**必需导入**:
```tsx
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, , Input, Label } from "@/components/ui/dialog"
```

**用法示例**:
```tsx
<View className="space-y-4">
    {/* Example 1: Basic (Edit Profile) */}
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Basic</View>
      <Dialog>
        <DialogTrigger >
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <View className="grid gap-4 py-4">
            <View className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
                autoFocus
              />
            </View>
            <View className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </View>
          </View>
          <DialogFooter>
            <Button className="w-full">Save changes</Button>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Drawer 组件

**必需导入**:
```tsx
import { Button, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,  } from "@/components/ui/drawer"
```

**用法示例**:
```tsx
const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
setGoal(Math.max(200, Math.min(400, goal + adjustment)));
```

---

## 🧩 Dropdown-menu 组件

**必需导入**:
```tsx
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, , Button } from "@/components/ui/dropdown-menu"
```

**用法示例**:
```tsx
const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
<View className="grid gap-8">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Basic Menu</View>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Text>Profile</Text>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Billing</Text>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Settings</Text>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Text>Team</Text>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Text>Invite users</Text>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-40" sideOffset={2
```

---

## 🧩 Field 组件

**必需导入**:
```tsx
import { Button, Checkbox, Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, , Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components/ui/field"
```

**用法示例**:
```tsx
<View className="w-full max-w-md">
  <View className="space-y-4">
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Payment Method</FieldLegend>
        <FieldDescription>All transactions are secure and encrypted</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel for="checkout-7j9-card-name-43j">Name on Card</FieldLabel>
            <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" />
          </Field>
          <Field>
            <FieldLabel for="checkout-7j9-card-number-uw1">Card Number</FieldLabel>
            <Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" />
            <FieldDescription>Enter your 16-digit card number</FieldDescription>
          </Field>
          <View className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>Month</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Hover-card 组件

**必需导入**:
```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger, , Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui/hover-card"
```

**用法示例**:
```tsx
const [controlledOpen, setControlledOpen] = useState(false);

  return (
<View className="grid gap-10">
    <View className="grid gap-2">
      <View className="text-sm text-muted-foreground">Profile</View>
      <HoverCard>
        <HoverCardTrigger className="inline-block">
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <View className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <View className="space-y-1">
              <View className="text-sm font-semibold">@nextjs</View>
              <View className="text-sm">
                The React Framework – created and maintained by @vercel.
              </View>
              <View className="flex items-center pt-2">
                <CalendarDays className="mr-2 opacity-70" size={16
```

---

## 🧩 Input-group 组件

**必需导入**:
```tsx
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea,  } from "@/components/ui/input-group"
```

**用法示例**:
```tsx
<View className="space-y-4">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Input</View>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Username" />
      </InputGroup>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Textarea</View>
      <InputGroup>
        <InputGroupTextarea
          id="block-start-textarea"
          placeholder="console.log('Hello, world!');"
          className="font-mono text-sm h-40"
        />
        <InputGroupAddon align="block-start">
          <FileCode className="text-muted-foreground" color="#737373" size={16} />
          <InputGroupText className="font-mono">script.js</InputGroupText>
          <InputGroupButton size="icon-xs" className="ml-auto">
            <Copy color="#737373" size={16} />
            <Text className="sr-only">Copy</Text>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Right Addon</View>
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <Search color="#737373" size={16} />
        </InputGroupAddon>
      </InputGroup>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">With Button</View>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Input-otp 组件

**必需导入**:
```tsx
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,  } from "@/components/ui/input-otp"
```

**用法示例**:
```tsx
<View className="p-4 space-y-8">
    <View className="space-y-2">
      <Text className="text-sm font-medium">6-Digit OTP</Text>
      <View className="flex justify-center">
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
      </View>
    </View>

    <View className="space-y-2">
      <Text className="text-sm font-medium">4-Digit OTP (Controlled)</Text>
      <View className="flex flex-col items-center gap-4">
        <InputOTP 
          maxLength={4} 
          value={value} 
          onChange={(v) => setValue(v)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Text className="text-xs text-muted-foreground">
          Current value: {value}
        </Text>
      </View>
    </View>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Input 组件

**必需导入**:
```tsx
import { Input, Label, Button } from "@/components/ui/input"
```

**用法示例**:
```tsx
return (
<View className="space-y-8">
    {/* Default */
```

---

## 🧩 Label 组件

**必需导入**:
```tsx
import { Label, Input, Checkbox } from "@/components/ui/label"
```

**用法示例**:
```tsx
const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(true);

  return (
<View className="space-y-8">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground mb-2">基础用法</View>
      <View className="space-y-4">
        <View className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={checked1
```

---

## 🧩 Menubar 组件

**必需导入**:
```tsx
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,  } from "@/components/ui/menubar"
```

**用法示例**:
```tsx
<View className="p-4 space-y-8">
    <View className="space-y-2">
      <Text className="text-sm font-medium">Basic Menubar</Text>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Navigation-menu 组件

**必需导入**:
```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle,  } from "@/components/ui/navigation-menu"
```

**用法示例**:
```tsx
<View className="p-2">
    <NavigationMenu className="max-w-none w-full justify-start">
      <NavigationMenuList className="w-full justify-start flex-wrap gap-1 space-x-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <View className="w-96 max-w-[calc(100vw-32px)] space-y-2">
              <ListItem href="/pages/intro/index" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/pages/intro/index" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/pages/intro/index" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <View className="grid w-[calc(100vw-32px)] gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <View className="grid w-[200px] gap-1">
              <NavigationMenuLink
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Pagination 组件

**必需导入**:
```tsx
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,  } from "@/components/ui/pagination"
```

**用法示例**:
```tsx
return (
<View className="grid gap-10">
    <View className="grid gap-2">
      <View className="text-sm text-muted-foreground">Default</View>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </View>

    <View className="grid gap-2">
      <View className="text-sm text-muted-foreground">Simple</View>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
```

---

## 🧩 Popover 组件

**必需导入**:
```tsx
import { Button, Input, Label, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger,  } from "@/components/ui/popover"
```

**用法示例**:
```tsx
const [controlledOpen, setControlledOpen] = React.useState(false);

  return (
<View className="grid gap-8">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Basic Popover</View>
      <Popover>
        <PopoverTrigger >
          <Button variant="outline">Open dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <View className="grid gap-4">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
            </PopoverHeader>
            <View className="grid gap-2">
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                  autoFocus
                />
              </View>
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </View>
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
```

---

## 🧩 Progress 组件

**必需导入**:
```tsx
import { Progress, Slider } from "@/components/ui/progress"
```

**用法示例**:
```tsx
const [progress, setProgress] = React.useState(13);
  const [sliderValue, setSliderValue] = React.useState([33]);

  React.useEffect(() => {
const timer = setTimeout(() => setProgress(66), 500);
return () => clearTimeout(timer);
```

---

## 🧩 Radio-group 组件

**必需导入**:
```tsx
import { Label, RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

**用法示例**:
```tsx
return (
<RadioGroup defaultValue="comfortable">
    <View className="flex items-center gap-2">
      <RadioGroupItem value="default" id="r1" />
      <Label>Default</Label>
    </View>
    <View className="flex items-center gap-2">
      <RadioGroupItem value="comfortable" id="r2" />
      <Label>Comfortable</Label>
    </View>
    <View className="flex items-center gap-2">
      <RadioGroupItem value="compact" id="r3" />
      <Label>Compact</Label>
    </View>
  </RadioGroup>
  );
```

---

## 🧩 Resizable 组件

**必需导入**:
```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup,  } from "@/components/ui/resizable"
```

**用法示例**:
```tsx
<View className="p-4 space-y-8">
    <View className="space-y-2">
      <Text className="text-sm font-medium">Horizontal</Text>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-30 max-w-md rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <View className="flex flex-1 items-center justify-center p-6">
            <Text className="font-semibold">One</Text>
          </View>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <View className="flex flex-1 items-center justify-center p-6">
            <Text className="font-semibold">Two</Text>
          </View>
        </ResizablePanel>
      </ResizablePanelGroup>
    </View>

    <View className="space-y-2">
      <Text className="text-sm font-medium">Vertical</Text>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-45 max-w-md rounded-lg border"
      >
        <ResizablePanel defaultSize={30}>
          <View className="flex flex-1 items-center justify-center p-6">
            <Text className="font-semibold">Top</Text>
          </View>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <View className="flex flex-1 items-center justify-center p-6">
            <Text className="font-semibold">Bottom</Text>
          </View>
        </ResizablePanel>
      </ResizablePanelGroup>
    </View>
  {/* ... 省略部分代码 ... */}
```

---

## 🧩 Scroll-area 组件

**必需导入**:
```tsx
import { ScrollArea, Separator } from "@/components/ui/scroll-area"
```

**用法示例**:
```tsx
return (
<ScrollArea className="h-72 w-full rounded-md border">
    <View className="p-4">
      <Text className="mb-4 text-sm font-medium leading-none">Tags</Text>
      {tags.map((tag) => (
        <View key={tag
```

---

## 🧩 Select 组件

**必需导入**:
```tsx
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, , Label } from "@/components/ui/select"
```

**用法示例**:
```tsx
return (
<View className="grid gap-8">
    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Basic Select</View>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>

    <View className="space-y-2">
      <View className="text-sm text-muted-foreground">Scrollable</View>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">
              Hawaii-Aleutian Standard Time (HST)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
```

---

## 🧩 Separator 组件

**必需导入**:
```tsx
import { Separator } from "@/components/ui/separator"
```

**用法示例**:
```tsx
return (
<View>
    <View className="space-y-1">
      <Text className="text-sm font-medium leading-none">Taro Shadcn UI Separator</Text>
      <Separator className="my-4" />
      <Text className="text-sm text-muted-foreground">
        An open-source UI component library.
      </Text>
    </View>
    <Separator className="my-4" />
    <View className="flex h-5 items-center space-x-4 text-sm">
      <Text>Blog</Text>
      <Separator orientation="vertical" />
      <Text>Docs</Text>
      <Separator orientation="vertical" />
      <Text>Source</Text>
    </View>
  </View>
  );
```

---

## 🧩 Sheet 组件

**必需导入**:
```tsx
import { Button, Input, Label, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,  } from "@/components/ui/sheet"
```

**用法示例**:
```tsx
return (
<View className="grid gap-4">
    {SHEET_SIDES.map((side) => (
      <View key={side
```

---

## 🧩 Skeleton 组件

**必需导入**:
```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

**用法示例**:
```tsx
return (
<View className="space-y-8">
    <View className="space-y-4">
      <Text className="text-sm font-medium">Profile</Text>
      <View className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <View className="space-y-2">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-40" />
        </View>
      </View>
    </View>

    <View className="space-y-4">
      <Text className="text-sm font-medium">Card</Text>
      <View className="flex flex-col space-y-3">
        <Skeleton className="h-40 w-full rounded-xl" />
        <View className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </View>
      </View>
    </View>

    <View className="space-y-4">
      <Text className="text-sm font-medium">List</Text>
      <View className="space-y-4">
        {Array.from({ length: 3
```

---

## 🧩 Slider 组件

**必需导入**:
```tsx
import { Slider } from "@/components/ui/slider"
```

**用法示例**:
```tsx
return (
<View className="flex flex-col gap-8 p-6">
    <View className="flex flex-col gap-4">
      <View className="text-sm font-medium">Default</View>
      <Slider defaultValue={[50]
```

---

## 🧩 Switch 组件

**必需导入**:
```tsx
import { Switch, Label } from "@/components/ui/switch"
```

**用法示例**:
```tsx
return (
<View className="flex flex-col gap-6">
    <View className="flex flex-col gap-3">
      <Label className="text-muted-foreground text-xs font-medium uppercase">
        Default
      </Label>
      <View className="flex items-center gap-2">
        <Switch />
        <Label>Airplane Mode</Label>
      </View>
    </View>

    <View className="flex flex-col gap-3">
      <Label className="text-muted-foreground text-xs font-medium uppercase">
        Colors
      </Label>
      <View className="flex flex-wrap gap-4">
        <View className="flex items-center gap-2">
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-green-500"
          />
          <Label>Green</Label>
        </View>
        <View className="flex items-center gap-2">
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-red-500"
          />
          <Label>Red</Label>
        </View>
        <View className="flex items-center gap-2">
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-blue-500"
          />
          <Label>Blue</Label>
        </View>
        <View className="flex items-center gap-2">
          <Switch
```

---

## 🧩 Table 组件

**必需导入**:
```tsx
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,  } from "@/components/ui/table"
```

**用法示例**:
```tsx
return (
<Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice) => (
        <TableRow key={invoice.invoice
```

---

## 🧩 Tabs 组件

**必需导入**:
```tsx
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, , Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

**用法示例**:
```tsx
return (
<Tabs defaultValue="account" className="w-full">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <View className="space-y-1">
            <Label>Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </View>
          <View className="space-y-1">
            <Label>Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </View>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <View className="space-y-1">
            <Label>Current password</Label>
```

---

## 🧩 Textarea 组件

**必需导入**:
```tsx
import { Textarea } from "@/components/ui/textarea"
```

**用法示例**:
```tsx
return (
<View className="space-y-4">
  <View className="space-y-2">
    <Text className="text-sm font-medium leading-none">
      Default
    </Text>
    <Textarea 
      className="h-20"
      placeholder="Type your message here."
    />
  </View>

  <View className="space-y-2">
    <Text className="text-sm font-medium leading-none">
      With Initial Value
    </Text>
    <Textarea 
      className="h-20"
      placeholder="Type your message here." 
      value="This is a textarea with an initial value."
    />
  </View>

  <View className="space-y-2">
    <Text className="text-sm font-medium leading-none">
      Disabled
    </Text>
    <Textarea 
      className="h-20"
      disabled 
      placeholder="Disabled textarea." 
    />
  </View>

  <View className="space-y-2">
    <Text className="text-sm font-medium leading-none">
      Custom Height (h-40)
    </Text>
    <Textarea 
      className="h-40"
```

---

## 🧩 Toast 组件

**必需导入**:
```tsx
import { Button, Toaster, toast, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,  } from "@/components/ui/toast"
```

**用法示例**:
```tsx
const [position, setPosition] = useState<Position>("bottom-right");
  const [richColors, setRichColors] = useState(false);
  const [expand, setExpand] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  return (
<>
  <Toaster
    position={position
```

---

## 🧩 Toggle-group 组件

**必需导入**:
```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

**用法示例**:
```tsx
return (
<View className="space-y-4">
    <View className="space-y-2">
      <Text className="text-sm font-medium text-muted-foreground">Default (Single)</Text>
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold size={16
```

---

## 🧩 Toggle 组件

**必需导入**:
```tsx
import { Toggle } from "@/components/ui/toggle"
```

**用法示例**:
```tsx
return (
<View className="space-y-4">
    <View className="space-y-2">
      <Text className="text-sm font-medium text-muted-foreground">Default</Text>
      <View className="flex flex-row gap-4">
        <Toggle aria-label="Toggle bold">
          <Bold size={16
```

---

## 🧩 Tooltip 组件

**必需导入**:
```tsx
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,  } from "@/components/ui/tooltip"
```

**用法示例**:
```tsx
const [controlledOpen, setControlledOpen] = useState(false);

  return (
<TooltipProvider>
    <View className="grid gap-10">
      <View className="grid gap-2">
        <View className="text-sm text-muted-foreground">Default</View>
        <Tooltip>
          <TooltipTrigger className="inline-block">
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <View>Add to library</View>
          </TooltipContent>
        </Tooltip>
      </View>

      <View className="grid gap-2">
        <View className="text-sm text-muted-foreground">Sides</View>
        <View className="grid grid-cols-2 gap-2 justify-items-start">
          <Tooltip>
            <TooltipTrigger className="inline-block">
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <View>Tooltip on top</View>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="inline-block">
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <View>Tooltip on right</View>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="inline-block">
```

---


## 💡 避坑 Checklist
1. 检查所有的 `<div>` 和 `<span>` 是否替换为了 `<View>` 和 `<Text>`。
2. 检查密码框是否使用了 `<Input password />`。
3. 弹窗和 Drawer 的长内容是否使用了 `<ScrollView scrollY>` 包裹。
4. 图标是否使用了 `lucide-react-taro`。

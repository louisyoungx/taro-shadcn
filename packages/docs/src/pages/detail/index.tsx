import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useMemo, useEffect } from 'react'
import { Copy, Terminal, Code, ChevronDown, ChevronUp } from 'lucide-react-taro'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Calendar } from '@/components/ui/calendar'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Field } from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { toast, Toaster } from '@/components/ui/toast'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import type { FC } from 'react'
import { 
  type PackageManager, 
  defaultDoc, 
  componentDocs, 
  getInstallCmd 
} from './data'

// Demo 组件
const ComponentDemo: FC<{ componentName: string }> = ({ componentName }) => {
  const [checked, setChecked] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [value, setValue] = useState([50])
  const [radioValue, setRadioValue] = useState('option1')
  const [selectValue, setSelectValue] = useState('')
  const [togglePressed, setTogglePressed] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string | string[]>('center')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [accordionValue, setAccordionValue] = useState<string | string[]>('')
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [hoverCardOpen, setHoverCardOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [tabsValue, setTabsValue] = useState('tab1')

  switch (componentName) {
    case 'button':
      return (
        <View className="flex flex-col gap-4">
          <View className="flex flex-row flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </View>
          <View className="flex flex-row flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </View>
          <Button disabled>Disabled</Button>
        </View>
      )
    case 'button-group':
      return (
        <View className="flex flex-col gap-4">
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </View>
      )
    case 'input':
      return (
        <View className="flex flex-col gap-4">
          <Input placeholder="请输入文本" />
          <Input type="number" placeholder="请输入数字" />
          <Input placeholder="禁用状态" disabled />
        </View>
      )
    case 'input-otp':
      return (
        <View className="flex flex-col gap-4">
          <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </View>
      )
    case 'input-group':
      return (
        <View className="flex flex-col gap-4">
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <Input placeholder="your-domain.com" />
          </InputGroup>
          <InputGroup>
            <Input placeholder="搜索..." />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </View>
      )
    case 'textarea':
      return (
        <View className="flex flex-col gap-4">
          <Textarea className="h-24" placeholder="请输入详细描述..." maxlength={500} />
        </View>
      )
    case 'checkbox':
      return (
        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center gap-2">
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            <Text className="text-sm">{checked ? '已选中' : '未选中'}</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Checkbox defaultChecked />
            <Text className="text-sm">默认选中</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Checkbox disabled />
            <Text className="text-sm text-muted-foreground">禁用状态</Text>
          </View>
        </View>
      )
    case 'radio-group':
      return (
        <View className="flex flex-col gap-4">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <View className="flex flex-row items-center gap-2 mb-2">
              <RadioGroupItem value="option1" />
              <Text className="text-sm">选项一</Text>
            </View>
            <View className="flex flex-row items-center gap-2 mb-2">
              <RadioGroupItem value="option2" />
              <Text className="text-sm">选项二</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <RadioGroupItem value="option3" />
              <Text className="text-sm">选项三</Text>
            </View>
          </RadioGroup>
        </View>
      )
    case 'switch':
      return (
        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center gap-3">
            <Switch checked={enabled} onCheckedChange={setEnabled} />
            <Text className="text-sm">{enabled ? '已开启' : '已关闭'}</Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <Switch defaultChecked />
            <Text className="text-sm">默认开启</Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <Switch disabled />
            <Text className="text-sm text-muted-foreground">禁用状态</Text>
          </View>
        </View>
      )
    case 'slider':
      return (
        <View className="flex flex-col gap-4">
          <View className="w-full px-4">
            <Text className="text-sm text-muted-foreground mb-2">当前值: {value[0]}</Text>
            <Slider value={value} onValueChange={setValue} max={100} step={1} />
          </View>
          <View className="w-full px-4">
            <Text className="text-sm text-muted-foreground mb-2">禁用状态</Text>
            <Slider defaultValue={[30]} disabled />
          </View>
        </View>
      )
    case 'select':
      return (
        <View className="flex flex-col gap-4">
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger className="w-full"><SelectValue placeholder="请选择水果" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">苹果</SelectItem>
              <SelectItem value="banana">香蕉</SelectItem>
              <SelectItem value="orange">橙子</SelectItem>
            </SelectContent>
          </Select>
          <Text className="text-sm text-muted-foreground">当前选择: {selectValue || '未选择'}</Text>
        </View>
      )
    case 'calendar':
      return (
        <View className="flex flex-col gap-4">
          <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" fromYear={2020} toYear={2030} />
          <Text className="text-sm text-muted-foreground">选中日期: {date?.toLocaleDateString() || '未选择'}</Text>
        </View>
      )
    case 'label':
      return (
        <View className="flex flex-col gap-4">
          <View>
            <Label className="mb-2 block">用户名</Label>
            <Input placeholder="请输入用户名" />
          </View>
          <View>
            <Label className="mb-2 block">密码</Label>
            <Input type="number" placeholder="请输入密码" />
          </View>
        </View>
      )
    case 'field':
      return (
        <View className="flex flex-col gap-4">
          <Field>
            <Label>用户名</Label>
            <Input placeholder="请输入用户名" />
          </Field>
          <Field>
            <Label>密码</Label>
            <Input type="number" placeholder="请输入密码" />
          </Field>
          <Field>
            <Label>备注</Label>
            <Textarea style={{ width: '100%', minHeight: '60px', backgroundColor: 'transparent' }} placeholder="请输入备注" />
          </Field>
        </View>
      )
    case 'toggle':
      return (
        <View className="flex flex-col gap-4">
          <Toggle pressed={togglePressed} onPressedChange={setTogglePressed} className="mb-4">
            <Text>{togglePressed ? '已按下' : '未按下'}</Text>
          </Toggle>
          <Toggle variant="outline" defaultPressed>
            <Text>Outline 变体</Text>
          </Toggle>
        </View>
      )
    case 'toggle-group':
      return (
        <View className="flex flex-col gap-4">
          <ToggleGroup type="single" value={toggleGroupValue} onValueChange={setToggleGroupValue}>
            <ToggleGroupItem value="left">左</ToggleGroupItem>
            <ToggleGroupItem value="center">中</ToggleGroupItem>
            <ToggleGroupItem value="right">右</ToggleGroupItem>
          </ToggleGroup>
          <Text className="text-sm text-muted-foreground">当前选择: {toggleGroupValue}</Text>
        </View>
      )
    case 'card':
      return (
        <View className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>卡片标题</CardTitle>
              <CardDescription>这是卡片的描述内容</CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm">这是卡片的主要内容区域。</Text>
            </CardContent>
            <CardFooter>
              <Button size="sm">操作</Button>
            </CardFooter>
          </Card>
        </View>
      )
    case 'badge':
      return (
        <View className="flex flex-row flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </View>
      )
    case 'avatar':
      return (
        <View className="flex flex-row gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="w-14 h-14">
            <AvatarFallback>Admin</AvatarFallback>
          </Avatar>
        </View>
      )
    case 'separator':
      return (
        <View className="flex flex-col gap-4">
          <Text className="text-sm">上方内容</Text>
          <Separator />
          <Text className="text-sm">下方内容</Text>
        </View>
      )
    case 'skeleton':
      return (
        <View className="flex flex-col gap-4">
          <View className="flex flex-row gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </View>
          </View>
          <Skeleton className="h-20 w-full" />
        </View>
      )
    case 'scroll-area':
      return (
        <View className="flex flex-col gap-4">
          <ScrollArea className="h-32 w-full border border-border rounded-lg">
            <View className="p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <Text key={i} className="block text-sm py-1">滚动区域内容 {i + 1}</Text>
              ))}
            </View>
          </ScrollArea>
        </View>
      )
    case 'aspect-ratio':
      return (
        <View className="flex flex-col gap-4">
          <View className="w-full">
            <AspectRatio ratio={16 / 9}>
              <View className="bg-muted rounded-lg flex items-center justify-center h-full">
                <Text className="text-muted-foreground">16:9 比例</Text>
              </View>
            </AspectRatio>
          </View>
        </View>
      )
    case 'table':
      return (
        <View className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>年龄</TableHead>
                <TableHead>城市</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>张三</TableCell>
                <TableCell>25</TableCell>
                <TableCell>北京</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>李四</TableCell>
                <TableCell>30</TableCell>
                <TableCell>上海</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </View>
      )
    case 'progress':
      return (
        <View className="flex flex-col gap-4">
          <View>
            <Text className="text-sm text-muted-foreground mb-2">进度 25%</Text>
            <Progress value={25} />
          </View>
          <View>
            <Text className="text-sm text-muted-foreground mb-2">进度 50%</Text>
            <Progress value={50} />
          </View>
          <View>
            <Text className="text-sm text-muted-foreground mb-2">进度 75%</Text>
            <Progress value={75} />
          </View>
        </View>
      )
    case 'alert':
      return (
        <View className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>这是一条普通的提示信息。</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>这是一条错误提示信息。</AlertDescription>
          </Alert>
        </View>
      )
    case 'toast':
      return (
        <View className="flex flex-col gap-4">
          <View className="flex flex-row gap-2">
            <Button size="sm" onClick={() => toast('默认提示')}>默认提示</Button>
            <Button size="sm" onClick={() => toast.success('成功提示')}>成功提示</Button>
            <Button size="sm" variant="destructive" onClick={() => toast.error('错误提示')}>错误提示</Button>
          </View>
          <Toaster />
        </View>
      )
    case 'dialog':
      return (
        <View className="flex flex-col gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button>打开对话框</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>对话框标题</DialogTitle>
              </DialogHeader>
              <Text className="text-sm text-muted-foreground">这是对话框的内容区域。</Text>
              <DialogFooter>
                <Button size="sm" onClick={() => setDialogOpen(false)}>关闭</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      )
    case 'alert-dialog':
      return (
        <View className="flex flex-col gap-4">
          <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialogTrigger>
              <Button variant="destructive">删除</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
              </AlertDialogHeader>
              <Text className="text-sm text-muted-foreground">此操作无法撤销。</Text>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={() => setAlertDialogOpen(false)}>确认</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      )
    case 'sheet':
      return (
        <View className="flex flex-col gap-4">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Button>打开侧边栏</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>侧边栏标题</SheetTitle>
              </SheetHeader>
              <View className="flex-1 p-4">
                <Text className="text-sm">这是侧边栏内容。</Text>
              </View>
              <SheetFooter>
                <SheetClose>
                  <Button size="sm">关闭</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </View>
      )
    case 'drawer':
      return (
        <View className="flex flex-col gap-4">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger>
              <Button>打开抽屉</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>抽屉标题</DrawerTitle>
              </DrawerHeader>
              <View className="flex-1 p-4">
                <Text className="text-sm">这是抽屉内容。</Text>
              </View>
              <DrawerFooter>
                <Button size="sm" onClick={() => setDrawerOpen(false)}>确认</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </View>
      )
    case 'popover':
      return (
        <View className="flex flex-col gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <Button>打开气泡卡片</Button>
            </PopoverTrigger>
            <PopoverContent>
              <View className="p-2">
                <Text className="text-sm font-medium">气泡卡片</Text>
                <Text className="text-xs text-muted-foreground mt-1">这是气泡卡片内容。</Text>
              </View>
            </PopoverContent>
          </Popover>
        </View>
      )
    case 'tooltip':
      return (
        <View className="flex flex-col gap-4">
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger>
              <Button>悬浮显示提示</Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text className="text-sm">这是提示内容</Text>
            </TooltipContent>
          </Tooltip>
        </View>
      )
    case 'hover-card':
      return (
        <View className="flex flex-col gap-4">
          <HoverCard open={hoverCardOpen} onOpenChange={setHoverCardOpen}>
            <HoverCardTrigger>
              <Text className="text-sm cursor-pointer hover:underline">@用户名</Text>
            </HoverCardTrigger>
            <HoverCardContent>
              <View className="flex flex-col gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Text className="text-sm font-medium">用户名</Text>
                <Text className="text-xs text-muted-foreground">这是用户信息卡片。</Text>
              </View>
            </HoverCardContent>
          </HoverCard>
        </View>
      )
    case 'tabs':
      return (
        <View className="flex flex-col gap-4">
          <Tabs value={tabsValue} onValueChange={setTabsValue}>
            <TabsList className="w-full">
              <TabsTrigger value="tab1" className="flex-1">标签一</TabsTrigger>
              <TabsTrigger value="tab2" className="flex-1">标签二</TabsTrigger>
              <TabsTrigger value="tab3" className="flex-1">标签三</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Text className="text-sm">内容区域一</Text>
            </TabsContent>
            <TabsContent value="tab2">
              <Text className="text-sm">内容区域二</Text>
            </TabsContent>
            <TabsContent value="tab3">
              <Text className="text-sm">内容区域三</Text>
            </TabsContent>
          </Tabs>
        </View>
      )
    case 'accordion':
      return (
        <View className="flex flex-col gap-4">
          <Accordion type="single" value={accordionValue} onValueChange={setAccordionValue}>
            <AccordionItem value="item1">
              <AccordionTrigger>第一项</AccordionTrigger>
              <AccordionContent>这是第一项的内容。</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item2">
              <AccordionTrigger>第二项</AccordionTrigger>
              <AccordionContent>这是第二项的内容。</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item3">
              <AccordionTrigger>第三项</AccordionTrigger>
              <AccordionContent>这是第三项的内容。</AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>
      )
    case 'collapsible':
      return (
        <View className="flex flex-col gap-4">
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <CollapsibleTrigger className="w-full">
              <Button variant="ghost" className="w-full justify-between">
                <Text>点击展开/收起</Text>
                {collapsibleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <View className="p-4 bg-muted rounded-lg mt-2">
                <Text className="text-sm">这是折叠的内容区域。</Text>
              </View>
            </CollapsibleContent>
          </Collapsible>
        </View>
      )
    case 'breadcrumb':
      return (
        <View className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>首页</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>组件</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </View>
      )
    case 'pagination':
      return (
        <View className="flex flex-col gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
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
      )
    case 'navigation-menu':
      return (
        <View className="flex flex-col gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>开始</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <View className="p-4 w-48 flex flex-col">
                    <Text className="block text-sm font-medium">入门指南</Text>
                    <Text className="block text-xs text-muted-foreground mt-1">快速开始使用组件库</Text>
                  </View>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>组件</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <View className="p-4 w-48 flex flex-col">
                    <Text className="block text-sm font-medium">组件列表</Text>
                    <Text className="block text-xs text-muted-foreground mt-1">查看所有组件</Text>
                  </View>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </View>
      )
    case 'dropdown-menu':
      return (
        <View className="flex flex-col gap-4">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger>
              <Button variant="outline">打开菜单</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>菜单标题</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>选项一</DropdownMenuItem>
              <DropdownMenuItem>选项二</DropdownMenuItem>
              <DropdownMenuItem>选项三</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      )
    case 'menubar':
      return (
        <View className="flex flex-col gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>文件</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>新建</MenubarItem>
                <MenubarItem>打开</MenubarItem>
                <MenubarItem>保存</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>编辑</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>撤销</MenubarItem>
                <MenubarItem>重做</MenubarItem>
                <MenubarItem>剪切</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </View>
      )
    case 'context-menu':
      return (
        <View className="flex flex-col gap-4">
          <ContextMenu>
            <ContextMenuTrigger>
              <View className="flex items-center justify-center h-24 w-full bg-muted rounded-lg border border-dashed">
                <Text className="text-sm text-muted-foreground">长按此处打开右键菜单</Text>
              </View>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>复制</ContextMenuItem>
              <ContextMenuItem>剪切</ContextMenuItem>
              <ContextMenuItem>粘贴</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </View>
      )
    case 'carousel':
      return (
        <View className="flex flex-col gap-4">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <View className="h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Text className="text-sm">第 1 张</Text>
                </View>
              </CarouselItem>
              <CarouselItem>
                <View className="h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Text className="text-sm">第 2 张</Text>
                </View>
              </CarouselItem>
              <CarouselItem>
                <View className="h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Text className="text-sm">第 3 张</Text>
                </View>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </View>
      )
    case 'command':
      return (
        <View className="flex flex-col gap-4">
          <Command className="rounded-lg border shadow-sm">
            <CommandInput placeholder="搜索组件..." />
            <CommandList>
              <CommandEmpty>未找到结果</CommandEmpty>
              <CommandGroup heading="建议">
                <CommandItem>Button 按钮</CommandItem>
                <CommandItem>Input 输入框</CommandItem>
                <CommandItem>Dialog 对话框</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </View>
      )
    case 'resizable':
      return (
        <View className="flex flex-col gap-4">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md h-32 rounded-lg border"
          >
            <ResizablePanel className="flex items-center justify-center p-4">
              <Text className="text-sm">面板一</Text>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex items-center justify-center p-4">
              <Text className="text-sm">面板二</Text>
            </ResizablePanel>
          </ResizablePanelGroup>
        </View>
      )
    default:
      return <Text className="text-sm text-muted-foreground">暂无 Demo</Text>
  }
}

// 包管理器选项
const packageManagers: { value: PackageManager; label: string }[] = [
  { value: 'npm', label: 'npm' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'yarn', label: 'yarn' },
  { value: 'bun', label: 'bun' },
]

const ComponentDetail: FC = () => {
  const router = useRouter()
  const { name } = router.params
  const [codeExpanded, setCodeExpanded] = useState(false)
  const [packageManager, setPackageManager] = useState<PackageManager>('npm')

  const doc = useMemo(() => {
    if (!name) return defaultDoc
    return componentDocs[name] || defaultDoc
  }, [name])

  // 设置导航栏标题为组件名称
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: doc.title })
  }, [doc.title])

  const installCmd = getInstallCmd(doc.packageName, packageManager)

  const copyInstallCmd = async () => {
    await Taro.setClipboardData({ data: installCmd })
    Taro.showToast({ title: '已复制', icon: 'success' })
  }

  const copyCode = async () => {
    await Taro.setClipboardData({ data: doc.code })
    Taro.showToast({ title: '已复制', icon: 'success' })
  }

  return (
    <View className="flex flex-col min-h-screen bg-background">
      <View className="flex-1 p-4 pb-8">
        {/* 简介 */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">简介</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-sm text-muted-foreground">{doc.description}</Text>
          </CardContent>
        </Card>

        {/* 安装命令 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <View className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">安装命令</CardTitle>
            </View>
          </CardHeader>
          <CardContent className="pt-0">
            {/* 包管理器切换 */}
            <View className="flex flex-row gap-1 mb-3 bg-muted rounded-lg p-1">
              {packageManagers.map((pm) => (
                <View
                  key={pm.value}
                  className={`flex-1 py-1 px-2 rounded-md flex items-center justify-center ${packageManager === pm.value ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setPackageManager(pm.value)}
                >
                  <Text className={`text-xs ${packageManager === pm.value ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {pm.label}
                  </Text>
                </View>
              ))}
            </View>
            {/* 命令显示 */}
            <View className="bg-muted rounded-lg p-3 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2 flex-1 overflow-hidden">
                <Terminal size={16} color="#666" />
                <Text className="text-xs text-muted-foreground truncate">{installCmd}</Text>
              </View>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={copyInstallCmd}>
                <Copy size={16} color="currentColor" />
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* 示例 */}
        <Card className="mb-4">
          <CardHeader>
            <View className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">示例</CardTitle>
              <Button variant="ghost" size="sm" onClick={copyCode}>
                <Copy size={14} color="currentColor" />
                <Text className="text-xs ml-1">复制代码</Text>
              </Button>
            </View>
          </CardHeader>
          <CardContent>
            <ComponentDemo componentName={name as string} />
          </CardContent>
        </Card>

        {/* 代码 */}
        <Card className="mb-4">
          <CardHeader>
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <Code size={16} color="currentColor" />
                <CardTitle className="text-base">代码</CardTitle>
              </View>
              <Button variant="ghost" size="sm" onClick={() => setCodeExpanded(!codeExpanded)}>
                <Text className="text-xs">{codeExpanded ? '收起' : '展开'}</Text>
                {codeExpanded ? <ChevronUp size={14} color="currentColor" /> : <ChevronDown size={14} color="currentColor" />}
              </Button>
            </View>
          </CardHeader>
          {codeExpanded && (
            <CardContent>
              <View className="bg-muted rounded-lg p-4">
                <Text className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">{doc.code}</Text>
              </View>
            </CardContent>
          )}
        </Card>

        {/* Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Props</CardTitle>
          </CardHeader>
          <CardContent>
            {doc.props.length > 0 ? (
              <View className="flex flex-col gap-3">
                {doc.props.map((prop, index) => (
                  <View key={index} className="flex flex-col gap-1">
                    <View className="flex flex-row items-center gap-2">
                      <Text className="text-sm font-mono font-medium">{prop.name}</Text>
                    </View>
                    <Text className="text-xs text-muted-foreground font-mono">{prop.type}</Text>
                    <Text className="text-sm text-muted-foreground">{prop.description}</Text>
                    {index < doc.props.length - 1 && <Separator className="mt-2" />}
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-sm text-muted-foreground">暂无 Props 文档</Text>
            )}
          </CardContent>
        </Card>
      </View>
    </View>
  )
}

export default ComponentDetail

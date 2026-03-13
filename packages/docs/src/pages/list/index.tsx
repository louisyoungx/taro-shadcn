import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
  MousePointer2,
  Type,
  AlignStartVertical,
  SquareCheck,
  CircleDot,
  ToggleLeft,
  SlidersHorizontal,
  ChevronDown,
  ChevronsUpDown,
  Calendar,
  Tag,
  Keyboard,
  CreditCard,
  Square,
  Minus,
  ScrollText,
  Table,
  User,
  BadgeCheck,
  Loader,
  CircleAlert,
  Percent,
  MessageSquare,
  LayoutGrid,
  PanelLeft,
  PanelBottom,
  CircleUser,
  Info,
  TriangleAlert,
  Menu,
  Navigation,
  ChevronRight,
  FolderOpen,
  Images,
  MousePointerClick,
  ToggleRight,
  Group,
  Terminal,
  Columns2,
  MoveHorizontal,
  Search,
  Funnel
} from 'lucide-react-taro'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import type { FC } from 'react'
import { useState, useMemo } from 'react'

interface ComponentItem {
  name: string
  title: string
  description: string
  icon: any
  category: string
}

const componentsList: ComponentItem[] = [
  // 表单组件
  { name: 'button', title: 'Button', description: '按钮组件', icon: MousePointer2, category: '表单' },
  { name: 'input', title: 'Input', description: '输入框组件', icon: Type, category: '表单' },
  { name: 'textarea', title: 'Textarea', description: '文本域组件', icon: AlignStartVertical, category: '表单' },
  { name: 'checkbox', title: 'Checkbox', description: '复选框组件', icon: SquareCheck, category: '表单' },
  { name: 'radio-group', title: 'RadioGroup', description: '单选框组组件', icon: CircleDot, category: '表单' },
  { name: 'switch', title: 'Switch', description: '开关组件', icon: ToggleLeft, category: '表单' },
  { name: 'slider', title: 'Slider', description: '滑块组件', icon: SlidersHorizontal, category: '表单' },
  { name: 'select', title: 'Select', description: '选择器组件', icon: ChevronDown, category: '表单' },
  { name: 'calendar', title: 'Calendar', description: '日历组件', icon: Calendar, category: '表单' },
  { name: 'label', title: 'Label', description: '标签组件', icon: Tag, category: '表单' },
  { name: 'input-otp', title: 'InputOTP', description: '验证码输入组件', icon: Keyboard, category: '表单' },
  
  // 布局组件
  { name: 'card', title: 'Card', description: '卡片组件', icon: CreditCard, category: '布局' },
  { name: 'separator', title: 'Separator', description: '分隔线组件', icon: Minus, category: '布局' },
  { name: 'scroll-area', title: 'ScrollArea', description: '滚动区域组件', icon: ScrollText, category: '布局' },
  { name: 'table', title: 'Table', description: '表格组件', icon: Table, category: '布局' },
  { name: 'avatar', title: 'Avatar', description: '头像组件', icon: User, category: '布局' },
  { name: 'badge', title: 'Badge', description: '徽章组件', icon: BadgeCheck, category: '布局' },
  { name: 'skeleton', title: 'Skeleton', description: '骨架屏组件', icon: Loader, category: '布局' },
  { name: 'aspect-ratio', title: 'AspectRatio', description: '宽高比容器组件', icon: Square, category: '布局' },
  
  // 反馈组件
  { name: 'alert', title: 'Alert', description: '警告提示组件', icon: CircleAlert, category: '反馈' },
  { name: 'toast', title: 'Toast', description: '轻提示组件', icon: MessageSquare, category: '反馈' },
  { name: 'progress', title: 'Progress', description: '进度条组件', icon: Percent, category: '反馈' },
  
  // 覆盖层组件
  { name: 'dialog', title: 'Dialog', description: '对话框组件', icon: LayoutGrid, category: '覆盖层' },
  { name: 'sheet', title: 'Sheet', description: '抽屉组件', icon: PanelLeft, category: '覆盖层' },
  { name: 'drawer', title: 'Drawer', description: '底部抽屉组件', icon: PanelBottom, category: '覆盖层' },
  { name: 'popover', title: 'Popover', description: '气泡卡片组件', icon: CircleUser, category: '覆盖层' },
  { name: 'tooltip', title: 'Tooltip', description: '文字提示组件', icon: Info, category: '覆盖层' },
  { name: 'hover-card', title: 'HoverCard', description: '悬停卡片组件', icon: Info, category: '覆盖层' },
  { name: 'alert-dialog', title: 'AlertDialog', description: '警告对话框组件', icon: TriangleAlert, category: '覆盖层' },
  
  // 导航组件
  { name: 'tabs', title: 'Tabs', description: '标签页组件', icon: FolderOpen, category: '导航' },
  { name: 'accordion', title: 'Accordion', description: '折叠面板组件', icon: ChevronsUpDown, category: '导航' },
  { name: 'collapsible', title: 'Collapsible', description: '可折叠组件', icon: ChevronRight, category: '导航' },
  { name: 'pagination', title: 'Pagination', description: '分页组件', icon: ChevronRight, category: '导航' },
  { name: 'navigation-menu', title: 'NavigationMenu', description: '导航菜单组件', icon: Navigation, category: '导航' },
  { name: 'breadcrumb', title: 'Breadcrumb', description: '面包屑组件', icon: Menu, category: '导航' },
  { name: 'dropdown-menu', title: 'DropdownMenu', description: '下拉菜单组件', icon: ChevronDown, category: '导航' },
  { name: 'menubar', title: 'Menubar', description: '菜单栏组件', icon: Menu, category: '导航' },
  { name: 'context-menu', title: 'ContextMenu', description: '右键菜单组件', icon: MousePointerClick, category: '导航' },
  
  // 特殊组件
  { name: 'carousel', title: 'Carousel', description: '轮播图组件', icon: Images, category: '特殊' },
  { name: 'toggle', title: 'Toggle', description: '切换按钮组件', icon: ToggleRight, category: '特殊' },
  { name: 'toggle-group', title: 'ToggleGroup', description: '切换按钮组组件', icon: Group, category: '特殊' },
  { name: 'button-group', title: 'ButtonGroup', description: '按钮组组件', icon: Group, category: '特殊' },
  { name: 'field', title: 'Field', description: '表单字段组件', icon: Terminal, category: '特殊' },
  { name: 'resizable', title: 'Resizable', description: '可调整大小组件', icon: Columns2, category: '特殊' },
  { name: 'input-group', title: 'InputGroup', description: '输入框组组件', icon: MoveHorizontal, category: '特殊' },
  { name: 'command', title: 'Command', description: '命令面板组件', icon: Search, category: '特殊' },
]

const categories = ['全部', '表单', '布局', '反馈', '覆盖层', '导航', '特殊']

const ComponentsPage: FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [commandOpen, setCommandOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const filteredComponents = useMemo(() => {
    return componentsList
      .filter(item => {
        const matchCategory = activeCategory === '全部' || item.category === activeCategory
        return matchCategory
      })
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [activeCategory])

  // 所有组件按字母排序（用于搜索弹窗）
  const sortedComponents = useMemo(() => {
    return [...componentsList].sort((a, b) => a.title.localeCompare(b.title))
  }, [])

  const handleNavigate = (name: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?name=${name}`
    })
  }

  const handleCommandSelect = (value: string) => {
    const component = componentsList.find(item => item.name === value || item.title === value)
    if (component) {
      setCommandOpen(false)
      handleNavigate(component.name)
    }
  }

  const categoryCount = (cat: string) => {
    if (cat === '全部') return componentsList.length
    return componentsList.filter(item => item.category === cat).length
  }

  return (
    <View className="min-h-screen bg-background">
      {/* Search Bar */}
      <View className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <View className="flex items-center gap-2">
          <View 
            className="flex-1 flex items-center gap-2 bg-muted rounded-md px-3 py-2"
            onClick={() => setCommandOpen(true)}
          >
            <Search size={16} color="#737373" />
            <Text className="text-muted-foreground text-sm">搜索组件...</Text>
          </View>
          
          {/* Filter Button */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger className="w-9 h-9 bg-muted rounded-md flex items-center justify-center border border-border">
              <Funnel size={16} color={activeCategory !== '全部' ? '#0a0a0a' : '#737373'} />
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1" align="end">
              <Text className="block text-xs text-muted-foreground px-2 pb-1">筛选分类</Text>
              {categories.map(cat => (
                <View
                  key={cat}
                  className={`px-2 py-1 rounded text-sm ${
                    activeCategory === cat 
                      ? 'bg-foreground text-background' 
                      : 'text-foreground active:bg-muted'
                  }`}
                  onClick={() => {
                    setActiveCategory(cat)
                    setFilterOpen(false)
                  }}
                >
                  <Text className={activeCategory === cat ? 'text-background' : 'text-foreground'}>
                    {cat} ({categoryCount(cat)})
                  </Text>
                </View>
              ))}
            </PopoverContent>
          </Popover>
        </View>
      </View>

      {/* Active Filter Indicator */}
      {activeCategory !== '全部' && (
        <View className="bg-background border-b border-border px-4 py-2">
          <View className="flex items-center gap-2">
            <View 
              className="flex items-center gap-1 bg-muted px-2 py-1 rounded"
              onClick={() => setActiveCategory('全部')}
            >
              <Text className="text-foreground text-xs">{activeCategory}</Text>
              <Text className="text-muted-foreground text-xs">✕</Text>
            </View>
          </View>
        </View>
      )}

      {/* Components List */}
      <View className="px-4 py-3">
        <Text className="block text-xs text-muted-foreground mb-3">
          共 {filteredComponents.length} 个组件
        </Text>
        
        <View className="space-y-1">
          {filteredComponents.map(item => {
            const IconComponent = item.icon
            return (
              <View
                key={item.name}
                className="bg-background p-3 flex items-center gap-3 border-b border-border active:bg-muted"
                onClick={() => handleNavigate(item.name)}
              >
                <View className="w-8 h-8 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  <IconComponent size={16} color="#0a0a0a" />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="block text-sm font-medium text-foreground">{item.title}</Text>
                  <Text className="block text-xs text-muted-foreground truncate">{item.description}</Text>
                </View>
                <ChevronRight size={16} color="#a3a3a3" />
              </View>
            )
          })}
        </View>
      </View>

      {/* Command Dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="搜索组件..." />
        <CommandList className="max-h-80">
          <CommandEmpty>
            <Text className="text-muted-foreground text-center py-4">未找到组件</Text>
          </CommandEmpty>
          <CommandGroup>
            {sortedComponents.map(item => {
              const IconComponent = item.icon
              return (
                <CommandItem
                  key={item.name}
                  value={item.title}
                  onSelect={handleCommandSelect}
                >
                  <View className="flex items-center gap-2">
                    <IconComponent size={14} color="#737373" />
                    <Text className="text-sm">{item.title}</Text>
                    <Text className="text-xs text-muted-foreground">{item.description}</Text>
                  </View>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </View>
  )
}

export default ComponentsPage

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

export interface ComponentProp {
    name: string
    type: string
    description: string
    default?: string
}

export interface ComponentDoc {
    title: string
    description: string
    packageName: string
    props: ComponentProp[]
}

export const defaultDoc: ComponentDoc = {
    title: '组件',
    description: '组件描述',
    packageName: 'button',
    props: [],
}

export const getInstallCmd = (packageName: string, pm: PackageManager) => {
    switch (pm) {
        case 'pnpm':
            return `pnpm dlx taro-shadcn@latest add ${packageName}`
        case 'npm':
            return `npx taro-shadcn@latest add ${packageName}`
        case 'yarn':
            return `npx taro-shadcn@latest add ${packageName}`
        case 'bun':
            return `bun x taro-shadcn@latest add ${packageName}`
        default:
            return `pnpm dlx taro-shadcn@latest add ${packageName}`
    }
}

export const componentDocs: Record<string, ComponentDoc> = {
    button: {
        title: 'Button',
        description: '显示一个按钮或看起来像按钮的组件。',
        packageName: 'button',
        props: [
            {
                name: 'variant',
                type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
                description: '按钮的视觉样式。',
            },
            {
                name: 'size',
                type: '"default" | "sm" | "lg" | "icon"',
                description: '按钮的大小。',
            },
            {
                name: 'asChild',
                type: 'boolean',
                description: '是否作为子组件渲染。',
            },
        ],
    },
    input: {
        title: 'Input',
        description: '显示一个表单输入字段或看起来像输入字段的组件。',
        packageName: 'input',
        props: [
            {
                name: 'type',
                type: 'string',
                description: '输入字段的类型。',
            },
            {
                name: 'placeholder',
                type: 'string',
                description: '占位文本。',
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: '输入框是否禁用。',
            },
        ],
    },
    card: {
        title: 'Card',
        description: '显示带有页眉、内容和页脚的卡片。',
        packageName: 'card',
        props: [
            {
                name: 'className',
                type: 'string',
                description: '容器的类名。',
            },
        ],
    },
    avatar: {
        title: 'Avatar',
        description: '一个带有回退机制的图像元素，用于表示用户。',
        packageName: 'avatar',
        props: [
            {
                name: 'src',
                type: 'string',
                description: '图片的资源地址。',
            },
            {
                name: 'onLoad',
                type: 'function',
                description: '图片加载成功的回调。',
            },
            {
                name: 'onError',
                type: 'function',
                description: '图片加载失败的回调。',
            },
        ],
    },
    badge: {
        title: 'Badge',
        description: '显示一个徽章或看起来像徽章的组件。',
        packageName: 'badge',
        props: [
            {
                name: 'variant',
                type: '"default" | "secondary" | "destructive" | "outline"',
                description: '徽章的视觉样式。',
            },
        ],
    },
    checkbox: {
        title: 'Checkbox',
        description: '允许用户在选中和未选中之间切换的控件。',
        packageName: 'checkbox',
        props: [
            {
                name: 'checked',
                type: 'boolean',
                description: '受控的选中状态。',
            },
            {
                name: 'onCheckedChange',
                type: '(checked: boolean) => void',
                description: '选中状态改变时调用的事件处理程序。',
            },
        ],
    },
    dialog: {
        title: 'Dialog',
        description:
            '覆盖在主窗口或另一个对话框窗口上的窗口，使其下方的内容失效。',
        packageName: 'dialog',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '对话框是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    progress: {
        title: 'Progress',
        description: '显示任务完成进度的指示器，通常显示为进度条。',
        packageName: 'progress',
        props: [
            {
                name: 'value',
                type: 'number',
                description: '进度值。',
            },
        ],
    },
    skeleton: {
        title: 'Skeleton',
        description: '用于在内容加载时显示占位符。',
        packageName: 'skeleton',
        props: [
            {
                name: 'className',
                type: 'string',
                description: '类名。',
            },
        ],
    },
    switch: {
        title: 'Switch',
        description: '允许用户在选中和未选中之间切换的控件。',
        packageName: 'switch',
        props: [
            {
                name: 'checked',
                type: 'boolean',
                description: '受控的选中状态。',
            },
            {
                name: 'onCheckedChange',
                type: '(checked: boolean) => void',
                description: '选中状态改变时调用的事件处理程序。',
            },
        ],
    },
    tabs: {
        title: 'Tabs',
        description: '一组分层的内部分区——称为选项卡面板——一次显示一个。',
        packageName: 'tabs',
        props: [
            {
                name: 'defaultValue',
                type: 'string',
                description: '初次渲染时应激活的选项卡的值。',
            },
        ],
    },
    accordion: {
        title: 'Accordion',
        description:
            '一组垂直堆叠的交互式标题，每个标题都可以展开一个内容区域。',
        packageName: 'accordion',
        props: [
            {
                name: 'type',
                type: '"single" | "multiple"',
                description: '决定是只能同时打开一个项目还是可以打开多个项目。',
            },
        ],
    },
    alert: {
        title: 'Alert',
        description: '显示用于引起用户注意的提示。',
        packageName: 'alert',
        props: [
            {
                name: 'variant',
                type: '"default" | "destructive"',
                description: '告警的视觉样式。',
            },
        ],
    },
    calendar: {
        title: 'Calendar',
        description: '一个允许用户输入和编辑日期值的日期字段组件。',
        packageName: 'calendar',
        props: [
            {
                name: 'mode',
                type: '"single" | "range"',
                description: '选择模式。',
            },
            {
                name: 'selected',
                type: 'Date | DateRange',
                description: '选中的日期。',
            },
            {
                name: 'onSelect',
                type: 'function',
                description: '选中日期时的回调。',
            },
        ],
    },
    toast: {
        title: 'Toast',
        description: '临时显示的简洁消息。',
        packageName: 'toast',
        props: [
            {
                name: 'title',
                type: 'string | ReactNode',
                description: '标题。',
            },
            {
                name: 'description',
                type: 'string | ReactNode',
                description: '描述。',
            },
            {
                name: 'type',
                type: '"success" | "info" | "warning" | "error" | "loading" | "default"',
                description: '类型。',
            },
            {
                name: 'duration',
                type: 'number',
                description: '显示时长。',
            },
        ],
    },
    slider: {
        title: 'Slider',
        description: '用户从给定范围内选择值的输入框。',
        packageName: 'slider',
        props: [
            {
                name: 'defaultValue',
                type: 'number[]',
                description: '初次渲染时滑块的值。',
            },
            {
                name: 'max',
                type: 'number',
                description: '滑块的最大值。',
            },
            {
                name: 'step',
                type: 'number',
                description: '滑块的步长值。',
            },
        ],
    },
    'input-otp': {
        title: 'Input OTP',
        description: '无障碍的一次性密码输入组件。',
        packageName: 'input-otp',
        props: [
            {
                name: 'maxLength',
                type: 'number',
                description: '最大长度。',
            },
            {
                name: 'value',
                type: 'string',
                description: '当前值。',
            },
            {
                name: 'onChange',
                type: '(value: string) => void',
                description: '值改变时的回调。',
            },
        ],
    },
    popover: {
        title: 'Popover',
        description: '在门户中显示丰富的内容，由按钮触发。',
        packageName: 'popover',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    'radio-group': {
        title: 'Radio Group',
        description: '一组可检查的按钮——称为单选按钮——一次只能选中一个按钮。',
        packageName: 'radio-group',
        props: [
            {
                name: 'value',
                type: 'string',
                description: '选中的值。',
            },
            {
                name: 'onValueChange',
                type: '(value: string) => void',
                description: '值改变时的回调。',
            },
        ],
    },
    select: {
        title: 'Select',
        description: '显示供用户选择的选项列表——由按钮触发。',
        packageName: 'select',
        props: [
            {
                name: 'value',
                type: 'string',
                description: '选中的值。',
            },
            {
                name: 'onValueChange',
                type: '(value: string) => void',
                description: '值改变时的回调。',
            },
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    textarea: {
        title: 'Textarea',
        description: '显示一个表单文本域或看起来像文本域的组件。',
        packageName: 'textarea',
        props: [
            {
                name: 'placeholder',
                type: 'string',
                description: '占位文本。',
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: '是否禁用。',
            },
        ],
    },
    sheet: {
        title: 'Sheet',
        description: '扩展对话框组件，以显示补充屏幕主要内容的内容。',
        packageName: 'sheet',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    'alert-dialog': {
        title: 'Alert Dialog',
        description: '一个中断用户、需要确认的模态对话框。',
        packageName: 'alert-dialog',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    'aspect-ratio': {
        title: 'Aspect Ratio',
        description: '以特定纵横比显示内容。',
        packageName: 'aspect-ratio',
        props: [
            {
                name: 'ratio',
                type: 'number',
                description: '纵横比。',
                default: '1 / 1',
            },
        ],
    },
    breadcrumb: {
        title: 'Breadcrumb',
        description: '显示当前页面的导航路径。',
        packageName: 'breadcrumb',
        props: [
            {
                name: 'separator',
                type: 'ReactNode',
                description: '分隔符组件。',
            },
        ],
    },
    'button-group': {
        title: 'Button Group',
        description: '将一组按钮组合在一起。',
        packageName: 'button-group',
        props: [
            {
                name: 'orientation',
                type: '"horizontal" | "vertical"',
                description: '排列方向。',
                default: 'horizontal',
            },
        ],
    },
    carousel: {
        title: 'Carousel',
        description: '带有前进和后退控制的轮播图。',
        packageName: 'carousel',
        props: [
            {
                name: 'orientation',
                type: '"horizontal" | "vertical"',
                description: '滚动方向。',
                default: 'horizontal',
            },
            {
                name: 'opts',
                type: 'object',
                description: '轮播选项 (loop, autoplay, interval 等)。',
            },
        ],
    },
    collapsible: {
        title: 'Collapsible',
        description: '一个允许用户展开/折叠内容的交互组件。',
        packageName: 'collapsible',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否展开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '展开状态改变时的回调。',
            },
        ],
    },
    command: {
        title: 'Command',
        description: '快速、可组合的命令菜单。',
        packageName: 'command',
        props: [],
    },
    'context-menu': {
        title: 'Context Menu',
        description: '在点击鼠标右键或长按时显示的菜单。',
        packageName: 'context-menu',
        props: [
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    drawer: {
        title: 'Drawer',
        description: '从屏幕底部弹出的抽屉式面板。',
        packageName: 'drawer',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    'dropdown-menu': {
        title: 'Dropdown Menu',
        description: '向用户显示一个菜单——由按钮触发。',
        packageName: 'dropdown-menu',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    field: {
        title: 'Field',
        description: '用于表单项的布局和标签显示。',
        packageName: 'field',
        props: [
            {
                name: 'orientation',
                type: '"vertical" | "horizontal" | "responsive"',
                description: '布局方向。',
                default: 'vertical',
            },
        ],
    },
    'hover-card': {
        title: 'Hover Card',
        description: '让视力正常的、能够使用鼠标的用户快速预览链接背后的内容。',
        packageName: 'hover-card',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    'input-group': {
        title: 'Input Group',
        description: '将输入框与按钮或文本组合在一起。',
        packageName: 'input-group',
        props: [
            {
                name: 'disabled',
                type: 'boolean',
                description: '是否禁用。',
            },
        ],
    },
    label: {
        title: 'Label',
        description: '呈现一个可访问的表单标签。',
        packageName: 'label',
        props: [],
    },
    menubar: {
        title: 'Menubar',
        description: '通常位于应用顶部的水平菜单栏。',
        packageName: 'menubar',
        props: [],
    },
    'navigation-menu': {
        title: 'Navigation Menu',
        description: '用于网站导航的菜单组件。',
        packageName: 'navigation-menu',
        props: [
            {
                name: 'value',
                type: 'string',
                description: '选中的值。',
            },
            {
                name: 'onValueChange',
                type: '(value: string) => void',
                description: '值改变时的回调。',
            },
        ],
    },
    pagination: {
        title: 'Pagination',
        description: '带有上一步和下一步按钮的分页控制。',
        packageName: 'pagination',
        props: [],
    },
    portal: {
        title: 'Portal',
        description: '将子组件渲染到 DOM 的另一个部分。',
        packageName: 'portal',
        props: [],
    },
    resizable: {
        title: 'Resizable',
        description: '可调节大小的面板布局。',
        packageName: 'resizable',
        props: [
            {
                name: 'direction',
                type: '"horizontal" | "vertical"',
                description: '调节方向。',
                default: 'horizontal',
            },
        ],
    },
    'scroll-area': {
        title: 'Scroll Area',
        description: '自定义滚动条区域。',
        packageName: 'scroll-area',
        props: [
            {
                name: 'orientation',
                type: '"vertical" | "horizontal" | "both"',
                description: '滚动方向。',
                default: 'vertical',
            },
        ],
    },
    separator: {
        title: 'Separator',
        description: '视觉上分隔内容的水平或垂直线。',
        packageName: 'separator',
        props: [
            {
                name: 'orientation',
                type: '"horizontal" | "vertical"',
                description: '方向。',
                default: 'horizontal',
            },
        ],
    },
    sonner: {
        title: 'Sonner',
        description: '一个更加现代化的 Toast 组件。',
        packageName: 'sonner',
        props: [],
    },
    table: {
        title: 'Table',
        description: '用于显示表格数据。',
        packageName: 'table',
        props: [],
    },
    'toggle-group': {
        title: 'Toggle Group',
        description: '一组可以切换状态的按钮。',
        packageName: 'toggle-group',
        props: [
            {
                name: 'type',
                type: '"single" | "multiple"',
                description: '选择类型。',
                default: 'single',
            },
            {
                name: 'value',
                type: 'string | string[]',
                description: '选中的值。',
            },
            {
                name: 'onValueChange',
                type: 'function',
                description: '值改变时的回调。',
            },
        ],
    },
    toggle: {
        title: 'Toggle',
        description: '一个可以切换开/关状态的按钮。',
        packageName: 'toggle',
        props: [
            {
                name: 'pressed',
                type: 'boolean',
                description: '是否按下。',
            },
            {
                name: 'onPressedChange',
                type: '(pressed: boolean) => void',
                description: '按下状态改变时的回调。',
            },
        ],
    },
    tooltip: {
        title: 'Tooltip',
        description: '当用户悬停在元素上时显示的弹出框。',
        packageName: 'tooltip',
        props: [
            {
                name: 'open',
                type: 'boolean',
                description: '是否打开。',
            },
            {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: '打开状态改变时的回调。',
            },
        ],
    },
    // Add more components as needed
}

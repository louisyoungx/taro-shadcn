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
        props: [],
    },
    avatar: {
        title: 'Avatar',
        description: '一个带有回退机制的图像元素，用于表示用户。',
        packageName: 'avatar',
        props: [],
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
        props: [],
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
        props: [],
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
        props: [],
    },
    toast: {
        title: 'Toast',
        description: '临时显示的简洁消息。',
        packageName: 'toast',
        props: [],
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
        props: [],
    },
    popover: {
        title: 'Popover',
        description: '在门户中显示丰富的内容，由按钮触发。',
        packageName: 'popover',
        props: [],
    },
    'radio-group': {
        title: 'Radio Group',
        description: '一组可检查的按钮——称为单选按钮——一次只能选中一个按钮。',
        packageName: 'radio-group',
        props: [],
    },
    select: {
        title: 'Select',
        description: '显示供用户选择的选项列表——由按钮触发。',
        packageName: 'select',
        props: [],
    },
    textarea: {
        title: 'Textarea',
        description: '显示一个表单文本域或看起来像文本域的组件。',
        packageName: 'textarea',
        props: [],
    },
    sheet: {
        title: 'Sheet',
        description: '扩展对话框组件，以显示补充屏幕主要内容的内容。',
        packageName: 'sheet',
        props: [],
    },
    // Add more components as needed
}

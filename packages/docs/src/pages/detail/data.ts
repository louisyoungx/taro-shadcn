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
    code: string
    props: ComponentProp[]
}

export const defaultDoc: ComponentDoc = {
    title: 'Component',
    description: 'Component description',
    packageName: 'button',
    code: '',
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
        description:
            'Displays a button or a component that looks like a button.',
        packageName: 'button',
        code: `import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return <Button>Button</Button>
}`,
        props: [
            {
                name: 'variant',
                type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
                description: 'The visual style of the button.',
            },
            {
                name: 'size',
                type: '"default" | "sm" | "lg" | "icon"',
                description: 'The size of the button.',
            },
            {
                name: 'asChild',
                type: 'boolean',
                description: 'Whether to render as a child component.',
            },
        ],
    },
    input: {
        title: 'Input',
        description:
            'Displays a form input field or a component that looks like an input field.',
        packageName: 'input',
        code: `import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return <Input placeholder="Email" />
}`,
        props: [
            {
                name: 'type',
                type: 'string',
                description: 'The type of the input field.',
            },
            {
                name: 'placeholder',
                type: 'string',
                description: 'The placeholder text.',
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'Whether the input is disabled.',
            },
        ],
    },
    card: {
        title: 'Card',
        description: 'Displays a card with header, content, and footer.',
        packageName: 'card',
        code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`,
        props: [],
    },
    avatar: {
        title: 'Avatar',
        description:
            'An image element with a fallback for representing the user.',
        packageName: 'avatar',
        code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
        props: [],
    },
    badge: {
        title: 'Badge',
        description: 'Displays a badge or a component that looks like a badge.',
        packageName: 'badge',
        code: `import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return <Badge>Badge</Badge>
}`,
        props: [
            {
                name: 'variant',
                type: '"default" | "secondary" | "destructive" | "outline"',
                description: 'The visual style of the badge.',
            },
        ],
    },
    checkbox: {
        title: 'Checkbox',
        description:
            'A control that allows the user to toggle between checked and not checked.',
        packageName: 'checkbox',
        code: `import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  )
}`,
        props: [
            {
                name: 'checked',
                type: 'boolean',
                description: 'The controlled checked state.',
            },
            {
                name: 'onCheckedChange',
                type: '(checked: boolean) => void',
                description:
                    'Event handler called when the checked state changes.',
            },
        ],
    },
    dialog: {
        title: 'Dialog',
        description:
            'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
        packageName: 'dialog',
        code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`,
        props: [],
    },
    progress: {
        title: 'Progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
        packageName: 'progress',
        code: `import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  return <Progress value={33} />
}`,
        props: [
            {
                name: 'value',
                type: 'number',
                description: 'The progress value.',
            },
        ],
    },
    skeleton: {
        title: 'Skeleton',
        description: 'Use to show a placeholder while content is loading.',
        packageName: 'skeleton',
        code: `import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`,
        props: [],
    },
    switch: {
        title: 'Switch',
        description:
            'A control that allows the user to toggle between checked and not checked.',
        packageName: 'switch',
        code: `import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return <Switch />
}`,
        props: [
            {
                name: 'checked',
                type: 'boolean',
                description: 'The controlled checked state.',
            },
            {
                name: 'onCheckedChange',
                type: '(checked: boolean) => void',
                description:
                    'Event handler called when the checked state changes.',
            },
        ],
    },
    tabs: {
        title: 'Tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
        packageName: 'tabs',
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}`,
        props: [
            {
                name: 'defaultValue',
                type: 'string',
                description:
                    'The value of the tab that should be active when initially rendered.',
            },
        ],
    },
    accordion: {
        title: 'Accordion',
        description:
            'A vertically stacked set of interactive headings that each reveal a section of content.',
        packageName: 'accordion',
        code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
        props: [
            {
                name: 'type',
                type: '"single" | "multiple"',
                description:
                    'Determines whether one or multiple items can be opened at the same time.',
            },
        ],
    },
    alert: {
        title: 'Alert',
        description: 'Displays a callout for user attention.',
        packageName: 'alert',
        code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}`,
        props: [
            {
                name: 'variant',
                type: '"default" | "destructive"',
                description: 'The visual style of the alert.',
            },
        ],
    },
    calendar: {
        title: 'Calendar',
        description:
            'A date field component that allows users to enter and edit date values.',
        packageName: 'calendar',
        code: `import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`,
        props: [],
    },
    toast: {
        title: 'Toast',
        description: 'A succinct message that is displayed temporarily.',
        packageName: 'toast',
        code: `import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export default function ToastDemo() {
  return (
    <Button
      onClick={() => {
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}`,
        props: [],
    },
    slider: {
        title: 'Slider',
        description:
            'An input where the user selects a value from within a given range.',
        packageName: 'slider',
        code: `import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  return <Slider defaultValue={[50]} max={100} step={1} />
}`,
        props: [
            {
                name: 'defaultValue',
                type: 'number[]',
                description: 'The value of the slider when initially rendered.',
            },
            {
                name: 'max',
                type: 'number',
                description: 'The maximum value of the slider.',
            },
            {
                name: 'step',
                type: 'number',
                description: 'The step value of the slider.',
            },
        ],
    },
    'input-otp': {
        title: 'Input OTP',
        description: 'Accessible one-time password input component.',
        packageName: 'input-otp',
        code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function InputOTPDemo() {
  return (
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
  )
}`,
        props: [],
    },
    popover: {
        title: 'Popover',
        description:
            'Displays rich content in a portal, triggered by a button.',
        packageName: 'popover',
        code: `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>Place content here.</PopoverContent>
    </Popover>
  )
}`,
        props: [],
    },
    'radio-group': {
        title: 'Radio Group',
        description:
            'A set of checkable buttons—known as radio buttons—where no more than one button can be checked at a time.',
        packageName: 'radio-group',
        code: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}`,
        props: [],
    },
    select: {
        title: 'Select',
        description:
            'Displays a list of options for the user to pick from—triggered by a button.',
        packageName: 'select',
        code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
        props: [],
    },
    textarea: {
        title: 'Textarea',
        description:
            'Displays a form textarea or a component that looks like a textarea.',
        packageName: 'textarea',
        code: `import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}`,
        props: [],
    },
    sheet: {
        title: 'Sheet',
        description:
            'Extends the Dialog component to display content that complements the main content of the screen.',
        packageName: 'sheet',
        code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`,
        props: [],
    },
    // Add more components as needed
}

import Taro from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { CircleAlert, CircleCheck, CircleDashed } from "lucide-react-taro"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/pages/ui/alert-dialog/index",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/pages/ui/hover-card/index",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/pages/ui/progress/index",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/pages/ui/scroll-area/index",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/pages/ui/tabs/index",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/pages/ui/tooltip/index",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {
  return (
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
                    className="flex flex-row items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => Taro.showToast({ title: "Backlog", icon: "none" })}
                  >
                    <CircleAlert size={16} />
                    <Text>Backlog</Text>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="flex flex-row items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => Taro.showToast({ title: "To Do", icon: "none" })}
                  >
                    <CircleDashed size={16} />
                    <Text>To Do</Text>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="flex flex-row items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => Taro.showToast({ title: "Done", icon: "none" })}
                  >
                    <CircleCheck size={16} />
                    <Text>Done</Text>
                  </NavigationMenuLink>
                </View>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => Taro.navigateTo({ url: "/pages/intro/index" })}
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </View>
  )
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & { title: string; href: string }) => {
  return (
    <NavigationMenuLink
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => Taro.navigateTo({ url: href })}
      {...props}
    >
      <View className="text-sm font-medium leading-none">{title}</View>
      <Text className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {children}
      </Text>
    </NavigationMenuLink>
  )
}

export default NavigationMenuDemo;

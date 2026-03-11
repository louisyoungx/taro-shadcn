import * as React from "react"
import { View, Text } from "@tarojs/components"
import { PageLayout } from "@/components/page-layout"
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

export default function NavigationMenuPage() {
  return (
    <PageLayout title="NavigationMenu">
      <View className="p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Start</NavigationMenuTrigger>
              <NavigationMenuContent>
                <View className="grid gap-3 p-4">
                  <NavigationMenuLink>
                    <View className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted from-opacity-50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <View className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </View>
                      <Text className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </Text>
                    </View>
                  </NavigationMenuLink>
                  <ListItem title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </View>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <View className="grid gap-3 p-4">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </View>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </View>
    </PageLayout>
  )
}

const ListItem = ({ className, title, children, ...props }: any) => {
  return (
    <NavigationMenuLink
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <View className="text-sm font-medium leading-none">{title}</View>
      <Text className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {children}
      </Text>
    </NavigationMenuLink>
  )
}

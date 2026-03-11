import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { ChevronDown } from "lucide-react-taro"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

const NavigationMenuContext = React.createContext<{
  value?: string
  onValueChange?: (value: string | undefined) => void
} | null>(null)

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: string
    onValueChange?: (value: string | undefined) => void
  }
>(({ className, children, value: valueProp, onValueChange, ...props }, ref) => {
  const [valueState, setValueState] = React.useState<string | undefined>()
  const value = valueProp !== undefined ? valueProp : valueState

  const handleValueChange = (newValue: string | undefined) => {
    if (valueProp === undefined) {
      setValueState(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <NavigationMenuContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </NavigationMenuContext.Provider>
  )
})
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItemContext = React.createContext<string>("")

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value?: string }
>(({ children, value: valueProp, ...props }, ref) => {
  const id = React.useId()
  const value = valueProp || id
  return (
    <NavigationMenuItemContext.Provider value={value}>
      <View ref={ref} {...props}>
        {children}
      </View>
    </NavigationMenuItemContext.Provider>
  )
})
NavigationMenuItem.displayName = "NavigationMenuItem"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:bg-opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  const itemValue = React.useContext(NavigationMenuItemContext)
  const isOpen = context?.value === itemValue

  return (
    <View
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
     onClick={() => context?.onValueChange?.(isOpen ? undefined : itemValue)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className={cn(
          "relative top-[1px] ml-1 h-3 w-3 transition duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </View>
  )
})
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  const itemValue = React.useContext(NavigationMenuItemContext)
  const isOpen = context?.value === itemValue

  if (!isOpen) return null

  return (
    <Portal>
      <View
        className="fixed inset-0 z-50 bg-black opacity-80 animate-in fade-in-0"
       onClick={() => context?.onValueChange?.(undefined)}
      />
      <View
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-[10px] border bg-popover p-6 text-popover-foreground shadow-md animate-in slide-in-from-bottom duration-300",
          className
        )}
        {...props}
      >
        <View className="mx-auto h-2 w-[100px] rounded-full bg-muted mb-4" />
        <ScrollView scrollY className="max-h-[70vh]">
          {children}
        </ScrollView>
      </View>
    </Portal>
  )
})
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = ({ children, className, ...props }: any) => (
  <View className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
    {children}
  </View>
)

const NavigationMenuViewport = () => null

const NavigationMenuIndicator = () => null

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

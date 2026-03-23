import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { ChevronDown } from "lucide-react-taro"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { isH5 } from "@/lib/platform"
import { computePosition, getRectById, getViewport } from "@/lib/measure"
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

const NavigationMenuItemContext = React.createContext<{ value: string; triggerId: string } | null>(null)

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value?: string }
>(({ children, value: valueProp, ...props }, ref) => {
  const id = React.useId()
  const value = valueProp || id
  const triggerIdRef = React.useRef(`navigation-menu-trigger-${Math.random().toString(36).slice(2, 10)}`)
  return (
    <NavigationMenuItemContext.Provider value={{ value, triggerId: triggerIdRef.current }}>
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
  const item = React.useContext(NavigationMenuItemContext)
  const isOpen = context?.value === item?.value

  return (
    <View
      ref={ref}
      id={item?.triggerId}
      data-slot="navigation-menu-trigger"
      data-state={isOpen ? "open" : "closed"}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      onClick={() => context?.onValueChange?.(isOpen ? undefined : item?.value)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className={cn(
          "relative top-[1px] ml-1 h-3 w-3 transition duration-200",
          isOpen && "rotate-180"
        )}
        size={12}
        color="inherit"
        aria-hidden="true"
      />
    </View>
  )
})
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom" | "left" | "right"
    sideOffset?: number
  }
>(({ className, align = "start", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  const item = React.useContext(NavigationMenuItemContext)
  const isOpen = context?.value === item?.value
  const contentId = React.useRef(`navigation-menu-content-${Math.random().toString(36).slice(2, 10)}`)
  const [position, setPosition] = React.useState<{ left: number; top: number } | null>(null)
  const [contentWidth, setContentWidth] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!isOpen) {
      setPosition(null)
      setContentWidth(null)
      return
    }

    let cancelled = false

    const compute = async () => {
      const triggerId = item?.triggerId
      if (!triggerId) return
      const [triggerRect, contentRect] = await Promise.all([
        getRectById(triggerId),
        getRectById(contentId.current),
      ])

      if (cancelled) return
      if (!triggerRect?.width || !contentRect?.width) return

      setContentWidth(contentRect.width)
      setPosition(
        computePosition({
          triggerRect,
          contentRect,
          align,
          side,
          sideOffset,
        })
      )
    }

    const raf = (() => {
      if (typeof requestAnimationFrame !== "undefined") {
        return requestAnimationFrame(() => compute())
      }
      return setTimeout(() => compute(), 0) as unknown as number
    })()

    return () => {
      cancelled = true
      if (typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(raf)
      } else {
        clearTimeout(raf)
      }
    }
  }, [align, isOpen, item?.triggerId, side, sideOffset])

  React.useEffect(() => {
    if (!isOpen) return
    if (!isH5() || typeof document === "undefined") return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        context?.onValueChange?.(undefined)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [context, isOpen])

  if (!isOpen) return null

  const baseClassName =
    "fixed z-50 min-w-32 w-max max-w-[95vw] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground ring-opacity-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"

  const vw = getViewport().width
  const isMobileLayout = vw < 640
  const shouldFullWidth = isMobileLayout && contentWidth !== null && contentWidth > vw - 16

  const contentStyle = position
    ? (shouldFullWidth
        ? ({ left: 8, right: 8, top: position.top } as React.CSSProperties)
        : ({ left: position.left, top: position.top } as React.CSSProperties))
    : ({
        left: shouldFullWidth ? 8 : 0,
        right: shouldFullWidth ? 8 : undefined,
        top: 0,
        opacity: 0,
        pointerEvents: "none",
      } as React.CSSProperties)

  return (
    <Portal>
      <View
        className="fixed inset-0 z-50 bg-transparent"
        onClick={() => context?.onValueChange?.(undefined)}
      />
      <View
        ref={ref}
        id={contentId.current}
        data-slot="navigation-menu-content"
        data-state="open"
        data-side={side}
        className={cn(
          baseClassName,
          className
        )}
        style={contentStyle}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <ScrollView scrollY className="max-h-[70vh] overflow-x-hidden overflow-y-auto">
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

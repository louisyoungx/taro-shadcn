import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { Check, ChevronRight, Circle } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

const isH5 = () => {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return typeof document !== "undefined"
  }
}

const ContextMenuContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
} | null>(null)

interface ContextMenuProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

const ContextMenu = ({ children, onOpenChange }: ContextMenuProps) => {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <ContextMenuContext.Provider value={{ open, onOpenChange: handleOpenChange, position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { disabled?: boolean }
>(({ className, children, disabled, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  const touchPos = React.useRef({ x: 0, y: 0 })

  const handleTrigger = (x: number, y: number) => {
    if (disabled) return
    context?.setPosition({ x, y })
    context?.onOpenChange?.(true)
  }

  return (
    <View
      ref={ref}
      className={className}
      onTouchStart={(e) => {
        const touch = e.touches[0]
        touchPos.current = { x: touch.pageX, y: touch.pageY }
      }}
      onLongPress={(e) => {
        if (isH5()) return // H5 handles via onContextMenu
        e.stopPropagation()
        handleTrigger(touchPos.current.x, touchPos.current.y)
      }}
      // @ts-ignore - onContextMenu is supported in H5
      onContextMenu={(e) => {
        if (!isH5()) return
        e.preventDefault()
        e.stopPropagation()
        handleTrigger(e.clientX, e.clientY)
      }}
      {...props}
    >
      {children}
    </View>
  )
})
ContextMenuTrigger.displayName = "ContextMenuTrigger"

const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={className} {...props} />
))
ContextMenuGroup.displayName = "ContextMenuGroup"

const ContextMenuPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  const contentId = React.useRef(`context-menu-${Math.random().toString(36).slice(2, 10)}`)
  const [adjustedPos, setAdjustedPos] = React.useState<{ x: number; y: number } | null>(null)

  React.useEffect(() => {
    if (!context?.open) {
      setAdjustedPos(null)
      return
    }

    const getViewport = () => {
      if (isH5() && typeof window !== "undefined") {
        return { width: window.innerWidth, height: window.innerHeight }
      }
      try {
        const info = Taro.getSystemInfoSync()
        return { width: info.windowWidth, height: info.windowHeight }
      } catch {
        return { width: 375, height: 667 }
      }
    }

    const compute = async () => {
      // Small delay to ensure content is rendered for measurement if needed, 
      // but here we mainly use viewport to keep it inside.
      const query = Taro.createSelectorQuery()
      query.select(`#${contentId.current}`).boundingClientRect((res) => {
        const rect = Array.isArray(res) ? res[0] : res
        if (!rect) return

        const { width: vw, height: vh } = getViewport()
        let { x, y } = context.position

        // Adjust if menu goes off screen
        if (x + rect.width > vw) {
          x = vw - rect.width - 10
        }
        if (y + rect.height > vh) {
          y = vh - rect.height - 10
        }

        setAdjustedPos({ x, y })
      }).exec()
    }

    setTimeout(compute, 0)
  }, [context?.open, context?.position])

  if (!context?.open) return null

  const contentStyle: React.CSSProperties = adjustedPos 
    ? { left: adjustedPos.x, top: adjustedPos.y }
    : { left: context.position.x, top: context.position.y, opacity: 0 }

  return (
    <Portal>
      <View
        className="fixed inset-0 z-50 bg-transparent"
       onClick={() => context.onOpenChange?.(false)}
        // @ts-ignore
        onContextMenu={(e) => {
          e.preventDefault()
          context.onOpenChange?.(false)
        }}
      />
      <View
        ref={ref}
        id={contentId.current}
        className={cn(
          "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 duration-200",
          className
        )}
        style={contentStyle}
        {...props}
      >
        <ScrollView scrollY className="max-h-[50vh]">
          {children}
        </ScrollView>
      </View>
    </Portal>
  )
})
ContextMenuContent.displayName = "ContextMenuContent"

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    disabled?: boolean
  }
>(({ className, inset, disabled, children, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  return (
    <View
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
     onClick={(e) => {
        if (disabled) return
        e.stopPropagation()
        context?.onOpenChange?.(false)
   ...props.onClick?.(e)
      }}
      {...props}
    >
      {children}
    </View>
  )
})
ContextMenuItem.displayName = "ContextMenuItem"

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  return (
    <View
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
     onClick={(e) => {
        e.stopPropagation()
        context?.onOpenChange?.(false)
   ...props.onClick?.(e)
      }}
      {...props}
    >
      <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {checked && <Check size={16} />}
      </View>
      {children}
    </View>
  )
})
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  return (
    <View
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
     onClick={(e) => {
        e.stopPropagation()
        context?.onOpenChange?.(false)
   ...props.onClick?.(e)
      }}
      {...props}
    >
      <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {checked && <Circle className="fill-current" size={8} />}
      </View>
      {children}
    </View>
  )
})
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "px-2 py-2 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = "ContextMenuLabel"

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = "ContextMenuSeparator"

const ContextMenuShortcut = ({
  className,
...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

// Simplified sub-menu: just render them inline
const ContextMenuSub = ({ children }: { children: React.ReactNode }) => <View>{children}</View>
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </View>
))
const ContextMenuSubContent = ({ children }: { children: React.ReactNode }) => (
  <View className="pl-4 border-l ml-2 my-1">{children}</View>
)
const ContextMenuRadioGroup = ({ children }: { children: React.ReactNode }) => <View>{children}</View>

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

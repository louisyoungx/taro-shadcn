import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { Check, Circle } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

const DropdownMenuContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
} | null>(null)

const isH5 = () => {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return typeof document !== "undefined"
  }
}

interface DropdownMenuProps {
    children: React.ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const DropdownMenu = ({ open: openProp, defaultOpen, onOpenChange, children }: DropdownMenuProps) => {
    const baseIdRef = React.useRef(
        `dropdown-menu-${Math.random().toString(36).slice(2, 10)}`
    )
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState
    
    const handleOpenChange = (newOpen: boolean) => {
        if (openProp === undefined) {
            setOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    return (
        <DropdownMenuContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerId: baseIdRef.current }}>
            {children}
        </DropdownMenuContext.Provider>
    )
}

const DropdownMenuTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    return (
        <View
          {...props}
          ref={ref}
          id={context?.triggerId}
          className={className}
          onClick={(e) => {
                e.stopPropagation()
                context?.onOpenChange?.(!context.open)
            }}
        >
            {children}
        </View>
    )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={className} {...props} />
))
DropdownMenuGroup.displayName = "DropdownMenuGroup"

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => {
    // In our simplified implementation, Content handles Portal
    return <>{children}</>
}

interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom" | "left" | "right"
    sideOffset?: number
}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuContentProps
>(({ className, align = "start", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    const contentId = React.useRef(
        `dropdown-menu-content-${Math.random().toString(36).slice(2, 10)}`
    )
    const [position, setPosition] = React.useState<{
        left: number
        top: number
    } | null>(null)

    React.useEffect(() => {
        if (!context?.open) {
            setPosition(null)
            return
        }

        let cancelled = false

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

        const getRectH5 = (id: string) => {
            if (!isH5() || typeof document === "undefined") return null
            const el = document.getElementById(id)
            if (!el) return null
            const r = el.getBoundingClientRect()
            return { left: r.left, top: r.top, width: r.width, height: r.height }
        }

        const getRect = (id: string) => {
            const h5Rect = getRectH5(id)
            if (h5Rect) return Promise.resolve(h5Rect)
            return new Promise<any>((resolve) => {
                const query = Taro.createSelectorQuery()
                query
                    .select(`#${id}`)
                    .boundingClientRect((res) => {
                        const rect = Array.isArray(res) ? res[0] : res
                        resolve(rect || null)
                    })
                    .exec()
            })
        }

        const compute = async () => {
            if (!context?.triggerId) return
            const [triggerRect, contentRect] = await Promise.all([
                getRect(context.triggerId),
                getRect(contentId.current),
            ])

            if (cancelled) return
            if (!triggerRect?.width || !contentRect?.width) return

            const vw = getViewport().width
            const vh = getViewport().height
            const margin = 8

            const crossStart = (side === "left" || side === "right")
                ? triggerRect.top
                : triggerRect.left
            const crossSize = (side === "left" || side === "right")
                ? triggerRect.height
                : triggerRect.width
            const contentCrossSize = (side === "left" || side === "right")
                ? contentRect.height
                : contentRect.width

            const cross = (() => {
                if (align === "start") return crossStart
                if (align === "end") return crossStart + crossSize - contentCrossSize
                return crossStart + crossSize / 2 - contentCrossSize / 2
            })()

            let left = 0
            let top = 0

            if (side === "bottom" || side === "top") {
                left = cross
                top =
                    side === "bottom"
                        ? triggerRect.top + triggerRect.height + sideOffset
                        : triggerRect.top - contentRect.height - sideOffset
            } else {
                top = cross
                left =
                    side === "right"
                        ? triggerRect.left + triggerRect.width + sideOffset
                        : triggerRect.left - contentRect.width - sideOffset
            }

            left = Math.min(Math.max(left, margin), vw - contentRect.width - margin)
            top = Math.min(Math.max(top, margin), vh - contentRect.height - margin)

            setPosition({ left, top })
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
    }, [align, context?.open, context?.triggerId, side, sideOffset])

    if (!context?.open) return null

    const baseClassName =
        "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"

    const contentStyle = position
        ? ({ left: position.left, top: position.top } as React.CSSProperties)
        : ({
            left: 0,
            top: 0,
            opacity: 0,
            pointerEvents: "none",
        } as React.CSSProperties)

    return (
        <Portal>
            <View 
              className="fixed inset-0 z-50 bg-transparent"
              onClick={() => context.onOpenChange?.(false)}
            />
            <View
              {...props}
              ref={ref}
              id={contentId.current}
              className={cn(baseClassName, className)}
              style={contentStyle}
              onClick={(e) => e.stopPropagation()}
            >
                <ScrollView scrollY className="max-h-[50vh]">
                     {children}
                </ScrollView>
            </View>
        </Portal>
    )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    disabled?: boolean
  }
>(({ className, inset, disabled, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
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
                context?.onOpenChange?.(false)
                props.onClick?.(e)
            }}
          {...props}
        />
    )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    return (
        <View
          ref={ref}
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
            )}
          onClick={(e) => {
                context?.onOpenChange?.(false)
                props.onClick?.(e)
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
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      value: string
  }
>(({ className, children, ...props }, ref) => {
    // Radio logic needs RadioGroup context usually. 
    // Here we just render item.
    return (
        <View
          ref={ref}
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
            )}
          {...props}
        >
            <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
                <Circle className="fill-current" size={8} />
            </View>
            {children}
        </View>
    )
})
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef<
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
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({
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
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Submenus are tricky on mobile bottom sheets. 
// We will skip SubMenu for now or render them inline?
// For now, export simplified components.
const DropdownMenuSub = View
const DropdownMenuSubTrigger = View
const DropdownMenuSubContent = View
const DropdownMenuRadioGroup = View

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

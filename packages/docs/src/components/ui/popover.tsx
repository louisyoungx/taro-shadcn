import * as React from "react"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"
import { useKeyboardOffset } from "@/lib/hooks/use-keyboard-offset"
import { isH5 } from "@/lib/platform"

const PopoverContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
} | null>(null)

interface PopoverProps {
    children: React.ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const Popover = ({ open: openProp, defaultOpen, onOpenChange, children }: PopoverProps) => {
    const baseIdRef = React.useRef(
        `popover-${Math.random().toString(36).slice(2, 10)}`
    )
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState
    
    const handleOpenChange = (newOpen: boolean) => {
        if (openProp === undefined) {
            setOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    React.useEffect(() => {
        if (!isH5()) return
        if (!open) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return
            e.stopPropagation()
            handleOpenChange(false)
        }

        window.addEventListener("keydown", onKeyDown, true)
        return () => {
            window.removeEventListener("keydown", onKeyDown, true)
        }
    }, [open])

    return (
        <PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerId: baseIdRef.current }}>
            {children}
        </PopoverContext.Provider>
    )
}

const PopoverTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    return (
        <View
          ref={ref}
          id={context?.triggerId}
          className={cn("w-fit", className)}
          onClick={(e) => {
                e.stopPropagation()
                context?.onOpenChange?.(!context.open)
            }}
          {...props}
        >
            {children}
        </View>
    )
})
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
    align?: "center" | "start" | "end"
    side?: "top" | "bottom" | "left" | "right"
    position?: "top" | "bottom" | "left" | "right"
    sideOffset?: number
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  PopoverContentProps
>(({ className, align = "center", side, position: positionProp, sideOffset = 4, style, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    const offset = useKeyboardOffset()
    const resolvedSide = positionProp ?? side ?? "bottom"
    const contentId = React.useRef(
        `popover-content-${Math.random().toString(36).slice(2, 10)}`
    )
    const [contentPosition, setContentPosition] = React.useState<
        | {
              left: number
              top: number
          }
        | null
    >(null)

    React.useEffect(() => {
        if (!context?.open) {
            setContentPosition(null)
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
            const [triggerRect, contentRect] = await Promise.all([
                getRect(context.triggerId),
                getRect(contentId.current),
            ])

            if (cancelled) return
            if (!triggerRect?.width || !contentRect?.width) return

            const viewport = getViewport()
            const vw = viewport.width
            const vh = Math.max(0, viewport.height - (isH5() ? 0 : offset || 0))
            const margin = 8

            const crossStart =
                resolvedSide === "left" || resolvedSide === "right" ? triggerRect.top : triggerRect.left
            const crossSize =
                resolvedSide === "left" || resolvedSide === "right" ? triggerRect.height : triggerRect.width
            const contentCrossSize =
                resolvedSide === "left" || resolvedSide === "right" ? contentRect.height : contentRect.width

            const cross = (() => {
                if (align === "start") return crossStart
                if (align === "end") return crossStart + crossSize - contentCrossSize
                return crossStart + crossSize / 2 - contentCrossSize / 2
            })()

            let left = 0
            let top = 0

            if (resolvedSide === "bottom" || resolvedSide === "top") {
                left = cross
                top =
                    resolvedSide === "bottom"
                        ? triggerRect.top + triggerRect.height + sideOffset
                        : triggerRect.top - contentRect.height - sideOffset
            } else {
                top = cross
                left =
                    resolvedSide === "right"
                        ? triggerRect.left + triggerRect.width + sideOffset
                        : triggerRect.left - contentRect.width - sideOffset
            }

            left = Math.min(Math.max(left, margin), vw - contentRect.width - margin)
            top = Math.min(Math.max(top, margin), vh - contentRect.height - margin)

            setContentPosition({ left, top })
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
    }, [align, context?.open, context?.triggerId, offset, resolvedSide, sideOffset])
    
    if (!context?.open) return null

    const baseClassName =
        "fixed z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"

    const contentStyle = contentPosition
        ? ({
              ...(style as object),
              left: contentPosition.left,
              top: contentPosition.top,
          } as React.CSSProperties)
        : ({
              ...(style as object),
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
              ref={ref}
              className={cn(
                    baseClassName,
                    className
                )}
              id={contentId.current}
              style={contentStyle}
              {...props}
            />
        </Portal>
    )
})
PopoverContent.displayName = "PopoverContent"

const PopoverHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("grid gap-1.5", className)} {...props} />
))
PopoverHeader.displayName = "PopoverHeader"

const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("font-medium leading-none", className)} {...props} />
))
PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
PopoverDescription.displayName = "PopoverDescription"

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}

import * as React from "react"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

type HoverCardProps = {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const HoverCardContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
  setHoverPart?: (part: "trigger" | "content", hovering: boolean) => void
} | null>(null)

const isH5 = () => {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return typeof document !== "undefined"
  }
}

const HoverCard = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: HoverCardProps) => {
  const baseIdRef = React.useRef(
    `hover-card-${Math.random().toString(36).slice(2, 10)}`
  )
  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp !== undefined ? openProp : openState
  const hoverRef = React.useRef({ trigger: false, content: false })
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpenChange = (newOpen: boolean) => {
    if (openProp === undefined) {
      setOpenState(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const setHoverPart = React.useCallback(
    (part: "trigger" | "content", hovering: boolean) => {
      if (!isH5()) return
      hoverRef.current[part] = hovering
      if (hovering) {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
        handleOpenChange(true)
        return
      }
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      closeTimerRef.current = setTimeout(() => {
        if (!hoverRef.current.trigger && !hoverRef.current.content) {
          handleOpenChange(false)
        }
      }, 80)
    },
    [handleOpenChange]
  )

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <HoverCardContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        triggerId: baseIdRef.current,
        setHoverPart,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  )
}

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    onMouseEnter?: (e: any) => void
    onMouseLeave?: (e: any) => void
  }
>(({ className, children, onClick, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const context = React.useContext(HoverCardContext)
  return (
    <View
      {...props}
      ref={ref}
      id={context?.triggerId}
      className={className}
      onClick={(e) => {
        onClick?.(e)
        e.stopPropagation()
        context?.onOpenChange?.(!context.open)
      }}
      {...(isH5()
        ? ({
            onMouseEnter: (e: any) => {
              onMouseEnter?.(e)
              context?.setHoverPart?.("trigger", true)
            },
            onMouseLeave: (e: any) => {
              onMouseLeave?.(e)
              context?.setHoverPart?.("trigger", false)
            },
          } as any)
        : {})}
    >
      {children}
    </View>
  )
})
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom" | "left" | "right"
    sideOffset?: number
    onMouseEnter?: (e: any) => void
    onMouseLeave?: (e: any) => void
  }
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
  const context = React.useContext(HoverCardContext)
  const contentId = React.useRef(
    `hover-card-content-${Math.random().toString(36).slice(2, 10)}`
  )
  const [position, setPosition] = React.useState<
    | {
        left: number
        top: number
      }
    | null
  >(null)

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
    "fixed z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"

  const contentStyle = position
    ? ({ left: position.left, top: position.top } as React.CSSProperties)
    : ({
        left: 0,
        top: 0,
        opacity: 0,
        pointerEvents: "none",
      } as React.CSSProperties)

  const overlay =
    !isH5() ? (
      <View
        className="fixed inset-0 z-50 bg-transparent"
        onClick={() => context.onOpenChange?.(false)}
      />
    ) : null

  return (
    <Portal>
      {overlay}
      <View
        {...props}
        ref={ref}
        id={contentId.current}
        className={cn(baseClassName, className)}
        style={contentStyle}
        {...(isH5()
          ? ({
              onMouseEnter: (e: any) => {
                onMouseEnter?.(e)
                context?.setHoverPart?.("content", true)
              },
              onMouseLeave: (e: any) => {
                onMouseLeave?.(e)
                context?.setHoverPart?.("content", false)
              },
            } as any)
          : {})}
      />
    </Portal>
  )
}
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }

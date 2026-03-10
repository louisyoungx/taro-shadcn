import * as React from "react"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

type TooltipProviderProps = {
  children: React.ReactNode
}

type TooltipProps = {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

type TooltipSide = "top" | "bottom" | "left" | "right"
type TooltipAlign = "start" | "center" | "end"

const TooltipContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerId: string
  setHoverPart?: (part: "trigger" | "content", hovering: boolean) => void
} | null>(null)

const TooltipProvider = ({ children }: TooltipProviderProps) => <>{children}</>

const isH5 = () => {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return typeof document !== "undefined"
  }
}

const Tooltip = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: TooltipProps) => {
  const baseIdRef = React.useRef(
    `tooltip-${Math.random().toString(36).slice(2, 10)}`
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
    <TooltipContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        triggerId: baseIdRef.current,
        setHoverPart,
      }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    onMouseEnter?: (e: any) => void
    onMouseLeave?: (e: any) => void
  }
>(
  (
    { className, children, onClick, onMouseEnter, onMouseLeave, ...props },
    ref
  ) => {
    const context = React.useContext(TooltipContext)
    return (
      <View
        ref={ref}
        id={context?.triggerId}
        className={cn("inline-flex w-fit justify-self-start", className)}
        onClick={(e) => {
          onClick?.(e)
          e.stopPropagation()
          context?.onOpenChange(!context.open)
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
        {...props}
      >
        {children}
      </View>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: TooltipAlign
    side?: TooltipSide
    sideOffset?: number
    avoidCollisions?: boolean
    collisionPadding?: number
    showArrow?: boolean
    arrowSize?: number
    onMouseEnter?: (e: any) => void
    onMouseLeave?: (e: any) => void
  }
>(
  (
    {
      children,
      className,
      align = "center",
      side = "top",
      sideOffset = 4,
      avoidCollisions = true,
      collisionPadding = 8,
      showArrow = true,
      arrowSize = 8,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(TooltipContext)
    const contentId = React.useRef(
      `tooltip-content-${Math.random().toString(36).slice(2, 10)}`
    )
    const [layout, setLayout] = React.useState<
      | {
          left: number
          top: number
          side: TooltipSide
          arrowLeft?: number
          arrowTop?: number
        }
      | null
    >(null)

    React.useEffect(() => {
      if (!context?.open) {
        setLayout(null)
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

      let rafId: number | null = null

      const compute = async () => {
        const toNumber = (v: any) => {
          if (typeof v === "number") return v
          if (typeof v === "string") {
            const n = parseFloat(v)
            return Number.isFinite(n) ? n : 0
          }
          return 0
        }

        const normalizeRect = (r: any) => {
          if (!r) return null
          return {
            left: toNumber(r.left),
            top: toNumber(r.top),
            width: toNumber(r.width),
            height: toNumber(r.height),
          }
        }

        const [triggerRectRaw, contentRectRaw] = await Promise.all([
          getRect(context.triggerId),
          getRect(contentId.current),
        ])

        const triggerRect = normalizeRect(triggerRectRaw)
        const contentRect = normalizeRect(contentRectRaw)

        if (cancelled) return
        if (!triggerRect?.width || !contentRect?.width) return

        const vw = getViewport().width
        const vh = getViewport().height
        const padding = Math.max(0, collisionPadding)

        const computeForSide = (s: TooltipSide) => {
          const isLR = s === "left" || s === "right"
          const crossStart = isLR ? triggerRect.top : triggerRect.left
          const crossSize = isLR ? triggerRect.height : triggerRect.width
          const contentCrossSize = isLR ? contentRect.height : contentRect.width
          const mainOffset = sideOffset + (showArrow ? arrowSize / 2 : 0)

          const cross = (() => {
            if (align === "start") return crossStart
            if (align === "end") return crossStart + crossSize - contentCrossSize
            return crossStart + crossSize / 2 - contentCrossSize / 2
          })()

          if (s === "bottom" || s === "top") {
            const left = cross
            const top =
              s === "bottom"
                ? triggerRect.top + triggerRect.height + mainOffset
                : triggerRect.top - contentRect.height - mainOffset
            return { left, top }
          }

          const top = cross
          const left =
            s === "right"
              ? triggerRect.left + triggerRect.width + mainOffset
              : triggerRect.left - contentRect.width - mainOffset
          return { left, top }
        }

        const oppositeSide = (s: TooltipSide): TooltipSide => {
          if (s === "top") return "bottom"
          if (s === "bottom") return "top"
          if (s === "left") return "right"
          return "left"
        }

        const wouldOverflowMainAxis = (s: TooltipSide, left: number, top: number) => {
          if (s === "top") return top < padding
          if (s === "bottom") return top + contentRect.height > vh - padding
          if (s === "left") return left < padding
          return left + contentRect.width > vw - padding
        }

        let resolvedSide: TooltipSide = side
        let { left, top } = computeForSide(resolvedSide)

        if (avoidCollisions && wouldOverflowMainAxis(resolvedSide, left, top)) {
          const flipped = oppositeSide(resolvedSide)
          const flippedPos = computeForSide(flipped)
          if (!wouldOverflowMainAxis(flipped, flippedPos.left, flippedPos.top)) {
            resolvedSide = flipped
            left = flippedPos.left
            top = flippedPos.top
          }
        }

        const maxLeft = Math.max(padding, vw - contentRect.width - padding)
        const maxTop = Math.max(padding, vh - contentRect.height - padding)
        left = Math.min(Math.max(left, padding), maxLeft)
        top = Math.min(Math.max(top, padding), maxTop)

        const triggerCenterX = triggerRect.left + triggerRect.width / 2
        const triggerCenterY = triggerRect.top + triggerRect.height / 2
        const arrowGap = 6

        if (resolvedSide === "top" || resolvedSide === "bottom") {
          const rawArrowLeft = triggerCenterX - left - arrowSize / 2
          const minArrowLeft = arrowGap
          const maxArrowLeft = contentRect.width - arrowSize - arrowGap
          const arrowLeft = Math.min(Math.max(rawArrowLeft, minArrowLeft), maxArrowLeft)
          setLayout({ left, top, side: resolvedSide, arrowLeft })
          return
        }

        const rawArrowTop = triggerCenterY - top - arrowSize / 2
        const minArrowTop = arrowGap
        const maxArrowTop = contentRect.height - arrowSize - arrowGap
        const arrowTop = Math.min(Math.max(rawArrowTop, minArrowTop), maxArrowTop)
        setLayout({ left, top, side: resolvedSide, arrowTop })
      }

      const schedule = () => {
        if (rafId != null) {
          if (typeof cancelAnimationFrame !== "undefined") {
            cancelAnimationFrame(rafId)
          } else {
            clearTimeout(rafId)
          }
          rafId = null
        }
        if (typeof requestAnimationFrame !== "undefined") {
          rafId = requestAnimationFrame(() => compute())
        } else {
          rafId = setTimeout(() => compute(), 0) as unknown as number
        }
      }

      schedule()

      const onWindowChange = () => schedule()

      if (isH5() && typeof window !== "undefined") {
        window.addEventListener("resize", onWindowChange)
        window.addEventListener("scroll", onWindowChange, true)
      }

      return () => {
        cancelled = true
        if (rafId != null) {
          if (typeof cancelAnimationFrame !== "undefined") {
            cancelAnimationFrame(rafId)
          } else {
            clearTimeout(rafId)
          }
        }
        if (isH5() && typeof window !== "undefined") {
          window.removeEventListener("resize", onWindowChange)
          window.removeEventListener("scroll", onWindowChange, true)
        }
      }
    }, [
      align,
      avoidCollisions,
      collisionPadding,
      context?.open,
      context?.triggerId,
      side,
      sideOffset,
      arrowSize,
    ])

    if (!context?.open) return null

    const baseClassName =
      "fixed z-50 overflow-visible rounded-md bg-black px-3 py-2 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"

    const px = (n: number) => `${n}px`

    const contentStyle = layout
      ? (isH5()
          ? ({ left: px(layout.left), top: px(layout.top) } as React.CSSProperties)
          : ({ left: layout.left, top: layout.top } as React.CSSProperties))
      : ({
          left: 0,
          top: 0,
          opacity: 0,
          pointerEvents: "none",
        } as React.CSSProperties)

    const arrow =
      showArrow && layout ? (
        <View
          className="absolute rotate-45 bg-black"
          style={
            layout.side === "top"
              ? (isH5()
                  ? ({
                      width: px(arrowSize),
                      height: px(arrowSize),
                      bottom: px(-arrowSize / 2),
                      left: px(layout.arrowLeft ?? 0),
                    } as React.CSSProperties)
                  : ({
                      width: arrowSize,
                      height: arrowSize,
                      bottom: -arrowSize / 2,
                      left: layout.arrowLeft ?? 0,
                    } as React.CSSProperties))
              : layout.side === "bottom"
                ? (isH5()
                    ? ({
                        width: px(arrowSize),
                        height: px(arrowSize),
                        top: px(-arrowSize / 2),
                        left: px(layout.arrowLeft ?? 0),
                      } as React.CSSProperties)
                    : ({
                        width: arrowSize,
                        height: arrowSize,
                        top: -arrowSize / 2,
                        left: layout.arrowLeft ?? 0,
                      } as React.CSSProperties))
                : layout.side === "left"
                  ? (isH5()
                      ? ({
                          width: px(arrowSize),
                          height: px(arrowSize),
                          right: px(-arrowSize / 2),
                          top: px(layout.arrowTop ?? 0),
                        } as React.CSSProperties)
                      : ({
                          width: arrowSize,
                          height: arrowSize,
                          right: -arrowSize / 2,
                          top: layout.arrowTop ?? 0,
                        } as React.CSSProperties))
                  : (isH5()
                      ? ({
                          width: px(arrowSize),
                          height: px(arrowSize),
                          left: px(-arrowSize / 2),
                          top: px(layout.arrowTop ?? 0),
                        } as React.CSSProperties)
                      : ({
                          width: arrowSize,
                          height: arrowSize,
                          left: -arrowSize / 2,
                          top: layout.arrowTop ?? 0,
                        } as React.CSSProperties))
          }
        />
      ) : null

    const overlay = !isH5() ? (
      <View
        className="fixed inset-0 z-50 bg-transparent"
        onClick={() => context.onOpenChange(false)}
      />
    ) : null

    return (
      <Portal>
        {overlay}
        <View
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
          {...props}
        >
          {arrow}
          {children}
        </View>
      </Portal>
    )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

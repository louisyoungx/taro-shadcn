import * as React from "react"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { GripVertical } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { isH5 } from "@/lib/platform"

type Direction = "horizontal" | "vertical"

function getPoint(e: any) {
  const touch = e?.touches?.[0] || e?.changedTouches?.[0]
  return touch || e
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const ResizablePanelGroup = ({
  className,
  children,
  direction = "horizontal",
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  direction?: Direction
}) => {
  const idRef = React.useRef(`resizable-${Math.random().toString(36).slice(2, 11)}`)
  const groupRef = React.useRef<any>(null)
  const sizesRef = React.useRef<number[] | null>(null)
  const [sizes, setSizes] = React.useState<number[] | null>(null)

  const rectSizeRef = React.useRef<{ width: number; height: number } | null>(null)
  const dragRef = React.useRef<{
    axis: "x" | "y"
    input: "mouse" | "touch"
    leftIndex: number
    startPos: number
    startSizes: number[]
    containerSize: number
  } | null>(null)

  React.useEffect(() => {
    sizesRef.current = sizes
  }, [sizes])

  const isPanelElement = React.useCallback((child: any) => {
    return child?.type?.displayName === "ResizablePanel"
  }, [])

  const isHandleElement = React.useCallback((child: any) => {
    return child?.type?.displayName === "ResizableHandle"
  }, [])

  const panels = React.useMemo(() => {
    const out: React.ReactElement[] = []
    React.Children.forEach(children as any, (child) => {
      if (!React.isValidElement(child)) return
      if (isPanelElement(child)) out.push(child as any)
    })
    return out
  }, [children, isPanelElement])

  const measure = React.useCallback(() => {
    const el = groupRef.current
    if (isH5() && typeof el?.getBoundingClientRect === "function") {
      const rect = el.getBoundingClientRect()
      const width = rect?.width
      const height = rect?.height
      if (typeof width === "number" && typeof height === "number") {
        rectSizeRef.current = { width, height }
        return Promise.resolve(rectSizeRef.current)
      }
    }

    return new Promise<{ width: number; height: number } | null>((resolve) => {
      const query = Taro.createSelectorQuery()
      query
        .select(`#${idRef.current}`)
        .boundingClientRect((res) => {
          const r = Array.isArray(res) ? res[0] : res
          const width = r?.width
          const height = r?.height
          if (typeof width === "number" && typeof height === "number") {
            rectSizeRef.current = { width, height }
            resolve(rectSizeRef.current)
            return
          }
          resolve(null)
        })
        .exec()
    })
  }, [])

  React.useEffect(() => {
    const defaults = panels.map((p) => {
      const v = (p.props as any)?.defaultSize
      return typeof v === "number" && Number.isFinite(v) ? v : null
    })
    const hasAnyDefault = defaults.some((v) => v != null)
    const next =
      hasAnyDefault
        ? defaults.map((v) => (v == null ? 0 : v))
        : panels.map(() => 100 / Math.max(1, panels.length))
    const total = next.reduce((a, b) => a + b, 0) || 1
    const normalized = next.map((v) => (v / total) * 100)

    setSizes((prev) => {
      if (prev && prev.length === normalized.length) return prev
      return normalized
    })
  }, [panels])

  React.useEffect(() => {
    void measure()
    if (!isH5() || typeof window === "undefined") return
    const onResize = () => void measure()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [measure])

  const applyMove = React.useCallback(
    (e: any) => {
      const drag = dragRef.current
      const currentSizes = sizesRef.current
      if (!drag || !currentSizes) return
      const p = getPoint(e)
      const pos = drag.axis === "x" ? p?.pageX : p?.pageY
      if (typeof pos !== "number") return
      if (!drag.containerSize) return

      const deltaPercent = ((pos - drag.startPos) / drag.containerSize) * 100
      const left = drag.leftIndex
      const right = left + 1
      const total = drag.startSizes[left] + drag.startSizes[right]
      const min = 10
      const nextLeft = clamp(drag.startSizes[left] + deltaPercent, min, total - min)
      const next = drag.startSizes.slice()
      next[left] = nextLeft
      next[right] = total - nextLeft
      setSizes(next)
    },
    []
  )

  const endDrag = React.useCallback(() => {
    dragRef.current = null
    if (!isH5() || typeof document === "undefined") return
    document.removeEventListener("mousemove", onDocumentMouseMove as any)
    document.removeEventListener("mouseup", onDocumentMouseUp as any)
    document.removeEventListener("touchmove", onDocumentTouchMove as any, { passive: false } as any)
    document.removeEventListener("touchend", onDocumentTouchEnd as any)
    document.removeEventListener("touchcancel", onDocumentTouchEnd as any)
  }, [])

  const onDocumentMouseMove = React.useCallback((e: any) => applyMove(e), [applyMove])
  const onDocumentMouseUp = React.useCallback(() => endDrag(), [endDrag])
  const onDocumentTouchMove = React.useCallback(
    (e: any) => {
      const drag = dragRef.current
      if (!drag || drag.input !== "touch") return
      e?.preventDefault?.()
      applyMove(e)
    },
    [applyMove]
  )
  const onDocumentTouchEnd = React.useCallback(() => endDrag(), [endDrag])

  React.useEffect(() => {
    return () => endDrag()
  }, [endDrag])

  const startDrag = React.useCallback(
    async (leftIndex: number, e: any) => {
      const currentSizes = sizesRef.current
      if (!currentSizes) return
      if (leftIndex < 0 || leftIndex >= currentSizes.length - 1) return

      const axis = direction === "horizontal" ? "x" : "y"
      const p = getPoint(e)
      const pos = axis === "x" ? p?.pageX : p?.pageY
      if (typeof pos !== "number") return
      const input: "mouse" | "touch" = (e as any)?.touches?.length ? "touch" : "mouse"

      const rect = rectSizeRef.current || (await measure())
      const containerSize = axis === "x" ? rect?.width : rect?.height
      if (!containerSize) return

      dragRef.current = {
        axis,
        input,
        leftIndex,
        startPos: pos,
        startSizes: currentSizes.slice(),
        containerSize,
      }
      e?.preventDefault?.()

      if (isH5() && typeof document !== "undefined") {
        if (input === "mouse") {
          document.addEventListener("mousemove", onDocumentMouseMove as any)
          document.addEventListener("mouseup", onDocumentMouseUp as any)
        } else {
          document.addEventListener("touchmove", onDocumentTouchMove as any, { passive: false } as any)
          document.addEventListener("touchend", onDocumentTouchEnd as any)
          document.addEventListener("touchcancel", onDocumentTouchEnd as any)
        }
      }
    },
    [
      direction,
      measure,
      onDocumentMouseMove,
      onDocumentMouseUp,
      onDocumentTouchEnd,
      onDocumentTouchMove,
    ]
  )

  const onGroupTouchMove = React.useCallback(
    (e: any) => {
      const drag = dragRef.current
      if (!drag || drag.input !== "touch") return
      e?.preventDefault?.()
      applyMove(e)
    },
    [applyMove]
  )

  const onGroupTouchEnd = React.useCallback(() => endDrag(), [endDrag])

  let panelIndex = 0
  let handleIndex = 0

  return (
    <View
      id={idRef.current}
      ref={groupRef}
      className={cn(
        "flex h-full w-full items-stretch overflow-hidden",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
      onTouchMove={onGroupTouchMove}
      onTouchEnd={onGroupTouchEnd}
      onTouchCancel={onGroupTouchEnd as any}
    >
      {React.Children.map(children as any, (child) => {
        if (!React.isValidElement(child)) return child

        if (isPanelElement(child)) {
          const size = sizes?.[panelIndex]
          const cloned = React.cloneElement(child as any, {
            __size: typeof size === "number" ? size : undefined,
            __direction: direction,
          })
          panelIndex += 1
          return cloned
        }

        if (isHandleElement(child)) {
          const leftIndex = panelIndex - 1
          const cursorClass =
            direction === "horizontal" ? "cursor-col-resize" : "cursor-row-resize"
          const cloned = React.cloneElement(child as any, {
            __direction: direction,
            className: cn(cursorClass, (child.props as any)?.className),
            onTouchStart: (e: any) => void startDrag(leftIndex, e),
            // @ts-ignore
            onMouseDown: (e: any) => void startDrag(leftIndex, e),
            "data-handle-index": handleIndex,
          })
          handleIndex += 1
          return cloned
        }

        return child
      })}
    </View>
  )
}

const ResizablePanel = ({
  className,
  children,
  defaultSize,
  __size,
  __direction,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  defaultSize?: number
  __size?: number
  __direction?: Direction
}) => (
  <View
    {...props}
    className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden", className)}
    style={{
      flexBasis: 0,
      flexGrow: __size ?? defaultSize ?? 1,
      flexShrink: 1,
      minWidth: 0,
      minHeight: 0,
      ...(props as any)?.style,
    }}
  >
    {children}
  </View>
)

const ResizableHandle = ({
  withHandle,
  className,
  __direction,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  withHandle?: boolean
  __direction?: Direction
}) => (
  <View
    {...props}
    className={cn(
      "relative flex shrink-0 items-center justify-center bg-transparent",
      __direction === "vertical" ? "h-3 self-stretch" : "w-3 self-stretch",
      className
    )}
  >
    <View
      className={cn(
        "absolute bg-border",
        __direction === "vertical"
          ? "inset-x-0 top-1/2 -translate-y-1/2"
          : "inset-y-0 left-1/2 -translate-x-1/2"
      )}
      style={__direction === "vertical" ? { height: "1PX" } : { width: "1PX" }}
    />
    {withHandle && (
      <View className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-3 w-3" />
      </View>
    )}
  </View>
)

;(ResizablePanel as any).displayName = "ResizablePanel"
;(ResizableHandle as any).displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

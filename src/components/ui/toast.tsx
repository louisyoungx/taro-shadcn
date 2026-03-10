import * as React from "react"
import { RootPortal, Text, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import {
  Check,
  Info,
  Loader,
  TriangleAlert,
  X,
  CircleAlert
} from "lucide-react-taro"
import { cn } from "@/lib/utils"

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"

export type ToastType = "success" | "info" | "warning" | "error" | "loading" | "default"

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastData {
  id?: string | number
  title?: React.ReactNode
  description?: React.ReactNode
  type?: ToastType
  duration?: number
  position?: ToastPosition
  invert?: boolean
  dismissible?: boolean
  descriptionClassName?: string
  action?: ToastAction
  cancel?: ToastAction
  onDismiss?: (toast: Toast) => void
  onAutoClose?: (toast: Toast) => void
  richColors?: boolean
  closeButton?: boolean
  style?: React.CSSProperties
  className?: string
  jsx?: React.ReactNode | ((id: string | number) => React.ReactNode)
}

export interface Toast extends ToastData {
  id: string | number
}

const listeners: Array<(toasts: Toast[]) => void> = []
let toasts: Toast[] = []

const notify = () => {
  listeners.forEach((l) => l([...toasts]))
}

const createToast = (title: React.ReactNode, data: ToastData = {}) => {
  const id = data.id || Date.now().toString() + Math.random().toString(36).substring(2, 9)
  
  const existingToast = toasts.find((t) => t.id === id)
  
  if (existingToast) {
    toasts = toasts.map((t) => 
      t.id === id ? { ...t, ...data, title: title || t.title } : t
    )
  } else {
    const newToast: Toast = {
      ...data,
      id,
      title,
      type: data.type || "default",
      dismissible: data.dismissible ?? true,
    }
    toasts = [...toasts, newToast]
  }
  
  notify()
  return id
}

const dismiss = (id?: string | number) => {
  if (!id) {
    toasts = []
  } else {
    toasts = toasts.filter((t) => t.id !== id)
  }
  notify()
}

type ToastFunction = (title: string | React.ReactNode, data?: ToastData) => string | number

const toastFn: ToastFunction = (title, data) => createToast(title, data)

const toast = Object.assign(toastFn, {
  success: (title: string | React.ReactNode, data?: ToastData) => 
    createToast(title, { ...data, type: "success" }),
  error: (title: string | React.ReactNode, data?: ToastData) => 
    createToast(title, { ...data, type: "error" }),
  warning: (title: string | React.ReactNode, data?: ToastData) => 
    createToast(title, { ...data, type: "warning" }),
  info: (title: string | React.ReactNode, data?: ToastData) => 
    createToast(title, { ...data, type: "info" }),
  loading: (title: string | React.ReactNode, data?: ToastData) => 
    createToast(title, { ...data, type: "loading" }),
  message: (title: string | React.ReactNode, data?: ToastData) => 
    createToast(title, { ...data, type: "default" }),
  custom: (jsx: (id: string | number) => React.ReactNode, data?: ToastData) => {
    const id = data?.id || Date.now().toString()
    return createToast(null, { ...data, id, jsx })
  },
  dismiss,
  promise: <T,>(
    promise: Promise<T> | (() => Promise<T>),
    data: {
      loading?: string | React.ReactNode
      success?: string | React.ReactNode | ((data: T) => React.ReactNode)
      error?: string | React.ReactNode | ((error: any) => React.ReactNode)
      finally?: () => void
    } & ToastData
  ) => {
    const id = toast.loading(data.loading, { ...data })
    
    const p = typeof promise === "function" ? promise() : promise
    
    p.then((res) => {
      const successMessage = typeof data.success === "function" ? data.success(res) : data.success
      toast.success(successMessage, { id, ...data })
    })
    .catch((err) => {
      const errorMessage = typeof data.error === "function" ? data.error(err) : data.error
      toast.error(errorMessage, { id, ...data })
    })
    .finally(() => {
      data.finally?.()
    })
    
    return id
  }
})

interface ToasterProps {
  position?: ToastPosition
  richColors?: boolean
  expand?: boolean
  closeButton?: boolean
  offset?: number
  dir?: "rtl" | "ltr" | "auto"
  visibleToasts?: number
  duration?: number
  gap?: number
  theme?: "light" | "dark" | "system"
  className?: string
  style?: React.CSSProperties
  toastOptions?: Omit<ToastData, "id">
}

const Toaster = ({
  position = "bottom-right",
  richColors = false,
  expand = false,
  closeButton = false,
  visibleToasts = 3,
  duration = 4000,
  gap = 14,
  className,
  style,
  toastOptions
}: ToasterProps) => {
  const [activeToasts, setActiveToasts] = React.useState<Toast[]>([])
  const [closingIds, setClosingIds] = React.useState<Set<string | number>>(() => new Set())
  const [frontHeight, setFrontHeight] = React.useState<number | null>(null)
  const frontIdRef = React.useRef(`toaster-front-${Math.random().toString(36).slice(2, 9)}`)

  React.useEffect(() => {
    listeners.push(setActiveToasts)
    return () => {
      const index = listeners.indexOf(setActiveToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const getPositionStyle = (pos: ToastPosition) => {
    switch (pos) {
      case "top-left": return "top-0 left-0 right-0 justify-start"
      case "top-right": return "top-0 left-0 right-0 justify-end"
      case "bottom-left": return "bottom-0 left-0 right-0 justify-start"
      case "bottom-right": return "bottom-0 left-0 right-0 justify-end"
      case "top-center": return "top-0 left-0 right-0 justify-center"
      case "bottom-center": return "bottom-0 left-0 right-0 justify-center"
      default: return "bottom-0 left-0 right-0 justify-end"
    }
  }

  const isTop = position.includes("top")

  React.useEffect(() => {
    if (expand) return
    if (activeToasts.length <= visibleToasts) return

    const overflow = activeToasts.slice(0, activeToasts.length - visibleToasts)
    const nextToClose = overflow.find((t) => !closingIds.has(t.id))
    if (!nextToClose) return

    setClosingIds((prev) => {
      if (prev.has(nextToClose.id)) return prev
      const next = new Set(prev)
      next.add(nextToClose.id)
      return next
    })
  }, [activeToasts, closingIds, expand, visibleToasts])

  React.useEffect(() => {
    setClosingIds((prev) => {
      if (prev.size === 0) return prev
      const activeIds = new Set(activeToasts.map((t) => t.id))
      const next = new Set<string | number>()
      prev.forEach((id) => {
        if (activeIds.has(id)) next.add(id)
      })
      return next.size === prev.size ? prev : next
    })
  }, [activeToasts])

  const toastsToRender = React.useMemo(() => {
    if (expand) return activeToasts
    const keep = activeToasts.slice(-visibleToasts)
    const overflowCount = Math.max(0, activeToasts.length - visibleToasts)
    const overflowIds = new Set(activeToasts.slice(0, overflowCount).map((t) => t.id))
    const closing = activeToasts.filter((t) => overflowIds.has(t.id) && closingIds.has(t.id))
    return [...closing, ...keep]
  }, [activeToasts, closingIds, expand, visibleToasts])

  const listStyle = expand ? ({ gap } as React.CSSProperties) : undefined

  React.useEffect(() => {
    if (toastsToRender.length === 0) return
    const timer = setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query
        .select(`#${frontIdRef.current}`)
        .boundingClientRect((res) => {
          const rect = Array.isArray(res) ? res[0] : res
          if (rect?.height) setFrontHeight(rect.height)
        })
        .exec()
    }, 50)
    return () => clearTimeout(timer)
  }, [toastsToRender.length])

  return (
    <RootPortal>
      <View
        className={cn(
          "toaster fixed z-[100] flex p-4 w-full pointer-events-none",
          getPositionStyle(position),
          className
        )}
        data-position={position}
        style={style}
      >
        <View
          className={cn(
            "toaster-list relative w-full md:max-w-[420px] flex",
            isTop ? "flex-col-reverse" : "flex-col"
          )}
          style={listStyle}
        >
          {toastsToRender.map((t, index) => {
            const isFront = index === toastsToRender.length - 1
            const stackIndex = toastsToRender.length - 1 - index

            return (
              <ToastItem
                key={t.id}
                elementId={isFront ? frontIdRef.current : undefined}
                item={t}
                isExpanded={expand}
                isFront={isFront}
                stackIndex={stackIndex}
                isTop={isTop}
                gap={gap}
                forceClose={!expand && closingIds.has(t.id)}
                frontHeight={frontHeight}
                duration={t.duration || duration}
                richColors={t.richColors ?? richColors}
                closeButton={t.closeButton ?? closeButton}
                toastOptions={toastOptions}
              />
            )
          })}
        </View>
      </View>
    </RootPortal>
  )
}

const ToastItem = ({
  elementId,
  item,
  isExpanded,
  isFront,
  stackIndex,
  isTop,
  gap,
  forceClose,
  frontHeight,
  duration,
  richColors,
  closeButton,
  toastOptions
}: {
  elementId?: string
  item: Toast
  isExpanded: boolean
  isFront: boolean
  stackIndex: number
  isTop: boolean
  gap: number
  forceClose: boolean
  frontHeight: number | null
  duration: number
  richColors: boolean
  closeButton: boolean
  toastOptions?: Omit<ToastData, "id">
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isRemoved, setIsRemoved] = React.useState(false)
  const timeOutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 16)
    
    if (item.duration === Infinity) return

    const d = item.duration || duration
    timeOutRef.current = setTimeout(() => {
      handleDismiss()
    }, d)

    return () => {
      clearTimeout(timer)
      clearTimeout(timeOutRef.current)
    }
  }, [item.duration, duration])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsRemoved(true)
      item.onDismiss?.(item)
      dismiss(item.id)
    }, 400)
  }

  React.useEffect(() => {
    if (!forceClose) return
    const t = setTimeout(() => handleDismiss(), 16)
    return () => clearTimeout(t)
  }, [forceClose])
  
  const TypeIcon = {
    success: Check,
    error: CircleAlert,
    warning: TriangleAlert,
    info: Info,
    loading: Loader,
    default: null
  }[item.type || "default"]

  const palette = React.useMemo(() => {
    if (!richColors) return null
    const type = item.type || "default"
    if (type === "success") {
      return { backgroundColor: "hsl(143, 85%, 96%)", borderColor: "hsl(145, 92%, 87%)", color: "hsl(140, 100%, 27%)" }
    }
    if (type === "info") {
      return { backgroundColor: "hsl(208, 100%, 97%)", borderColor: "hsl(221, 91%, 93%)", color: "hsl(210, 92%, 45%)" }
    }
    if (type === "warning") {
      return { backgroundColor: "hsl(49, 100%, 97%)", borderColor: "hsl(49, 91%, 84%)", color: "hsl(31, 92%, 45%)" }
    }
    if (type === "error") {
      return { backgroundColor: "hsl(359, 100%, 97%)", borderColor: "hsl(359, 100%, 94%)", color: "hsl(360, 100%, 45%)" }
    }
    return null
  }, [item.type, richColors])

  const iconColor = palette?.color

  const isCollapsedStack = !isExpanded && !isFront
  const lift = isTop ? 1 : -1
  const enterOffset = (frontHeight ?? 80) * 1.5
  const stackTranslate = lift * gap * stackIndex
  const stackScale = 1 - stackIndex * 0.05
  const transform = isCollapsedStack
    ? `translateY(${stackTranslate}px) scale(${stackScale})`
    : isVisible
        ? "translateY(0px)"
        : `translateY(${(-lift * enterOffset).toFixed(0)}px)`

  const motionStyle: React.CSSProperties = {
    transform,
    opacity: isVisible ? 1 : 0,
    transition: "transform 400ms ease, opacity 400ms ease, height 400ms ease, box-shadow 200ms ease",
    transformOrigin: isCollapsedStack ? (isTop ? "bottom" : "top") : "center"
  }

  if (isRemoved) return null

  const isCustom = typeof item.jsx !== "undefined"

  const baseClasses = cn(
    "toast pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg",
    !palette && "bg-background border-border text-foreground",
    item.className,
    toastOptions?.className
  )
  
  const finalStyle: React.CSSProperties = {
    ...(palette || {}),
    ...item.style,
    ...motionStyle,
    position: isCollapsedStack ? "absolute" : "relative",
    ...(isCollapsedStack ? (isTop ? { bottom: 0 } : { top: 0 }) : (isTop ? { top: 0 } : { bottom: 0 })),
    left: 0,
    right: 0,
    zIndex: isFront ? 50 : 40 - stackIndex,
    pointerEvents: isCollapsedStack ? "none" : "auto",
    ...(isCollapsedStack && frontHeight ? { height: frontHeight } : {})
  }

  if (isCustom) {
    const content = typeof item.jsx === "function" ? item.jsx(item.id) : item.jsx
    return (
      <View
        className={cn(
          "pointer-events-auto w-full"
        )}
        id={elementId}
        style={finalStyle}
      >
        <View style={{ opacity: isCollapsedStack ? 0 : 1, transition: "opacity 400ms ease" }}>
          {content}
        </View>
      </View>
    )
  }

  return (
    <View className={baseClasses} style={finalStyle} id={elementId}>
      <View className="flex gap-3 items-center flex-1" style={{ opacity: isCollapsedStack ? 0 : 1, transition: "opacity 400ms ease" }}>
        {TypeIcon && (
          <TypeIcon className={cn("h-5 w-5 shrink-0", item.type === "loading" && "animate-spin")} color={iconColor} />
        )}
        <View className="flex flex-col gap-1 flex-1">
          {item.title && <Text className="text-sm font-semibold leading-none" style={palette ? { color: palette.color } : undefined}>{item.title}</Text>}
          {item.description && (
            <Text className={cn("text-xs opacity-90 leading-normal", item.descriptionClassName)} style={palette ? { color: palette.color } : undefined}>
              {item.description}
            </Text>
          )}
        </View>
      </View>

      {(item.action || item.cancel) && (
        <View className="flex flex-nowrap items-center gap-2 shrink-0" style={{ opacity: isCollapsedStack ? 0 : 1, transition: "opacity 400ms ease" }}>
          {item.cancel && (
            <View
              className="text-xs font-medium opacity-70 active:opacity-100 whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation()
                item.cancel?.onClick()
                handleDismiss()
              }}
            >
              {item.cancel.label}
            </View>
          )}
          {item.action && (
            <View
              className="text-xs font-medium active:opacity-80 px-3 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation()
                item.action?.onClick()
                handleDismiss()
              }}
            >
              {item.action.label}
            </View>
          )}
        </View>
      )}

      {closeButton && (
        <View
          className="absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
          style={{ opacity: isCollapsedStack ? 0 : undefined, transition: "opacity 400ms ease" }}
          onClick={(e) => {
            e.stopPropagation()
            handleDismiss()
          }}
        >
          <X className="h-4 w-4" color={iconColor} />
        </View>
      )}
    </View>
  )
}

export { Toaster, toast }

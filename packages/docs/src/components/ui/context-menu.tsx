import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { Check, ChevronRight, Circle } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { isH5 } from "@/lib/platform"
import { computePosition, getRectById, getViewport } from "@/lib/measure"
import { Portal } from "@/components/ui/portal"

const ContextMenuContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
  activeSubId?: string | null
  setActiveSubId: (id: string | null) => void
} | null>(null)

interface ContextMenuProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

const ContextMenu = ({ children, onOpenChange }: ContextMenuProps) => {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [activeSubId, setActiveSubId] = React.useState<string | null>(null)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) setActiveSubId(null)
    onOpenChange?.(newOpen)
  }

  return (
    <ContextMenuContext.Provider
      value={{ open, onOpenChange: handleOpenChange, position, setPosition, activeSubId, setActiveSubId }}
    >
      {children}
    </ContextMenuContext.Provider>
  )
}

const ContextMenuTrigger = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof View> & { disabled?: boolean }
>(({ className, children, disabled, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  const touchPos = React.useRef({ x: 0, y: 0 })

  const handleTrigger = (x: number, y: number) => {
    if (disabled) return
    context?.setPosition({ x, y })
    context?.onOpenChange?.(true)
  }

  if (isH5()) {
    const { onLongPress: _onLongPress, onTouchStart: _onTouchStart, ...rest } = props as any
    return (
      <div
        ref={ref}
        className={className}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleTrigger(e.clientX, e.clientY)
        }}
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <View
      ref={ref}
      className={className}
      onTouchStart={(e) => {
        const touch = (e as unknown as { touches?: Array<{ pageX: number; pageY: number }> }).touches?.[0]
        if (!touch) return
        touchPos.current = { x: touch.pageX, y: touch.pageY }
      }}
      onLongPress={(e) => {
        e.stopPropagation()
        handleTrigger(touchPos.current.x, touchPos.current.y)
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

    let cancelled = false

    const compute = async () => {
      const { width: vw, height: vh } = getViewport()
      let { x, y } = context.position

      if (isH5() && typeof document !== "undefined") {
        const el = document.getElementById(contentId.current)
        const rect = el?.getBoundingClientRect()
        if (rect) {
          if (x + rect.width > vw) x = vw - rect.width - 8
          if (y + rect.height > vh) y = vh - rect.height - 8
        }
        if (!cancelled) setAdjustedPos({ x, y })
        return
      }

      const query = Taro.createSelectorQuery()
      query
        .select(`#${contentId.current}`)
        .boundingClientRect((res) => {
          if (cancelled) return
          const rect = Array.isArray(res) ? res[0] : res
          if (rect?.width) {
            if (x + rect.width > vw) x = vw - rect.width - 8
            if (y + rect.height > vh) y = vh - rect.height - 8
          }
          setAdjustedPos({ x, y })
        })
        .exec()
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
  }, [context?.open, context?.position])

  if (!context?.open) return null

  const contentStyle: React.CSSProperties = adjustedPos
    ? { left: adjustedPos.x, top: adjustedPos.y }
    : { left: context.position.x, top: context.position.y }

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
        data-slot="context-menu-content"
        data-state="open"
        className={cn(
          "fixed z-50 min-w-32 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground ring-opacity-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        style={contentStyle}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <ScrollView scrollY className="max-h-[50vh] overflow-x-hidden overflow-y-auto">
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
    closeOnSelect?: boolean
  }
>(({ className, inset, disabled, closeOnSelect = true, children, onClick, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  return (
    <View
      ref={ref}
      data-slot="context-menu-item"
      data-inset={inset ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-7",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        e.stopPropagation()
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange?.(false)
      }}
      {...props}
    >
      {children}
    </View>
  )
})
ContextMenuItem.displayName = "ContextMenuItem"

const ContextMenuRadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
} | null>(null)

interface ContextMenuRadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const ContextMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ContextMenuRadioGroupProps
>(({ value: valueProp, defaultValue, onValueChange, ...props }, ref) => {
  const [valueState, setValueState] = React.useState<string | undefined>(defaultValue)
  const value = valueProp !== undefined ? valueProp : valueState

  const handleValueChange = (next: string) => {
    if (valueProp === undefined) {
      setValueState(next)
    }
    onValueChange?.(next)
  }

  return (
    <ContextMenuRadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View ref={ref} {...props} />
    </ContextMenuRadioGroupContext.Provider>
  )
})
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup"

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
    inset?: boolean
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, children, checked, inset, disabled, closeOnSelect = false, onClick, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  return (
    <View
      ref={ref}
      data-slot="context-menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-7",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        e.stopPropagation()
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange?.(false)
      }}
      {...props}
    >
      <View className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <Check size={16} color="inherit" />}
      </View>
      {children}
    </View>
  )
})
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value: string
    checked?: boolean
    inset?: boolean
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, children, value, checked: checkedProp, inset, disabled, closeOnSelect = false, onClick, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext)
  const group = React.useContext(ContextMenuRadioGroupContext)
  const checked = checkedProp !== undefined ? checkedProp : group?.value === value
  return (
    <View
      ref={ref}
      data-slot="context-menu-radio-item"
      data-inset={inset ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-7",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        e.stopPropagation()
        group?.onValueChange?.(value)
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange?.(false)
      }}
      {...props}
    >
      <View className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <Circle className="fill-current" size={8} color="inherit" />}
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
      "px-2 py-1 text-xs font-medium text-muted-foreground",
      inset && "pl-7",
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
    className={cn("-mx-1 my-1 h-px bg-border", className)}
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
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

const ContextMenuSubContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
} | null>(null)

interface ContextMenuSubProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const ContextMenuSub = ({ open: openProp, defaultOpen, onOpenChange, children }: ContextMenuSubProps) => {
  const parent = React.useContext(ContextMenuContext)
  const baseIdRef = React.useRef(`context-menu-sub-${Math.random().toString(36).slice(2, 10)}`)
  const [openState, setOpenState] = React.useState(defaultOpen || false)
  const isActive = parent?.activeSubId === baseIdRef.current
  const open = openProp !== undefined ? openProp : openState && isActive

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setOpenState(nextOpen)
        if (nextOpen) {
          parent?.setActiveSubId(baseIdRef.current)
        } else if (parent?.activeSubId === baseIdRef.current) {
          parent?.setActiveSubId(null)
        }
      } else {
        if (nextOpen) {
          parent?.setActiveSubId(baseIdRef.current)
        } else if (parent?.activeSubId === baseIdRef.current) {
          parent?.setActiveSubId(null)
        }
      }
      onOpenChange?.(nextOpen)
    },
    [onOpenChange, openProp, parent]
  )

  React.useEffect(() => {
    if (defaultOpen) {
      setOpenState(true)
      parent?.setActiveSubId(baseIdRef.current)
    }
  }, [])

  React.useEffect(() => {
    if (parent?.open === false && open) {
      handleOpenChange(false)
    }
  }, [handleOpenChange, open, parent?.open])

  return (
    <ContextMenuSubContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerId: baseIdRef.current }}>
      {children}
    </ContextMenuSubContext.Provider>
  )
}

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    disabled?: boolean
  }
>(({ className, inset, disabled, children, onClick, ...props }, ref) => {
  const subContext = React.useContext(ContextMenuSubContext)
  return (
    <View
      {...props}
      ref={ref}
      id={subContext?.triggerId}
      data-slot="context-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-state={subContext?.open ? "open" : "closed"}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-7",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={(e) => {
        e.stopPropagation()
        if (disabled) return
        subContext?.onOpenChange?.(!subContext.open)
        onClick?.(e)
      }}
    >
      {children}
      <ChevronRight className="ml-auto opacity-50" size={16} color="inherit" />
    </View>
  )
})

interface ContextMenuSubContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
}

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ContextMenuSubContentProps
>(({ className, align = "start", side = "right", sideOffset = 4, children, ...props }, ref) => {
  const parent = React.useContext(ContextMenuContext)
  const subContext = React.useContext(ContextMenuSubContext)
  const contentId = React.useRef(`context-menu-sub-content-${Math.random().toString(36).slice(2, 10)}`)
  const [position, setPosition] = React.useState<{ left: number; top: number } | null>(null)

  React.useEffect(() => {
    if (!parent?.open || !subContext?.open) {
      setPosition(null)
      return
    }

    let cancelled = false

    const compute = async () => {
      if (!subContext?.triggerId) return
      const [triggerRect, contentRect] = await Promise.all([
        getRectById(subContext.triggerId),
        getRectById(contentId.current),
      ])

      if (cancelled) return
      if (!triggerRect?.width || !contentRect?.width) return

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
  }, [align, parent?.open, side, sideOffset, subContext?.open, subContext?.triggerId])

  if (!parent?.open || !subContext?.open) return null

  const baseClassName =
    "fixed z-50 min-w-[96px] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground ring-opacity-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"

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
        {...props}
        ref={ref}
        id={contentId.current}
        data-slot="context-menu-sub-content"
        data-state="open"
        data-side={side}
        className={cn(baseClassName, className)}
        style={contentStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <ScrollView scrollY className="max-h-[50vh] overflow-x-hidden overflow-y-auto">
          {children}
        </ScrollView>
      </View>
    </Portal>
  )
})

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

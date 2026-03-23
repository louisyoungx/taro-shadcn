import * as React from "react"
import { ScrollView, View } from "@tarojs/components"
import { Check, ChevronRight } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { isH5 } from "@/lib/platform"
import { computePosition, getRectById } from "@/lib/measure"
import { Portal } from "@/components/ui/portal"

const DropdownMenuContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
} | null>(null)

interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenu = ({ open: openProp, defaultOpen, onOpenChange, children }: DropdownMenuProps) => {
  const baseIdRef = React.useRef(`dropdown-menu-${Math.random().toString(36).slice(2, 10)}`)
  const [openState, setOpenState] = React.useState(defaultOpen || false)
  const open = openProp !== undefined ? openProp : openState

  const handleOpenChange = (newOpen: boolean) => {
    if (openProp === undefined) {
      setOpenState(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <DropdownMenuContext.Provider
      value={{ open, onOpenChange: handleOpenChange, triggerId: baseIdRef.current }}
    >
      {children}
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  return (
    <View
      {...props}
      ref={ref}
      id={context?.triggerId}
      data-slot="dropdown-menu-trigger"
      className={className}
      onClick={(e) => {
        e.stopPropagation()
        context?.onOpenChange?.(!context.open)
        onClick?.(e)
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
  <View ref={ref} data-slot="dropdown-menu-group" className={className} {...props} />
))
DropdownMenuGroup.displayName = "DropdownMenuGroup"

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const DropdownMenuRadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
} | null>(null)

interface DropdownMenuRadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuRadioGroupProps
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
    <DropdownMenuRadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View ref={ref} {...props} />
    </DropdownMenuRadioGroupContext.Provider>
  )
})
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

const DropdownMenuSubContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
} | null>(null)

interface DropdownMenuSubProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenuSub = ({ open: openProp, defaultOpen, onOpenChange, children }: DropdownMenuSubProps) => {
  const parent = React.useContext(DropdownMenuContext)
  const baseIdRef = React.useRef(`dropdown-menu-sub-${Math.random().toString(36).slice(2, 10)}`)
  const [openState, setOpenState] = React.useState(defaultOpen || false)
  const open = openProp !== undefined ? openProp : openState

  const handleOpenChange = (newOpen: boolean) => {
    if (openProp === undefined) {
      setOpenState(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  React.useEffect(() => {
    if (parent?.open === false && open) {
      handleOpenChange(false)
    }
  }, [open, parent?.open])

  return (
    <DropdownMenuSubContext.Provider
      value={{ open, onOpenChange: handleOpenChange, triggerId: baseIdRef.current }}
    >
      {children}
    </DropdownMenuSubContext.Provider>
  )
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
  const contentId = React.useRef(`dropdown-menu-content-${Math.random().toString(36).slice(2, 10)}`)
  const [position, setPosition] = React.useState<{ left: number; top: number } | null>(null)

  React.useEffect(() => {
    if (!context?.open) {
      setPosition(null)
      return
    }

    let cancelled = false

    const compute = async () => {
      if (!context?.triggerId) return
      const [triggerRect, contentRect] = await Promise.all([
        getRectById(context.triggerId),
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
  }, [align, context?.open, context?.triggerId, side, sideOffset])

  React.useEffect(() => {
    if (!context?.open) return
    if (!isH5() || typeof document === "undefined") return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        context?.onOpenChange?.(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [context?.open])

  if (!context?.open) return null

  const baseClassName =
    "fixed z-50 min-w-32 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground ring-opacity-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"

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
      <View className="fixed inset-0 z-50 bg-transparent" onClick={() => context.onOpenChange?.(false)} />
      <View
        {...props}
        ref={ref}
        id={contentId.current}
        data-slot="dropdown-menu-content"
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
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    variant?: "default" | "destructive"
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, inset, variant = "default", disabled, closeOnSelect = true, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  return (
    <View
      {...props}
      ref={ref}
      data-slot="dropdown-menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md px-2 py-1 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:bg-opacity-10 data-[variant=destructive]:focus:text-destructive",
        inset && "pl-7",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange?.(false)
      }}
    />
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
    inset?: boolean
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, children, checked, inset, disabled, closeOnSelect = false, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  return (
    <View
      {...props}
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-7",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange?.(false)
      }}
    >
      <View className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <Check size={16} color="inherit" />}
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
    checked?: boolean
    inset?: boolean
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, children, value, checked: checkedProp, inset, disabled, closeOnSelect = false, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  const group = React.useContext(DropdownMenuRadioGroupContext)
  const checked = checkedProp !== undefined ? checkedProp : group?.value === value
  return (
    <View
      {...props}
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      data-inset={inset ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-7",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        group?.onValueChange?.(value)
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange?.(false)
      }}
    >
      <View className="pointer-events-none absolute right-2 flex items-center justify-center">
        {checked && <Check size={16} color="inherit" />}
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
    data-slot="dropdown-menu-label"
    data-inset={inset ? "" : undefined}
    className={cn("px-2 py-1 text-xs font-medium text-muted-foreground", inset && "pl-7", className)}
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
    data-slot="dropdown-menu-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    disabled?: boolean
  }
>(({ className, inset, disabled, children, onClick, ...props }, ref) => {
  const subContext = React.useContext(DropdownMenuSubContext)
  return (
    <View
      {...props}
      ref={ref}
      id={subContext?.triggerId}
      data-slot="dropdown-menu-sub-trigger"
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
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuContentProps
>(({ className, align = "start", side = "right", sideOffset = 4, children, ...props }, ref) => {
  const parent = React.useContext(DropdownMenuContext)
  const subContext = React.useContext(DropdownMenuSubContext)
  const contentId = React.useRef(`dropdown-menu-sub-content-${Math.random().toString(36).slice(2, 10)}`)
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
        data-slot="dropdown-menu-sub-content"
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
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

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

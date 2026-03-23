import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { Check, ChevronRight } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { isH5 } from "@/lib/platform"
import { computePosition, getRectById } from "@/lib/measure"
import { Portal } from "@/components/ui/portal"

const MenubarContext = React.createContext<{
  openMenu?: string
  setOpenMenu?: (id: string | undefined) => void
} | null>(null)

const Menubar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const [openMenu, setOpenMenu] = React.useState<string | undefined>()

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <View
        ref={ref}
        className={cn(
          "flex h-10 items-center space-x-1 rounded-md border border-border bg-background p-1",
          className
        )}
        {...props}
      />
    </MenubarContext.Provider>
  )
})
Menubar.displayName = "Menubar"

const MenubarMenuContext = React.createContext<{
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerId: string
} | null>(null)

let menubarMenuIdCounter = 0

const MenubarMenu = ({ children }: { children: React.ReactNode }) => {
  const id = React.useMemo(() => `menubar-menu-${menubarMenuIdCounter++}`, [])
  const triggerId = React.useMemo(() => `${id}-trigger`, [id])
  const context = React.useContext(MenubarContext)

  const open = context?.openMenu === id
  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      context?.setOpenMenu?.(id)
    } else {
      context?.setOpenMenu?.(undefined)
    }
  }

  return (
    <MenubarMenuContext.Provider value={{ id, open, onOpenChange, triggerId }}>
      {children}
    </MenubarMenuContext.Provider>
  )
}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  return (
    <View
      ref={ref}
      id={context?.triggerId}
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      onClick={() => context?.onOpenChange(!context.open)}
      {...props}
    />
  )
})
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom" | "left" | "right"
    sideOffset?: number
  }
>(({ className, align = "start", side = "bottom", sideOffset = 4, children, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  const contentId = React.useRef(`menubar-content-${Math.random().toString(36).slice(2, 10)}`)
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
        context?.onOpenChange(false)
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
      <View
        className="fixed inset-0 z-50 bg-transparent"
        onClick={() => context.onOpenChange(false)}
      />
      <View
        ref={ref}
        id={contentId.current}
        data-slot="menubar-content"
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
        <ScrollView scrollY className="max-h-[50vh] overflow-x-hidden overflow-y-auto">
          {children}
        </ScrollView>
      </View>
    </Portal>
  )
})
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    variant?: "default" | "destructive"
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, inset, variant = "default", disabled, closeOnSelect = true, children, onClick, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  return (
    <View
      ref={ref}
      data-slot="menubar-item"
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
        if (closeOnSelect) context?.onOpenChange(false)
      }}
      {...props}
    >
      {children}
    </View>
  )
})
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
    inset?: boolean
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, children, checked, inset, disabled, closeOnSelect = false, onClick, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  return (
    <View
      ref={ref}
      data-slot="menubar-checkbox-item"
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
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange(false)
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
} | null>(null)

interface MenubarRadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  MenubarRadioGroupProps
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
    <MenubarRadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View ref={ref} {...props} />
    </MenubarRadioGroupContext.Provider>
  )
})
MenubarRadioGroup.displayName = "MenubarRadioGroup"

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value: string
    checked?: boolean
    inset?: boolean
    disabled?: boolean
    closeOnSelect?: boolean
  }
>(({ className, children, value, checked: checkedProp, inset, disabled, closeOnSelect = false, onClick, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  const group = React.useContext(MenubarRadioGroupContext)
  const checked = checkedProp !== undefined ? checkedProp : group?.value === value
  return (
    <View
      ref={ref}
      data-slot="menubar-radio-item"
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
        group?.onValueChange?.(value)
        onClick?.(e)
        if (closeOnSelect) context?.onOpenChange(false)
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
MenubarRadioItem.displayName = "MenubarRadioItem"

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <View
    ref={ref}
    data-slot="menubar-label"
    data-inset={inset ? "" : undefined}
    className={cn(
      "px-2 py-1 text-xs font-medium text-muted-foreground",
      inset && "pl-7",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    data-slot="menubar-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      data-slot="menubar-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} data-slot="menubar-group" className={className} {...props} />
))
MenubarGroup.displayName = "MenubarGroup"

const MenubarSubContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
} | null>(null)

interface MenubarSubProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const MenubarSub = ({ open: openProp, defaultOpen, onOpenChange, children }: MenubarSubProps) => {
  const parent = React.useContext(MenubarMenuContext)
  const baseIdRef = React.useRef(`menubar-sub-${Math.random().toString(36).slice(2, 10)}`)
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
    <MenubarSubContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerId: baseIdRef.current }}>
      {children}
    </MenubarSubContext.Provider>
  )
}

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { inset?: boolean; disabled?: boolean }
>(({ className, inset, disabled, children, onClick, ...props }, ref) => {
  const subContext = React.useContext(MenubarSubContext)
  return (
    <View
      {...props}
      ref={ref}
      id={subContext?.triggerId}
      data-slot="menubar-sub-trigger"
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
MenubarSubTrigger.displayName = "MenubarSubTrigger"

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom" | "left" | "right"
    sideOffset?: number
  }
>(({ className, align = "start", side = "right", sideOffset = 4, children, ...props }, ref) => {
  const parent = React.useContext(MenubarMenuContext)
  const subContext = React.useContext(MenubarSubContext)
  const contentId = React.useRef(`menubar-sub-content-${Math.random().toString(36).slice(2, 10)}`)
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
        data-slot="menubar-sub-content"
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
MenubarSubContent.displayName = "MenubarSubContent"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

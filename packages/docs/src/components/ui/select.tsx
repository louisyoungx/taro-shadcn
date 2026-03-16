import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { Check, ChevronDown, ChevronUp } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { getRectById, getViewport } from "@/lib/measure"
import { Portal } from "@/components/ui/portal"

type SelectContextValue = {
  value?: string
  onValueChange?: (value: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerId: string
  selectedLabel?: string
  setSelectedLabel?: (label?: string) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Select: React.FC<SelectProps> = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}) => {
  const baseIdRef = React.useRef(
    `select-${Math.random().toString(36).slice(2, 10)}`
  )
  const [openState, setOpenState] = React.useState(defaultOpen || false)
  const open = openProp !== undefined ? openProp : openState
  const [valueState, setValueState] = React.useState(defaultValue || "")
  const value = valueProp !== undefined ? valueProp : valueState
  const [selectedLabel, setSelectedLabel] = React.useState<string | undefined>(
    undefined
  )

  const handleOpenChange = (newOpen: boolean) => {
    if (openProp === undefined) {
      setOpenState(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const handleValueChange = (newValue: string) => {
    if (valueProp === undefined) {
      setValueState(newValue)
    }
    onValueChange?.(newValue)
    handleOpenChange(false)
  }

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        onOpenChange: handleOpenChange,
        triggerId: baseIdRef.current,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("scroll-my-1 p-1", className)} {...props} />
))
SelectGroup.displayName = "SelectGroup"

const SelectValue = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { placeholder?: string }
>(({ className, placeholder, children, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  const hasValue = !!context?.value
  const displayValue = children
    ? children
    : context?.selectedLabel || context?.value || placeholder

  return (
    <View
      ref={ref}
      className={cn(
        "flex flex-1 text-left",
        !hasValue && !children && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {displayValue}
    </View>
  )
})
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    size?: "sm" | "default"
    disabled?: boolean
  }
>(({ className, size = "default", disabled, children, onClick, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  return (
    <View
      ref={ref}
      {...props}
      id={context?.triggerId}
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-lg border border-input bg-transparent pr-2 pl-3 text-sm whitespace-nowrap transition-colors outline-none select-none focus:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        size === "default" && "h-8 py-2",
        size === "sm" && "h-7 py-1 rounded-[10px]",
        context?.open &&
          "border-ring ring-2 ring-ring ring-offset-2 ring-offset-background",
        className
      )}
      hoverClass={
        disabled
          ? undefined
          : "border-ring ring-2 ring-ring ring-offset-2 ring-offset-background"
      }
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        e.stopPropagation()
        context?.onOpenChange?.(!context.open)
      }}
    >
      {children}
      <ChevronDown className="text-muted-foreground" size={16} />
    </View>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
    <View className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
        <ChevronUp size={16} />
    </View>
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
    <View className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
        <ChevronDown size={16} />
    </View>
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    Pick<
      {
        align?: "start" | "center" | "end"
        alignOffset?: number
        side?: "top" | "bottom" | "left" | "right"
        sideOffset?: number
        alignItemWithTrigger?: boolean
      },
      "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    >
>(
  (
    {
      className,
      children,
      side = "bottom",
      sideOffset = 4,
      align = "center",
      alignOffset = 0,
      alignItemWithTrigger = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(SelectContext)
    const contentId = React.useRef(
      `select-content-${Math.random().toString(36).slice(2, 10)}`
    )
    const [position, setPosition] = React.useState<{
      left: number
      top: number
    } | null>(null)
    const [anchorWidth, setAnchorWidth] = React.useState<number | null>(null)

    React.useEffect(() => {
      if (!context?.open) {
        setPosition(null)
        setAnchorWidth(null)
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

        const { width: vw, height: vh } = getViewport()
        const margin = 8

        const contentMainSize =
          alignItemWithTrigger && (side === "bottom" || side === "top")
            ? triggerRect.width
            : side === "left" || side === "right"
              ? contentRect.height
              : contentRect.width

        const crossStart =
          side === "left" || side === "right" ? triggerRect.top : triggerRect.left
        const crossSize =
          side === "left" || side === "right" ? triggerRect.height : triggerRect.width
        const contentCrossSize = (() => {
          if (side === "left" || side === "right") return contentRect.height
          return alignItemWithTrigger ? triggerRect.width : contentRect.width
        })()

        const cross = (() => {
          if (align === "start") return crossStart
          if (align === "end") return crossStart + crossSize - contentCrossSize
          return crossStart + crossSize / 2 - contentCrossSize / 2
        })()

        let left = 0
        let top = 0

        if (side === "bottom" || side === "top") {
          left = cross + alignOffset
          top =
            side === "bottom"
              ? triggerRect.top + triggerRect.height + sideOffset
              : triggerRect.top - contentRect.height - sideOffset
        } else {
          top = cross + alignOffset
          left =
            side === "right"
              ? triggerRect.left + triggerRect.width + sideOffset
              : triggerRect.left - contentRect.width - sideOffset
        }

        const clampWidth =
          side === "bottom" || side === "top" ? contentMainSize : contentRect.width
        const clampHeight =
          side === "left" || side === "right" ? contentMainSize : contentRect.height

        left = Math.min(Math.max(left, margin), vw - clampWidth - margin)
        top = Math.min(Math.max(top, margin), vh - clampHeight - margin)

        setAnchorWidth(triggerRect.width)
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
    }, [
      align,
      alignOffset,
      alignItemWithTrigger,
      context?.open,
      context?.triggerId,
      side,
      sideOffset,
    ])

    if (!context?.open) return null

    const contentStyle: React.CSSProperties = position
      ? {
          left: position.left,
          top: position.top,
          width: alignItemWithTrigger && anchorWidth ? anchorWidth : undefined,
        }
      : {
          left: 0,
          top: 0,
          opacity: 0,
          pointerEvents: "none",
        }

    return (
      <Portal>
        <View
          className="fixed inset-0 z-50 bg-transparent"
          onClick={() => context.onOpenChange?.(false)}
        />
        <View
          ref={ref}
          id={contentId.current}
          className={cn(
            "fixed z-50 min-w-36 overflow-x-hidden overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-md",
            className
          )}
          style={contentStyle}
          onClick={(e) => {
            onClick?.(e)
            e.stopPropagation()
          }}
          {...props}
        >
          <SelectScrollUpButton className="hidden" />
          <ScrollView scrollY className="max-h-[50vh]">
            {children}
          </ScrollView>
          <SelectScrollDownButton className="hidden" />
        </View>
      </Portal>
    )
})
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("px-2 py-1 text-xs text-muted-foreground", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value: string; disabled?: boolean }
>(({ className, children, value, disabled, onClick, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  const isSelected = context?.value === value

  const labelText = React.useMemo(() => {
    if (typeof children === "string") return children
    if (Array.isArray(children) && children.every((c) => typeof c === "string")) {
      return children.join("")
    }
    return undefined
  }, [children])

  React.useEffect(() => {
    if (isSelected && labelText) {
      context?.setSelectedLabel?.(labelText)
    }
  }, [context, isSelected, labelText])

  return (
    <View
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-2 text-sm outline-none select-none transition-colors focus:bg-accent focus:text-accent-foreground",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        if (disabled) return
        e.stopPropagation()
        context?.setSelectedLabel?.(labelText)
        context?.onValueChange?.(value)
      }}
      {...props}
    >
      <View className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </View>
      {isSelected ? (
        <View className="pointer-events-none absolute right-2 flex h-4 w-4 items-center justify-center">
          <Check size={16} />
        </View>
      ) : null}
    </View>
  )
})
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

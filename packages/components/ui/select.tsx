import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { Check, ChevronDown, ChevronUp } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

// Implementation of Select using a Bottom Sheet (Drawer-like) approach for mobile
// This provides better UX on mobile than a tiny popover.

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
} | null>(null)

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Select: React.FC<SelectProps> = ({ value: valueProp, defaultValue, onValueChange, open: openProp, defaultOpen, onOpenChange, children }) => {
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState
    const [valueState, setValueState] = React.useState(defaultValue || "")
    const value = valueProp !== undefined ? valueProp : valueState

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
        handleOpenChange(false) // Close on select
    }

    return (
        <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, onOpenChange: handleOpenChange }}>
            {children}
        </SelectContext.Provider>
    )
}

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
    <View ref={ref} className={className} {...props} />
))
SelectGroup.displayName = "SelectGroup"

const SelectValue = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { placeholder?: string }
>(({ className, placeholder, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    const displayValue = context?.value || placeholder || children
    
    // Ideally we need to map value to label. 
    // But context only has value. 
    // In Radix, Value renders the selected Item's text. 
    // Here we might need a separate way to get label, or user passes it.
    // Simplified: just render value if children not provided.
    
    return (
        <View ref={ref} className={cn("text-sm", className)} {...props}>
            {children || displayValue}
        </View>
    )
})
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    return (
        <View
          ref={ref}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className
            )}
         onClick={() => context?.onOpenChange?.(!context.open)}
          {...props}
        >
            {children}
            <ChevronDown className="opacity-50" size={16} />
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
  React.ComponentPropsWithoutRef<typeof View> & { position?: "popper" | "item-aligned" }
>(({ className, children, position = "popper", ...props }, ref) => {
    const context = React.useContext(SelectContext)
    
    if (!context?.open) return null

    return (
        <Portal>
            <View 
              className="fixed inset-0 z-50 bg-black opacity-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
             onClick={() => context.onOpenChange?.(false)}
            />
            <View
              ref={ref}
              className={cn(
                    "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300",
                    className
                )}
              {...props}
            >
                <View className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
                <ScrollView scrollY className="max-h-[50vh] p-4">
                    {children}
                </ScrollView>
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
    className={cn("py-2 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { value: string }
>(({ className, children, value, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    const isSelected = context?.value === value

  return (
    <View
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent",
        className
      )}
     onClick={() => context?.onValueChange?.(value)}
      {...props}
    >
      {isSelected && (
          <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
            <Check size={16} />
          </View>
      )}
      <View>{children}</View>
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
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
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

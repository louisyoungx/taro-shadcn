import * as React from "react"
import { View } from "@tarojs/components"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "./toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
      value?: string | string[]
      onValueChange?: (value: string) => void
      type: "single" | "multiple"
  }
>({
  size: "default",
  variant: "default",
  type: "single"
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof toggleVariants> & {
        type?: "single" | "multiple"
        value?: string | string[]
        defaultValue?: string | string[]
        onValueChange?: (value: string | string[]) => void
    }
>(({ className, variant, size, children, type = "single", value: valueProp, defaultValue, onValueChange, ...props }, ref) => {
    const [valueState, setValueState] = React.useState<string | string[]>(
        defaultValue || (type === "multiple" ? [] : "")
    )
    const value = valueProp !== undefined ? valueProp : valueState

    const handleValueChange = (itemValue: string) => {
        let newValue: string | string[]
        if (type === "multiple") {
            const current = Array.isArray(value) ? value : []
            if (current.includes(itemValue)) {
                newValue = current.filter(v => v !== itemValue)
            } else {
                newValue = [...current, itemValue]
            }
        } else {
             // In Radix ToggleGroup "single", clicking active item deselects it? 
             // Actually yes, unless `rovingFocus` logic etc. 
             // But usually it behaves like radio if required=true.
             // Radix primitive has `rovingFocus` and `loop`.
             // We'll implement simple toggle logic.
             if (value === itemValue) {
                 newValue = "" // Deselect
             } else {
                 newValue = itemValue
             }
        }

        if (valueProp === undefined) {
            setValueState(newValue)
        }
        onValueChange?.(newValue)
    }

  return (
    <View
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, value, onValueChange: handleValueChange, type }}>
        {children}
      </ToggleGroupContext.Provider>
    </View>
  )
})

ToggleGroup.displayName = "ToggleGroup"

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof toggleVariants> & {
        value: string
        disabled?: boolean
    }
>(({ className, children, variant, size, value, disabled, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  
  const checked = context.type === "multiple" 
    ? Array.isArray(context.value) && context.value.includes(value)
    : context.value === value

  return (
    <View
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
        checked && "bg-accent text-accent-foreground",
        disabled && "opacity-50 pointer-events-none"
      )}
      data-state={checked ? "on" : "off"}
      data-disabled={disabled ? "" : undefined}
      onClick={(e) => {
        if (disabled) return
        context.onValueChange?.(value)
        props.onClick?.(e)
      }}
      {...props}
    >
      {children}
    </View>
  )
})

ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }

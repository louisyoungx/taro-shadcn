import * as React from "react"
import { View } from "@tarojs/components"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
} | null>(null)

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
  }
>(({ className, value: valueProp, defaultValue, onValueChange, ...props }, ref) => {
  const [valueState, setValueState] = React.useState<string | undefined>(defaultValue)
  const value = valueProp !== undefined ? valueProp : valueState
  
  const handleValueChange = (newValue: string) => {
      if (valueProp === undefined) {
          setValueState(newValue)
      }
      onValueChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View
        className={cn("grid gap-2", className)}
        {...props}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      value: string
  }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext)
  const checked = context?.value === value

  return (
    <View
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        checked && "border-[10px]",
        className
      )}
      hoverClass="ring-2 ring-ring ring-offset-2 ring-offset-background"
      onClick={() => context?.onValueChange?.(value)}
      {...props}
    />
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

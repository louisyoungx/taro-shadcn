import * as React from "react"
import { View } from "@tarojs/components"
import { Check } from "lucide-react-taro"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<React.ComponentPropsWithoutRef<typeof View>, "onClick"> & {
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
  }
>(({ className, checked: checkedProp, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
  const [checkedState, setCheckedState] = React.useState<boolean>(
    defaultChecked ?? false
  )

  const isControlled = checkedProp !== undefined
  const checked = isControlled ? checkedProp : checkedState

  const handleClick = (e) => {
    if (disabled) return
    e.stopPropagation()
    const newChecked = !checked
    if (!isControlled) {
      setCheckedState(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  const tabIndex = (props as any).tabIndex ?? (disabled ? -1 : 0)

  return (
    <View
      ref={ref}
      className={cn(
        "h-4 w-4 shrink-0 rounded-sm border-2 border-primary ring-offset-background flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "bg-transparent",
        className
      )}
      {...({ tabIndex } as any)}
      onClick={handleClick}
      {...props}
    >
      {checked && <Check color="#fff" size={12} strokeWidth={3} className="text-current" />}
    </View>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

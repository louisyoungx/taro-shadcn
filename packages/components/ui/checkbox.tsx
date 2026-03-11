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

  return (
    <View
      ref={ref}
      className={cn(
        "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
        checked ? "bg-primary text-primary-foreground" : "bg-transparent",
        className
      )}
     onClick={handleClick}
      {...props}
    >
      {checked && <Check color="#fff" size={12} strokeWidth={3} className="text-current" />}
    </View>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

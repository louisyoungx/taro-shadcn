import * as React from "react"
import { View } from "@tarojs/components"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
  }
>(({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
  const [localChecked, setLocalChecked] = React.useState(defaultChecked || false)
  const isControlled = checked !== undefined
  const currentChecked = isControlled ? checked : localChecked

  return (
    <View
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background [-webkit-tap-highlight-color:transparent]",
        disabled && "cursor-not-allowed opacity-50",
        currentChecked ? "bg-primary" : "bg-input",
        className
      )}
      data-state={currentChecked ? "checked" : "unchecked"}
      {...props}
      ref={ref}
      onClick={(e) => {
        if (disabled) return
        e.stopPropagation()
        const newChecked = !currentChecked
        if (!isControlled) {
            setLocalChecked(newChecked)
        }
        onCheckedChange?.(newChecked)
      }}
    >
      <View
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          currentChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </View>
  )
})
Switch.displayName = "Switch"

export { Switch }

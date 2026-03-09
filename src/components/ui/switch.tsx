import * as React from "react"
import { View } from "@tarojs/components"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
  }
>(({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
  return (
    <View
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [-webkit-tap-highlight-color:transparent]",
        disabled && "cursor-not-allowed opacity-50",
        checked ? "bg-primary" : "bg-input",
        className
      )}
      {...props}
      ref={ref}
      onClick={(e) => {
        if (disabled) return
        e.stopPropagation()
        onCheckedChange?.(!checked)
      }}
    >
      <View
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </View>
  )
})
Switch.displayName = "Switch"

export { Switch }

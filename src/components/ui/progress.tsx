import * as React from "react"
import { View } from "@tarojs/components"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      value?: number | null
  }
>(({ className, value, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "relative h-1 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <View
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </View>
))
Progress.displayName = "Progress"

export { Progress }

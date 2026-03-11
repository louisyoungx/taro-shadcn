import * as React from "react"
import { ScrollView } from "@tarojs/components"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView> & {
      orientation?: "vertical" | "horizontal" | "both"
  }
>(({ className, children, orientation = "vertical", ...props }, ref) => {
    const scrollX = orientation === "horizontal" || orientation === "both"
    const scrollY = orientation === "vertical" || orientation === "both"

  return (
    <ScrollView
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      scrollY={scrollY}
      scrollX={scrollX}
      {...props}
    >
        {children}
    </ScrollView>
  )
})
ScrollArea.displayName = "ScrollArea"

const ScrollBar = () => null // Taro ScrollView handles scrollbars natively

export { ScrollArea, ScrollBar }

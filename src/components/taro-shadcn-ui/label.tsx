import * as React from "react"
import { Label as TaroLabel } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none"
)

const Label = React.forwardRef<
  React.ElementRef<typeof TaroLabel>,
  React.ComponentPropsWithoutRef<typeof TaroLabel> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <TaroLabel
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }

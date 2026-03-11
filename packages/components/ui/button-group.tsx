import * as React from "react"
import { View } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>view:nth-child(n+2)]:rounded-l-none [&>view:nth-child(n+2)]:border-l-0 [&>view:nth-last-child(n+2)]:rounded-r-none",
        vertical:
          "flex-col [&>view:nth-child(n+2)]:rounded-t-none [&>view:nth-child(n+2)]:border-t-0 [&>view:nth-last-child(n+2)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
...props
}: React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <View
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn(
        "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
...props
}: React.ComponentPropsWithoutRef<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}

import * as React from "react"
import { View } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-3 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof toggleVariants> & {
        pressed?: boolean
        onPressedChange?: (pressed: boolean) => void
        defaultPressed?: boolean
        disabled?: boolean
    }
>(({ className, variant, size, pressed: pressedProp, defaultPressed, onPressedChange, disabled, ...props }, ref) => {
    const [pressedState, setPressedState] = React.useState(defaultPressed || false)
    const pressed = pressedProp !== undefined ? pressedProp : pressedState
    
    const handleClick = (e) => {
        if (disabled) return
        const newPressed = !pressed
        if (pressedProp === undefined) {
            setPressedState(newPressed)
        }
        onPressedChange?.(newPressed)
        props.onClick?.(e)
    }
  const tabIndex = (props as { tabIndex?: number }).tabIndex ?? (disabled ? -1 : 0)

  return (
    <View
      ref={ref}
      className={cn(
          toggleVariants({ variant, size, className }),
          pressed && "bg-accent text-accent-foreground",
          disabled && "opacity-50 pointer-events-none"
        )}
      data-state={pressed ? "on" : "off"}
      data-disabled={disabled ? "" : undefined}
      {...({ tabIndex } as { tabIndex?: number })}
      hoverClass={
        disabled
          ? undefined
          : "border-ring ring-2 ring-ring ring-offset-2 ring-offset-background"
      }
      onClick={handleClick}
      {...props}
    />
  )
})

Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }

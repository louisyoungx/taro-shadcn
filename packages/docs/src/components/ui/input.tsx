import * as React from "react"
import { Input as TaroInput, View } from "@tarojs/components"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TaroInput> {
  className?: string
  type?: React.ComponentProps<typeof TaroInput>['type']
  autoFocus?: boolean
}

const Input = React.forwardRef<React.ElementRef<typeof TaroInput>, InputProps>(
  ({ className, type, autoFocus, focus, ...props }, ref) => {
    return (
      <View
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:border-ring focus-within:ring-4 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
          className
        )}
      >
        <TaroInput
          type={type}
          className="w-full flex-1 bg-transparent text-sm text-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 selection:bg-selection selection:text-selection-foreground"
          placeholderClass="text-muted-foreground"
          ref={ref}
          focus={autoFocus || focus}
          {...props}
        />
      </View>
    )
  }
)
Input.displayName = "Input"

export { Input }

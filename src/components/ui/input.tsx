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
          "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
      >
        <TaroInput
          type={type}
          className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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

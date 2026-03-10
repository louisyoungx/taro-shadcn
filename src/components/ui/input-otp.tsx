import * as React from "react"
import { View, Input } from "@tarojs/components"
import { Dot } from "lucide-react-taro"
import { cn } from "@/lib/utils"

const InputOTPContext = React.createContext<{
  value: string
  maxLength: number
  isFocused: boolean
} | null>(null)

const InputOTP = React.forwardRef<
  any,
  {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    maxLength: number
    containerClassName?: string
    className?: string
    disabled?: boolean
    autoFocus?: boolean
    children: React.ReactNode
  }
>(({ value: valueProp, defaultValue, onChange, maxLength, containerClassName, className, disabled, autoFocus, children, ...props }, ref) => {
  const [valueState, setValueState] = React.useState(defaultValue || "")
  const [isFocused, setIsFocused] = React.useState(false)
  const value = valueProp !== undefined ? valueProp : valueState

  const handleChange = (e: any) => {
    const newValue = e.detail.value
    if (newValue.length <= maxLength) {
      if (valueProp === undefined) {
        setValueState(newValue)
      }
      onChange?.(newValue)
    }
  }

  return (
    <InputOTPContext.Provider value={{ value, maxLength, isFocused }}>
      <View
        className={cn(
          "relative flex items-center gap-2",
          disabled && "opacity-50",
          containerClassName
        )}
      >
        <Input
          className="absolute inset-0 z-10 opacity-0 h-full w-full"
          value={value}
          onInput={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          type="number"
          disabled={disabled}
          focus={autoFocus}
        />
        <View className={cn("flex items-center gap-2", className)}>
          {children}
        </View>
      </View>
    </InputOTPContext.Provider>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { index: number }
>(({ index, className, ...props }, ref) => {
  const context = React.useContext(InputOTPContext)
  if (!context) return null

  const char = context.value[index]
  const isActive = context.isFocused && context.value.length === index
  const hasFakeCaret = isActive

  return (
    <View
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      <View>{char}</View>
      {hasFakeCaret && (
        <View className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <View className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </View>
      )}
    </View>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => (
  <View ref={ref} {...props}>
    <Dot />
  </View>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

import * as React from "react"
import { Slider as TaroSlider, View } from "@tarojs/components"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof TaroSlider>,
  Omit<React.ComponentPropsWithoutRef<typeof TaroSlider>, "value" | "onChange" | "defaultValue"> & {
      value?: number[]
      defaultValue?: number[]
      onValueChange?: (value: number[]) => void
  }
>(({ className, value, defaultValue, onValueChange, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(defaultValue || [0])
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : localValue

    // Map array value to number
    const sliderValue = currentValue && currentValue.length > 0 ? currentValue[0] : 0

    const handleChange = (e) => {
        const newVal = [e.detail.value]
        if (!isControlled) {
            setLocalValue(newVal)
        }
        onValueChange?.(newVal)
    }

  return (
    <View className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <TaroSlider
            ref={ref}
            value={sliderValue}
            onChanging={handleChange}
            onChange={handleChange}
            {...props}
            className="w-full"
        />
    </View>
  )
})
Slider.displayName = "Slider"

export { Slider }

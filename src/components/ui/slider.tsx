import * as React from "react"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<React.ComponentPropsWithoutRef<typeof View>, "value" | "onChange"> & {
    value?: number[]
    defaultValue?: number[]
    min?: number
    max?: number
    step?: number
    onValueChange?: (value: number[]) => void
    disabled?: boolean
    orientation?: "horizontal" | "vertical"
    trackClassName?: string
    rangeClassName?: string
    thumbClassName?: string
  }
>(({ className, trackClassName, rangeClassName, thumbClassName, value: valueProp, defaultValue, min = 0, max = 100, step = 1, onValueChange, disabled, orientation = "horizontal", ...props }, ref) => {
  const [localValue, setLocalValue] = React.useState<number[]>(
    valueProp || defaultValue || [min]
  )
  const [isDragging, setIsDragging] = React.useState(false)
  const [rect, setRect] = React.useState<{ left: number; top: number; width: number; height: number } | null>(null)
  const idRef = React.useRef(`slider-${Math.random().toString(36).substr(2, 9)}`)
  
  const value = valueProp !== undefined ? valueProp : localValue
  const currentValue = value[0] ?? min

  React.useEffect(() => {
    // Delay measurement to ensure the component is mounted and layout is ready
    const timer = setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query
        .select(`#${idRef.current}`)
        .boundingClientRect((res) => {
          const rect = Array.isArray(res) ? res[0] : res
          if (rect) {
            setRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
          }
        })
        .exec()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const updateValue = (pageX: number, pageY: number) => {
    if (!rect || disabled) return

    let percentage = 0
    if (orientation === "horizontal") {
      const { left, width } = rect
      percentage = Math.min(Math.max((pageX - left) / width, 0), 1)
    } else {
      const { top, height } = rect
      percentage = Math.min(Math.max(1 - (pageY - top) / height, 0), 1)
    }

    const rawValue = min + percentage * (max - min)
    const steppedValue = Math.round((rawValue - min) / step) * step + min
    const newValue = Math.min(Math.max(steppedValue, min), max)
    
    if (newValue !== currentValue) {
      const nextValue = [newValue]
      if (valueProp === undefined) {
        setLocalValue(nextValue)
      }
      onValueChange?.(nextValue)
    }
  }

  const handleTouchStart = (e: any) => {
    if (disabled) return
    setIsDragging(true)
    // Try to update rect on touch start in case of layout changes
    const query = Taro.createSelectorQuery()
    query
      .select(`#${idRef.current}`)
      .boundingClientRect((res) => {
        const rect = Array.isArray(res) ? res[0] : res
        if (rect) {
          setRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
          // If we have a touch event, update value immediately after getting fresh rect
          const touch = e.touches[0] || e.changedTouches[0]
          if (touch) {
             let percentage = 0
             if (orientation === "horizontal") {
               const { left, width } = rect
               percentage = Math.min(Math.max((touch.pageX - left) / width, 0), 1)
             } else {
               const { top, height } = rect
               percentage = Math.min(Math.max(1 - (touch.pageY - top) / height, 0), 1)
             }
             
             const rawValue = min + percentage * (max - min)
             const steppedValue = Math.round((rawValue - min) / step) * step + min
             const newValue = Math.min(Math.max(steppedValue, min), max)
             
             if (newValue !== currentValue) {
               const nextValue = [newValue]
               if (valueProp === undefined) {
                 setLocalValue(nextValue)
               }
               onValueChange?.(nextValue)
             }
          }
        }
      })
      .exec()
  }

  const handleTouchMove = (e: any) => {
    if (disabled) return
    const touch = e.touches[0] || e.changedTouches[0]
    if (touch) {
      updateValue(touch.pageX, touch.pageY)
    }
  }

  const handleTouchEnd = (e: any) => {
    if (disabled) return
    setIsDragging(false)
    const touch = e.touches[0] || e.changedTouches[0]
    if (touch) {
      updateValue(touch.pageX, touch.pageY)
    }
  }

  const percentage = ((currentValue - min) / (max - min)) * 100

  return (
    <View
      ref={ref}
      id={idRef.current}
      className={cn(
        "relative flex touch-none select-none items-center",
        orientation === "horizontal" ? "w-full py-4" : "h-full flex-col px-4",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <View 
        className={cn(
          "relative grow overflow-hidden rounded-full bg-secondary",
          orientation === "horizontal" ? "h-1 w-full" : "w-1 h-full",
          trackClassName
        )}
      >
        <View 
          className={cn("absolute bg-primary", orientation === "horizontal" ? "h-full" : "w-full bottom-0", rangeClassName)} 
          style={orientation === "horizontal" ? { width: `${percentage}%` } : { height: `${percentage}%` }} 
        />
      </View>
      <View
        className={cn(
            "absolute block h-3 w-3 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50",
            isDragging && "ring-4 ring-primary/30",
            disabled && "opacity-50",
            thumbClassName
        )}
        style={
          orientation === "horizontal" 
          ? { left: `${percentage}%`, transform: 'translateX(-50%)' } 
          : { bottom: `${percentage}%`, transform: 'translateY(50%)' }
        }
      />
    </View>
  )
})
Slider.displayName = "Slider"

export { Slider }

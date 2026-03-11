import * as React from "react"
import { View, Swiper, SwiperItem } from "@tarojs/components"
import { ArrowLeft, ArrowRight } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Simplified Carousel using Taro Swiper
// Note: This API tries to match shadcn-ui but underlying implementation is different.
// Plugins and advanced embla-carousel features are not supported.

type CarouselProps = {
  opts?: unknown
  orientation?: "horizontal" | "vertical"
  setApi?: (api: any) => void
  className?: string
  children?: React.ReactNode
}

type CarouselContextProps = {
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef<
  React.ElementRef<typeof View>,
  CarouselProps
>(({ opts, orientation = "horizontal", setApi, className, children, ...props }, ref) => {
    // We can't easily control Swiper imperatively via ref in the same way as embla
    // But we can use 'current' prop to control index
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const scrollPrev = React.useCallback(() => {
        setCurrent(prev => Math.max(0, prev - 1))
    }, [])

    const scrollNext = React.useCallback(() => {
        setCurrent(prev => Math.min(count - 1, prev + 1))
    }, [count])

    const canScrollPrev = current > 0
    const canScrollNext = current < count - 1
    
    // Mock API
    React.useEffect(() => {
        if (setApi) {
            setApi({
                scrollPrev,
                scrollNext,
                canScrollPrev: () => canScrollPrev,
                canScrollNext: () => canScrollNext,
                scrollTo: (index) => setCurrent(index),
                selectedScrollSnap: () => current,
            })
        }
    }, [setApi, scrollPrev, scrollNext, canScrollPrev, canScrollNext, current])

  return (
    <CarouselContext.Provider
      value={{
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <View
        ref={ref}
        className={cn("relative", className)}
        {...props}
        data-current={current} 
        data-set-count={setCount} // Pass these down via context or props would be cleaner but Swiper is inside Content
      >
        {/* We need to pass state to Content. Using Context is easiest if we split components. 
            But Swiper needs to be in Content. 
            We'll use a hack or just context. 
            Actually, Swiper should be in CarouselContent. 
            We need to pass 'current' to Swiper.
        */}
        <CarouselStateContext.Provider value={{ current, setCurrent, count, setCount }}>
            {children}
        </CarouselStateContext.Provider>
      </View>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselStateContext = React.createContext<{
    current: number
    setCurrent: (v: number | ((prev: number) => number)) => void
    count: number
    setCount: (v: number) => void
} | null>(null)


const CarouselContent = React.forwardRef<
  React.ElementRef<typeof Swiper>,
  React.ComponentPropsWithoutRef<typeof Swiper>
>(({ className, children, ...props }, ref) => {
  const { orientation } = useCarousel()
  const state = React.useContext(CarouselStateContext)

  // Count children to set count
  React.useEffect(() => {
      const childCount = React.Children.count(children)
      state?.setCount(childCount)
  }, [children, state])

  return (
    <Swiper
      ref={ref}
      className={cn("h-full w-full", className)} // Swiper needs height
      vertical={orientation === "vertical"}
      current={state?.current}
      onChange={(e) => state?.setCurrent(e.detail.current)}
      {...props}
    >
        {children}
    </Swiper>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  React.ElementRef<typeof SwiperItem>,
  React.ComponentPropsWithoutRef<typeof SwiperItem>
>(({ className, ...props }, ref) => {
  return (
    <SwiperItem
      ref={ref}
      className={cn("h-full w-full", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full z-10",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft size={16} />
      <View className="sr-only">Previous slide</View>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full z-10",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight size={16} />
      <View className="sr-only">Next slide</View>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

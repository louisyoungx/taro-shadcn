import * as React from "react"
import { View, Swiper, SwiperItem } from "@tarojs/components"
import { ArrowLeft, ArrowRight } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselProps = {
  opts?: {
    loop?: boolean
    autoplay?: boolean
    interval?: number
    duration?: number
    displayMultipleItems?: number
  }
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  className?: string
  children?: React.ReactNode
}

export type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollTo: (index: number) => void
  selectedScrollSnap: () => number
}

type CarouselContextProps = {
  orientation: "horizontal" | "vertical"
  current: number
  setCurrent: (index: number) => void
  count: number
  setCount: (count: number) => void
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  opts?: CarouselProps["opts"]
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
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    setCurrent((prev) => Math.max(0, prev - 1))
  }, [])

  const scrollNext = React.useCallback(() => {
    setCurrent((prev) => Math.min(count - 1, prev + 1))
  }, [count])

  const canScrollPrev = current > 0
  const canScrollNext = current < count - 1

  const scrollTo = React.useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const selectedScrollSnap = React.useCallback(() => current, [current])

  React.useEffect(() => {
    if (setApi) {
      setApi({
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollTo,
        selectedScrollSnap,
      })
    }
  }, [setApi, scrollPrev, scrollNext, canScrollPrev, canScrollNext, scrollTo, selectedScrollSnap])

  return (
    <CarouselContext.Provider
      value={{
        orientation,
        current,
        setCurrent,
        count,
        setCount,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        opts,
      }}
    >
      <View
        ref={ref}
        className={cn("relative w-full", className)}
        {...props}
      >
        {children}
      </View>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  React.ElementRef<typeof Swiper>,
  React.ComponentPropsWithoutRef<typeof Swiper>
>(({ className, children, ...props }, ref) => {
  const { orientation, current, setCurrent, setCount, opts } = useCarousel()

  React.useEffect(() => {
    const childCount = React.Children.count(children)
    setCount(childCount)
  }, [children, setCount])

  return (
    <View className={cn("overflow-hidden", className)}>
      <Swiper
        ref={ref}
        className="h-full w-full"
        vertical={orientation === "vertical"}
        current={current}
        onChange={(e) => setCurrent(e.detail.current)}
        circular={opts?.loop}
        autoplay={opts?.autoplay}
        interval={opts?.interval || 5000}
        duration={opts?.duration || 500}
        displayMultipleItems={opts?.displayMultipleItems || 1}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return <SwiperItem className="h-full w-full">{child}</SwiperItem>
          }
          return null
        })}
      </Swiper>
    </View>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = ({ className, children, ...props }: React.ComponentProps<typeof View>) => {
  return (
    <View className={cn("h-full w-full", className)} {...props}>
      {children}
    </View>
  )
}
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
        "absolute h-8 w-8 rounded-full z-10 bg-background bg-opacity-80 backdrop-blur-sm",
        orientation === "horizontal"
          ? "-left-12 top-0 bottom-0 my-auto"
          : "-top-12 left-0 right-0 mx-auto rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft size={16} color="inherit" />
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
        "absolute h-8 w-8 rounded-full z-10 bg-background bg-opacity-80 backdrop-blur-sm",
        orientation === "horizontal"
          ? "-right-12 top-0 bottom-0 my-auto"
          : "-bottom-12 left-0 right-0 mx-auto rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight size={16} color="inherit" />
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

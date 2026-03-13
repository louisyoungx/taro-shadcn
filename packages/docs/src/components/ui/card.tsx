import * as React from "react"
import { View } from "@tarojs/components"

import { cn } from "@/lib/utils"

// 创建一个上下文来跟踪卡片内部的状态
const CardContext = React.createContext<{ hasHeader: boolean }>({
  hasHeader: false,
})

const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  // 检查子元素中是否有 CardHeader
  const hasHeader = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && (child.type as any).displayName === "CardHeader"
  )

  return (
    <CardContext.Provider value={{ hasHeader }}>
      <View
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </CardContext.Provider>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const { hasHeader } = React.useContext(CardContext)
  return (
    <View 
      ref={ref} 
      className={cn("p-6", hasHeader && "pt-0", className)} 
      {...props} 
    />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const { hasHeader } = React.useContext(CardContext)
  // 注意：Footer 通常也跟在 Content 后面，所以这里逻辑可以更精细，
  // 但为了简单通用，如果卡片有 Header，Footer 默认 pt-0 也是合理的。
  return (
    <View
      ref={ref}
      className={cn("flex items-center p-6", hasHeader && "pt-0", className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

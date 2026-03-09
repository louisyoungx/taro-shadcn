import * as React from "react"
import { View, Navigator } from "@tarojs/components"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, Ellipsis } from "lucide-react-taro"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <View ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-2 break-words text-sm text-muted-foreground sm:gap-3",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("inline-flex items-center gap-2", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    asChild?: boolean
    href?: string
  }
>(({ asChild, className, href, ...props }, ref) => {
  const Comp = (asChild ? Slot : (href ? Navigator : View)) as any
  const linkProps = href ? { url: href } : {}

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...linkProps}
      {...props as any}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-4 [&>svg]:h-4 flex items-center", className)}
    {...props}
  >
    {children ?? <ChevronRight size={16} />}
  </View>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <Ellipsis className="h-4 w-4" color="#737373" />
    <View className="sr-only">More</View>
  </View>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

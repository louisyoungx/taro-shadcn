import * as React from "react"
import { View, RootPortal } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const DrawerContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
} | null>(null)

const Drawer = ({
  shouldScaleBackground = true,
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}) => {
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState
    
    const handleOpenChange = (newOpen: boolean) => {
        if (openProp === undefined) {
            setOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
    }

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
        <View {...props}>{children}</View>
    </DrawerContext.Provider>
  )
}
Drawer.displayName = "Drawer"

const DrawerTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(DrawerContext)
    return (
        <View
            ref={ref}
            className={className}
            onClick={(e) => {
                e.stopPropagation()
                context?.onOpenChange?.(true)
            }}
            {...props}
        >
            {children}
        </View>
    )
})
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerPortal = ({ children }) => {
    const context = React.useContext(DrawerContext)
    if (!context?.open) return null
    return <RootPortal>{children}</RootPortal>
}

const DrawerClose = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(DrawerContext)
    return (
        <View
            ref={ref}
            className={className}
            onClick={(e) => {
                e.stopPropagation()
                context?.onOpenChange?.(false)
            }}
            {...props}
        >
            {children}
        </View>
    )
})
DrawerClose.displayName = "DrawerClose"

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
    const context = React.useContext(DrawerContext)
  return (
    <View
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black opacity-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
      onClick={() => context?.onOpenChange?.(false)}
      {...props}
    />
  )
})
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <View
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300",
        className
      )}
      {...props}
    >
      <View className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </View>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

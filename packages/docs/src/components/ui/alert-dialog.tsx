import * as React from "react"
import { View } from "@tarojs/components"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Portal } from "@/components/ui/portal"
import { useKeyboardOffset } from "@/lib/hooks/use-keyboard-offset"

const AlertDialogContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
} | null>(null)

const AlertDialog = ({ 
    children, 
    open: openProp, 
    defaultOpen = false, 
    onOpenChange 
}: { 
    children: React.ReactNode, 
    open?: boolean, 
    defaultOpen?: boolean, 
    onOpenChange?: (open: boolean) => void 
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
        <AlertDialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
            {children}
        </AlertDialogContext.Provider>
    )
}

const AlertDialogTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
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
AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogPortal = ({ children }) => {
    const context = React.useContext(AlertDialogContext)
    if (!context?.open) return null
    return <Portal>{children}</Portal>
}

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
    return (
        <View
          ref={ref}
          className={cn(
            "fixed inset-0 z-50 bg-black opacity-80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
            )}
          onClick={(e) => {
                e.stopPropagation()
                // Unlike Dialog, AlertDialog typically forces explicit action/cancel. 
                // But user might want it to close on overlay click.
                // Standard shadcn/radix alert dialog usually does NOT close on overlay click? 
                // Radix Alert Dialog does NOT close on overlay click by default.
                // We will leave it as is (no close on click) or optional?
                // For now, let's follow standard pattern: it blocks interaction.
            }}
          {...props}
        />
    )
})
AlertDialogOverlay.displayName = "AlertDialogOverlay"

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, style, ...props }, ref) => {
  const offset = useKeyboardOffset()
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <View
        ref={ref}
        className={cn(
           "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
           className
          )}
        style={{
            ...(style as object),
            top: offset > 0 ? `calc(50% - ${offset / 2}px)` : undefined
          }}
        {...props}
      >
          {children}
      </View>
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, onClick, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
    return (
        <View
          ref={ref}
          className={cn(buttonVariants({ variant, size }), "w-full sm:w-auto", className)}
          onClick={(e) => {
                context?.onOpenChange?.(false)
                onClick?.(e)
            }}
          {...props}
        />
    )
})
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof buttonVariants>
>(({ className, variant = "outline", size, onClick, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
    return (
        <View
          ref={ref}
          className={cn(
            buttonVariants({ variant, size }),
            "mt-2 sm:mt-0 w-full sm:w-auto",
            className
            )}
          onClick={(e) => {
                context?.onOpenChange?.(false)
                onClick?.(e)
            }}
          {...props}
        />
    )
})
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

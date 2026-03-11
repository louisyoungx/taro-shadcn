import * as React from "react"
import { View } from "@tarojs/components"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

// Popover as a centered Dialog for mobile (or could be bottom sheet)
// We'll use centered Dialog style for Popover to differentiate from Select/Dropdown (Bottom Sheet)

const PopoverContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
} | null>(null)

interface PopoverProps {
    children: React.ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const Popover = ({ open: openProp, defaultOpen, onOpenChange, children }: PopoverProps) => {
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState
    
    const handleOpenChange = (newOpen: boolean) => {
        if (openProp === undefined) {
            setOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    return (
        <PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
            {children}
        </PopoverContext.Provider>
    )
}

const PopoverTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View>  
>(({ className, children,...props }, ref) => {
    const context = React.useContext(PopoverContext)
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
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
    align?: "center" | "start" | "end"
    sideOffset?: number
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    
    if (!context?.open) return null

    return (
        <Portal>
             <View 
               className="fixed inset-0 z-50 bg-black opacity-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              onClick={() => context.onOpenChange?.(false)}
             />
            <View
              ref={ref}
              className={cn(
                    "fixed left-[50%] top-[50%] z-50 w-72 translate-x-[-50%] translate-y-[-50%] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    className
                )}
              {...props}
            />
        </Portal>
    )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

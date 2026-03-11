import * as React from "react"
import { View } from "@tarojs/components"

const CollapsibleContext = React.createContext<{
    open: boolean
    onOpenChange: (open: boolean) => void
} | null>(null)

const Collapsible = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      open?: boolean
      defaultOpen?: boolean
      onOpenChange?: (open: boolean) => void
      disabled?: boolean
  }
>(({ open: openProp, defaultOpen, onOpenChange, disabled, ...props }, ref) => {
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return
        if (openProp === undefined) {
            setOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    return (
        <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
            <View ref={ref} {...props} />
        </CollapsibleContext.Provider>
    )
})
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, onClick, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)
    
    return (
        <View
          ref={ref}
          className={className}
         onClick={(e: any) => {
            context?.onOpenChange(!context?.open)
           onClick?.(e)
          }}
          {...props}
        />
    )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)
    
    if (!context?.open) return null

    return <View ref={ref} className={className} {...props} />
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

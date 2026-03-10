import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { Check, Circle } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

// DropdownMenu as a Bottom Sheet for mobile

const DropdownMenuContext = React.createContext<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
} | null>(null)

interface DropdownMenuProps {
    children: React.ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const DropdownMenu = ({ open: openProp, defaultOpen, onOpenChange, children }: DropdownMenuProps) => {
    const [openState, setOpenState] = React.useState(defaultOpen || false)
    const open = openProp !== undefined ? openProp : openState
    
    const handleOpenChange = (newOpen: boolean) => {
        if (openProp === undefined) {
            setOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    return (
        <DropdownMenuContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
            {children}
        </DropdownMenuContext.Provider>
    )
}

const DropdownMenuTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={className} {...props} />
))
DropdownMenuGroup.displayName = "DropdownMenuGroup"

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => {
    // In our simplified implementation, Content handles Portal
    return <>{children}</>
}

interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
    sideOffset?: number
}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    
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
                    "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300",
                    className
                )}
              {...props}
            >
                <View className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted mb-4" />
                <ScrollView scrollY className="max-h-[50vh]">
                     {children}
                </ScrollView>
            </View>
        </Portal>
    )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    disabled?: boolean
  }
>(({ className, inset, disabled, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    return (
        <View
          ref={ref}
          className={cn(
            "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            inset && "pl-8",
            disabled && "opacity-50 pointer-events-none",
            className
            )}
          onClick={(e) => {
                if (disabled) return
                context?.onOpenChange?.(false)
                props.onClick?.(e)
            }}
          {...props}
        />
    )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    return (
        <View
          ref={ref}
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
            )}
          onClick={(e) => {
                context?.onOpenChange?.(false)
                props.onClick?.(e)
            }}
          {...props}
        >
            <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
                {checked && <Check size={16} />}
            </View>
            {children}
        </View>
    )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
      value: string
  }
>(({ className, children, ...props }, ref) => {
    // Radio logic needs RadioGroup context usually. 
    // Here we just render item.
    return (
        <View
          ref={ref}
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
            )}
          {...props}
        >
            <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
                <Circle className="fill-current" size={8} />
            </View>
            {children}
        </View>
    )
})
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "px-2 py-2 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Submenus are tricky on mobile bottom sheets. 
// We will skip SubMenu for now or render them inline?
// For now, export simplified components.
const DropdownMenuSub = View
const DropdownMenuSubTrigger = View
const DropdownMenuSubContent = View
const DropdownMenuRadioGroup = View

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

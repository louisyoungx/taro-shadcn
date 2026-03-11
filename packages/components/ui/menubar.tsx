import * as React from "react"
import { View, ScrollView } from "@tarojs/components"
import { Check, ChevronRight, Circle } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Portal } from "@/components/ui/portal"

const MenubarContext = React.createContext<{
  openMenu?: string
  setOpenMenu?: (id: string | undefined) => void
} | null>(null)

const Menubar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const [openMenu, setOpenMenu] = React.useState<string | undefined>()

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <View
        ref={ref}
        className={cn(
          "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
          className
        )}
        {...props}
      />
    </MenubarContext.Provider>
  )
})
Menubar.displayName = "Menubar"

const MenubarMenuContext = React.createContext<{
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

let menubarMenuIdCounter = 0

const MenubarMenu = ({
  children,
...props
}: {
  children: React.ReactNode
}) => {
  const id = React.useMemo(() => `menubar-menu-${menubarMenuIdCounter++}`, [])
  const context = React.useContext(MenubarContext)
  
  const open = context?.openMenu === id
  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      context?.setOpenMenu?.(id)
    } else {
      context?.setOpenMenu?.(undefined)
    }
  }

  return (
    <MenubarMenuContext.Provider value={{ id, open, onOpenChange }}>
      {children}
    </MenubarMenuContext.Provider>
  )
}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  return (
    <View
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
     onClick={() => context?.onOpenChange(!context.open)}
      {...props}
    />
  )
})
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)

  if (!context?.open) return null

  return (
    <Portal>
      <View
        className="fixed inset-0 z-50 bg-black opacity-80 animate-in fade-in-0"
       onClick={() => context.onOpenChange(false)}
      />
      <View
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-[10px] border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-bottom duration-300",
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
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    inset?: boolean
    disabled?: boolean
  }
>(({ className, inset, disabled, children, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
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
        context?.onOpenChange(false)
   ...props.onClick?.(e)
      }}
      {...props}
    >
      {children}
    </View>
  )
})
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  return (
    <View
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
     onClick={(e) => {
        context?.onOpenChange(false)
   ...props.onClick?.(e)
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    checked?: boolean
  }
>(({ className, children, checked, ...props }, ref) => {
  const context = React.useContext(MenubarMenuContext)
  return (
    <View
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
     onClick={(e) => {
        context?.onOpenChange(false)
   ...props.onClick?.(e)
      }}
      {...props}
    >
      <View className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {checked && <Circle className="fill-current" size={8} />}
      </View>
      {children}
    </View>
  )
})
MenubarRadioItem.displayName = "MenubarRadioItem"

const MenubarLabel = React.forwardRef<
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
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = ({
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
MenubarShortcut.displayName = "MenubarShortcut"

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={className} {...props} />
))
MenubarGroup.displayName = "MenubarGroup"

const MenubarSub = ({ children }: { children: React.ReactNode }) => <View>{children}</View>
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </View>
))
const MenubarSubContent = ({ children }: { children: React.ReactNode }) => (
  <View className="pl-4 border-l ml-2 my-1">{children}</View>
)
const MenubarRadioGroup = ({ children }: { children: React.ReactNode }) => <View>{children}</View>

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

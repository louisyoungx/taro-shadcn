import * as React from "react"
import { View } from "@tarojs/components"
import { ChevronDown } from "lucide-react-taro"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
    type?: "single" | "multiple"
} | null>(null)

const Accordion = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & {
        type?: "single" | "multiple"
        value?: string | string[]
        defaultValue?: string | string[]
        onValueChange?: (value: string | string[]) => void
        collapsible?: boolean
    }
>(({ className, type = "single", value: valueProp, defaultValue, onValueChange, collapsible = false, ...props }, ref) => {
    const [valueState, setValueState] = React.useState<string | string[]>(
        defaultValue || (type === "multiple" ? [] : "")
    )
    const value = valueProp !== undefined ? valueProp : valueState

    const handleValueChange = (itemValue: string) => {
        let newValue: string | string[]
        if (type === "multiple") {
            const current = Array.isArray(value) ? value : []
            if (current.includes(itemValue)) {
                newValue = current.filter(v => v !== itemValue)
            } else {
                newValue = [...current, itemValue]
            }
        } else {
            if (value === itemValue && collapsible) {
                newValue = ""
            } else {
                newValue = itemValue
            }
        }

        if (valueProp === undefined) {
            setValueState(newValue)
        }
        onValueChange?.(newValue)
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
            <View ref={ref} className={className} {...props} />
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { value: string }
>(({ className, value, ...props }, ref) => (
    <View ref={ref} className={cn("border-b", className)} {...props} data-value={value} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
    // Need to find the parent AccordionItem's value. 
    // In React Native/Taro we can't easily traverse up DOM. 
    // So we assume AccordionItem passes context or we need to explicitly pass value?
    // Radix does this via context nesting. 
    // Let's create a context for Item.
    return (
        <AccordionItemContext.Consumer>
            {(itemValue) => <AccordionTriggerInternal itemValue={itemValue} className={className} ref={ref} {...props}>{children}</AccordionTriggerInternal>}
        </AccordionItemContext.Consumer>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

// Helper context for Item
const AccordionItemContext = React.createContext<string>("")

// Update AccordionItem to provide context
const AccordionItemWithContext = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={value}>
        <View ref={ref} className={cn("border-b", className)} {...props}>
            {children}
        </View>
    </AccordionItemContext.Provider>
))
AccordionItemWithContext.displayName = "AccordionItem"


const AccordionTriggerInternal = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { itemValue: string }
>(({ className, children, itemValue, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const isOpen = Array.isArray(context?.value) 
        ? context?.value.includes(itemValue)
        : context?.value === itemValue

    return (
        <View className="flex">
            <View
              ref={ref}
              className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all",
                    className
                )}
              onClick={() => context?.onValueChange?.(itemValue)}
              {...props}
            >
                {children}
                <ChevronDown className={cn("shrink-0 transition-transform duration-200", isOpen && "rotate-180")} size={16} />
            </View>
        </View>
    )
})

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
    <AccordionItemContext.Consumer>
        {(itemValue) => <AccordionContentInternal itemValue={itemValue} className={className} ref={ref} {...props}>{children}</AccordionContentInternal>}
    </AccordionItemContext.Consumer>
))
AccordionContent.displayName = "AccordionContent"

const AccordionContentInternal = React.forwardRef<
    React.ElementRef<typeof View>,
    React.ComponentPropsWithoutRef<typeof View> & { itemValue: string }
>(({ className, children, itemValue, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const isOpen = Array.isArray(context?.value) 
        ? context?.value.includes(itemValue)
        : context?.value === itemValue

    if (!isOpen) return null

    return (
        <View
          ref={ref}
          className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          {...props}
        >
            <View className={cn("pb-4 pt-0", className)}>{children}</View>
        </View>
    )
})

export { Accordion, AccordionItemWithContext as AccordionItem, AccordionTrigger, AccordionContent }

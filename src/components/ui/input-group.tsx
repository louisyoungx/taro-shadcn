import * as React from "react"
import { View, Text, Input, Textarea } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "./button"

interface InputGroupContextValue {
  isFocused: boolean
  setIsFocused: (value: boolean) => void
  disabled?: boolean
}

const InputGroupContext = React.createContext<InputGroupContextValue>({
  isFocused: false,
  setIsFocused: () => {},
  disabled: false,
})

function InputGroup({ className, disabled, ...props }: React.ComponentPropsWithoutRef<typeof View> & { disabled?: boolean }) {
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <InputGroupContext.Provider value={{ isFocused, setIsFocused, disabled }}>
      <View
        data-slot="input-group"
        className={cn(
          "border-input dark:bg-input/30 shadow-xs relative flex w-full min-h-9 flex-wrap items-center rounded-md border outline-none transition-[color,box-shadow]",
          isFocused && "ring-2 ring-ring ring-offset-2 ring-offset-background",
          className
        )}
        {...props}
      />
    </InputGroupContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1 text-sm font-medium [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3",
        "inline-end":
          "order-last pr-3",
        "block-start":
          "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3",
        "block-end":
          "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof inputGroupAddonVariants>) {
  const { disabled } = React.useContext(InputGroupContext)
  return (
    <View
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), disabled && "opacity-50", className)}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 [&>svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-2 rounded-md px-2",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0",
        "icon-sm": "size-8 p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text>) {
  return (
    <Text
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  onFocus,
  onBlur,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input>) {
  const { setIsFocused } = React.useContext(InputGroupContext)

  return (
    <View className="flex h-full flex-1 items-center px-2 py-2">
      <Input
        data-slot="input-group-control"
        className={cn(
          "flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        placeholderClass="text-muted-foreground"
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        {...props}
      />
    </View>
  )
}

function InputGroupTextarea({
  className,
  onFocus,
  onBlur,
  ...props
}: React.ComponentPropsWithoutRef<typeof Textarea>) {
  const { setIsFocused } = React.useContext(InputGroupContext)

  return (
    <View className="flex h-full flex-1 min-w-20 m-2">
      <Textarea
        data-slot="input-group-control"
        className={cn(
          "flex-1 w-full h-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        placeholderClass="text-muted-foreground"
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        {...props}
      />
    </View>
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}

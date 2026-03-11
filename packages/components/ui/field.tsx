import * as React from "react"
import { View, Text } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
...props
}: React.ComponentPropsWithoutRef<typeof View> & { variant?: "legend" | "label" }) {
  return (
    <View
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      data-slot="field-group"
      className={cn(
        "flex w-full flex-col gap-3 data-[slot=checkbox-group]:gap-3",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "data-[invalid=true]:text-destructive flex w-full gap-1",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>view]:w-full [&>label]:w-full"],
        horizontal: [
          "flex-row items-center",
        ],
        responsive: ["flex-col [&>view]:w-full [&>label]:w-full"],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
...props
}: React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof fieldVariants>) {
  return (
    <View
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      data-slot="field-content"
      className={cn(
        "flex flex-1 flex-col gap-2 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
...props
}: React.ComponentPropsWithoutRef<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "flex w-fit gap-2 leading-snug",
        "[&>view]:p-1",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm font-normal leading-normal",
        // "group-has-[[data-orientation=horizontal]]/field:text-balance", // text-balance not supported in Taro
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  children?: React.ReactNode
}) {
  return (
    <View
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <View
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </View>
      )}
    </View>
  )
}

function FieldError({
  className,
  children,
  errors,
...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  errors?: Array<{ message?: string } | undefined>
}) {
    // Memoize content if needed, or just render.
    let content = children

    if (!content && errors) {
        if (errors.length === 1 && errors[0]?.message) {
            content = <Text>{errors[0].message}</Text>
        } else if (errors.length > 0) {
            content = (
                <View className="ml-4 flex flex-col gap-1">
                    {errors.map((error, index) => 
                        error?.message && <Text key={index} className="text-xs">{`\u2022 ${error.message}`}</Text>
                    )}
                </View>
            )
        }
    }

  if (!content) {
    return null
  }

  return (
    <View
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </View>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

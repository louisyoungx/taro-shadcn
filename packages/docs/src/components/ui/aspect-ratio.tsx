import * as React from "react"
import { View } from "@tarojs/components"

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<React.ComponentPropsWithoutRef<typeof View>, "style"> & {
    ratio?: number
    style?: React.CSSProperties
  }
>(({ className, ratio = 1 / 1, style, ...props }, ref) => (
  <View
    ref={ref}
    style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${100 / ratio}%`,
        ...style
    }}
    className={className}
    {...props}
  >
    <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }}
    >
        {props.children}
    </View>
  </View>
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }

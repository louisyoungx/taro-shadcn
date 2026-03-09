
import * as React from "react"
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function SwitchDemo({
  className,
  activeClass,
  defaultValue = false,
  label,
  ...props
}: React.ComponentProps<typeof Switch> & {
  activeClass?: string
  defaultValue?: boolean
  label?: string
}) {
  const [checked, setChecked] = React.useState(defaultValue)

  return (
    <View className="flex items-center gap-2">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        className={cn(className, checked && activeClass)}
        {...props}
      />
      {label && <Label>{label}</Label>}
    </View>
  )
}

export default function SwitchPage() {
  return (
    <PageLayout title="Switch">
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            Default
          </Label>
          <SwitchDemo label="Airplane Mode" />
        </View>

        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            Colors
          </Label>
          <View className="flex flex-wrap gap-4">
            <SwitchDemo activeClass="bg-green-500" label="Green" defaultValue />
            <SwitchDemo activeClass="bg-red-500" label="Red" defaultValue />
            <SwitchDemo activeClass="bg-blue-500" label="Blue" defaultValue />
            <SwitchDemo activeClass="bg-orange-500" label="Orange" defaultValue />
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            Sizes (Scale)
          </Label>
          <View className="flex items-center gap-4">
            <View style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>
              <SwitchDemo label="Small (0.8x)" />
            </View>
            <SwitchDemo label="Normal (1x)" />
            <View style={{ transform: 'scale(1.2)', transformOrigin: 'left center' }}>
              <SwitchDemo label="Large (1.2x)" />
            </View>
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            States
          </Label>
          <View className="flex flex-wrap gap-4">
            <SwitchDemo disabled label="Disabled" />
            <SwitchDemo disabled defaultValue label="Disabled Checked" />
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

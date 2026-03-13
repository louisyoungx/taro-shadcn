
import { View } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchPage() {
  return (
    <PageLayout title="Switch">
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            Default
          </Label>
          <View className="flex items-center gap-2">
            <Switch />
            <Label>Airplane Mode</Label>
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            Colors
          </Label>
          <View className="flex flex-wrap gap-4">
            <View className="flex items-center gap-2">
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-green-500"
              />
              <Label>Green</Label>
            </View>
            <View className="flex items-center gap-2">
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-red-500"
              />
              <Label>Red</Label>
            </View>
            <View className="flex items-center gap-2">
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-blue-500"
              />
              <Label>Blue</Label>
            </View>
            <View className="flex items-center gap-2">
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-orange-500"
              />
              <Label>Orange</Label>
            </View>
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            Sizes (Scale)
          </Label>
          <View className="flex items-center gap-4">
            <View style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>
              <View className="flex items-center gap-2">
                <Switch />
                <Label>Small (0.8x)</Label>
              </View>
            </View>
            <View className="flex items-center gap-2">
              <Switch />
              <Label>Normal (1x)</Label>
            </View>
            <View style={{ transform: 'scale(1.2)', transformOrigin: 'left center' }}>
              <View className="flex items-center gap-2">
                <Switch />
                <Label>Large (1.2x)</Label>
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <Label className="text-muted-foreground text-xs font-medium uppercase">
            States
          </Label>
          <View className="flex flex-wrap gap-4">
            <View className="flex items-center gap-2">
              <Switch disabled />
              <Label>Disabled</Label>
            </View>
            <View className="flex items-center gap-2">
              <Switch disabled defaultChecked />
              <Label>Disabled Checked</Label>
            </View>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

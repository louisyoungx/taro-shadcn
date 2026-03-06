
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchPage() {
  return (
    <PageLayout title="Switch">
      <View className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </View>
    </PageLayout>
  );
}

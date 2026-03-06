
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxPage() {
  return (
    <PageLayout title="Checkbox">
      <View className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </View>
    </PageLayout>
  );
}

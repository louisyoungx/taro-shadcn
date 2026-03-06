
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LabelPage() {
  return (
    <PageLayout title="Label">
      <View className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </View>
    </PageLayout>
  );
}

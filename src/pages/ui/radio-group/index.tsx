
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupPage() {
  return (
    <PageLayout title="RadioGroup">
      <RadioGroup defaultValue="comfortable">
        <View className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </View>
        <View className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </View>
        <View className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </View>
      </RadioGroup>
    </PageLayout>
  );
}

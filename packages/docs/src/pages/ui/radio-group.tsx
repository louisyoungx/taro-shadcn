
import { View } from "@tarojs/components";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
        <View className="flex items-center gap-2">
          <RadioGroupItem value="default" id="r1" />
          <Label>Default</Label>
        </View>
        <View className="flex items-center gap-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label>Comfortable</Label>
        </View>
        <View className="flex items-center gap-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label>Compact</Label>
        </View>
      </RadioGroup>
  );
}

export default RadioGroupDemo;

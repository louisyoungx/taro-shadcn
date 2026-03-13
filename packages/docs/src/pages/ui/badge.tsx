
import { View } from "@tarojs/components";
import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <View className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </View>
  );
}

export default BadgeDemo;

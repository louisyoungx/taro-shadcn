
import { View, Text } from "@tarojs/components";
import { Separator } from "@/components/ui/separator";

export function SeparatorDemo() {
  return (
    <View>
        <View className="space-y-1">
          <Text className="text-sm font-medium leading-none">Taro Shadcn UI Separator</Text>
          <Separator className="my-4" />
          <Text className="text-sm text-muted-foreground">
            An open-source UI component library.
          </Text>
        </View>
        <Separator className="my-4" />
        <View className="flex h-5 items-center space-x-4 text-sm">
          <Text>Blog</Text>
          <Separator orientation="vertical" />
          <Text>Docs</Text>
          <Separator orientation="vertical" />
          <Text>Source</Text>
        </View>
      </View>
  );
}

export default SeparatorDemo;

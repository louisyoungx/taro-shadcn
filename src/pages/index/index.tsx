
import { View, Text, ScrollView } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import { components } from "@/lib/routes";
import { ChevronRight } from "lucide-react-taro";
import "./index.css";

export default function IndexPage() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <ScrollView className="h-full bg-background" scrollY>
      <View className="p-4 space-y-6 pb-10">
        <View className="space-y-2">
          <View className="text-2xl font-bold text-foreground">shadcn/ui</View>
          <View className="text-sm text-muted-foreground">
            A collection of re-usable components built with Radix UI and Tailwind CSS.
          </View>
        </View>

        {components.map((section) => (
          <View key={section.title} className="space-y-3">
            <Text className="text-sm font-medium text-muted-foreground px-1">
              {section.title}
            </Text>
            <View className="grid gap-2">
              {section.items.map((item) => (
                <View
                  key={item.name}
                  className="flex flex-row items-center justify-between p-4 bg-card rounded-xl border border-border active:opacity-70"
                  onClick={() => {
                    navigateTo({ url: item.path });
                  }}
                >
                  <Text className="text-sm font-medium text-card-foreground">
                    {item.name}
                  </Text>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

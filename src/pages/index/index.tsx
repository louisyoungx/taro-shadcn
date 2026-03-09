
import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { useLoad, navigateTo } from "@tarojs/taro";
import { ChevronRight } from "lucide-react-taro";
import "./index.css";

export default function IndexPage() {
  const app = Taro.getApp();
  const pages = (app.config?.pages || [])
    .filter((p) => p !== "pages/index/index")
    .map((page) => {
      const parts = page.split("/");
      const name = parts[parts.length - 2];
      const title = name
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");
      return {
        name: title,
        path: "/" + page,
      };
    });

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

        <View className="grid gap-2">
          {pages.map((item) => (
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
    </ScrollView>
  );
}

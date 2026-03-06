
import { View, ScrollView } from "@tarojs/components";
import { setNavigationBarTitle, useLoad } from "@tarojs/taro";
import { useEffect } from "react";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  useLoad(() => {
    setNavigationBarTitle({
      title: title,
    });
  });

  // H5 environment fallback or for component mount
  useEffect(() => {
    setNavigationBarTitle({
      title: title,
    });
  }, [title]);

  return (
    <View className="flex flex-col h-full bg-background">
      <ScrollView className="flex-1" scrollY>
        <View className="p-4 pb-10 space-y-6">{children}</View>
      </ScrollView>
    </View>
  );
}

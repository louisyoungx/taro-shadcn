
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function ScrollAreaPage() {
  return (
    <PageLayout title="ScrollArea">
      <ScrollArea className="h-72 w-full rounded-md border">
        <View className="p-4">
          <Text className="mb-4 text-sm font-medium leading-none">Tags</Text>
          {tags.map((tag) => (
            <View key={tag}>
              <View className="text-sm">{tag}</View>
              <Separator className="my-2" />
            </View>
          ))}
        </View>
      </ScrollArea>
    </PageLayout>
  );
}


import { View } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { Badge } from "@/components/ui/badge";

export default function BadgePage() {
  return (
    <PageLayout title="Badge">
      <View className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </View>
    </PageLayout>
  );
}

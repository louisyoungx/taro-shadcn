
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <PageLayout title="Skeleton">
      <View className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <View className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </View>
      </View>
    </PageLayout>
  );
}

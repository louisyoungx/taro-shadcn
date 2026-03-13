
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <PageLayout title="Skeleton">
      <View className="space-y-8">
        <View className="space-y-4">
          <Text className="text-sm font-medium">Profile</Text>
          <View className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="space-y-2">
              <Skeleton className="h-4 w-30" />
              <Skeleton className="h-4 w-40" />
            </View>
          </View>
        </View>

        <View className="space-y-4">
          <Text className="text-sm font-medium">Card</Text>
          <View className="flex flex-col space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <View className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </View>
          </View>
        </View>

        <View className="space-y-4">
          <Text className="text-sm font-medium">List</Text>
          <View className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <View className="space-y-2">
              <Skeleton className="h-4 w-30" />
              <Skeleton className="h-4 w-40" />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

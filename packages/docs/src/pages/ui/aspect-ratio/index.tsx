
import { View, Image } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPage() {
  return (
    <PageLayout title="AspectRatio">
      <View className="grid gap-10">
        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">16 / 9</View>
          <View className="w-full max-w-[450px]">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                className="h-full w-full rounded-md object-cover"
                mode="aspectFill"
              />
            </AspectRatio>
          </View>
        </View>

        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">1 / 1 (Square)</View>
          <View className="w-full max-w-[450px]">
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                className="h-full w-full rounded-md object-cover"
                mode="aspectFill"
              />
            </AspectRatio>
          </View>
        </View>

        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">4 / 3</View>
          <View className="w-full max-w-[450px]">
            <AspectRatio ratio={4 / 3} className="bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                className="h-full w-full rounded-md object-cover"
                mode="aspectFill"
              />
            </AspectRatio>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

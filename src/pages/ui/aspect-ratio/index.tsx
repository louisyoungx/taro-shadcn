
import { View, Image } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPage() {
  return (
    <PageLayout title="AspectRatio">
      <View className="w-full max-w-[450px]">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            className="h-full w-full rounded-md object-cover"
            mode="aspectFill"
          />
        </AspectRatio>
      </View>
    </PageLayout>
  );
}

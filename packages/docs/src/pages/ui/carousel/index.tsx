
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPage() {
  return (
    <PageLayout title="Carousel">
      <View className="space-y-4">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Default</View>
          <View className="w-full px-12">
            <Carousel className="mx-auto w-full max-w-[12rem] sm:max-w-xs">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <View className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Text className="text-4xl font-semibold">
                            {index + 1}
                          </Text>
                        </CardContent>
                      </Card>
                    </View>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Spacing</View>
          <View className="w-full px-12">
            <Carousel className="mx-auto w-full max-w-[12rem] sm:max-w-xs md:max-w-sm">
              <CarouselContent className="-ml-1">
                {Array.from({ length: 20 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 pl-1 lg:basis-1/3"
                  >
                    <View className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Text className="text-2xl font-semibold">
                            {index + 1}
                          </Text>
                        </CardContent>
                      </Card>
                    </View>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Orientation</View>
          <View className="w-full px-12 py-12">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="mx-auto w-full max-w-xs"
            >
              <CarouselContent className="-mt-1 h-[270px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/2 pt-1">
                    <View className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <Text className="text-3xl font-semibold">
                            {index + 1}
                          </Text>
                        </CardContent>
                      </Card>
                    </View>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

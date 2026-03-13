
import { View, Text } from "@tarojs/components";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <View className="space-y-4">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Default</View>
          <View className="w-full px-12">
            <Carousel className="mx-auto w-full max-w-[12rem] sm:max-w-xs">
              <CarouselContent className="h-48">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <View className="p-1 h-full">
                      <Card className="h-full">
                        <CardContent className="flex h-full items-center justify-center p-6">
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
          <View className="text-sm text-muted-foreground">Spacing (Multiple Items)</View>
          <View className="w-full px-12">
            <Carousel 
              opts={{ displayMultipleItems: 3 }}
              className="mx-auto w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
            >
              <CarouselContent className="h-32">
                {Array.from({ length: 20 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <View className="p-1 h-full">
                      <Card className="h-full">
                        <CardContent className="flex h-full items-center justify-center p-2">
                          <Text className="text-xl font-semibold">
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
          <View className="text-sm text-muted-foreground">Orientation (Vertical)</View>
          <View className="w-full px-12 py-12">
            <Carousel
              orientation="vertical"
              opts={{ displayMultipleItems: 2 }}
              className="mx-auto w-full max-w-xs"
            >
              <CarouselContent className="h-[300px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <View className="p-1 h-full">
                      <Card className="h-full">
                        <CardContent className="flex h-full items-center justify-center p-6">
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
  );
}

export default CarouselDemo;

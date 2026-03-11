import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function SliderPage() {
  return (
    <PageLayout title="Slider">
      <View className="flex flex-col gap-8 p-6">
        <View className="flex flex-col gap-4">
          <View className="text-sm font-medium">Default</View>
          <Slider defaultValue={[50]} max={100} step={1} className={cn("w-[60%]")} />
        </View>

        <View className="flex flex-col gap-4">
          <View className="text-sm font-medium">Custom Width</View>
          <Slider defaultValue={[25]} max={100} step={1} className="w-[80%]" />
          <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
        </View>

        <View className="flex flex-col gap-4">
          <View className="text-sm font-medium">Custom Color</View>
          <Slider 
            defaultValue={[50]} 
            max={100} 
            step={1} 
            className="w-[60%]"
            rangeClassName="bg-green-500"
            thumbClassName="border-green-500 focus:ring-green-500 focus:ring-opacity-30" 
          />
           <Slider 
             defaultValue={[50]} 
             max={100} 
             step={1} 
             className="w-[60%]"
             rangeClassName="bg-red-500"
             thumbClassName="border-red-500 focus:ring-red-500 focus:ring-opacity-30"
           />
        </View>


        <View className="flex flex-col gap-4">
          <View className="text-sm font-medium">Vertical</View>
          <View className="flex h-[200px] flex-row gap-8">
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={1} 
              orientation="vertical"
            />
            <Slider 
              defaultValue={[75]} 
              max={100} 
              step={1} 
              orientation="vertical"
              rangeClassName="bg-blue-500"
              thumbClassName="border-blue-500 focus:ring-blue-500 focus:ring-opacity-30"
            />
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

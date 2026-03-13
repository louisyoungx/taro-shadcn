
import { View } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import * as React from "react";

export default function ProgressPage() {
  const [progress, setProgress] = React.useState(13);
  const [sliderValue, setSliderValue] = React.useState([33]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout title="Progress">
      <View className="grid gap-8">
        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">
            Default
          </View>
          <Progress value={progress} className="w-[60%]" />
        </View>

        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">
            Fixed Value (66%)
          </View>
          <Progress value={66} />
        </View>
        
        <View className="grid gap-4">
          <View className="text-sm font-medium leading-none">
            Controlled by Slider
          </View>
          <Progress value={sliderValue[0]} />
          <Slider
            max={100}
            step={1}
            value={sliderValue}
            onValueChange={setSliderValue}
          />
        </View>
      </View>
    </PageLayout>
  );
}

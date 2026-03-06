
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function SliderPage() {
  return (
    <PageLayout title="Slider">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[60%]")}
      />
    </PageLayout>
  );
}

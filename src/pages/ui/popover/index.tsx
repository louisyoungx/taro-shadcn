
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverPage() {
  return (
    <PageLayout title="Popover">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <View className="grid gap-4">
            <View className="space-y-2">
              <View className="font-medium leading-none">Dimensions</View>
              <View className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </View>
            </View>
            <View className="grid gap-2">
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </View>
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </View>
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
                />
              </View>
              <View className="grid grid-cols-3 items-center gap-4">
                <Label>Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  className="col-span-2 h-8"
                />
              </View>
            </View>
          </View>
        </PopoverContent>
      </Popover>
    </PageLayout>
  );
}

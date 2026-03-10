import { View, ScrollView } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react-taro";
import * as React from "react";

export default function DrawerPage() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <PageLayout title="Drawer">
      <View className="grid gap-8">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Basic Drawer</View>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <View className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <View className="p-4 pb-0">
                  <View className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-10)}
                      disabled={goal <= 200}
                    >
                      <Minus size={16} />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <View className="flex-1 text-center">
                      <View className="text-7xl font-bold tracking-tighter">
                        {goal}
                      </View>
                      <View className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </View>
                    </View>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                      disabled={goal >= 400}
                    >
                      <Plus size={16} />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </View>
                </View>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </View>
            </DrawerContent>
          </Drawer>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">
            Scrollable Content
          </View>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Scrollable</Button>
            </DrawerTrigger>
            <DrawerContent>
              <View className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Terms of Service</DrawerTitle>
                  <DrawerDescription>Read our terms carefully.</DrawerDescription>
                </DrawerHeader>
                <ScrollView scrollY className="p-4 h-[300px]">
                  <View className="space-y-4">
                    <View className="font-medium">1. Introduction</View>
                    <View className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </View>
                    <View className="font-medium">2. User Rights</View>
                    <View className="text-sm text-muted-foreground">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </View>
                    <View className="font-medium">3. Privacy Policy</View>
                    <View className="text-sm text-muted-foreground">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </View>
                    <View className="font-medium">4. Contact</View>
                    <View className="text-sm text-muted-foreground">
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </View>
                    <View className="font-medium">5. More Info</View>
                    <View className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </View>
                  </View>
                </ScrollView>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>I Agree</Button>
                  </DrawerClose>
                </DrawerFooter>
              </View>
            </DrawerContent>
          </Drawer>
        </View>
      </View>
    </PageLayout>
  );
}

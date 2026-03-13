
import { View } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react-taro";
import { useState } from "react";

export default function HoverCardPage() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <PageLayout title="HoverCard">
      <View className="grid gap-10">
        <View className="grid gap-2">
          <View className="text-sm text-muted-foreground">Profile</View>
          <HoverCard>
            <HoverCardTrigger className="inline-block">
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <View className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <View className="space-y-1">
                  <View className="text-sm font-semibold">@nextjs</View>
                  <View className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </View>
                  <View className="flex items-center pt-2">
                    <CalendarDays className="mr-2 opacity-70" size={16} />
                    <View className="text-xs text-muted-foreground">
                      Joined December 2021
                    </View>
                  </View>
                </View>
              </View>
            </HoverCardContent>
          </HoverCard>
        </View>

        <View className="grid gap-2">
          <View className="text-sm text-muted-foreground">Sides</View>
          <View className="grid grid-cols-2 gap-2 justify-items-start">
            <HoverCard>
              <HoverCardTrigger className="inline-block">
                <Button variant="outline">Top</Button>
              </HoverCardTrigger>
              <HoverCardContent side="top">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">HoverCard</View>
                  <View className="text-xs text-muted-foreground">
                    Positioned on top.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger className="inline-block">
                <Button variant="outline">Right</Button>
              </HoverCardTrigger>
              <HoverCardContent side="right">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">HoverCard</View>
                  <View className="text-xs text-muted-foreground">
                    Positioned on right.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger className="inline-block">
                <Button variant="outline">Bottom</Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">HoverCard</View>
                  <View className="text-xs text-muted-foreground">
                    Positioned on bottom.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger className="inline-block">
                <Button variant="outline">Left</Button>
              </HoverCardTrigger>
              <HoverCardContent side="left">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">HoverCard</View>
                  <View className="text-xs text-muted-foreground">
                    Positioned on left.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>
          </View>
        </View>

        <View className="grid gap-2">
          <View className="text-sm text-muted-foreground">Align</View>
          <View className="space-y-2">
            <HoverCard>
              <HoverCardTrigger className="inline-block w-56">
                <Button className="w-full" variant="outline">
                  Align start
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom" align="start">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">Start</View>
                  <View className="text-xs text-muted-foreground">
                    Bottom + start aligned.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger className="inline-block w-56">
                <Button className="w-full" variant="outline">
                  Align center
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom" align="center">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">Center</View>
                  <View className="text-xs text-muted-foreground">
                    Bottom + center aligned.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger className="inline-block w-56">
                <Button className="w-full" variant="outline">
                  Align end
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom" align="end">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">End</View>
                  <View className="text-xs text-muted-foreground">
                    Bottom + end aligned.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>
          </View>
        </View>

        <View className="grid gap-2">
          <View className="text-sm text-muted-foreground">Controlled</View>
          <View className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setControlledOpen((v) => !v)}
            >
              Toggle
            </Button>
            <HoverCard open={controlledOpen} onOpenChange={setControlledOpen}>
              <HoverCardTrigger className="inline-block">
                <Button variant="outline">Target</Button>
              </HoverCardTrigger>
              <HoverCardContent side="top">
                <View className="space-y-1">
                  <View className="text-sm font-semibold">
                    {controlledOpen ? "Open" : "Closed"}
                  </View>
                  <View className="text-xs text-muted-foreground">
                    Controlled by external state.
                  </View>
                </View>
              </HoverCardContent>
            </HoverCard>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

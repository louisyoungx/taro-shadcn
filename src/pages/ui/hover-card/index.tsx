
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react-taro";

export default function HoverCardPage() {
  return (
    <PageLayout title="HoverCard">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <View className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <View className="space-y-1">
              <Text className="text-sm font-semibold">@nextjs</Text>
              <Text className="text-sm">
                The React Framework – created and maintained by @vercel.
              </Text>
              <View className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <Text className="text-xs text-muted-foreground">
                  Joined December 2021
                </Text>
              </View>
            </View>
          </View>
        </HoverCardContent>
      </HoverCard>
    </PageLayout>
  );
}

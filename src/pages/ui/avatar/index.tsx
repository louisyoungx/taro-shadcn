
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <PageLayout title="Avatar">
      <View className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/wojtekmaj.png" alt="@wojtekmaj" />
          <AvatarFallback>WM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </View>
    </PageLayout>
  );
}

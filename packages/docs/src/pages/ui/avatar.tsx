
import { View } from "@tarojs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <View className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/wojtekmaj.png" />
          <AvatarFallback>WM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </View>
  );
}

export default AvatarDemo;

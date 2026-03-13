
import { View } from "@tarojs/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BellRing, Check } from "lucide-react-taro";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export function CardDemo() {
  return (
    <View className="grid gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View className="grid w-full items-center gap-4">
              <View className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </View>
              <View className="flex flex-col gap-2">
                <Label>Framework</Label>
                <Select defaultValue="next">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <View className="flex items-center rounded-md border p-4">
              <BellRing size={24} className="mr-4" />
              <View className="flex-1 space-y-1">
                <View className="text-sm font-medium leading-none">
                  Push Notifications
                </View>
                <View className="text-sm text-muted-foreground">
                  Send notifications to device.
                </View>
              </View>
              <Switch />
            </View>
            <View>
              {notifications.map((notification, index) => (
                <View
                  key={index}
                  className="mb-4 grid last:mb-0 last:pb-0"
                  style={{ gridTemplateColumns: "25px 1fr" }}
                >
                  <View className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <View className="space-y-1">
                    <View className="text-sm font-medium leading-none">
                      {notification.title}
                    </View>
                    <View className="text-sm text-muted-foreground">
                      {notification.description}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check className="mr-2" size={16} /> Mark all as read
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <View className="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" placeholder="m@example.com" />
            </View>
            <View className="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" password />
            </View>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </View>
  );
}

export default CardDemo;

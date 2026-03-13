import { View } from "@tarojs/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export function SheetDemo() {
  return (
    <View className="grid gap-4">
        {SHEET_SIDES.map((side) => (
          <View key={side} className="space-y-2">
            <View className="text-sm text-muted-foreground capitalize">
              {side}
            </View>
            <Sheet>
              <SheetTrigger >
                <Button variant="outline">{side} Sheet</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <View className="grid gap-4 py-4">
                  <View className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Name</Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </View>
                  <View className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Username</Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </View>
                </View>
                <SheetFooter>
                  <SheetClose >
              <Button>Save changes</Button>
            </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </View>
        ))}
      </View>
  );
}

export default SheetDemo;

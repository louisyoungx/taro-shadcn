import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <PageLayout title="DropdownMenu">
      <View className="grid gap-8">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Basic Menu</View>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Text>Profile</Text>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Text>Billing</Text>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Text>Settings</Text>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Text>Team</Text>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Text>Invite users</Text>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-40" sideOffset={2}>
                      <DropdownMenuItem>
                        <Text>Email</Text>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Text>Message</Text>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Text>More...</Text>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Text>New Team</Text>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Text>GitHub</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Support</Text>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Text>API</Text>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Text>Log out</Text>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Checkboxes</View>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Open Checkboxes</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                closeOnSelect={false}
                onClick={() => setShowStatusBar(!showStatusBar)}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                closeOnSelect={false}
                onClick={() => setShowActivityBar(!showActivityBar)}
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                closeOnSelect={false}
                onClick={() => setShowPanel(!showPanel)}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      </View>
    </PageLayout>
  );
}


"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Bell,
  ClipboardPaste,
  Code,
  Copy,
  CircleQuestionMark,
  FileText,
  Folder,
  FolderPlus,
  House,
  Image,
  Inbox,
  LayoutGrid,
  List,
  Plus,
  Scissors,
  Trash,
  User,
  CreditCard,
  Settings,
  Calculator,
  Calendar,
  Smile,
  ZoomIn,
  ZoomOut,
} from "lucide-react-taro";
import { Text, View } from "@tarojs/components";

export function CommandManyItems() {
  const [open, setOpen] = React.useState(false);
  const iconSize = 16;
  const handleSelect = React.useCallback(() => setOpen(false), []);

  return (
    <View className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-75">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={handleSelect}>
              <House size={iconSize} />
              <Text>Home</Text>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Inbox size={iconSize} />
              <Text>Inbox</Text>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <FileText size={iconSize} />
              <Text>Documents</Text>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Folder size={iconSize} />
              <Text>Folders</Text>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={handleSelect}>
              <Plus size={iconSize} />
              <Text>New File</Text>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <FolderPlus size={iconSize} />
              <Text>New Folder</Text>
              <CommandShortcut>⇧⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Copy size={iconSize} />
              <Text>Copy</Text>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Scissors size={iconSize} />
              <Text>Cut</Text>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <ClipboardPaste size={iconSize} />
              <Text>Paste</Text>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Trash size={iconSize} />
              <Text>Delete</Text>
              <CommandShortcut>⌫</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="View">
            <CommandItem onSelect={handleSelect}>
              <LayoutGrid size={iconSize} />
              <Text>Grid View</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <List size={iconSize} />
              <Text>List View</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <ZoomIn size={iconSize} />
              <Text>Zoom In</Text>
              <CommandShortcut>⌘+</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <ZoomOut size={iconSize} />
              <Text>Zoom Out</Text>
              <CommandShortcut>⌘-</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem onSelect={handleSelect}>
              <User size={iconSize} />
              <Text>Profile</Text>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <CreditCard size={iconSize} />
              <Text>Billing</Text>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Settings size={iconSize} />
              <Text>Settings</Text>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Bell size={iconSize} />
              <Text>Notifications</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <CircleQuestionMark size={iconSize} />
              <Text>Help & Support</Text>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem onSelect={handleSelect}>
              <Calculator size={iconSize} />
              <Text>Calculator</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Calendar size={iconSize} />
              <Text>Calendar</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Image size={iconSize} />
              <Text>Image Editor</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Code size={iconSize} />
              <Text>Code Editor</Text>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </View>
  );
}

export default function CommandPage() {
  const iconSize = 16;

  return (
    <PageLayout title="Command">
      <View className="flex flex-col gap-8">
        <View className="space-y-2">
          <View className="text-sm font-medium text-muted-foreground">Basic</View>
          <Command className="max-w-sm rounded-lg border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar size={iconSize} />
                  <Text>Calendar</Text>
                </CommandItem>
                <CommandItem>
                  <Smile size={iconSize} />
                  <Text>Search Emoji</Text>
                </CommandItem>
                <CommandItem disabled>
                  <Calculator size={iconSize} />
                  <Text>Calculator</Text>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User size={iconSize} />
                  <Text>Profile</Text>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard size={iconSize} />
                  <Text>Billing</Text>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings size={iconSize} />
                  <Text>Settings</Text>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </View>

        <View className="space-y-2">
          <View className="text-sm font-medium text-muted-foreground">
            Many Items (Dialog)
          </View>
          <CommandManyItems />
        </View>
      </View>
    </PageLayout>
  );
}

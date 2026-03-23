
"use client";

import * as React from "react";
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
              <House size={iconSize} color="inherit" />
              <Text>Home</Text>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Inbox size={iconSize} color="inherit" />
              <Text>Inbox</Text>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <FileText size={iconSize} color="inherit" />
              <Text>Documents</Text>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Folder size={iconSize} color="inherit" />
              <Text>Folders</Text>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={handleSelect}>
              <Plus size={iconSize} color="inherit" />
              <Text>New File</Text>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <FolderPlus size={iconSize} color="inherit" />
              <Text>New Folder</Text>
              <CommandShortcut>⇧⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Copy size={iconSize} color="inherit" />
              <Text>Copy</Text>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Scissors size={iconSize} color="inherit" />
              <Text>Cut</Text>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <ClipboardPaste size={iconSize} color="inherit" />
              <Text>Paste</Text>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Trash size={iconSize} color="inherit" />
              <Text>Delete</Text>
              <CommandShortcut>⌫</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="View">
            <CommandItem onSelect={handleSelect}>
              <LayoutGrid size={iconSize} color="inherit" />
              <Text>Grid View</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <List size={iconSize} color="inherit" />
              <Text>List View</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <ZoomIn size={iconSize} color="inherit" />
              <Text>Zoom In</Text>
              <CommandShortcut>⌘+</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <ZoomOut size={iconSize} color="inherit" />
              <Text>Zoom Out</Text>
              <CommandShortcut>⌘-</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem onSelect={handleSelect}>
              <User size={iconSize} color="inherit" />
              <Text>Profile</Text>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <CreditCard size={iconSize} color="inherit" />
              <Text>Billing</Text>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Settings size={iconSize} color="inherit" />
              <Text>Settings</Text>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Bell size={iconSize} color="inherit" />
              <Text>Notifications</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <CircleQuestionMark size={iconSize} color="inherit" />
              <Text>Help & Support</Text>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem onSelect={handleSelect}>
              <Calculator size={iconSize} color="inherit" />
              <Text>Calculator</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Calendar size={iconSize} color="inherit" />
              <Text>Calendar</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Image size={iconSize} color="inherit" />
              <Text>Image Editor</Text>
            </CommandItem>
            <CommandItem onSelect={handleSelect}>
              <Code size={iconSize} color="inherit" />
              <Text>Code Editor</Text>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </View>
  );
}

export function CommandDemo() {
  const iconSize = 16;

  return (
    <View className="flex flex-col gap-8">
        <View className="space-y-2">
          <View className="text-sm font-medium text-muted-foreground">Basic</View>
          <Command className="max-w-sm rounded-lg border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar size={iconSize} color="inherit" />
                  <Text>Calendar</Text>
                </CommandItem>
                <CommandItem>
                  <Smile size={iconSize} color="inherit" />
                  <Text>Search Emoji</Text>
                </CommandItem>
                <CommandItem disabled>
                  <Calculator size={iconSize} color="inherit" />
                  <Text>Calculator</Text>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User size={iconSize} color="inherit" />
                  <Text>Profile</Text>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard size={iconSize} color="inherit" />
                  <Text>Billing</Text>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings size={iconSize} color="inherit" />
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
  );
}

export default CommandDemo;

import * as React from "react"
import { View, Text } from "@tarojs/components"
import { PageLayout } from "@/components/page-layout"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuPage() {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")

  return (
    <PageLayout title="ContextMenu">
      <View className="space-y-8 p-4">
        <View className="space-y-2">
          <Text className="text-sm font-medium">Basic Context Menu</Text>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm">
              Long press here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-50">
              <ContextMenuItem>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>
                    Save Page As...
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem 
                checked={bookmarksChecked}
                onClick={() => setBookmarksChecked(!bookmarksChecked)}
              >
                Show Bookmarks Bar
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem 
                checked={urlsChecked}
                onClick={() => setUrlsChecked(!urlsChecked)}
              >
                Show Full URLs
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value={person}>
                <ContextMenuLabel>People</ContextMenuLabel>
                <ContextMenuRadioItem 
                  value="pedro" 
                  checked={person === "pedro"}
                  onClick={() => setPerson("pedro")}
                >
                  Pedro Duarte
                </ContextMenuRadioItem>
                <ContextMenuRadioItem 
                  value="colm"
                  checked={person === "colm"}
                  onClick={() => setPerson("colm")}
                >
                  Colm Tuite
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium">Simple Context Menu</Text>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm">
              Another area
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuItem>Paste</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </View>
      </View>
    </PageLayout>
  )
}

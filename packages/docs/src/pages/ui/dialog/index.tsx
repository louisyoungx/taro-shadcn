import * as React from "react"
import { View, Text, ScrollView } from "@tarojs/components"
import { PageLayout } from "@/biz/page-layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react-taro"

export default function DialogPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <PageLayout title="Dialog">
      <View className="space-y-4">
        {/* Example 1: Basic (Edit Profile) */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Basic</View>
          <Dialog>
            <DialogTrigger >
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <View className="grid gap-4 py-4">
                <View className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    autoFocus
                  />
                </View>
                <View className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </View>
              </View>
              <DialogFooter>
                <Button className="w-full">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>

        {/* Example 2: Controlled Dialog */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Controlled Dialog</View>
          <Button variant="outline" onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button className="w-full" onClick={() => setOpen(false)}>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>

        {/* Example 3: Share Link (with DialogClose) */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Share Link</View>
          <Dialog>
            <DialogTrigger >
              <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <View className="flex flex-row items-center gap-2">
                <View className="flex-1">
                  <Label className="sr-only">Link</Label>
                  <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" />
                </View>
                <Button size="sm" className="px-3">
                  <View className="sr-only">Copy</View>
                  <Copy color="#fff" size={16} />
                </Button>
              </View>
              <DialogFooter className="sm:justify-start">
                <DialogClose>
                    <Button className="w-full" variant="secondary">
                    Close
                    </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>

        {/* Example 4: Long Content (Scrollable) */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Long Content</View>
          <Dialog>
            <DialogTrigger >
              <Button variant="outline">Scrollable</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Terms of Service</DialogTitle>
                <DialogDescription>
                  Read our terms and conditions.
                </DialogDescription>
              </DialogHeader>
              <View className="h-[300px] w-full border rounded-md overflow-hidden">
                <ScrollView scrollY className="h-full w-full">
                  <View className="p-4">
                    <Text className="leading-7">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      {'\n\n'}
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                      {'\n\n'}
                      Est in quis eu dolore irure excepteur. Fugiat elit consequat elit ullamco voluptate irure occaecat. Veniam tempor qui do elit magna fugiat.
                      {'\n\n'}
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                      {'\n\n'}
                      Est in quis eu dolore irure excepteur. Fugiat elit consequat elit ullamco voluptate irure occaecat. Veniam tempor qui do elit magna fugiat.
                    </Text>
                  </View>
                </ScrollView>
              </View>
              <DialogFooter>
                <Button className="w-full">I Agree</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    </PageLayout>
  )
}

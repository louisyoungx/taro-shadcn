
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationPage() {
  return (
    <PageLayout title="Pagination">
      <View className="grid gap-10">
        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">Default</View>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </View>

        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">Simple</View>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </View>

        <View className="grid gap-2">
          <View className="text-sm font-medium leading-none">Numbers Only</View>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>4</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </View>
      </View>
    </PageLayout>
  );
}

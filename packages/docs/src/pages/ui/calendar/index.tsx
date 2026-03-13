
import { View } from "@tarojs/components";
import { PageLayout } from "@/biz/page-layout";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

type DateRange = {
  from?: Date;
  to?: Date;
};

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <PageLayout title="Calendar">
      <View className="space-y-6">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Single</View>
          <View className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg"
              captionLayout="dropdown"
            />
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Range</View>
          <View className="flex justify-center">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              className="rounded-lg"
              captionLayout="dropdown"
            />
          </View>
        </View>
      </View>
    </PageLayout>
  );
}

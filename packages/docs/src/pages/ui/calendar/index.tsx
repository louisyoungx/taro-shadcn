
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <PageLayout title="Calendar">
      <View className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
          captionLayout="dropdown"
        />
      </View>
    </PageLayout>
  );
}

import * as React from "react"
import { Picker, Text, View } from "@tarojs/components"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react-taro"
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type DateRange = { from?: Date; to?: Date }

type CommonProps = {
  className?: string
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  showOutsideDays?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  disabled?: ((date: Date) => boolean) | Date[]
  captionLayout?: "dropdown" | "buttons" | "dropdown-buttons"
  fromYear?: number
  toYear?: number
}

type SingleProps = CommonProps & {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

type RangeProps = CommonProps & {
  mode: "range"
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

type CalendarProps = SingleProps | RangeProps

function isDateDisabled(date: Date, disabled?: CalendarProps["disabled"]) {
  if (!disabled) return false
  if (Array.isArray(disabled)) return disabled.some((d) => isSameDay(d, date))
  return disabled(date)
}

function isInRange(date: Date, range?: DateRange) {
  if (!range?.from || !range?.to) return false
  return (
    (isAfter(date, range.from) || isSameDay(date, range.from)) &&
    (isBefore(date, range.to) || isSameDay(date, range.to))
  )
}

function getSingleSelected(props: CalendarProps) {
  return props.mode === "range" ? undefined : props.selected
}

function getRangeSelected(props: CalendarProps) {
  return props.mode === "range" ? props.selected : undefined
}

function Calendar({
  className,
  month,
  defaultMonth,
  onMonthChange,
  showOutsideDays = true,
  weekStartsOn = 0,
  disabled,
  captionLayout = "buttons",
  fromYear,
  toYear,
  ...props
}: CalendarProps) {
  const singleSelected = getSingleSelected({ month, defaultMonth, onMonthChange, showOutsideDays, weekStartsOn, disabled, className, ...props } as CalendarProps)
  const rangeSelected = getRangeSelected({ month, defaultMonth, onMonthChange, showOutsideDays, weekStartsOn, disabled, className, ...props } as CalendarProps)

  const initialMonth = React.useMemo(() => {
    if (month) return month
    if (defaultMonth) return defaultMonth
    if (singleSelected) return singleSelected
    if (rangeSelected?.from) return rangeSelected.from
    return new Date()
  }, [defaultMonth, month, rangeSelected?.from, singleSelected])

  const [uncontrolledMonth, setUncontrolledMonth] = React.useState<Date>(
    initialMonth
  )
  const visibleMonth = month ?? uncontrolledMonth

  const setMonth = React.useCallback(
    (next: Date) => {
      if (!month) setUncontrolledMonth(next)
      onMonthChange?.(next)
    },
    [month, onMonthChange]
  )

  const captionHasDropdown =
    captionLayout === "dropdown" || captionLayout === "dropdown-buttons"
  const captionHasButtons =
    captionLayout === "buttons" ||
    captionLayout === "dropdown" ||
    captionLayout === "dropdown-buttons"

  const yearOptions = React.useMemo(() => {
    const baseYear = new Date().getFullYear()
    const visibleYear = visibleMonth.getFullYear()
    const min = fromYear ?? baseYear - 100
    const max = toYear ?? baseYear + 20
    const start = Math.min(min, visibleYear)
    const end = Math.max(max, visibleYear)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [fromYear, toYear, visibleMonth])

  const monthOptions = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
  }, [])

  const yearIndex = React.useMemo(() => {
    const y = visibleMonth.getFullYear()
    const idx = yearOptions.indexOf(y)
    return idx >= 0 ? idx : 0
  }, [visibleMonth, yearOptions])

  const monthIndex = React.useMemo(() => {
    return visibleMonth.getMonth()
  }, [visibleMonth])

  const setYear = React.useCallback(
    (year: number) => {
      setMonth(new Date(year, visibleMonth.getMonth(), 1))
    },
    [setMonth, visibleMonth]
  )

  const setMonthOfYear = React.useCallback(
    (monthOfYear: number) => {
      setMonth(new Date(visibleMonth.getFullYear(), monthOfYear - 1, 1))
    },
    [setMonth, visibleMonth]
  )

  const gridStart = React.useMemo(() => {
    return startOfWeek(startOfMonth(visibleMonth), { weekStartsOn })
  }, [visibleMonth, weekStartsOn])

  const gridEnd = React.useMemo(() => {
    return endOfWeek(endOfMonth(visibleMonth), { weekStartsOn })
  }, [visibleMonth, weekStartsOn])

  const weeks = React.useMemo(() => {
    const days: Date[] = []
    for (
      let d = gridStart;
      !isAfter(d, gridEnd);
      d = addDays(d, 1)
    ) {
      days.push(d)
    }
    const rows: Date[][] = []
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7))
    return rows
  }, [gridEnd, gridStart])

  const weekdays = React.useMemo(() => {
    const labels = ["日", "一", "二", "三", "四", "五", "六"]
    return Array.from({ length: 7 }).map((_, i) => labels[(i + weekStartsOn) % 7])
  }, [weekStartsOn])

  const handleSelect = React.useCallback(
    (date: Date) => {
      if (isDateDisabled(date, disabled)) return
      if (props.mode === "range") {
        const current = props.selected
        let next: DateRange
        if (!current?.from || (current.from && current.to)) {
          next = { from: date, to: undefined }
        } else if (current.from && !current.to) {
          if (isBefore(date, current.from)) {
            next = { from: date, to: current.from }
          } else {
            next = { from: current.from, to: date }
          }
        } else {
          next = { from: date, to: undefined }
        }
        props.onSelect?.(next)
        return
      }
      props.onSelect?.(date)
    },
    [disabled, props]
  )

  return (
    <View
      className={cn(
        "bg-background w-fit rounded-md p-3",
        "flex flex-col gap-3 border-2",
        className
      )}
    >
      <View className="flex items-center justify-between">
        {captionHasButtons ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMonth(subMonths(visibleMonth, 1))}
          >
            <ChevronLeft size={16} />
          </Button>
        ) : (
          <View className="h-8 w-8" />
        )}

        {captionHasDropdown ? (
          <View className="flex items-center gap-2">
            <Picker
              mode="selector"
              range={yearOptions}
              value={yearIndex}
              onChange={(e) => setYear(yearOptions[Number(e.detail.value)]!)}
            >
              <Button variant="ghost" className="h-8 px-2">
                <Text className="text-sm font-medium">
                  {visibleMonth.getFullYear()}
                </Text>
                <ChevronDown size={16} className="opacity-50" />
              </Button>
            </Picker>
            <Picker
              mode="selector"
              range={monthOptions}
              value={monthIndex}
              onChange={(e) =>
                setMonthOfYear(monthOptions[Number(e.detail.value)]!)
              }
            >
              <Button variant="ghost" className="h-8 px-2">
                <Text className="text-sm font-medium">
                  {String(visibleMonth.getMonth() + 1).padStart(2, "0")}
                  月
                </Text>
                <ChevronDown size={16} className="opacity-50" />
              </Button>
            </Picker>
          </View>
        ) : (
          <Text className="text-sm font-medium">
            {format(visibleMonth, "yyyy年MM月")}
          </Text>
        )}

        {captionHasButtons ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMonth(addMonths(visibleMonth, 1))}
          >
            <ChevronRight size={16} />
          </Button>
        ) : (
          <View className="h-8 w-8" />
        )}
      </View>

      <View className="flex">
        {weekdays.map((label) => (
          <View key={label} className="flex flex-1 items-center justify-center">
            <Text className="text-muted-foreground text-xs font-normal">
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex flex-col gap-2">
        {weeks.map((week, rowIndex) => (
          <View key={rowIndex} className="flex">
            {week.map((date) => {
              const outside = !isSameMonth(date, visibleMonth)
              const hidden = outside && !showOutsideDays
              const disabledDay = isDateDisabled(date, disabled)
              const today = isSameDay(date, new Date())

              const range = rangeSelected
              const selectedSingle = singleSelected
                ? isSameDay(date, singleSelected)
                : false

              const rangeStart = range?.from ? isSameDay(date, range.from) : false
              const rangeEnd = range?.to ? isSameDay(date, range.to) : false
              const rangeMiddle =
                !!range?.from && !!range?.to && isInRange(date, range) && !rangeStart && !rangeEnd

              return (
                <View
                  key={date.toISOString()}
                  className={cn("flex flex-1 items-center justify-center", hidden && "invisible")}
                >
                  <CalendarDayButton
                    date={date}
                    outside={outside}
                    today={today}
                    disabled={disabledDay}
                    selectedSingle={selectedSingle}
                    rangeStart={rangeStart}
                    rangeMiddle={rangeMiddle}
                    rangeEnd={rangeEnd}
                    onPress={handleSelect}
                  />
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

type CalendarDayButtonProps = {
  date: Date
  outside: boolean
  today: boolean
  disabled: boolean
  selectedSingle: boolean
  rangeStart: boolean
  rangeMiddle: boolean
  rangeEnd: boolean
  onPress: (date: Date) => void
}

function CalendarDayButton({
  date,
  outside,
  today,
  disabled,
  selectedSingle,
  rangeStart,
  rangeMiddle,
  rangeEnd,
  onPress,
}: CalendarDayButtonProps) {
  const base = "h-8 w-8 p-0 flex items-center justify-center rounded-md"
  const outsideClass = outside ? "text-muted-foreground" : ""
  const todayClass = today ? "bg-accent text-accent-foreground" : ""
  const selectedSingleClass = selectedSingle
    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
    : ""
  const rangeStartClass = rangeStart
    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
    : ""
  const rangeEndClass = rangeEnd
    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
    : ""
  const rangeMiddleClass = rangeMiddle
    ? "bg-accent text-accent-foreground rounded-none"
    : ""
  const rangeCapClass = rangeStart || rangeEnd ? "rounded-md" : ""

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        base,
        outsideClass,
        todayClass,
        selectedSingleClass,
        rangeMiddleClass,
        rangeStartClass,
        rangeEndClass,
        rangeCapClass,
        disabled && "opacity-50 pointer-events-none"
      )}
      onClick={disabled ? undefined : () => onPress(date)}
    >
      <Text className="text-sm">{format(date, "d")}</Text>
    </Button>
  )
}

export { Calendar, CalendarDayButton }

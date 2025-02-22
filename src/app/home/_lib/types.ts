import { OptionalTimeRangeType, RequiredTimeRangeType } from "./time"
import { Statistic } from "@nutrigym/lib/client/graphql"
import { LineStyle } from "./enums"

export type DateDataPoint = {
  date: Date
  value: string
}

export type Dataset<T extends string> = {
  window: OptionalTimeRangeType
  range: RequiredTimeRangeType
  points: DateDataPoint[]
  stats: Statistic
  label: string
  color: string
  units: string
  title: T
  style: {
    legend: boolean
    line: LineStyle
    dots: boolean
  }
}

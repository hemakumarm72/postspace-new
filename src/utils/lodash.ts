import dayjs from 'dayjs'
import _ from 'lodash'

export type SplitOutput = {
  value: number
  unit: dayjs.ManipulateType
}

export const splitString = (input: string) => {
  if (input === 'auto' || input === '0')
    return { value: 3, unit: 'm' as dayjs.ManipulateType }

  const regex = /^(\d+)([a-zA-Z]+)$/
  const match = input.match(regex)

  const value = match ? match[1] : '3'
  const unit = match ? match[2] : 'm'
  const output: SplitOutput = {
    value: Number(value),
    unit: unit as dayjs.ManipulateType,
  }
  return output
}

export const getLatestAt = (a: Date | null, b: Date | null): Date | null => {
  if (!a && !b) return null // Example 2: both are null
  if (!a) return b // Example 3: a is null, return b
  if (!b) return a // Example 1: b is null, return a
  return new Date(Math.max(a.getTime(), b.getTime())) // Both are dates, return the later one
}

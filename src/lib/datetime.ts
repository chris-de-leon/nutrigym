export const MAX_MONTHS_IN_A_YEAR = 12
export const MAX_LOOKBACK_YEARS = 200

export class DateTime {
  static computeAge = (birthday: Date) => {
    // Gather inputs
    const [birth, today] = [birthday, new Date()]
    const age = today.getFullYear() - birth.getFullYear()

    // The birthday month has already passed, so we can return the age as-is
    if (today.getMonth() > birth.getMonth()) {
      return age
    }

    // The birthday month has not happened yet, so we need to subtract 1 from the age
    if (today.getMonth() < birth.getMonth()) {
      return age - 1
    }

    // If it is currently the birthday month, subtract 1 if the birthday hasn't passed yet
    if (today.getDate() < birth.getDate()) {
      return age - 1
    } else {
      return age
    }
  }

  static stringToDate = (date: Date | string) => {
    return typeof date === "string" ? new Date(date) : date
  }

  static getMonthName = (date: Date) => {
    return date.toLocaleString("default", {
      month: "long",
    })
  }

  static daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  }

  static formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  }

  static setMonth = (date: Date, month: number) => {
    const d = new Date(date)
    d.setMonth(month)
    return d
  }

  static setYear = (date: Date, year: number) => {
    const d = new Date(date)
    d.setFullYear(year)
    return d
  }

  static setDate = (date: Date, day: number) => {
    const d = new Date(date)
    d.setDate(day)
    return d
  }
}

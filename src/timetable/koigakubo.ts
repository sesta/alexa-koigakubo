interface Timetable {
  getTimetable: number[][]
  getRecentTiems (): Array<{
    hour: number,
    minute: number
  }>
}

export default class KoigakuboTimetable implements Timetable {
  constructor(private timetable?: number[][], private nowDate?: Date) {
    if (typeof nowDate === 'undefined') {
      this.nowDate = new Date(Date.now() - (-9 * 60 - new Date().getTimezoneOffset()) * 60000)
    }

    if (typeof timetable === 'undefined') {
      if (this.isWeekend) {
        this.timetable = weekend
      } else {
        this.timetable = weekday
      }
    }
  }

  private get isWeekend (): boolean {
    const day = this.nowDate.getDay()
    return [0, 6].indexOf(day) !== -1
  }

  get getTimetable () {
    return this.timetable
  }

  getRecentTiems () {
    const nowHour = this.nowDate.getHours()
    const nowMinute = this.nowDate.getMinutes()
    const recentTiems: Array<{ hour: number, minute: number }> = []

    for (let hour = nowHour ; hour < 24 ; hour++) {
      const minutes = this.timetable[hour]
      for (let minuteIndex = 0 ; minuteIndex < minutes.length ; minuteIndex++) {
        const diffMinute = (hour - nowHour) * 60 + (minutes[minuteIndex] - nowMinute)

        if (diffMinute > 5) {
          recentTiems.push({
            hour,
            minute: minutes[minuteIndex]
          })
        }

        if (recentTiems.length >= 3) {
          return recentTiems
        }
      }
    }

    return recentTiems
  }
}

export const weekday = [
  /*  0時 */ [12],
  /*  1時 */ [],
  /*  2時 */ [],
  /*  3時 */ [],
  /*  4時 */ [],
  /*  5時 */ [13, 33, 49],
  /*  6時 */ [4, 20, 31, 42, 53],
  /*  7時 */ [1, 9, 16, 24, 32, 40, 46, 54],
  /*  8時 */ [2, 9, 16, 24, 31, 39, 47, 56],
  /*  9時 */ [4, 16, 26, 36, 46, 56],
  /* 10時 */ [5, 15, 25, 35, 46, 55],
  /* 11時 */ [5, 15, 25, 35, 46, 55],
  /* 12時 */ [5, 15, 25, 35, 46, 55],
  /* 13時 */ [5, 15, 25, 35, 46, 55],
  /* 14時 */ [5, 15, 25, 35, 46, 55],
  /* 15時 */ [5, 15, 25, 35, 46, 55],
  /* 16時 */ [5, 16, 26, 36, 46, 56],
  /* 17時 */ [6, 17, 27, 39, 49],
  /* 18時 */ [0, 10, 20, 30, 40, 50],
  /* 19時 */ [0, 10, 20, 30, 40, 50],
  /* 20時 */ [0, 10, 20, 30, 40, 50],
  /* 21時 */ [0, 12, 22, 33, 45, 54],
  /* 22時 */ [8, 22, 37, 52],
  /* 23時 */ [9, 23, 37, 57]
]

export const weekend = [
  /*  0時 */ [],
  /*  1時 */ [],
  /*  2時 */ [],
  /*  3時 */ [],
  /*  4時 */ [],
  /*  5時 */ [13, 33, 49],
  /*  6時 */ [4, 20, 31, 42, 53],
  /*  7時 */ [1, 9, 16, 24, 32, 40, 46, 54],
  /*  8時 */ [2, 9, 16, 24, 31, 39, 47, 56],
  /*  9時 */ [4, 16, 26, 36, 46, 56],
  /* 10時 */ [5, 15, 25, 35, 46, 55],
  /* 11時 */ [5, 15, 25, 35, 46, 55],
  /* 12時 */ [5, 15, 25, 35, 46, 55],
  /* 13時 */ [5, 15, 25, 35, 46, 55],
  /* 14時 */ [5, 15, 25, 35, 46, 55],
  /* 15時 */ [5, 15, 25, 35, 46, 55],
  /* 16時 */ [5, 16, 26, 36, 46, 56],
  /* 17時 */ [6, 17, 27, 39, 49],
  /* 18時 */ [0, 10, 20, 30, 40, 50],
  /* 19時 */ [0, 10, 20, 30, 40, 50],
  /* 20時 */ [0, 10, 20, 30, 40, 50],
  /* 21時 */ [0, 12, 22, 33, 45, 54],
  /* 22時 */ [8, 22, 37, 52],
  /* 23時 */ [9, 23, 37, 57]
]
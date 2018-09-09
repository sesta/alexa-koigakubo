interface Timetable {
  getTimetable: number[][]
  getRecentTiems(): {
    hour: number;
    minute: number;
  }[]
}

export class KoigakuboTimetable implements Timetable {
  private timetable: number[][]
  private nowDate: Date

  constructor(timetable?: number[][], nowDate?: Date) {
    if (typeof nowDate === 'undefined') {
      this.nowDate = new Date(Date.now() - (-9 * 60 - new Date().getTimezoneOffset()) * 60000)
    }

    if (typeof timetable === 'undefined') {
      this.timetable = this.isWeekend ? weekend : weekday
    }
  }

  private get isWeekend(): boolean {
    const day = this.nowDate.getDay()

    return [0, 6].indexOf(day) !== -1
  }

  get getTimetable(): number[][] {
    return this.timetable
  }

  public getRecentTiems(): { hour: number; minute: number }[] {
    const nowHour = this.nowDate.getHours()
    const nowMinute = this.nowDate.getMinutes()
    const recentTiems: { hour: number; minute: number }[] = []

    for (let hour = nowHour ; hour < this.timetable.length ; hour++) {
      const minutes = this.timetable[hour]

      for (const minute of minutes) {
        const diffMinute = (hour - nowHour) * 60 + (minute - nowMinute)

        if (diffMinute > 5) {
          recentTiems.push({ hour, minute })
        }

        if (recentTiems.length >= 3) {
          return recentTiems
        }
      }
    }

    return recentTiems
  }
}

export const weekday: number[][] = [
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
  /* 23時 */ [9, 23, 37, 57],
]

export const weekend: number[][] = [
  /*  0時 */ [],
  /*  1時 */ [],
  /*  2時 */ [],
  /*  3時 */ [],
  /*  4時 */ [],
  /*  5時 */ [13, 33, 49],
  /*  6時 */ [3, 17, 34, 50],
  /*  7時 */ [2, 12, 22, 32, 42, 52],
  /*  8時 */ [2, 12, 22, 32, 42, 52],
  /*  9時 */ [2, 12, 22, 32, 43, 54],
  /* 10時 */ [4, 15, 25, 35, 46, 55],
  /* 11時 */ [5, 15, 25, 35, 46, 55],
  /* 12時 */ [5, 15, 25, 35, 46, 55],
  /* 13時 */ [5, 15, 25, 35, 46, 55],
  /* 14時 */ [5, 15, 25, 35, 46, 55],
  /* 15時 */ [5, 15, 25, 35, 46, 55],
  /* 16時 */ [6, 16, 26, 36, 46, 55],
  /* 17時 */ [5, 15, 25, 35, 44, 55],
  /* 18時 */ [5, 15, 25, 35, 45, 55],
  /* 19時 */ [5, 15, 25, 35, 45, 55],
  /* 20時 */ [5, 15, 25, 35, 45, 55],
  /* 21時 */ [13, 28, 43, 58],
  /* 22時 */ [13, 27, 43, 58],
  /* 23時 */ [13, 32, 54],
]

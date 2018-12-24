import moment from 'moment'
// 使っている方のmomentをモックする
import momentMock from 'moment-timezone'
import {} from 'ts-jest'

import { getRecentTimes, weekdayTimetable, weekendTimetable } from '../src/koigakubo'

jest.mock('moment-timezone')

describe('gerRecentTimes', () => {
  it('月曜の16時', () => {
    // @ts-ignore
    momentMock.mockReturnValue(
      // 5分以上先のだけ返ってくるので
      moment('20181224 15:55:00', 'YYYYMMDD HH:mm:ss')
    )

    const times = getRecentTimes()

    expect(times).toEqual([
      {
        hour: 16,
        minute: weekdayTimetable[16][0],
      },
      {
        hour: 16,
        minute: weekdayTimetable[16][1],
      },
      {
        hour: 16,
        minute: weekdayTimetable[16][2],
      },
    ])
  })

  it('日曜の16時', () => {
    // @ts-ignore
    momentMock.mockReturnValue(
      // 5分以上先のだけ返ってくるので
      moment('20181223 15:55:00', 'YYYYMMDD HH:mm:ss')
    )

    const times = getRecentTimes()

    expect(times).toEqual([
      {
        hour: 16,
        minute: weekendTimetable[16][0],
      },
      {
        hour: 16,
        minute: weekendTimetable[16][1],
      },
      {
        hour: 16,
        minute: weekendTimetable[16][2],
      },
    ])
  })

  it('日曜の16時', () => {
    // @ts-ignore
    momentMock.mockReturnValue(
      // 5分以上先のだけ返ってくるので
      moment('20181223 15:55:00', 'YYYYMMDD HH:mm:ss')
    )

    const times = getRecentTimes()

    expect(times).toEqual([
      {
        hour: 16,
        minute: weekendTimetable[16][0],
      },
      {
        hour: 16,
        minute: weekendTimetable[16][1],
      },
      {
        hour: 16,
        minute: weekendTimetable[16][2],
      },
    ])
  })
})

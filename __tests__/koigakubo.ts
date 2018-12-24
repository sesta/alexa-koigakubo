import moment from 'moment'
// 使っている方のmomentをモックする
import momentMock from 'moment-timezone'
import {} from 'ts-jest'

import { getRecentTimes, weekdayTimetable, weekendTimeTable } from '../src/koigakubo'

jest.mock('moment-timezone')

describe('gerRecentTimes', () => {
  it('月曜の15時', () => {
    // @ts-ignore
    momentMock.mockReturnValue(
      // 5分以上先のだけ返ってくるので
      moment('20181224 14:55:00', 'YYYYMMDD HH:mm:ss')
    )

    const times = getRecentTimes()

    expect(times).toEqual([
      {
        hour: 15,
        minute: weekdayTimetable[15][0],
      },
      {
        hour: 15,
        minute: weekdayTimetable[15][1],
      },
      {
        hour: 15,
        minute: weekdayTimetable[15][2],
      },
    ])
  })
})

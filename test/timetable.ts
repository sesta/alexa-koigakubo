import { assert } from 'chai'
import moment from 'moment'

import { KoigakuboTimetable, weekday, weekend } from '../src/timetable/koigakubo'

describe('cosntructor', () => {
  it ('月曜日の場合weekdayで初期化される', () => {
    const testTime = moment('2018-09-10')
    const koigakuboTimetable = new KoigakuboTimetable(undefined, testTime)
    assert.equal(koigakuboTimetable.getTimetable, weekday)
  })

  it ('土曜日の場合weekendで初期化される', () => {
    const testTime = moment('2018-09-08')
    const koigakuboTimetable = new KoigakuboTimetable(undefined, testTime)
    assert.equal(koigakuboTimetable.getTimetable, weekend)
  })

  it ('指定したtimetableで初期化できる', () => {
    const test = [
      [1, 2, 3],
    ]
    const koigakuboTimetable = new KoigakuboTimetable(test)
    assert.equal(koigakuboTimetable.getTimetable, test)
  })
})

describe('gerRecentTimes', () => {
  const testTimetable = [
    [0],
    [10, 20, 30],
    [ 0, 40, 50],
  ]
  const testTime = moment('2018-08-02 01:06:00')
  const koigakuboTimetable = new KoigakuboTimetable(testTimetable, testTime)

  it ('近い時刻が返ってくる', () => {
    const expectedTimes = [
      { hour: 1, minute: 20},
      { hour: 1, minute: 30},
      { hour: 2, minute: 0},
    ]
    assert.deepEqual(koigakuboTimetable.getRecentTiems(), expectedTimes)
  })
})

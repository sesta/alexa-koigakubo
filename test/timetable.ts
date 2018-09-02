import assert from 'assert'
import KoigakuboTimetable, { weekday } from '../src/timetable/koigakubo'

describe('cosntructor', () => {
  it ('指定しない場合weekdayで初期化される', () => {
    const koigakuboTimetable = new KoigakuboTimetable()
    assert.equal(koigakuboTimetable.getTimetable, weekday)
  })

  it ('指定したtimetableで初期化できる', () => {
    const test = [
      [1, 2, 3]
    ]
    const koigakuboTimetable = new KoigakuboTimetable(test)
    assert.equal(koigakuboTimetable.getTimetable, test)
  })
})

describe('gerRecentTimes', () => {
  const testTimetable = [
    [0],
    [10, 20, 30],
    [ 0, 40, 50]
  ]
  const testDate = new Date(2018, 9, 2, 1, 6)
  const koigakuboTimetable = new KoigakuboTimetable(testTimetable, testDate)

  it ('近い時刻が返ってくる', () => {
    const expectedTimes = [
      { hour: 1, minute: 20},
      { hour: 1, minute: 30},
      { hour: 2, minute: 0},
    ]
    assert.deepEqual(koigakuboTimetable.getRecentTiems(), expectedTimes)
  })
})

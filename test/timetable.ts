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
    ];
    const koigakuboTimetable = new KoigakuboTimetable(test)
    assert.equal(koigakuboTimetable.getTimetable, test)
  })
})
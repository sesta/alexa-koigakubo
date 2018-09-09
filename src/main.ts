import * as Alexa from 'alexa-sdk'
import KoigakuboTimetable from './timetable/koigakubo'

const APP_ID: string = undefined

// もっといい感じに型などを定義できるようにする
export const handler = (event: Alexa.RequestBody<Alexa.Request>, context: Alexa.Context): void => {
  const alexa = Alexa.handler(event, context)
  alexa.appId = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers: {[key: string]: () => void} = {
  'LaunchRequest'(): void {
    const koigakuboTimetable = new KoigakuboTimetable()
    const recentTimes = koigakuboTimetable.getRecentTiems()
    const timeMessage = recentTimes.map((time: {hour: number; minute: number}) =>
      `${time.hour}時${time.minute}分`
    ).join('、')

    const message = `近い順に${timeMessage}です`
    this.emit(':tellWithCard', message, '電車の時間', message)
  },
  'AMAZON.HelpIntent'(): void {
    this.emit(':ask', 'ヘルプのメッセージが入るよ', 'どうしますか？')
  },
  'AMAZON.CancelIntent'(): void {
    this.emit(':tell', 'さようなら')
  },
  'AMAZON.StopIntent'(): void {
    this.emit(':tell', 'さようなら')
  },
  'SessionEndedRequest'(): void {
    // Nothing to do
  }
}

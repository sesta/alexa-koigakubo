import { Context, handler, Request, RequestBody } from 'alexa-sdk'

import { KoigakuboTimetable } from './timetable/koigakubo'

const APP_ID: string = undefined

export const handle = (event: RequestBody<Request>, context: Context): void => {
  const alexa = handler(event, context)
  alexa.appId = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers: {[key: string]: () => void} = {
  'LaunchRequest'(): void {
    const koigakuboTimetable = new KoigakuboTimetable()
    const recentTimes = koigakuboTimetable.getRecentTiems()

    let message = '今日はもう電車がありません'
    if (recentTimes.length > 0) {
      const timeMessage = recentTimes.map((time: {hour: number; minute: number}) =>
        `${time.hour}時${time.minute}分`
      ).join('、')
      message = `近い順に${timeMessage}です`
    }

    // tslint:disable-next-line:no-invalid-this
    this.emit(':tellWithCard', message, '電車の時間', message)
  },
  'AMAZON.HelpIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':ask', 'ヘルプのメッセージが入るよ', 'どうしますか？')
  },
  'AMAZON.CancelIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':tell', 'さようなら')
  },
  'AMAZON.StopIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':tell', 'さようなら')
  },
  'SessionEndedRequest'(): void {
    // Nothing to do
  }
}

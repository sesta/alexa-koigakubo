import * as Alexa from 'alexa-sdk'
import KoigakuboTimetable from './timetable/koigakubo'

const APP_ID = undefined

const SKILL_NAME = '電車の時間'
const HELP_MESSAGE = 'ヘルプのメッセージが入るよ'
const HELP_REPROMPT = 'どうしますか？'
const STOP_MESSAGE = 'さようなら'

export function handler(event, context, callback) {
  const alexa = Alexa.handler(event, context)
  alexa.appId = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers = {
  'LaunchRequest'() {
    const koigakuboTimetable = new KoigakuboTimetable()
    const recentTimes = koigakuboTimetable.getRecentTiems()
    const timesString = recentTimes.map((time) => {
      return `${time.hour}時${time.minute}分`
    }).join('、')

    const message: string = `近い順に${timesString}です`
    this.emit(':tellWithCard', message, SKILL_NAME, message)
  },
  'AMAZON.HelpIntent'() {
    const speechOutput = HELP_MESSAGE
    const reprompt = HELP_REPROMPT
    this.emit(':ask', speechOutput, reprompt)
  },
  'AMAZON.CancelIntent'() {
    this.emit(':tell', STOP_MESSAGE)
  },
  'AMAZON.StopIntent'() {
    this.emit(':tell', STOP_MESSAGE)
  },
  'SessionEndedRequest'() {
    // Nothing to do
  },
}

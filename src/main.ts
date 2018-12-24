import { HandlerInput, Skill, SkillBuilders } from 'ask-sdk'
import { Context, RequestEnvelope, Response, ResponseEnvelope } from 'ask-sdk-model'

import { KoigakuboTimetable } from './timetable'

let skill: Skill

export const handler = async(event: RequestEnvelope, context: Context): Promise<ResponseEnvelope> => {
  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(launchRequestHandler)
      .addErrorHandlers(errorHandler)
      .create()
  }

  return skill.invoke(event, context)
}

const launchRequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput: HandlerInput): Response {
    const koigakuboTimetable = new KoigakuboTimetable()
    const recentTimes = koigakuboTimetable.getRecentTiems()

    let message = '今日はもう電車がありません'
    if (recentTimes.length > 0) {
      const timeMessage = recentTimes.map((time: {hour: number; minute: number}) =>
        `${time.hour}時${time.minute}分`
      ).join('、')
      message = `近い順に${timeMessage}です`
    }

    return handlerInput.responseBuilder
      .speak(message)
      .withSimpleCard('恋ヶ窪の電車', message)
      .getResponse()
  }
}

const errorHandler = {
  canHandle(): boolean {
    return true
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(error)

    return handlerInput.responseBuilder
      .speak('申し訳ありません、メンテナンス中ですので時間をおいてお試しください')
      .getResponse()
  }
}

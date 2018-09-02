import * as Alexa from 'alexa-sdk';
import KoigakuboTimetable from './timetable/koigakubo'

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

const SKILL_NAME = "電車の時間";
const HELP_MESSAGE = "ヘルプのメッセージが入るよ";
const HELP_REPROMPT = "どうしますか？";
const STOP_MESSAGE = "さようなら";

const koigakuboTimetable = new KoigakuboTimetable();
const koigakuboTimes = koigakuboTimetable.getTimetable;

export function handler (event, context, callback) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function () {
    const recentTimes = koigakuboTimetable.getRecentTiems();
    const timesString = recentTimes.map(time => {
      return `${time.hour}時${time.minute}分`
    }).join('、')

    let message: String = `近い順に${timesString}です`
    this.emit(':tellWithCard', message, SKILL_NAME, message)
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', STOP_MESSAGE);
  },
  'SessionEndedRequest': function () {
    // Nothing to do
  }
};


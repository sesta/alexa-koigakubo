'use strict';
const Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

const SKILL_NAME = "電車の時間";
const HELP_MESSAGE = "ヘルプのメッセージが入るよ";
const HELP_REPROMPT = "どうしますか？";
const STOP_MESSAGE = "さようなら";
const koigakuboTimes = [
  [10, 20, 30], //  0時
  [40, 45, 50], //  1時
  [40, 45, 50], //  2時
  [40, 45, 50], //  3時
  [40, 45, 50], //  4時
  [40, 45, 50], //  5時
  [40, 45, 50], //  6時
  [40, 45, 50], //  7時
  [40, 45, 50], //  8時
  [40, 45, 50], //  9時
  [10, 20, 30], // 10時
  [40, 45, 50], // 11時
  [40, 45, 50], // 12時
  [40, 45, 50], // 13時
  [40, 45, 50], // 14時
  [40, 45, 50], // 15時
  [40, 45, 50], // 16時
  [40, 45, 50], // 17時
  [40, 45, 50], // 18時
  [40, 45, 50], // 19時
  [10, 20, 30], // 20時
  [40, 45, 50], // 21時
  [40, 45, 50], // 22時
  [40, 45, 50], // 23時
];

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function () {
    const nowDate = new Date(Date.now() - (-9 * 60 - new Date().getTimezoneOffset()) * 60000);
    const nowHours = nowDate.getHours();
    const nowMinutes = nowDate.getMinutes();
    const nextTimes = [];
    koigakuboTimes[nowHours].forEach(minute => {
      if ((nowMinutes + 5) < minute) {
        nextTimes.push(`${nowHours}時${minute}分`);
      }
    });
    if (nextTimes.length < 3) {
      koigakuboTimes[nowHours + 1].forEach(minute => {
        if (nextTimes.length < 3) {
          nextTimes.push(`${nowHours + 1}時${minute}分`);
        }
      });
    }

    const message = `近い順に${nextTimes.join('、')}です`;
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


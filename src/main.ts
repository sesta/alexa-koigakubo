import * as Alexa from 'alexa-sdk';

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

const SKILL_NAME = "電車の時間";
const HELP_MESSAGE = "ヘルプのメッセージが入るよ";
const HELP_REPROMPT = "どうしますか？";
const STOP_MESSAGE = "さようなら";

const koigakuboTimes = [
  /*  0時 */ [12],
  /*  1時 */ [],
  /*  2時 */ [],
  /*  3時 */ [],
  /*  4時 */ [],
  /*  5時 */ [13, 33, 49],
  /*  6時 */ [4, 20, 31, 42, 53],
  /*  7時 */ [1, 9, 16, 24, 32, 40, 46, 54],
  /*  8時 */ [2, 9, 16, 24, 31, 39, 47, 56],
  /*  9時 */ [4, 16, 26, 36, 46, 56],
  /* 10時 */ [5, 15, 25, 35, 46, 55],
  /* 11時 */ [5, 15, 25, 35, 46, 55],
  /* 12時 */ [5, 15, 25, 35, 46, 55],
  /* 13時 */ [5, 15, 25, 35, 46, 55],
  /* 14時 */ [5, 15, 25, 35, 46, 55],
  /* 15時 */ [5, 15, 25, 35, 46, 55],
  /* 16時 */ [5, 16, 26, 36, 46, 56],
  /* 17時 */ [6, 17, 27, 39, 49],
  /* 18時 */ [0, 10, 20, 30, 40, 50],
  /* 19時 */ [0, 10, 20, 30, 40, 50],
  /* 20時 */ [0, 10, 20, 30, 40, 50],
  /* 21時 */ [0, 12, 22, 33, 45, 54],
  /* 22時 */ [8, 22, 37, 52],
  /* 23時 */ [9, 23, 37, 57]
];

export const handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': () => {
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

    const message: String = `近い順に${nextTimes.join('、')}です`;
    this.emit(':tellWithCard', message, SKILL_NAME, message)
  },
  'AMAZON.HelpIntent': () => {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': () => {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': () => {
    this.emit(':tell', STOP_MESSAGE);
  },
  'SessionEndedRequest': () => {
    // Nothing to do
  }
};


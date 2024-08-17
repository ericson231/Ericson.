const axios = require("axios");

async function getMessage(yourMessage, langCode) {
  const res = await axios.post('https://api.simsimi.vn/v1/simtalk', new URLSearchParams({
    'text': yourMessage,
    'lc': langCode || 'ph'
  }));

  if (res.status > 200) {
    throw new Error(res.data.success);
  }

  return res.data.message;
}

module.exports = {
  config: {
    name: 'talk',
    //aliases: ["simsimi", "sim"],
    version: '1.2',
    author: 'NIB/JARiF | Ace', //converted to goatbot by Ace
    countDown: 5,
    role: 0,
    description: {
      en: 'Talk with Ericson Ai '
    },
    category: 'fun',
    guide: {
      en: ' {pn} [on | off]: on/off Ericson Ai ' 
        + '\n{pn} <word>: chat with Ericson Ai ' 
        + '\nExample:\n{pn} hi'
    }
  },
  langs: {
    en: {
      turnedOn: 'Turned on Ericson-AI  successfully!',
      turnedOff: 'Turned off Ericson-AI  successfully!',
      chatting: 'Already Chatting with Ericson-AI ...',
      error: 'Huh?🙂'
    }
  },
  onStart: async function ({ args, threadsData, message, event, getLang }) {
    if (args[0] == 'on' || args[0] == 'off') {
      await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
      return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getMessage(yourMessage);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        console.log(err);
        return message.reply(getLang("error"));
      }
    }
  },
  onChat: async function ({ args, message, threadsData, event, isUserCallCommand, getLang }) {
    if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.simsimi"))) {
      try {
        const langCode = (await threadsData.get(event.threadID, "settings.lang")) || global.GoatBot.config.language;
        const responseMessage = await getMessage(args.join(" "), langCode);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        return message.reply(getLang("error"));
      }
    }
  }
};

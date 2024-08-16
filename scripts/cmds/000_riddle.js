const axios = require('axios');

module.exports = {
  config: {
    name: "riddle",
    version: "1.1",
    author: "undefined | AceGerome",
    countDown: 15,
    role: 0,
    description: {
      en: "Get a random riddle and try to solve it!"
    },
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡",
    guide: {
      en: "{pn}"
    }
  },
  
  langs: {
      en: {
          showAnswer: "Answer: %1", 
          riddle: "Here's a riddle for you:\n━━━━━━━━━━━━━━━\n%1\n━━━━━━━━━━━━━━━\nReply this message to answer!"
      }
  }, 

  onReply: async function({ event, message, Reply, getLang }) {
    const { author, messageID, answer } = Reply;

    if (event.senderID !== author || Reply.type !== "reply") return;

    if (formatText(event.body)) {
    global.GoatBot.onReply.delete(Reply.messageID);
    message.unsend(event.messageReply.messageID);
    message.reply(getLang("showAnswer", answer));
    }
  },
  
  onStart: async function({ message, event, getLang }) {
    const { threadID, messageID } = event;
    const timeout = 60;

    try {
      const response = await axios.get('https://riddles-api.vercel.app/random');
      const riddleData = response.data;
      const { riddle, answer } = riddleData;
      
      message.reply(getLang("riddle", riddle), async (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName: this.config.name,
          author: event.senderID,
          messageID: info.messageID,
          answer,
        });
        
        setTimeout(() => {
            const replyData = global.GoatBot.onReply.get(info.messageID);
            if (replyData) {
              const { messageID } = replyData;
              global.GoatBot.onReply.delete(messageID);
              message.unsend(messageID);
            }
          }, 60000); //60 sec deleteee
      });
    } catch (error) {
      console.error("Error Occurred:", error);
    }
  }
};
 

function formatText(text) {
  return text.normalize("NFD").toLowerCase();
    }


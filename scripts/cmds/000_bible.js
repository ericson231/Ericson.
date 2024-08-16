const axios = require("axios");

module.exports = {
  config: {
    name: "bible",
    version: "1.0",
    author: "Ace",
    countDown: 10,
    role: 0,
    description: "Random Bible Verse",
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡"
  },
  onStart: async function({ api, event, args }) {
    const sentMessage = await message.reply(`📖 Retrieving a random Bible verse...`/*, event.threadID, (err, info) => {
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, 300);
        }, event.messageID*/);
    try {
      const res = await axios.get(`https://ace-bible-2dj0.onrender.com/random-verse`);
      const verse = res.data;
      return api.editMessage(`📜 ${verse.book_name} ${verse.chapter}:${verse.verse}\n\n${verse.text}`, sentMessage.messageID);
    } catch (error) {
      api.sendMessage("An error occurred while making the API request: " + error, event.threadID, event.messageID);
    }
  }
};

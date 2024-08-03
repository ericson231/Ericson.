const axios = require('axios');

module.exports = {
  config: {
    name: 'manipulateai',
    aliases: ["ma"], 
    version: '1.0',
    author: 'AceGerome',
    role: 0,
    category: 'Ai-Chat',
    description: {
      en: `Interact with Manipulation AI`
    },
    guide: {
      en: '{pn} [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const boxID = "61552488179337";
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(`Asking ManipulateAI. Please wait a moment...`, boxID);

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/manipulateai?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);
        const message = response.data.message;
        const text = message.replace("🧸 ManipulationAI : ", "");

        if (response.data && text) {
          const trimmedMessage = text.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: "🧸 ManipulationAI : \n━━━━━━━━━━━━━━━\n" + trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent ManipulateAI's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from ManipulateAI API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get ManipulateAI's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};

const axios = require("axios");

module.exports = {
  config: {
    name: "lyrics",
    aliases: ['ly'], 
    version: "1.0",
    author: "Rishad | Ace",
    countDown: 15,
    role: 0,
    description: {
      en: "Get song lyrics with their Images"
    },
    category: "music",
    guide: {
      en: "{pn} <song name>"
    }
  },
  
  onStart: async function ({ event, args, message }) {
    try {
      const prompt = args.join(' ');
      if (!prompt) {
        return message.reply("Please provide a song name!");
      }
      const response = await axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(prompt)}`);
      
      const { title, artist, lyrics, image } = response.data;
      const messageData = {
        body: `❏Title: ${title || ''}\n\n❏Artist: ${artist || ''}\n\n❏Lyrics:\n\n ${lyrics || ''}`,
        attachment: await global.utils.getStreamFromURL(image)
      };
      return message.reply(messageData);
    } catch (error) {
      console.error(error);
      return message.reply("An error occurred while fetching lyrics!");
    }
  }
};

module.exports = {
  config: {
    name: "bio",
    version: "NaN",
    author: "NaN",
    countDown: 5,
    role: 2,
    description: {
      en: "Change the bot bio",
    },
    category: "Owner",
    guide: {
       en: "{pn} <text>",
    },
  },
  
  onStart: async function({ args, message }) {
      const text = args.join(" ");
      const count = text.length;
      
      if (!text) return message.reply("Put text to set biography.");
      if (text.length > 101) {
        
        message.reply(`The text must be 101 characters or less.\nCounted text characters: ${count}`);
        return;
      }
      
      await api.changeBio(text);
      
      message.reply(`Change the Bot biography into:\n ${text}`);
  },
};

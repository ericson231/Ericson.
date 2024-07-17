module.exports = {
  config: {
    name: "bio",
    version: "NaN",
    author: "Edited By AceGerome",
    countDown: 5,
    role: 2,
    shortDescription: "Change the Bot Bio", 
    longDescription: {
      en: "Change the bot bio",
    },
    category: "System",
    guide: {
       en: "{pn} <text>",
    },
  },
  
  onStart: async function({ args, message, api }) {
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

const axios = require('axios');

module.exports = {
  config: {
    name: "duckgo",
    //aliases: [""], 
    version: "1.0.0",
    author: "Yan Maglinte",
    countDown: 10,
    role: 0,
    description: {
        en: "Searches the DuckDuckGo API for information."
    }, 
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡", 
    guide: {
      en: "To use this command, type {pn} <query> - To Search Info."
    } 
  },
  
  onStart: async function({ message, event, args }) {
  let query = args.join(' ');
  if (!query) {
    return message.reply('⚠️ Missing Input');
  }
  try {
    const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`);
    let heading = response.data.Heading;
    let abstract = response.data.Abstract;
    if (!heading) {
      heading = 'Not Found';
    }
    if (!abstract) {
      abstract = 'Not Found';
    }
    const msg = `🔎 You searched for: ${query}\n━━━━━━━━━━━━━━━\nTopic: ${heading}\n\n${abstract}`;

    message.reply(msg);
  } catch (error) {
    message.reply(`❌ ${error.message}`);
  }
 }
};
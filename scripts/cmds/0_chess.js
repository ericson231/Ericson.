const axios = require('axios');

module.exports = {
  config: {
    name: 'chess',
    //aliases: ['chess'],
    version: '1.0',
    author: 'AceGerome',
    countDown: 15,
    role: 0,
    description: {
      en: 'Generate random Chess quotes and tips.'
    },
    category: 'fun',
    guide: {
      en: '⠀⠀⠀{pn} quotes'
        + '\n⠀⠀⠀{pn} tips'
    }
  },
  onStart: async function({ args, event, message }) {
    const action = args[0];
    try {
      if (action === 'quotes') {
        const Url = 'https://raw.githubusercontent.com/AceAkira1017/JSON/main/quotes.json';
        const response = await axios.get(Url);
        const quotes = response.data.quotes;

        if (!quotes || quotes.length === 0) {
          return message.reply('No Chess Quotes Available now, please try again later.');
        }

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];

        const message = ` 𝗖𝗵𝗲𝘀𝘀 𝗤𝘂𝗼𝘁𝗲:  ${quote.quote} \n\n — ${quote.author}`;
        message.reply(message);
      } 
      else if (action === 'tips') {
        const Url = 'https://raw.githubusercontent.com/AceAkira1017/JSON/main/tips.json';
        const response = await axios.get(Url);
        const tips = response.data.tips;

        if (!tips || tips.length === 0) {
          return message.reply('No Chess Tips Available now, please try again later.');
        }

        const randomIndex = Math.floor(Math.random() * tips.length);
        const tip = tips[randomIndex];

        const message = `𝗖𝗵𝗲𝘀𝘀 𝗧𝗶𝗽𝘀: ${tip.tip}\n\n — ${tip.category}`;
        message.reply(message);
      } else {
        return message.SyntaxError();
      }
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching chess content. Please try again later.');
    }
  },
};

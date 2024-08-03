const axios = require('axios');

module.exports = {
  config: {
    name: "programmingJoke",
    aliases: ['programjoke'],
    version: "1.0.0",
    author: "August quinn | Ace",
    countDown: 10,
    role: 0,
    description: {
      en: "Get a random programming joke from API."
    },
    category: "fun",
    guide: {
      en: "   {pn}"
    } 
  },
  
  onStart: async function({ api, event }) {
  try {
    const response = await axios.get(`https://official-joke-api` + `.appspot.com/jokes/programming/random`);
    const joke = response.data[0];

    message.reply(`💻 𝗣𝗥𝗢𝗚𝗥𝗔𝗠𝗠𝗜𝗡𝗚 𝗝𝗢𝗞𝗘:\n\n${joke.setup}\n${joke.punchline}`);
  } catch (error) {
    console.error(error);
    message.reply('An error occurred: ' + error);
  }
 }
};

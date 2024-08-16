const axios = require('axios');

module.exports = {
  config: {
    name: "programeme",
    //aliases: ['programjoke'],
    version: "1.0.0",
    author: "Ace",
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
  
  onStart: async function({ event, api }) {
  try {
    const url = 'https://celestial-dainsleif-v2.onrender.com/programeme';
    const response = await axios.get(url);
    const { title, imageUrl } = response.data[0];
    
    const form = {
        body: title,
        attachment: []
    }; 
    
    form.attachment[0] = await global.utils.getStreamFromURL(imageUrl);
      api.sendMessage(form, event.threadID, event.messageID);
    
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred: ' + error.message, event.threadID);
  }
 }
};
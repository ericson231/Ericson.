const axios = require('axios');

const Prefixes = [
  'gpt',
  '/gpt',
  'ai',
  '/ai'
];

module.exports = {
  config: {
    name: 'ai',
    //aliases: ["ai"],
    version: '2.5',
    author: 'JV Barcenas', // do not change
    role: 0,
    category: 'ai',
    description: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim() || "Hello";
      
      if (prompt) {
        const sentMessage = await message.reply("Answering your question. Please wait a moment...");

        let respond = "Sorry, I couldn't generate an answer.";
        
        try {
          const response = await axios.get(`https://celestial-dainsleif-v2.onrender.com/gpt?gpt=${prompt}`);
          respond = response.data.content.trim();
        } catch (error) {
          console.error("❌ | Primary API failed for answer generation", error); 
          try {
            const response = await axios.get(`https://akhiroai.onrender.com/api?model=llama&q=${prompt}`);
            respond = response.data.message;
          } catch (error) {
            console.error("❌ | Secondary API failed for answer generation", error);
            try {
              const response = await axios.get(`https://akhiroai.onrender.com/api?model=hercai&q=${prompt}`);
              respond = response.data.message;
            } catch (error) {
              console.error("❌ | Third API failed for answer generation", error); 
              try {
                const response = await axios.get(`https://akhiroai.onrender.com/api?model=gemini&q=${prompt}`);
                respond = response.data.message;
              } catch (error) {
                console.error("❌ | Fourth API failed for answer generation", error); 
                try {
                  const response = await axios.get(`https://akhiroai.onrender.com/api?model=chatgpt&q=${prompt}`);
                  respond = response.data.message;
                } catch (error) {
                  console.error("❌ | Fifth API failed for answer generation", error); 
                  
                  return api.sendMessage(
                    "You can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.",
                    event.threadID,
                    event.messageID
                  );
                }
              }
            }
          }
        }

        await api.editMessage(respond, sentMessage.messageID);
        console.log('Sent answer as a reply to user');
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }
};

const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "avatarv2",
    aliases: ['avtv2'],
    version: "1.0",
    author: "AceGerome",
    countDown: 5,
    role: 0,
    description: {
        en: "Create facebook anime banner .", 
    }, 
    category: "image", 
    guide: {
      en: "{pn} Characters name or ID | Background Text | Signature"
    } 
  },

  onStart: async function({ message, args, event, api }) {

    const prompt = args.join(" ");
    if (!prompt){
      return message.SyntaxError();
      } else {
      const y = prompt.split("|");
      const id = y[0];
      const name = y[1];
      const signature = y[2];
      
      if (!id) return message.reply('Missing character name or ID.');
      if (!name) return message.reply('Missing Background text.');
      if (!signature) return message.reply('Missing Background signature.');

      if (isNaN(id)) { // If input is not a number
          await message.reply("Processing your avatar, please wait...");
          
         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...");
      return;
    }
        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu3?id=${id1}&tenchinh=${name}&tenphu=${signature}&apikey=CF9unN3H`)			
        const form = {
        body: `Here's your avatar, Enjoy🙂! \nName: ${id}\nID: ${id1}\nText: ${name}\nSignature: ${signature}`
      };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form); 
       } else { 
       await message.reply("Processing your avatar, please wait....");

         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu3?id=${id1}&tenchinh=${name}&tenphu=${signature}&apikey=CF9unN3H`)			
                 const form = {
        body: `Here's your avatar, Enjoy🙂! \nName: ${id}\nID: ${id1}\nText: ${name}\nSignature: ${signature}`
      };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form); 
        }
      }
    }
   };

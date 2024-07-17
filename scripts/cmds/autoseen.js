const fs = require('fs-extra'); 
const pathFile = __dirname + 'autoseen.txt';

if (!fs.existsSync(pathFile)) { fs.writeFileSync(pathFile, 'false'); }

module.exports = {
  config: {
    name: "autoseen",
    aliases: ['autoseen'], 
    version: "1.4",
    author: "tor maire chudi",
    countDown: 5,
    role: 1,
    shortDescription: "Enable/disable auto seen when new message is available",
    longDescription: {
        en: "Enable/disable auto seen when new message is available."
    }, 
    category: "𝗔𝗗𝗠𝗜𝗡/𝗢𝗪𝗡𝗘𝗥/𝗕𝗢𝗫𝗖𝗛𝗔𝗧/𝗡𝗢𝗧𝗖𝗠𝗗", 
    guide: {
      en: "To use this command, type {pn} on to enable autoseen and {pn} off to disabled."
    } 
  },
  
  onStart: async function ({ message, event, args }) { 
    try { 
       if (args[0] === 'on') { 
         fs.writeFileSync(pathFile, 'true'); 
         message.reply('Automatically seen when new message is enabled '); 
        } 
        else if (args[0] === 'off') { 
           fs.writeFileSync(pathFile, 'false'); 
           message.reply('Automatically seen when new message is turned off '); 
           
           } else { 
               message.reply('Syntax error'); 
           } 
          } catch(error) { 
           console.log(`Eror Syntax`); 
      } 
  }, 
  
  onChat: async ({ api, event, args }) => { 
    const isEnable = fs.readFileSync(pathFile, 'utf-8'); 
    if (isEnable === 'true') { 
      api.markAsReadAll(() => {}); 
     } 
  },
};

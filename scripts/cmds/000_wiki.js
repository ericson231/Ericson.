module.exports = {
  config: {
    name: "wiki",
    aliases: [], 
    version: "2.0",
    author: "MILAN",
    countDown: 10,
    role: 0,
    description: {
        en: "Search on wikipedia by providing keyword."
    }, 
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡", 
    guide: {
      en: "{pn} <text>"
    } 
  },

  onStart: async function({ args, message }) {
    const wiki = require("wikijs").default;
    const content = args.join(" ");
 
    if (!content)
      return message.reply(`¡ | Missing Input`);
      
    let url = 'https://en.wikipedia.org/w/api.php';
    
    if (args[0] == "en") {
        url = 'https://en.wikipedia.org/w/api.php'; 
        content = args.slice(1, args.length);
    }
    if (!content) 
      return message.reply("¡ | Missing Input");
      return wiki({
          apiUrl: url
      }).page(content).catch(() => 
          message.reply(("Not Found", content))).then(page => 
          (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => 
          message.reply(val)) : '');
     }
};

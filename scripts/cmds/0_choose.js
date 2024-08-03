module.exports = {
  config: {
    name: "choose",
    aliases: ['prefer'],
    version: "1.0",
    author: "Ace",
    countDown: 15,
    role: 0,
    description: {
      en: "Akira chose the things/food/place provided by user."
    },
    category: "fun",
    guide: {
      en: "   {pn} <choose1> or <choose2>"
    }
  },
  
  langs: {
    en: {
      result: "%1 is more suitable with you, I think so (thinking)"
    }
  }, 
  
  onStart: async function({ message, args, getLang }) {
  
	var input = args.join(" ").trim();
	
	if (!input) {
	    message.reply("Invalid. Type /choose <choose1> or <choose2>", event.threadID, event.messageID);
    return;
	}
	
	var array = input.split(" or ");
	
	return message.reply(getLang("result", array[Math.floor(Math.random() * array.length)]));
 }
};

module.exports = {
  config: {
    name: "echo",
    aliases: [],
    version: "1.0",
    author: "AceGerome",
    countDown: 5,
    role: 0,
    description: {
        en: "Echoes back whatever the user has prompted or entered as arguments."
    }, 
    category: "fun", 
    guide: {
      en: "{pn} <text>"
    } 
  },
  
  onStart: async function({ args, api, event }) {
     var say = args.join(" ")
	   
	   if (!say) return api.sendMessage("Please enter a message", event.threadID, event.messageID)
	   else api.sendMessage(say, event.threadID);
	 }
};

module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "AceGerome",
    countDown: 5,
    role: 2,
    description: {
      en: "Show the pending list of threads."
    },
    category: "Admin"
  },
  
  langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",

        cantGetPendingList: "Can't get the pending list!",
        pendingList: "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2\n\n➥ Reply this message with Number to approve or Cancel <number>",
        noPendingList: "「PENDING」There is no thread in the pending list"
    }
  },
  
  onStart: async function({ api, message, event, getLang, commandName }) {
    const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
      var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
      
      var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
      
    } catch (e) {
        return message.reply(getLang("cantGetPendingList"))
    }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return message.reply(getLang("pendingList", list.length, msg), (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              pending: list
         })
    });
      else return message.reply(getLang("noPendingList"));
    }, 
    
    onReply: async function({ api, message, event, Reply, getLang, commandName, prefix }) {
      if (String(event.senderID) !== String(Reply.author)) return;
      
      const { body, threadID, messageID } = event;
      
      var count = 0;

      if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
         const index = (body.slice(1, body.length)).split(/\s+/);
         
            for (const singleIndex of index) {
               console.log(singleIndex);
               
               if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return message.reply(getLang("invaildNumber", singleIndex));
               api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[singleIndex - 1].threadID);
            count+=1;
       }
       return message.reply(getLang("cancelSuccess", count));
       }
       else {
         const index = body.split(/\s+/);
         for (const singleIndex of index) {
             if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return message.reply(getLang("invaildNumber", singleIndex));
            api.sendMessage(`「 𝗔𝗣𝗣𝗥𝗢𝗩𝗘𝗗 」\n\n• This thread is officially approved by the admin.\nEnjoy using the bot and please do not spam. ♡\n— [ -Akira ]`, Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return message.reply(getLang("approveSuccess", count));
    }
  }
};

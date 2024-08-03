module.exports = {
  config: {
    name: "giveaway",
    aliases: ['gv'],
    version: "1.0",
    author: "AceGerome",
    countdown: 5,
    role: 0,
    description: {
      en: "Start a giveaway in the group chat"
    },
    category: "game",
    guide: {
      en: "{p}giveaway <amount>"
    }
  },
  onStart: async function ({ event, message, args, threadsData, usersData, api, commandName, role }) {
    const userData = await usersData.get(event.senderID);
    const userMoney = await usersData.get(event.senderID, "money");
    const amountToGiveaway = parseInt(args[0]);
    if (isNaN(amountToGiveaway) || amountToGiveaway <= 0) {
      message.reply("Please enter a valid amount of money to giveaway.");
      return;
    }
    
    if (userMoney < amountToGiveaway) {
      return message.reply("You don't have enough money to giveaway.");
    }
    
    await usersData.set(event.senderID, {
      money: userData.money + -amountToGiveaway,
      data: userData.data,
    });

    const threadID = event.threadID;
    const threadInfo = await api.getThreadInfo(threadID);
    const participantIDs = threadInfo.participantIDs;
    const winnerID = participantIDs[Math.floor(Math.random() * participantIDs.length)];

    const winnerData = await usersData.get(winnerID);
    if (!winnerData) {
      message.reply("The winner's data doesn't exist. Please try again.");
      return;
    }

    const winnerName = winnerData.name;
    const winnerMoney = winnerData.money;
    const newMoney = winnerMoney + amountToGiveaway;
    
    const ment = [{ id: winnerID, tag: winnerName }];
        
    await usersData.set(winnerID, {
      money: newMoney
    });

    api.sendMessage({
        body: `Congratulations, ${winnerName}! You won ${amountToGiveaway} money in the giveaway.`, 
        mentions: ment,                  
    }, event.threadID 
   );
  },
};

module.exports = {
  config: {
    name: "animalhunt",
    aliases: ['hunt'],
    version: "2.0.0",
    author: "AceGerome",
    countDown: 10,
    role: 0,
    description: {
      en: "Embark on an animal hunting adventure and collect rare animals and treasures."
    },
    category: "Game",
    guide: {
      en: "{pn}"
    }
  },
  
  langs: {  
    en: {
        animalhuntUserNoData: "Your data is not ready yet.",
        animalhuntNotEnoughMoney: "Not enough money.",
        animalhuntMinMoney: "Minimum bet is %1. 💵",
        animalhuntFail: "You didn't find any animal or treasures. Better luck next time!",
        animalhuntSuccessAnimal: "You hunted down a %1 worth %2! 💵",
        animalhuntSuccessTreasure: "You discovered a treasure chest worth $50,000! 💰", 
        error: "Please provide a bet to start."
    }
  }, 

  onStart: async function({ message, args, getLang, usersData, event }) { 
    const bet = parseInt(args[0]);
    const minbet = 100;

    try {
      const userData = await usersData.get(event.senderID);
      if (!userData) return message.reply(getLang("animalhuntUserNoData"));
      if (BigInt(userData.money) < bet) return message.reply(getLang("animalhuntNotEnoughMoney"));
      if (bet < minbet) return message.reply(getLang("animalhuntMinMoney", minbet));

      await usersData.set(event.senderID, {
        money: BigInt(userData.money) - BigInt(bet),
        data: userData.data,
      });

      const huntSuccessful = Math.random() < 0.6;
      if (huntSuccessful) {
        const isTreasureFound = Math.random() < 0.1; // 10% chance for treasure
        if (isTreasureFound) {
          await usersData.set(event.senderID, {
            money: BigInt(userData.money) + BigInt(50000),
            data: userData.data,
          });
          message.reply(getLang("animalhuntSuccessTreasure"));
        } else {
          const minAnimalValue = 800;
          const maxAnimalValue = 10000;
          const animalTypes = ["🐂", "🐍", "🐕‍🦺", "🦓", "🦜", "🐅", "🦔", ];
          const animalType = animalTypes[Math.floor(Math.random() * animalTypes.length)];
          const animalValue = BigInt(Math.floor(Math.random() * (maxAnimalValue - minAnimalValue + 1) + minAnimalValue));
          await usersData.set(event.senderID, {
            money: BigInt(userData.money) + animalValue,
            data: userData.data,
          });
          const animal = animalType;
          const value = String(animalValue);
          message.reply(getLang("animalhuntSuccessAnimal", animal, value));
        }
      } else {
        message.reply(getLang("animalhuntFail"));
      }
    } catch (error) {
      console.error(error);
      return message.reply(getLang("error"));
    }
  },
};

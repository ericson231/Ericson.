module.exports = {
  config: {
    name: "confessv2",
    aliases: ["confessv2"],
    version: "1.1", 
    author: "Ace Gerome",
    countDown: 15,
    role: 0,
    description: "Confess your feelings to sendnthe messages you confess.",
    category: "fun",
    guide: "{pn} < uid > < message > < from >", // Updated guide
  },
  onStart: async function ({ api, event, args, message }) {
    const { threadID, messageID } = event;
    if (args.length < 2) {
      message.reply("Invalid Format. Use: /confess <uid> <message>", threadID, messageID);
      return;
    }

    const id = args[0];
    const reason = args.slice(1).join(" ");

    const confessionMessage = `🛂 | 𝗬𝗼𝘂'𝘃𝗲 𝗴𝗼𝘁 𝗮 𝗖𝗼𝗻𝗳𝗲𝘀𝘀 𝗠𝗲𝘀𝘀𝗮𝗴𝗲
━━━━━━━━━━━━━━━━━━━━━━━━━

📝: ${reason}

━━━━━━━━━━━━━━━━━━━━━━━━━
•⁠| Don't bother me by asking who's the sender, you're just wasting your time!`;

    message.reply(confessionMessage, id, () => {
      const youSentMessage = `Confession Sent Successfully!`;
      message.reply(api.getCurrentUserID(), () => {
        message.reply(youSentMessage, threadID);
      });
    });
  }
};

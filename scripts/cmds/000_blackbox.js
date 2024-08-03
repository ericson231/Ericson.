const axios = require("axios");
module.exports = {
	config: {
		name: 'blackbox',
		version: '2.1.0',
		author: 'KENLIEPLAYS',
		countDown: 5,
		role: 0,
		description: {
			en: 'Blackbox by Kenlie Navacilla Jugarap'
		},
		category: '𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡',
		guide: {
			en: '   {pn} <word>: ask with Blackbox'
				+ '\n   Example:{pn} hi'
		}
	},

	langs: {
		en: {
			chatting: 'Please wait...',
			error: 'If this report spam please contact Kenlie Navacilla Jugarap'
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				const text = responseMessage.replace("\n\nIs this answer helpful to you? Kindly click the link below\nhttps:\/\/click2donate.kenliejugarap.com\n(Clicking the link and clicking any ads or button and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)", "")
				return message.reply(`${text}`);
			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (!isUserCallCommand) {
			return;
		}
		if (args.length > 1) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://var api.kenliejugarap.com/blackbox?text=${yourMessage}`);
		if (!res.data.response) {
			throw new Error('Please contact Kenlie Navacilla Jugarap if this error spams...');
		}
		return res.data.response;
	} catch (err) {
		console.error('Error while getting a message:', err);
		throw err;
	}
}

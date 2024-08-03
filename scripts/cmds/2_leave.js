module.exports = {
	config: {
		name: "leave",
		//aliases: [],
		version: "1.0",
		author: "Ace/Akira",
		countDown: 5,
		role: 2,
		description: "Bot will leave on group",
		category: "owner",
		guide: {
			en: "{pn} [ tid | blank ]"
		}
	},

	onStart: async function ({ api, event, args }) {
	    var threadID;
	    if (!isNaN(args[0])) {
	        threadID = parseInt(args[0]);
	    } else {
	        threadID = event.threadID;
	    }
	    const reasons = args.slice(1).join(" ");
	    let threadInfo = await api.getThreadInfo(threadID); 
	        
	    return api.sendMessage(`🔄 | Leaving...`
	        + `\n━━━━━━━━━━━━━━━`
	        + `\n${reasons || "𝖬𝗒 𝖠𝖽𝗆𝗂𝗇 𝖿𝗈𝗋𝖼𝖾𝗌 𝗆𝖾 𝗍𝗈 𝗅𝖾𝖺𝗏𝖾 𝗁𝖾𝗋𝖾..."}`, threadID, () => {
	        api.removeUserFromGroup(api.getCurrentUserID(), threadID);
	        api.sendMessage(`「 Leave Success 」\n━━━━━━━━━━━━━━━\n⪼ Name: ${threadInfo.threadName}\n⪼ TID: ${threadID}\n⪼ Reasons: ${reasons || "𝖬𝗒 𝖠𝖽𝗆𝗂𝗇 𝖿𝗈𝗋𝖼𝖾𝗌 𝗆𝖾 𝗍𝗈 𝗅𝖾𝖺𝗏𝖾 𝗁𝖾𝗋𝖾..."}`, event.threadID, event.messageID);
	    });
  	}
};

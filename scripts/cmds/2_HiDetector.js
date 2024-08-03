const responses = [
    "Hi",
    "Hello",
    "Hi love,how can i assist you today?",
    "Kamusta ka?",
    "Hello Master ",
    "Do you know me?",
    "Pano ba tayo babalik sa umpisa?",
    "Hi love, your cute🤗",
    "Owner ko nga pala 👇\nhttps:\/\/facebook.com/ace.gerome"
];

module.exports = {
    config: {
        name: "response",
        version: "1.0",
        author: "acegerome",// mababaog ang magchange
        countDown: 5,
        role: 0,
        description: "auto reply, not cmd",
        category: "owner",
    },
    onStart: async function(){}, 
    onChat: async function ({ event, message }) {
        try {
            if (!event || !event.body) {
                return;
            }
            const userInput = event.body.toLowerCase();
            const firstWord = userInput.split(" ")[0];
            const keywords = ["hi", "hello", "hoy", "oy"];
            if (keywords.includes(firstWord)) {
                const randomIndex = Math.floor(Math.random() * responses.length);
                const randomResponse = responses[randomIndex];
                return message.reply(randomResponse);
            }
        } catch (e) {
            console.error(e);
        }
    }
};

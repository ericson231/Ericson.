module.exports = {
  config: {
    name: "beshy",
    aliases: ["beshify"],
    version: 1.0,
    author: "Ace",
    description: { en: "Beshify your text" },
    category: "fun",
    guide: { en: "{pn} <text> - Replace spaces with 🤸" }
  },
  onStart: async function({ args, message }) {
    const text = args.join(" ").replace(/ /g, "🤸");
    if (!text) return message.reply("Please provide some text.");
    const reply = text;
    message.reply(reply);
  }
};

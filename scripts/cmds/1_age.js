module.exports = {
  config: {
    name: "age",
    author: "Samir Œ",
    countDown: 15,
    role: 0,
    category: "info",
    description: {
      en: "Show your age based on your birthmonth",
    },
  },

  onStart: async function ({ api, event, args }) {
    const birthday = args[0];

    if (!birthday) {
      return api.sendMessage("Please provide your birthday in YYYY-MM-DD format.", event.threadID);
    }

    const currentDate = new Date();
    const birthDate = new Date(birthday);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    birthDate.setFullYear(currentDate.getFullYear());
    const isBeforeBirthday = currentDate < birthDate;

    const finalAge = isBeforeBirthday ? age - 1 : age;

    api.sendMessage(`Your Age Is ${finalAge} Am I Right?`, event.threadID);
  },
};

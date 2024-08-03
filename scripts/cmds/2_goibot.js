const fs = require("fs-extra");

module.exports = {
  config: {
    name: "goibot",
    aliases: [],
    version: "1.0.1",
    author: "Mod by Jhon Lester | Ace",
    countDown: 5,
    role: 0,
    description: {
      en: "Auto React with Response."
    },
    category: "Owner",
    guide: {
      en: "   No guide lol"
    } 
  }, 
  
  onStart: async function({}) {}, 
  onChat: async function({ message, event, args, threadsData, usersData }) {
  var { name } = await usersData.get(event.senderID);

  var tl = ["Tanginaka mamatay kana,dami mo pang dada", "isa pang mura papakainin kita ng tite", "bawal mag mura rito", "saksakin kita mura ka nang mura e", "isa pang mura saksakin kita sa leeg", "bawal nga mag mura rito kakaltukan kita jan e", "bawal mag mura rito nakikita ka ng Diyos", "isa pang mura sasapakin ka ng admin ko", "bad word!", "bad!", "sumbong kita sa mama mo nag mumura ka", "kagatin kita jan mura ka nang mura e", "Junmar is gay", "shut up"," papansin ka, magsama kayo ni ley", "oo na bakla si junmar", "adik ka sa bold tanginamo", "oh tapos? bat ka nag assume na ikaw ung gusto"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
 
  var tl = ["iloveyoumore "+name, "iloveyoumore what's wrong love?", "iloveyoumore you know that.", "Iloveyou in every universe.", "iloveyousm", "iloveyou, wanna go on a date?", "suksukpekpek", "ilysm >-<", "hateyoumore", "nagkakabet ka teh?"];
  var daniel = tl[Math.floor(Math.random() * tl.length)]

  var tl = ["don't force someone who's not into you", "may iba na ’yon", "’di kana mahal ’non.", "kung ako na lang sana", "if you were mine you would not get the same", "kung ako yan...", "nandito naman ako e", "kung ako ’yon di kita sasayangin"];
  var retri = tl[Math.floor(Math.random() * tl.length)]
  
  var tl = ["nuba? bot ka ng bot", "Do you have a knife?", "okayed"," Love won't refill the trust you lost", "what", "stop saying bot", "nuba potangina mo? puro ka bot", "yes??", "Hatdog mo maliit ", "panget", "tanginaka, spammer ka ng bot🙄", "don't call me bot, tao ako Bobo mo", "shut up", "Adik sa bold",  "babanned kita sa bot", "You're pathetic", "magsama kayo ni scarlet evelyn parehas kayong baliw", "~"];
  var master = tl[Math.floor(Math.random() * tl.length)]
  
    var tl = ["haahahaha", "whahaha", "nakakarindi tawa mo tangina ka", "tawa tawa geng geng", "happy?", "la naman nakakatawa", "BOBO", "PUTANGINA NETO OH", "hahahaha abnormal", "hahaha asuming"];
  var happy = tl[Math.floor(Math.random() * tl.length)]
  
    if (event.body.indexOf("Burat") ||event.body.indexOf("burat") ||event.body.indexOf("Puke") ||event.body.indexOf("puke") ||event.body.indexOf("tangina") ||event.body.indexOf("Tangina") ||event.body.indexOf("Tanginamo") ||event.body.indexOf("Tanginamo") ||event.body.indexOf("taina") ||event.body.indexOf("Taina") ||event.body.indexOf("Pota") ||event.body.indexOf("pota") || event.body.indexOf("gago") || event.body.indexOf("Gago") || event.body.indexOf("tanga") ||event.body.indexOf("Tanga") ||event.body.indexOf("bobo") ||event.body.indexOf("Bobo") ||event.body.indexOf("Tarantado") || event.body.indexOf("tarantado") || event.body.indexOf("ulol") ||  event.body.indexOf("tang ina") || event.body.indexOf("Tang ina") ||event.body.indexOf("po ta") ||event.body.indexOf("Pota") || event.body.indexOf("ulol") || event.body.indexOf("Ulol") || event.body.indexOf("tanginamoka")) {    
    message.reply(rand);
    message.reaction("😠");
  };
 
    if (event.body.indexOf("Iloveyou") ||event.body.indexOf("iloveyou") ||event.body.indexOf("Loveyou") ||event.body.indexOf("loveyou") ||event.body.indexOf("love u") ||event.body.indexOf("Love u") ||event.body.indexOf("Love you") ||event.body.indexOf("love you") ||event.body.indexOf("mahal kita") ||event.body.indexOf("Mahal kita") ||event.body.indexOf("Iloveyoutoo") ||event.body.indexOf("Iloveyoutoo") || event.body.indexOf("Iloveyoumore") || event.body.indexOf("iloveyoumore") || event.body.indexOf("i love you") ||event.body.indexOf("I love you") ||event.body.indexOf("ily")) {
			message.reply(daniel);
    message.reaction("❤️");
  };
  
    if (event.body.indexOf("HAHAHA") ||event.body.indexOf("hahaha") ||event.body.indexOf("HAHA") ||event.body.indexOf("haha") ||event.body.indexOf("HAHAHA") ||event.body.indexOf("hahaha") ||event.body.indexOf("Hahaha") ||event.body.indexOf("Haha") ||event.body.indexOf("HAHAHAHA") ||event.body.indexOf("hahahaha") ||event.body.indexOf("whahaha") ||event.body.indexOf("Whahaha") || event.body.indexOf("😆") || event.body.indexOf("😂️")) {
			message.reply(happy);
    message.reaction("😆");
  };

    if (event.body.indexOf("I miss you") ||event.body.indexOf("i miss you") ||event.body.indexOf("I miss her") ||event.body.indexOf("i miss her") ||event.body.indexOf("Imissher") ||event.body.indexOf("imissher") ||event.body.indexOf("Imisshim") ||event.body.indexOf("imisshim") ||event.body.indexOf("miss") ||event.body.indexOf("Miss") ||  event.body.indexOf("miss kona sya") ||event.body.indexOf("Ako paba") || event.body.indexOf("aq paba") || event.body.indexOf("ako paba")) {
			message.reply(retri);
    message.reaction("😯");
  };
  
    if (event.body.indexOf("sakit") ||event.body.indexOf("Sakit") ||event.body.indexOf("Ansakit") ||event.body.indexOf("ansakit") ||event.body.indexOf("aray") ||event.body.indexOf("Aray") ||event.body.indexOf("break") ||event.body.indexOf("Break") ||event.body.indexOf("sad") ||  event.body.indexOf("Sad") || event.body.indexOf("misskona") ||event.body.indexOf("😢") ||  event.body.indexOf("mess") || event.body.indexOf("imisshir")) {
			message.reply(retri);
    message.reaction("😢️");
  };
  
    if (event.body.indexOf("bot") ||event.body.indexOf("Bots") || event.body.indexOf("@akira") || event.body.indexOf("@Akira") ||event.body.indexOf("Robot") ||event.body.indexOf("Bot") ||event.body.indexOf("robot") ||event.body.indexOf("akira") ||event.body.indexOf("Akira") ||event.body.indexOf("Ace") ||  event.body.indexOf("ace") || event.body.indexOf("@ace") || event.body.indexOf("@Ace") || event.body.indexOf("Bot")) {
			message.reply(master);
    message.reaction("❤️");
  };
 }
};

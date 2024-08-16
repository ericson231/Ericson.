const fs = require("fs-extra");

module.exports = {
  config: {
    name: "file",
    //aliases: ['file'],
    version: "1.0.1",
    author: "Ace",
    countDown: 5,
    role: 0,
    description: "Delete the file or folder in the commands folder.",
    category: "owner",
    guide: {
      en: "    • {pn} start <text>" 
        + "\n•Effect: Filter out files that need to be deleted with an optional starting character."
        + "\n\n• {pn} ext <text>" 
        + "\n•Effect: Filter out files that need to be deleted with optional extensions."
        + "\n•Effect: filter out files with custom text in the name."
        + "\n\n• {pn} <leave blank>"
        + "\n•Effect: filter out all files in cache."
    }
  },
  
  onStart: async function({ api, event, args, threadsData, usersData, message }) {
    const command = args[0];
    const permission = ["100085947075503"];
  	if (!permission.includes(event.senderID)) {
  	    return message.reply("You don't have permission to use this feature.");
  	}
  
   var files = fs.readdirSync(__dirname + "/") || [];
   var msg = "", i = 1;
  
  
  if (command == 'help') {
    var msg = `—— How to use the command:\n• /file start <text>\n•Effect: Filter out files that need to be deleted with an optional starting character. \n\n– For example: /file rank\n\n• /file ext <text>\n•Effect: Filter out files that need to be deleted with optional extensions. \n•Effect: filter out files with custom text in the name.\n\n– For example: /file rank\n\n• /file <leave blank>\n•Effect: filter out all files in cache\n\n\n• /file help\n•Effect: see how to use the command`;
    
    return message.reply(msg);
  }
  
  
  else if (command == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));
    
    if (files.length == 0) return message.reply(`There are no files in the cache that begin with: ${word}`);
    var key = `There  are ${files.length} files. The file has a character that starts with .: ${word}`;
  }
  
  /* - - - - - EXT AREA - - - - - */
  
  else if (command == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));
    
    if (files.length == 0) return message.reply(`There are no files in the commands that have a character ending in .: ${ext}`);
    var key = `There ${files.length} file has the extension: ${ext}`;
  }
  
  /* - - - - - Blank AREA - - - - - */
  
  else if (!args[0]) {
    if (files.length == 0) return message.reply("Your commands have no files or folders");
  var key = "All files in the commands folder:";
  }
  
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if (files.length == 0) return message.reply(`There are no files in the name with the character: ${word}`);
    var key = `There are ${files.length} file in the name has the character: ${word}`;
  }
  
    files.forEach(file => {
        var fileOrdir = fs.statSync (__dirname + '/' + file);
        if (fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
        if (fileOrdir.isFile() == true) var typef = "[File📄]";
        msg += (i++) + '. ' + typef + ' ' + file + '\n';
    });
    
     message.reply(`Reply message by number to delete the corresponding file, can rep multiple numbers, separated by space.\n${key}\n\n` + msg, (e, info) => global.GoatBot.onReply.set({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))
 
}, 

  onReply: async function({ api, event, args, Reply, message }) {
    if (event.senderID != Reply.author) return; 
    const fs = require("fs-extra");
    var arrnum = event.body.split(" ");
    var msg = "";
    var nums = arrnum.map(n => parseInt(n));

    for (let num of nums) {
    var target = Reply.files[num-1];
    var fileOrdir = fs.statSync(__dirname + '/' + target);
        if (fileOrdir.isDirectory() == true) {
          var typef = "[Folder🗂️]";
          fs.rmdirSync(__dirname + '/' + target, { recursive: true });
        }
        else if (fileOrdir.isFile() == true) {
          var typef = "[File📄]";
          fs.unlinkSync(__dirname + "/" + target);
        }
        msg += typef + ' ' + Reply.files[num-1] + "\n";
  }
  message.reply("Deleted the following files in the commands folder:\n\n" + msg);
 }
};


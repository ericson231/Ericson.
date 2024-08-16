const axios = require('axios');

module.exports = {
  config: {
    name: 'fbcoverv2',
    version: '1.0',
    author: 'AceGerome',
    countDown: 10,
    role: 0,
    description: 'Create Facebook Cover with information.',
    category: 'image',
    guide: {
      en: '{pn} <name> | <subname> | <id> | <color>',
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const prompt = args.join(' ');
    if (!prompt){
      return message.SyntaxError();
    } else {
      const y = prompt.split('|');
      const name = y[0];
      const subname = y[1];
      const id = parseInt(y[2]);
      const color = y[3] ? y[3].trim() : '';
      
      if (!name) return message.reply('Missing Name.');
      if (!subname) return message.reply('Missing Subname.');
      if (!id) return message.reply('Missing Anime ID.');
      if (!color) return message.reply(`Missing color!, if you want default type 'no'.`);
         
      await message.reply('Initializing your cover, please wait...');
      const url = `https://hiroshi-rest-api.replit.app`;

      const img = url+`/canvas/fbcoverv1?name=`+name+`&id=`+id+`&subname=`+subname+`&color=`+color;

      const form = {
        body: null,
        attachment: []
      };

      form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form);
    }
  }
};

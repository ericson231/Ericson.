const axios = require('axios');

module.exports = {
  config: {
    name: 'fbcover',
    version: '1.0',
    author: 'munem. | AceGerome',
    countDown: 10,
    role: 0,
    description: 'Create Facebook Cover with information.',
    category: 'image',
    guide: {
      en: '{pn} <name> | <subname> | <address> | <phone> | <email> | <color>',
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
      const address = y[2];
      const phone = y[3];
      const email = y[4];
      const color = y[5] ? y[5].trim() : '';
      
      if (!name) return message.reply('Missing Name.');
      if (!subname) return message.reply('Missing Subname.');
      if (!address) return message.reply('Missing Address.');
      if (!phone) return message.reply('Missing Phone Number.');
      if (!email) return message.reply('Missing Email Address.');
      if (!color) return message.reply(`Missing color!, if you want default type 'no'.`);
         
      await message.reply('Initializing your cover, please wait...');

      const img = `https://www.nguyenmanh.name.vn/api/fbcover1?name=${name}&uid=${event.senderID}&address=${address}&email=${email}&subname=${subname}&sdt=${phone}&color=${color}&apikey=sr7dxQss`;

      const form = {
        body: null,
        attachment: []
      };

      form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form);
    }
  }
};

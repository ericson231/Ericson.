const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration object
const config = {
  name: "billboard",
  version: "1.0.0",
  role: 0,
  author: "chan",
  description: "Generate a billboard image",
  aliases: ["billboard"],
  guide: "[billboard <text>]",
  countdown: 15
};

// Function to handle the command logic
async function handleCommand({ api, event, args, message }) {
  try {
    const text = args.join(" ");

    if (!text) {
      api.sendMessage("Usage: billboard <text>", event.threadID);
      return;
    }

    const encodedText = encodeURIComponent(text);
    const url = `https://hiroshi-rest-api.replit.app/canvas/billboard?text=${encodedText}`;
    const imagePath = path.join(__dirname, "billboard.png");

    api.sendMessage("Generating your billboard, please wait...", event.threadID);

    const response = await axios({
      url: url,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      try {
        await api.sendMessage({
          attachment: fs.createReadStream(imagePath)
        }, event.threadID);

        fs.unlinkSync(imagePath);
      } catch (sendError) {
        console.error('Error sending image:', sendError);
        api.sendMessage("An error occurred while sending the image.", event.threadID);
      }
    });

    writer.on('error', (err) => {
      console.error('Stream writer error:', err);
      api.sendMessage("An error occurred while processing the request.", event.threadID);
    });
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
}

// Exporting the configuration and the handleCommand function
module.exports = {
  config: config,
  handleCommand: handleCommand,
  onStart: function({ api, message, event, args }) {
    return handleCommand({ api, event, args, message });
  },
  onReply: function({ api, message, event, args }) {
    return handleCommand({ api, event, args, message });
  }
};

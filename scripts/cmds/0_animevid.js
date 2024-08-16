const axios = require('axios');

let sentVideos = [];

module.exports = {
  config: {
    name: "animevid",
    //aliases: ["animestatus", "as"],
    author: "Kshitiz | Ace",
    version: "1.0",
    countDown: 10, 
    role: 0,
    description: {
      en: "Get a random anime video from a TikTok",
    },
    category: "info",
    guide: {
      en: "{pn}",
    },
  },
  onStart: async function ({ message, event, api }) {
    try {
      const loadingMessage = await message.reply('Loading anime status...');

      const tikTokUserIds = ['6850681469859628034', '7184871063795352603', '6957010568603829254', '7033020341324809242', '6954581066443736069']; 
      const videos = await fetchTikTokUsersVideos(tikTokUserIds);
      if (!videos || videos.length === 0) {
        await message.reply({ body: 'No anime videos found.' });
        return;
      }
      const remainingVideos = videos.filter(video => !sentVideos.includes(video.video_id));
      if (remainingVideos.length === 0) {
        sentVideos = [];
      }
      const randomVideo = remainingVideos[Math.floor(Math.random() * remainingVideos.length)];

      
      await sendVideo(api, event.threadID, randomVideo, event.messageID);

      sentVideos.push(randomVideo.video_id);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while processing the request.\nPlease try again later.' }, event.threadID);
    }
  },
};

async function fetchTikTokUsersVideos(userIds) {
  let allVideos = [];
  for (const userId of userIds) {
    const videos = await fetchTikTokUserVideos(userId);
    if (videos && videos.length > 0) {
      allVideos = allVideos.concat(videos);
    }
  }
  return allVideos;
}

async function sendVideo(api, threadID, video, messageID) {
  if (!video) {
    api.sendMessage({ body: 'Error: Video not found.' }, threadID);
    return;
  }
  const videoUrl = video.play;
  if (!videoUrl) {
    api.sendMessage({ body: 'Error: Video URL not found.' }, threadID);
    return;
  }
  try {
    const videoStream = await getStreamFromURL(videoUrl);
    await api.sendMessage({
      body: `✅ | Random Tiktok Anime Video`,
      attachment: videoStream,
    }, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage({ body: 'An error occurred while sending the video.\nPlease try again later.' }, threadID);
  }
}

async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

async function fetchTikTokUserVideos(userId) {
  const options = {
    method: 'GET',
    url: 'https://tiktok-scraper7.p.rapidapi.com/user/posts',
    params: {
      user_id: userId,
      count: '300',
    },
    headers: {
      'X-RapidAPI-Key': 'ece5655ae3msh55483dd9d60402fp12e36ajsn5adc6b59bc68',
      'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.data.videos;
  } catch (error) {
    console.error(error);
    return null;
  }
}

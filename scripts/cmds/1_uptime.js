const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt","stat"],
    version: "1.0",
    author: "JARiF@Cock",
    role: 0,
    category: "info",
    guide: {
      en: "Use {pn} "
    }
  },
  onStart: async function ({ message, api }) {
  
 
    const uptime = process.uptime();
    const formattedUptime = formatMilliseconds(uptime * 1000);
    const BoxID = "24627125276933217";
    const timeStart = Date.now();
    await api.sendMessage("Pong!", BoxID)
    await console.log(timeStart);
    const ping = Date.now() - timeStart;
    let stat = "Very Poor";
    if (ping < 800) {
        stat = "Fair";
    }
    if (ping < 400) {
        stat = "Good";
    }

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    const diskUsage = await getDiskUsage();

    const systemInfo = {
      os: `${os.type()} ${os.release()}`,
      arch: os.arch(),
      cpu: `${os.cpus()[0].model} (${os.cpus().length} cores)`,
      loadAvg: os.loadavg()[0], // 1-minute load average
      botUptime: formattedUptime,
      systemUptime: formatUptime(os.uptime()),
      processMemory: prettyBytes(process.memoryUsage().rss), 
      ping: `[ ${stat} || ${ping}ms ]`
    };

    const response = `★ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰 ★\n`
      + '-------------------------------------\n'
      + '⚙  System Information:\n'
      + `  OS: ${systemInfo.os}\n`
      + `  Arch: ${systemInfo.arch}\n`
      + `  CPU: ${systemInfo.cpu}\n`
      + `  Load Avg: ${systemInfo.loadAvg}%\n`
      + '-------------------------------------\n'
      + `💾 Memory Information:\n`
      + `  Memory Usage: \n${prettyBytes(usedMemory)} / Total ${prettyBytes(totalMemory)}\n`
      + `  RAM Usage: \n${prettyBytes(os.totalmem() - os.freemem())} / Total ${prettyBytes(totalMemory)}\n`
      + '-------------------------------------\n'
      + `💿 Disk Space Information:\n`
      + `  Disk Space Usage: \n${prettyBytes(diskUsage.used)} / Total ${prettyBytes(diskUsage.total)}\n`
      + '-------------------------------------\n'
      + `🤖 Bot Uptime: ${systemInfo.botUptime}\n`
      + `⚙ Server Uptime: ${systemInfo.systemUptime}\n` 
      + `📶 Ping: ${systemInfo.ping}\n`
      + `📊 Process Memory Usage: \n${systemInfo.processMemory}\n`
      + '-------------------------------------';

    message.reply(response);
  }
};

async function getDiskUsage() {
  const { stdout } = await exec('df -k /');
  const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);
  return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${days}d ${hours}h ${minutes}m`;
}

function formatMilliseconds(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

function prettyBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

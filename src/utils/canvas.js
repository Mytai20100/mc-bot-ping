const { createCanvas, loadImage } = require('canvas');

// Cache cho server info (30-60s)
const serverCache = new Map();
const CACHE_DURATION = 45000; // 45 seconds

async function createPingImage(latency, apiLatency, lang = 'en') {
  const width = 600;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  try {
    // Load Minecraft dirt background
    const bg = await loadImage('https://cdnb.artstation.com/p/assets/images/images/013/535/601/large/supawit-oat-fin1.jpg');
    ctx.drawImage(bg, 0, 0, width, height);
    
    // Dark overlay for readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, width, height);
  } catch (error) {
    // Fallback to solid color
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
  }

  // Border
  ctx.strokeStyle = '#8B8B8B';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, width, height);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('PONG!', width / 2, 80);

  // Latency info
  const startY = 140;
  const lineHeight = 70;

  // Bot Latency
  ctx.fillStyle = '#AAAAAA';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(lang === 'vi' ? 'Độ trễ Bot:' : 'Bot Latency:', 80, startY);
  
  // Latency value with color based on speed
  const latencyColor = latency < 100 ? '#55FF55' : latency < 200 ? '#FFAA00' : '#FF5555';
  ctx.fillStyle = latencyColor;
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`${latency}ms`, width - 80, startY);

  // API Latency
  ctx.fillStyle = '#AAAAAA';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(lang === 'vi' ? 'Độ trễ API:' : 'API Latency:', 80, startY + lineHeight);
  
  const apiColor = apiLatency < 100 ? '#55FF55' : apiLatency < 200 ? '#FFAA00' : '#FF5555';
  ctx.fillStyle = apiColor;
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`${apiLatency}ms`, width - 80, startY + lineHeight);

  return canvas.toBuffer('image/png');
}

async function createServerPingImage(serverData, address, pingTime, isOnline, lang = 'en') {
  const width = 700;
  const height = 320;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  try {
    // Load Minecraft dirt background
    const bg = await loadImage('https://cdnb.artstation.com/p/assets/images/images/013/535/601/large/supawit-oat-fin1.jpg');
    ctx.drawImage(bg, 0, 0, width, height);
    
    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, width, height);
  } catch (error) {
    // Fallback
    ctx.fillStyle = isOnline ? '#1a3a1a' : '#3a1a1a';
    ctx.fillRect(0, 0, width, height);
  }

  // Border
  ctx.strokeStyle = isOnline ? '#55FF55' : '#FF5555';
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, width, height);

  // Server icon
  const iconSize = 80;
  const iconX = 30;
  const iconY = 30;

  try {
    if (isOnline && serverData && serverData.favicon) {
      const iconData = serverData.favicon.split(',')[1];
      const iconBuffer = Buffer.from(iconData, 'base64');
      const icon = await loadImage(iconBuffer);
      
      ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);
      
      // Icon border
      ctx.strokeStyle = '#8B8B8B';
      ctx.lineWidth = 2;
      ctx.strokeRect(iconX, iconY, iconSize, iconSize);
    } else {
      // Default placeholder
      ctx.fillStyle = '#333333';
      ctx.fillRect(iconX, iconY, iconSize, iconSize);
      ctx.strokeStyle = '#8B8B8B';
      ctx.lineWidth = 2;
      ctx.strokeRect(iconX, iconY, iconSize, iconSize);
      
      ctx.fillStyle = '#AAAAAA';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('?', iconX + iconSize / 2, iconY + iconSize / 2 + 12);
    }
  } catch (error) {
    // Fallback icon
    ctx.fillStyle = '#333333';
    ctx.fillRect(iconX, iconY, iconSize, iconSize);
    ctx.strokeStyle = '#8B8B8B';
    ctx.lineWidth = 2;
    ctx.strokeRect(iconX, iconY, iconSize, iconSize);
  }

  // Server IP
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(address.full, iconX + iconSize + 20, iconY + 30);

  // Version
  if (isOnline && serverData) {
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '20px Arial';
    ctx.fillText(serverData.version?.name || 'Unknown', iconX + iconSize + 20, iconY + 60);
  }

  // Status
  ctx.fillStyle = isOnline ? '#55FF55' : '#FF5555';
  ctx.font = 'bold 18px Arial';
  ctx.fillText(
    isOnline ? (lang === 'vi' ? 'Đang hoạt động' : 'Online') : (lang === 'vi' ? 'Không hoạt động' : 'Offline'),
    iconX + iconSize + 20,
    iconY + 85
  );

  if (isOnline && serverData) {
    // Divider line
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 140);
    ctx.lineTo(width - 30, 140);
    ctx.stroke();

    // Info section
    const infoY = 180;
    const col1X = 50;
    const col2X = width / 2 + 20;

    // Players
    ctx.fillStyle = '#AAAAAA';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(lang === 'vi' ? 'Người chơi:' : 'Players:', col1X, infoY);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '22px Arial';
    ctx.fillText(`${serverData.players?.online || 0}/${serverData.players?.max || 0}`, col1X, infoY + 35);

    // Ping
    ctx.fillStyle = '#AAAAAA';
    ctx.font = 'bold 22px Arial';
    ctx.fillText(lang === 'vi' ? 'Độ trễ:' : 'Ping:', col2X, infoY);
    
    const pingColor = pingTime < 50 ? '#55FF55' : pingTime < 150 ? '#FFAA00' : '#FF5555';
    ctx.fillStyle = pingColor;
    ctx.font = '22px Arial';
    ctx.fillText(`${pingTime}ms`, col2X, infoY + 35);
  }

  return canvas.toBuffer('image/png');
}

async function createServerInfoImage(serverData, address, lang = 'en') {
  const width = 800;
  const height = 450;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  try {
    // Load Minecraft dirt background
    const bg = await loadImage('https://cdnb.artstation.com/p/assets/images/images/013/535/601/large/supawit-oat-fin1.jpg');
    ctx.drawImage(bg, 0, 0, width, height);
    
    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, width, height);
  } catch (error) {
    // Fallback
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
  }

  // Border
  ctx.strokeStyle = '#8B8B8B';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, width, height);

  // Server icon
  const iconSize = 100;
  const iconX = 40;
  const iconY = 40;

  try {
    if (serverData.favicon) {
      const iconData = serverData.favicon.split(',')[1];
      const iconBuffer = Buffer.from(iconData, 'base64');
      const icon = await loadImage(iconBuffer);
      
      ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);
      
      // Icon border
      ctx.strokeStyle = '#8B8B8B';
      ctx.lineWidth = 3;
      ctx.strokeRect(iconX, iconY, iconSize, iconSize);
    } else {
      throw new Error('No favicon');
    }
  } catch (error) {
    // Default icon placeholder
    ctx.fillStyle = '#333333';
    ctx.fillRect(iconX, iconY, iconSize, iconSize);
    ctx.strokeStyle = '#8B8B8B';
    ctx.lineWidth = 3;
    ctx.strokeRect(iconX, iconY, iconSize, iconSize);
    
    ctx.fillStyle = '#AAAAAA';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MC', iconX + iconSize / 2, iconY + iconSize / 2 + 15);
  }

  // Server address
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(address.full, iconX + iconSize + 25, iconY + 35);

  // Status
  ctx.fillStyle = '#55FF55';
  ctx.font = '18px Arial';
  ctx.fillText(lang === 'vi' ? 'Đang hoạt động' : 'Online', iconX + iconSize + 25, iconY + 65);

  // MOTD
  let motdText = 'A Minecraft Server';
  try {
    if (serverData.motd) {
      if (typeof serverData.motd === 'string') {
        motdText = serverData.motd.replace(/§[0-9a-fk-or]/gi, '');
      } else if (serverData.motd.clean) {
        motdText = serverData.motd.clean;
      } else if (serverData.motd.raw) {
        motdText = serverData.motd.raw.replace(/§[0-9a-fk-or]/gi, '');
      }
    }
  } catch (error) {
    console.error('Error parsing MOTD:', error);
  }

  ctx.fillStyle = '#AAAAAA';
  ctx.font = '18px Arial';
  const motdLines = wrapText(ctx, motdText, width - (iconX + iconSize + 50));
  motdLines.forEach((line, i) => {
    ctx.fillText(line, iconX + iconSize + 25, iconY + 95 + (i * 25));
  });

  // Divider line
  const dividerY = 180;
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, dividerY);
  ctx.lineTo(width - 40, dividerY);
  ctx.stroke();

  // Info section
  const infoY = dividerY + 50;
  const leftCol = 60;
  const rightCol = width / 2 + 40;
  const lineSpacing = 60;

  // Players
  ctx.fillStyle = '#AAAAAA';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(lang === 'vi' ? 'Người chơi:' : 'Players:', leftCol, infoY);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '24px Arial';
  ctx.fillText(`${serverData.players?.online || 0}/${serverData.players?.max || 0}`, leftCol, infoY + 35);

  // Version
  ctx.fillStyle = '#AAAAAA';
  ctx.font = 'bold 24px Arial';
  ctx.fillText(lang === 'vi' ? 'Phiên bản:' : 'Version:', leftCol, infoY + lineSpacing + 20);
  ctx.fillStyle = '#55FFFF';
  ctx.font = '24px Arial';
  const versionText = serverData.version?.name || 'Unknown';
  ctx.fillText(versionText, leftCol, infoY + lineSpacing + 55);

  // Latency
  ctx.fillStyle = '#AAAAAA';
  ctx.font = 'bold 24px Arial';
  ctx.fillText(lang === 'vi' ? 'Độ trễ:' : 'Latency:', rightCol, infoY);
  
  const latency = serverData.roundTripLatency || 0;
  const latencyColor = latency < 50 ? '#55FF55' : latency < 150 ? '#FFAA00' : '#FF5555';
  ctx.fillStyle = latencyColor;
  ctx.font = '24px Arial';
  ctx.fillText(`${latency}ms`, rightCol, infoY + 35);

  // Protocol
  ctx.fillStyle = '#AAAAAA';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('Protocol:', rightCol, infoY + lineSpacing + 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '24px Arial';
  ctx.fillText(`${serverData.version?.protocol || 'N/A'}`, rightCol, infoY + lineSpacing + 55);

  return canvas.toBuffer('image/png');
}

async function createBotInfoImage(client, lang = 'en') {
  const width = 700;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  try {
    // Load Minecraft dirt background
    const bg = await loadImage('https://cdnb.artstation.com/p/assets/images/images/013/535/601/large/supawit-oat-fin1.jpg');
    ctx.drawImage(bg, 0, 0, width, height);
    
    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, width, height);
  } catch (error) {
    // Fallback
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, width, height);
  }

  // Border
  ctx.strokeStyle = '#8B8B8B';
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, width, height);

  // Bot avatar
  try {
    const avatar = await loadImage(client.user.displayAvatarURL({ extension: 'png', size: 128 }));
    const avatarSize = 120;
    const avatarX = width / 2 - avatarSize / 2;
    const avatarY = 40;
    
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    
    // Avatar border
    ctx.strokeStyle = '#55FFFF';
    ctx.lineWidth = 4;
    ctx.strokeRect(avatarX, avatarY, avatarSize, avatarSize);
  } catch (error) {
    console.error('Failed to load avatar:', error);
  }

  // Bot name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(client.user.username, width / 2, 200);

  // Info grid
  const startY = 260;
  const lineHeight = 50;
  
  const { formatUptime } = require('./minecraft');
  const uptime = process.uptime();
  
  const info = [
    { label: lang === 'vi' ? 'Phiên bản' : 'Version', value: '1.0.0' },
    { label: lang === 'vi' ? 'Thời gian hoạt động' : 'Uptime', value: formatUptime(uptime) },
    { label: lang === 'vi' ? 'Servers' : 'Servers', value: client.guilds.cache.size.toString() },
    { label: lang === 'vi' ? 'Cấp độ' : 'Level', value: '90000' },
    { label: lang === 'vi' ? 'Kinh nghiệm' : 'XP', value: '-1e+23' }
  ];

  ctx.textAlign = 'left';
  info.forEach((item, i) => {
    const y = startY + (i * lineHeight);
    
    ctx.fillStyle = '#55FFFF';
    ctx.font = 'bold 22px Arial';
    ctx.fillText(item.label, 80, y);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '22px Arial';
    ctx.fillText(item.value, 350, y);
  });

  // GitHub link
  ctx.fillStyle = '#AAAAAA';
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('github.com/Mytai20100/mc-bot-ping', width / 2, height - 30);

  return canvas.toBuffer('image/png');
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, 2);
}

// Cache utilities
function getCachedServer(address) {
  const cacheKey = `${address.host}:${address.port}`;
  const cached = serverCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  return null;
}

function setCachedServer(address, data) {
  const cacheKey = `${address.host}:${address.port}`;
  serverCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}

module.exports = {
  createPingImage,
  createServerPingImage,
  createServerInfoImage,
  createBotInfoImage,
  getCachedServer,
  setCachedServer
};
function parseServerAddress(text) {
  // Match IP:port or domain:port patterns
  const ipPattern = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::\d{1,5})?/;
  const domainPattern = /(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?/;
  
  let match = text.match(ipPattern) || text.match(domainPattern);
  
  if (match) {
    const address = match[0];
    const [host, port] = address.split(':');
    return {
      host: host,
      port: port ? parseInt(port) : 25565,
      full: address
    };
  }
  
  return null;
}

function formatUptime(uptime) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  
  return parts.join(' ') || '0s';
}

module.exports = {
  parseServerAddress,
  formatUptime
};
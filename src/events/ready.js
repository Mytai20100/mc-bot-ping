const { ActivityType, PresenceUpdateStatus } = require('discord.js');

module.exports = {
  name: 'clientReady',
  once: true,
  execute(client) {

    console.clear();

    console.log(`
======================================================
MC BOT PING - Discord Bot
Version: 1.0.0
Developer: Mytai
GitHub: https://github.com/Mytai20100/mc-bot-ping
======================================================
`);

    console.log(`Status     : Logged in`);
    console.log(`Bot        : ${client.user.tag}`);
    console.log(`Servers    : ${client.guilds.cache.size}`);
    console.log(`Started at : ${new Date().toLocaleString()}`);
    console.log('');

    const updatePresence = () => {
      client.user.setPresence({
        activities: [{
          name: `${client.guilds.cache.size} servers`,
          type: ActivityType.Playing
        }],
        status: PresenceUpdateStatus.Idle
      });
    };

    updatePresence();
    setInterval(updatePresence, 300000);
  }
};

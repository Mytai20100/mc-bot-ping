const { parseServerAddress } = require('../utils/minecraft');
const { createServerInfoImage } = require('../utils/canvas');
const { status } = require('minecraft-server-util');

module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (!message || !message.author) return;
    if (message.author.bot) return;

    const isSetupChannel = client.setupChannels.has(message.channel.id);

    if (message.content.startsWith('!')) {
      const args = message.content.slice(1).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);

      if (command) {
        try {
          await command.execute(message, args, client);
        } catch (error) {
          console.error(error);
          message.reply('An error occurred while executing the command.');
        }
      }
    }

    if (isSetupChannel && !message.content.startsWith('!') && !message.content.startsWith('/')) {
      const serverAddress = parseServerAddress(message.content);

      if (serverAddress) {
        const lang = client.userLanguages.get(message.author.id) || 'en';
        const languages = require('../config/languages');
        const t = languages[lang];

        try {
          const msg = await message.reply(t.serverInfo.generating);

          const result = await status(
            serverAddress.host,
            serverAddress.port,
            { timeout: 5000 }
          );

          const imageBuffer = await createServerInfoImage(result, serverAddress, lang);

          await msg.edit({
            content: '',
            files: [{
              attachment: imageBuffer,
              name: 'server-info.png'
            }]
          });
        } catch (error) {
          console.error(error);
          message.reply(t.serverInfo.error);
        }
      }
    }
  }
};

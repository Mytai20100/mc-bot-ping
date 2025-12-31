const { createBotInfoImage } = require('../utils/canvas');
const languages = require('../config/languages');

module.exports = {
  name: 'info',
  description: 'Display bot information',
  async execute(message, args, client) {
    const lang = client.userLanguages.get(message.author.id) || 'en';
    
    try {
      const imageBuffer = await createBotInfoImage(client, lang);
      
      await message.reply({
        files: [{
          attachment: imageBuffer,
          name: 'bot-info.png'
        }]
      });
    } catch (error) {
      console.error(error);
      message.reply('Failed to generate information.');
    }
  },
  async executeSlash(interaction, client) {
    const lang = client.userLanguages.get(interaction.user.id) || 'en';
    
    await interaction.deferReply();
    
    try {
      const imageBuffer = await createBotInfoImage(client, lang);
      
      await interaction.editReply({
        files: [{
          attachment: imageBuffer,
          name: 'bot-info.png'
        }]
      });
    } catch (error) {
      console.error(error);
      interaction.editReply('Failed to generate information.');
    }
  }
};
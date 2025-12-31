const languages = require('../config/languages');
const { createPingImage } = require('../utils/canvas');

module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  async execute(message, args, client) {
    const lang = client.userLanguages.get(message.author.id) || 'en';
    const t = languages[lang];
    
    const sent = await message.reply('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);
    
    try {
      const imageBuffer = await createPingImage(latency, apiLatency, lang);
      
      await sent.edit({
        content: '',
        files: [{
          attachment: imageBuffer,
          name: 'ping.png'
        }]
      });
    } catch (error) {
      console.error('Error creating ping image:', error);
      // Fallback to text
      sent.edit(`${t.ping.title}\n**${t.ping.latency}:** ${latency}ms\n**${t.ping.apiLatency}:** ${apiLatency}ms`);
    }
  },
  async executeSlash(interaction, client) {
    const lang = client.userLanguages.get(interaction.user.id) || 'en';
    const t = languages[lang];
    
    await interaction.deferReply();
    
    const apiLatency = Math.round(client.ws.ping);
    // For slash commands, we estimate latency
    const latency = apiLatency;
    
    try {
      const imageBuffer = await createPingImage(latency, apiLatency, lang);
      
      await interaction.editReply({
        files: [{
          attachment: imageBuffer,
          name: 'ping.png'
        }]
      });
    } catch (error) {
      console.error('Error creating ping image:', error);
      // Fallback to text
      await interaction.editReply(`${t.ping.title}\n**${t.ping.apiLatency}:** ${apiLatency}ms`);
    }
  }
};
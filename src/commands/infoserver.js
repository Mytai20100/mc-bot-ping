const { status } = require('minecraft-server-util');
const { parseServerAddress } = require('../utils/minecraft');
const { createServerInfoImage, getCachedServer, setCachedServer } = require('../utils/canvas');
const languages = require('../config/languages');

module.exports = {
  name: 'infoserver',
  description: 'Get detailed information about a Minecraft server',
  async execute(message, args, client) {
    const lang = client.userLanguages.get(message.author.id) || 'en';
    const t = languages[lang];
    
    if (!args[0]) {
      return message.reply(t.errors.invalidIP);
    }
    
    const serverAddress = parseServerAddress(args[0]);
    
    if (!serverAddress) {
      return message.reply(t.errors.invalidIP);
    }
    
    const msg = await message.reply(t.serverInfo.generating);
    
    try {
      // Check cache first
      let result = getCachedServer(serverAddress);
      
      if (!result) {
        // Not cached, fetch server info
        result = await status(serverAddress.host, serverAddress.port, { 
          timeout: 5000,
          enableSRV: true
        });
        
        // Cache the result
        setCachedServer(serverAddress, result);
      }
      
      const imageBuffer = await createServerInfoImage(result, serverAddress, lang);
      
      await msg.edit({
        content: '',
        files: [{
          attachment: imageBuffer,
          name: 'server-info.png'
        }]
      });
    } catch (error) {
      console.error('Server info error:', error);
      
      let errorMsg = t.serverInfo.error;
      
      // Provide specific error messages
      if (error.code === 'ECONNREFUSED') {
        errorMsg = t.errors.timeout;
      } else if (error.code === 'ETIMEDOUT') {
        errorMsg = t.errors.timeout;
      } else if (error.message?.includes('Invalid')) {
        errorMsg = t.errors.invalidIP;
      }
      
      msg.edit(`${errorMsg}\n **Server:** ${serverAddress.full}`);
    }
  },
  async executeSlash(interaction, client) {
    const lang = client.userLanguages.get(interaction.user.id) || 'en';
    const t = languages[lang];
    
    const serverInput = interaction.options.getString('server');
    
    if (!serverInput) {
      return interaction.reply({ content: t.errors.invalidIP, ephemeral: true });
    }
    
    const serverAddress = parseServerAddress(serverInput);
    
    if (!serverAddress) {
      return interaction.reply({ content: t.errors.invalidIP, ephemeral: true });
    }
    
    await interaction.deferReply();
    
    try {
      // Check cache first
      let result = getCachedServer(serverAddress);
      
      if (!result) {
        // Not cached, fetch server info
        result = await status(serverAddress.host, serverAddress.port, { 
          timeout: 5000,
          enableSRV: true
        });
        
        // Cache the result
        setCachedServer(serverAddress, result);
      }
      
      const imageBuffer = await createServerInfoImage(result, serverAddress, lang);
      
      await interaction.editReply({
        files: [{
          attachment: imageBuffer,
          name: 'server-info.png'
        }]
      });
    } catch (error) {
      console.error('Server info error:', error);
      
      let errorMsg = t.serverInfo.error;
      
      // Provide specific error messages
      if (error.code === 'ECONNREFUSED') {
        errorMsg = t.errors.timeout;
      } else if (error.code === 'ETIMEDOUT') {
        errorMsg = t.errors.timeout;
      } else if (error.message?.includes('Invalid')) {
        errorMsg = t.errors.invalidIP;
      }
      
      interaction.editReply(`${errorMsg}\n **Server:** ${serverAddress.full}`);
    }
  }
};
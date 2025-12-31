const { status } = require('minecraft-server-util');
const { parseServerAddress } = require('../utils/minecraft');
const { createServerPingImage, getCachedServer, setCachedServer } = require('../utils/canvas');
const languages = require('../config/languages');

module.exports = {
  name: 'pingserver',
  description: 'Ping a Minecraft server',
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
    
    const msg = await message.reply(t.serverPing.pinging);
    
    try {
      // Check cache first
      let result = getCachedServer(serverAddress);
      let pingTime;
      
      if (!result) {
        // Not cached, ping the server
        const startTime = Date.now();
        result = await status(serverAddress.host, serverAddress.port, { 
          timeout: 5000,
          enableSRV: true
        });
        pingTime = Date.now() - startTime;
        
        // Cache the result
        setCachedServer(serverAddress, { ...result, pingTime });
      } else {
        pingTime = result.pingTime || result.roundTripLatency || 0;
      }
      
      // Create canvas image
      const imageBuffer = await createServerPingImage(result, serverAddress, pingTime, true, lang);
      
      await msg.edit({
        content: '',
        files: [{
          attachment: imageBuffer,
          name: 'server-ping.png'
        }]
      });
    } catch (error) {
      console.error('Ping server error:', error);
      
      try {
        // Server offline - create offline image
        const imageBuffer = await createServerPingImage(null, serverAddress, 0, false, lang);
        
        await msg.edit({
          content: '',
          files: [{
            attachment: imageBuffer,
            name: 'server-ping.png'
          }]
        });
      } catch (imgError) {
        console.error('Error creating offline image:', imgError);
        // Fallback to text
        msg.edit(
          `${t.serverPing.title}\n` +
          `**${t.serverPing.offline}**\n` +
          `📍 **Server:** ${serverAddress.full}`
        );
      }
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
      let pingTime;
      
      if (!result) {
        // Not cached, ping the server
        const startTime = Date.now();
        result = await status(serverAddress.host, serverAddress.port, { 
          timeout: 5000,
          enableSRV: true
        });
        pingTime = Date.now() - startTime;
        
        // Cache the result
        setCachedServer(serverAddress, { ...result, pingTime });
      } else {
        pingTime = result.pingTime || result.roundTripLatency || 0;
      }
      
      // Create canvas image
      const imageBuffer = await createServerPingImage(result, serverAddress, pingTime, true, lang);
      
      await interaction.editReply({
        files: [{
          attachment: imageBuffer,
          name: 'server-ping.png'
        }]
      });
    } catch (error) {
      console.error('Ping server error:', error);
      
      try {
        // Server offline - create offline image
        const imageBuffer = await createServerPingImage(null, serverAddress, 0, false, lang);
        
        await interaction.editReply({
          files: [{
            attachment: imageBuffer,
            name: 'server-ping.png'
          }]
        });
      } catch (imgError) {
        console.error('Error creating offline image:', imgError);
        // Fallback to text
        interaction.editReply(
          `${t.serverPing.title}\n` +
          `**${t.serverPing.offline}**\n` +
          `📍 **Server:** ${serverAddress.full}`
        );
      }
    }
  }
};
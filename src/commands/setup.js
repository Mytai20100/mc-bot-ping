const { PermissionFlagsBits } = require('discord.js');
const languages = require('../config/languages');

module.exports = {
  name: 'setup',
  description: 'Setup bot to monitor a channel (Admin only)',
  async execute(message, args, client) {
    const lang = client.userLanguages.get(message.author.id) || 'en';
    const t = languages[lang];
    
    // Check if user has admin permission
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return message.reply(t.setup.noPermission);
    }
    
    let channel;
    
    // Parse arguments
    if (args[0] === 'create' && args[1]) {
      // /setup create channel-name or /setup create <#123456>
      const channelMention = args[1].match(/^<#(\d+)>$/);
      if (channelMention) {
        channel = message.guild.channels.cache.get(channelMention[1]);
      } else {
        // Try to find channel by name
        channel = message.guild.channels.cache.find(ch => ch.name === args[1]);
      }
    } else if (args[0] && args[0].startsWith('<#')) {
      // /setup <#123456>
      const channelMention = args[0].match(/^<#(\d+)>$/);
      if (channelMention) {
        channel = message.guild.channels.cache.get(channelMention[1]);
      }
    }
    
    if (!channel) {
      return message.reply(t.setup.invalidChannel);
    }
    
    // Save channel to setup channels
    client.setupChannels.set(channel.id, {
      guildId: message.guild.id,
      channelId: channel.id
    });
    
    message.reply(`${t.setup.success} <#${channel.id}>`);
  },
  async executeSlash(interaction, client) {
    const lang = client.userLanguages.get(interaction.user.id) || 'en';
    const t = languages[lang];
    
    // Check if user has admin permission
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: t.setup.noPermission, ephemeral: true });
    }
    
    const subcommand = interaction.options.getSubcommand();
    const channel = interaction.options.getChannel('channel');
    
    if (!channel) {
      return interaction.reply({ content: t.setup.invalidChannel, ephemeral: true });
    }
    
    // Save channel to setup channels
    client.setupChannels.set(channel.id, {
      guildId: interaction.guild.id,
      channelId: channel.id
    });
    
    interaction.reply(`${t.setup.success} <#${channel.id}>`);
  }
};
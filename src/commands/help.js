const { EmbedBuilder } = require('discord.js');
const languages = require('../config/languages');

module.exports = {
  name: 'help',
  description: 'Display all available commands',
  async execute(message, args, client) {
    const lang = client.userLanguages.get(message.author.id) || 'en';
    const t = languages[lang];
    
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(t.help.title)
      .setDescription(t.help.description)
      .addFields(
        {
          name: `${t.help.commands.ping.name}`,
          value: t.help.commands.ping.description,
          inline: false
        },
        {
          name: `${t.help.commands.pingserver.name}`,
          value: t.help.commands.pingserver.description,
          inline: false
        },
        {
          name: `${t.help.commands.infoserver.name}`,
          value: t.help.commands.infoserver.description,
          inline: false
        },
        {
          name: `${t.help.commands.info.name}`,
          value: t.help.commands.info.description,
          inline: false
        },
        {
          name: `${t.help.commands.lang.name}`,
          value: t.help.commands.lang.description,
          inline: false
        },
        {
          name: `${t.help.commands.setup.name}`,
          value: t.help.commands.setup.description,
          inline: false
        }
      )
      .setFooter({ text: t.help.footer })
      .setTimestamp();
    
    message.reply({ embeds: [embed] });
  },
  async executeSlash(interaction, client) {
    const lang = client.userLanguages.get(interaction.user.id) || 'en';
    const t = languages[lang];
    
    const embed = new EmbedBuilder()
      .setColor('#9cb415')
      .setTitle(t.help.title)
      .setDescription(t.help.description)
      .addFields(
        {
          name: `${t.help.commands.ping.name}`,
          value: t.help.commands.ping.description,
          inline: false
        },
        {
          name: `${t.help.commands.pingserver.name}`,
          value: t.help.commands.pingserver.description,
          inline: false
        },
        {
          name: `${t.help.commands.infoserver.name}`,
          value: t.help.commands.infoserver.description,
          inline: false
        },
        {
          name: `${t.help.commands.info.name}`,
          value: t.help.commands.info.description,
          inline: false
        },
        {
          name: `${t.help.commands.lang.name}`,
          value: t.help.commands.lang.description,
          inline: false
        },
        {
          name: `${t.help.commands.setup.name}`,
          value: t.help.commands.setup.description,
          inline: false
        }
      )
      .setFooter({ text: t.help.footer })
      .setTimestamp();
    
    interaction.reply({ embeds: [embed] });
  }
};
const languages = require('../config/languages');

module.exports = {
  name: 'lang',
  description: 'Set your preferred language',
  async execute(message, args, client) {
    const currentLang = client.userLanguages.get(message.author.id) || 'en';
    const t = languages[currentLang];
    
    if (!args[0]) {
      return message.reply(`Current language: **${currentLang}**\nAvailable: en, vi`);
    }
    
    const newLang = args[0].toLowerCase();
    
    if (!languages[newLang]) {
      return message.reply(t.language.invalid);
    }
    
    client.userLanguages.set(message.author.id, newLang);
    
    const newT = languages[newLang];
    message.reply(`${newT.language.set} **${newLang}**`);
  },
  async executeSlash(interaction, client) {
    const currentLang = client.userLanguages.get(interaction.user.id) || 'en';
    const newLang = interaction.options.getString('language');
    
    if (!languages[newLang]) {
      const t = languages[currentLang];
      return interaction.reply({ content: t.language.invalid, ephemeral: true });
    }
    
    client.userLanguages.set(interaction.user.id, newLang);
    
    const newT = languages[newLang];
    interaction.reply(`${newT.language.set} **${newLang}**`);
  }
};
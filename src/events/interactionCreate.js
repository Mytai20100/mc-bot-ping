module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {  
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.executeSlash(interaction, client);
    } catch (error) {
      console.error('Error executing slash command:', error);
      const errorMessage = 'There was an error executing this command!';
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  }
};
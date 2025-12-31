module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.executeSlash(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true
      });
    }
  }
};
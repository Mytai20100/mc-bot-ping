require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  SlashCommandBuilder
} = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
client.setupChannels = new Collection();
client.userLanguages = new Collection();

/* Load commands */
const commandFiles = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/* Load events */
const eventFiles = fs
  .readdirSync(path.join(__dirname, 'events'))
  .filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

/* Interaction handling is done in events/interactionCreate.js */

/* Register slash commands when bot is ready */
client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // Define slash commands
  const commands = [
    new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Check bot latency'),
    
    new SlashCommandBuilder()
      .setName('pingserver')
      .setDescription('Ping a Minecraft server')
      .addStringOption(option =>
        option.setName('server')
          .setDescription('Server address (e.g., hypixel.net or play.example.com:25565)')
          .setRequired(true)),
    
    new SlashCommandBuilder()
      .setName('infoserver')
      .setDescription('Get detailed information about a Minecraft server')
      .addStringOption(option =>
        option.setName('server')
          .setDescription('Server address (e.g., hypixel.net or play.example.com:25565)')
          .setRequired(true)),
    
    new SlashCommandBuilder()
      .setName('info')
      .setDescription('Display bot information'),
    
    new SlashCommandBuilder()
      .setName('lang')
      .setDescription('Set your preferred language')
      .addStringOption(option =>
        option.setName('language')
          .setDescription('Choose your language')
          .setRequired(true)
          .addChoices(
            { name: 'English', value: 'en' },
            { name: 'Tiếng Việt', value: 'vi' }
          )),
    
    new SlashCommandBuilder()
      .setName('setup')
      .setDescription('Setup bot to monitor a channel (Admin only)')
      .addSubcommand(subcommand =>
        subcommand
          .setName('create')
          .setDescription('Create or set monitoring channel')
          .addChannelOption(option =>
            option.setName('channel')
              .setDescription('Channel to monitor')
              .setRequired(true))),
    
    new SlashCommandBuilder()
      .setName('help')
      .setDescription('Display all available commands')
  ].map(command => command.toJSON());

  // Register commands
  const rest = new REST().setToken(process.env.DISCORD_TOKEN);
  
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Fetch existing commands to preserve Entry Point Command
    const existingCommands = await rest.get(
      Routes.applicationCommands(client.user.id)
    );

    // Find Entry Point Command (usually has integration_types or contexts)
    const entryPointCommand = existingCommands.find(cmd => 
      cmd.integration_types || cmd.contexts
    );

    // If Entry Point Command exists, include it in the update
    let finalCommands = commands;
    if (entryPointCommand) {
      console.log('Found Entry Point Command, preserving it...');
      finalCommands = [...commands, entryPointCommand];
    }

    const data = await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: finalCommands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
});

client.login(process.env.DISCORD_TOKEN);
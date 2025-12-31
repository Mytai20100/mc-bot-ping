# MC Bot Ping

[![Discord Bot](https://img.shields.io/badge/discord-bot-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1274011632300982293)
[![GitHub](https://img.shields.io/badge/github-repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mytai20100/mc-bot-ping)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org)

A Discord bot that monitors and displays Minecraft server status with detailed information and visual canvas rendering.

## Quick Start

**[My bot =)) ](https://discord.com/oauth2/authorize?client_id=1274011632300982293)**

## Features

- Admin setup commands for monitoring channels
- Ping Discord and Minecraft servers
- Detailed server information with canvas images
- Multi-language support (English and Vietnamese)
- Auto-detect Minecraft server IPs in configured channels
- Fast server status checking
- Shows number of servers in bot presence

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/Mytai20100/mc-bot-ping.git
cd mc-bot-ping
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Bot

Create a `.env` file:
```bash
cp .env.example .env
```

Add your credentials:
```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_bot_client_id
```

### 4. Start Bot
```bash
npm start
```

## Commands

### Prefix Commands

| Command | Description |
|---------|-------------|
| `!ping` | Test bot latency to Discord |
| `!pingserver <ip:port>` | Ping a Minecraft server |
| `!infoserver <ip:port>` | Get detailed server information |
| `!info` | Display bot information |
| `!lang <language>` | Set language (en/vi) |

### Slash Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/setup create <channel>` | Setup monitoring channel | Admin |
| `/ping` | Test bot latency | Everyone |
| `/pingserver <ip:port>` | Ping Minecraft server | Everyone |
| `/infoserver <ip:port>` | Get server info with canvas | Everyone |
| `/info` | Display bot information | Everyone |
| `/lang <language>` | Set language preference | Everyone |

### Auto-Detection

In channels configured with `/setup`, send a Minecraft server IP and the bot will automatically respond with server information.

## Usage Examples
```
!pingserver play.hypixel.net
/infoserver play.hypixel.net:25565
!infoserver play.hypixel.net:25565
```

## Requirements

- Node.js 16.x or higher
- Discord.js v14
- Canvas
- minecraft-server-util

## Project Structure
```
mc-bot-ping/
├── src/
│   ├── index.js
│   ├── commands/
│   │   ├── ping.js
│   │   ├── setup.js
│   │   ├── pingserver.js
│   │   ├── infoserver.js
│   │   ├── info.js
│   │   └── lang.js
│   ├── events/
│   │   ├── ready.js
│   │   ├── messageCreate.js
│   │   └── interactionCreate.js
│   ├── utils/
│   │   ├── minecraft.js
│   │   └── canvas.js
│   └── config/
│       └── languages.js
├── deploy-commands.js
├── package.json
├── .env.example
└── README.md
```

## Required Permissions

- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Use Slash Commands
- Manage Messages

## Language Support

- English (en)
- Vietnamese (vi)

Change language with `/lang <language>` command.

## Contributing

Contributions are welcome. Please:
- Report bugs via GitHub issues
- Suggest features
- Submit pull requests

## License

MIT License

## Author

Created by [Mytai20100](https://github.com/Mytai20100)
# Change logs
- 1/1/2026 =))))) idk 
---

[![Stars](https://img.shields.io/github/stars/Mytai20100/mc-bot-ping?style=social)](https://github.com/Mytai20100/mc-bot-ping)
[![Forks](https://img.shields.io/github/forks/Mytai20100/mc-bot-ping?style=social)](https://github.com/Mytai20100/mc-bot-ping)
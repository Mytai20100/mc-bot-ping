module.exports = {
  en: {
    ping: {
      title: 'Pong!',
      latency: 'Latency',
      apiLatency: 'API Latency'
    },
    setup: {
      success: 'Setup complete! I will now monitor messages in',
      error: 'Failed to setup channel',
      noPermission: 'You need Administrator permission to use this command',
      invalidChannel: 'Invalid channel provided'
    },
    serverPing: {
      title: 'Minecraft Server Ping',
      pinging: 'Pinging server...',
      online: 'Server Online',
      offline: 'Server Offline',
      latency: 'Latency',
      error: 'Failed to ping server'
    },
    serverInfo: {
      title: 'Server Information',
      players: 'Players',
      version: 'Version',
      motd: 'MOTD',
      generating: 'Generating server info...',
      error: 'Failed to get server information'
    },
    botInfo: {
      title: ' Bot Information',
      version: 'Version',
      uptime: 'Uptime',
      level: 'Level',
      xp: 'XP',
      servers: 'Servers'
    },
    language: {
      set: 'Language set to',
      invalid: 'Invalid language. Use: en, vi'
    },
    help: {
      title: 'Command Help',
      description: 'Here are all available commands:',
      footer: 'Use pr! or slash commands (/) to execute commands',
      commands: {
        ping: {
          name: '!ping',
          description: '```Check the bot\'s latency and API response time```'
        },
        pingserver: {
          name: '!pingserver <server:port>',
          description: '```Ping a Minecraft server to check if it\'s online\nExample: !pingserver hypixel.net```'
        },
        infoserver: {
          name: '!infoserver <server:port>',
          description: '```Get detailed information about a Minecraft server\nExample: !infoserver play.example.com:25565```'
        },
        info: {
          name: '!info',
          description: '```Display bot information including version, uptime, and statistics```'
        },
        lang: {
          name: '!lang <en|vi>',
          description: '```Change your preferred language\nExample: !lang vi```'
        },
        setup: {
          name: '!setup <#channel>',
          description: '```(Admin Only) Setup bot to monitor a specific channel\nExample: !setup #minecraft-chat```'
        }
      }
    },
    errors: {
      invalidIP: 'Invalid IP address or port',
      timeout: 'Connection timeout',
      unknown: 'An unknown error occurred'
    }
  },
  vi: {
    ping: {
      title: 'Pong!',
      latency: 'Độ trễ',
      apiLatency: 'Độ trễ API'
    },
    setup: {
      success: 'Sóc lọ thành công! Teo sẽ vừa lọ vừa theo dõi tin nhắn trong',
      error: 'Không thể cài đặt kênh do mày gà á!',
      noPermission: 'Mày cần quyền Administrator để sử dụng lệnh này',
      invalidChannel: 'Kênh không hợp lệ . Mày ngu vaiz'
    },
    serverPing: {
      title: 'Nhìn moẹ gì cắn giờ',
      pinging: 'Đang bắn tinh vô server...',
      online: 'Server Đang đang lọ đc',
      offline: 'Cụ ra đi chân lạnh toát',
      latency: 'Độ lì',
      error: 'Không thể bắn tinh đến server'
    },
    serverInfo: {
      title: 'Thông Tin Server',
      players: 'Người chơi sayget',
      version: 'Phiên bản',
      motd: 'Mô tả',
      generating: 'Đang tạo thông tin server...',
      error: 'Không thể lấy thông tin server'
    },
    botInfo: {
      title: 'Thông Tin Bot',
      version: 'Phiên bản',
      uptime: 'Thời gian hoạt động',
      level: 'Cấp độ tu hành',
      xp: 'Kinh nghiệm tu hành',
      servers: 'Servers'
    },
    language: {
      set: 'Đã đặt ngôn ngữ thành',
      invalid: 'Ngôn ngữ không hợp lệ. Do mày ngu ko phải lỗi tao sử dụng: en, vi'
    },
    help: {
      title: 'Hướng Dẫn tu hành',
      description: 'Đây là tất cả các lệnh có sẵn mày mà sài lệnh khác thì bố chịu:',
      footer: 'Sử dụng ! hoặc lệnh slash (/) để thực sóc',
      commands: {
        ping: {
          name: '!ping',
          description: '```đếu cần quan tâm```'
        },
        pingserver: {
          name: '!pingserver <server:port>',
          description: '```Bắn tinh vô mặt thằng admin\nVí dụ: !pingserver hentaiz.vn```'
        },
        infoserver: {
          name: '!infoserver <server:port>',
          description: '```AI mà bt\nVí dụ: !infoserver hentaiz.vn```'
        },
        info: {
          name: '!info',
          description: '```????```'
        },
        lang: {
          name: '!lang <en|vi>',
          description: '```Thay đổi ngôn ngữ\nVí dụ: !lang vi```'
        },
        setup: {
          name: '!setup <#channel>',
          description: '```(Chỉ Admin)Tự biết đê\nVí dụ: !setup #hentaiz```'
        }
      }
    },
    errors: {
      invalidIP: 'Địa chỉ IP hoặc cổng không hợp lệ .Ờm hết cứu',
      timeout: 'Hết thời gian kết nối .Moẹ thằng admin đi lọ rồi kệ moẹ nó đi',
      unknown: 'Đã xảy ra lỗi không xác định. Ò do teo nhu đc chưa vừa lòng mày chưa'
    }
  }
};
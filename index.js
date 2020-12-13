const TelegramBat = require('node-telegram-bot-api')

const TOKEN = "1064268202:AAHjoe3ejPaERtDkkiG-eDEmkZDKPROt94g"

const bot = new TelegramBat(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
})

bot.on('message', msg => {

  switch (msg.text) {
    case "Hello":
      bot.sendMessage(msg.chat.id, 'Hello')
          break
    case "Привет":
      bot.sendMessage(msg.chat.id, 'Здраствуйте')
          break
    default:
      bot.sendMessage(msg.chat.id, 'Я здесь я на месте')
          break
  }
})


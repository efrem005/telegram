// https://core.telegram.org/bots/api
//   https://github.com/yagop/node-telegram-bot-api
//     https://nodejs.org/en/
//       https://core.telegram.org

const TelegramBat = require('node-telegram-bot-api')

const TOKEN = "1064268202:AAEwzu8IgZVN5CkfSZDc1x1LQVo-3r6R3TM"

const bot = new TelegramBat(TOKEN, {
  polling: true
})

bot.on('message', (msg) => {
  console.log(msg)
  bot.sendMessage(msg.chat.id, `<strong>Привет</strong> <a href="https://efrem005.github.io/MeteoHome/">GITHUB</a> <pre>${msg.from.first_name}</pre>`, {
    parse_mode: "HTML"
  })
})
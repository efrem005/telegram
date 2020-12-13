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
  console.log(msg.text)

  if (msg.text >= 0 || msg.text <= 500) {
    bot.sendMessage(msg.chat.id, App(msg.text))
  } else {
    bot.sendMessage(msg.chat.id, 'Что то пошло не так')
  }
})
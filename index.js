const Telegraf = require('telegraf')
const {chatAction, tempData, tempMessage, getStart} = require("./function/function")
require('dotenv').config()
const {BOT_TOKEN, PORT, URL} = process.env

const bot = new Telegraf(BOT_TOKEN)


bot.start((ctx) => {
    getStart(bot, ctx)
})

bot.action("tempMeteo", async ctx => {
    chatAction(bot, ctx)
    try {
        const res = await tempData.getMeteoData()
        bot.telegram.sendMessage(ctx.chat.id, tempMessage(res),
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: "назад", callback_data: 'and'}
                        ]
                    ],
                    resize_keyboard: true
                }
            })
    } catch (e) {
        console.log(e)
    }
})

bot.action("and", ctx => {
    try {
        ctx.answerCbQuery()
        getStart(bot, ctx)
    } catch (e) {
        console.log(e)
    }
})

if (process.env.NODE_ENV === 'production') {
    bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`)
    bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)
    console.log('Started with Webhook')
} else {
    bot.launch().then(req => console.log("Start Telegram start local"))
}
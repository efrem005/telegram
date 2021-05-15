const fetch = require('node-fetch')
const Telegraf = require('telegraf')
require('dotenv').config()
const { BOT_TOKEN, TEMP_URL, PORT=5000, URL } = process.env

const bot = new Telegraf(BOT_TOKEN)


bot.start((ctx) => {
    bot.telegram.sendMessage(ctx.message.chat.id, `Hello world`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Температура", callback_data: "tempMeteo"}
                    ]
                ]
            }
        })
})

bot.action('tempMeteo', async (ctx) => {
    try {
        const res = await fetch(TEMP_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'temp',
                count: 1,
                value: '*',
            }),
        })
            .then(res => res.json())

        await ctx.reply(`
    Дата: ${res[0].date}
    Температура: ${res[0].value}
    `)
    } catch (e) {
        console.log(e)
    }
})

bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`)
bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)
console.log('Started with Webhook')


// bot.launch().then(r => console.log("run telegraf"))

const fetch = require('node-fetch')
require('dotenv').config()
const { TEMP_URL } = process.env

const chatAction = (bot, ctx) => {
    ctx.deleteMessage()
    ctx.answerCbQuery()
    bot.telegram.sendChatAction(ctx.chat.id, "typing")
}

const tempData = {}

tempData.getMeteoData = () => {
    return fetch(TEMP_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'temp',
            count: 1,
            value: '*',
        }),
    }).then(res => res.json())
}

const tempMessage = (data) => {
    return `
    Дата: ${data[0].date}
    Температура: ${data[0].value}
    `
}

const valuteMessage = (data) => {
    return `
Код валюты: ${data.NumCode}
Валюта: ${data.Name}
Цена: ${data.Value}
    `
}

const getStart = ( bot, ctx ) => {
    bot.telegram.sendMessage(ctx.chat.id, `Метео Данные Красноярска`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Улица" , callback_data: "tempMeteo"}
                    ],
                    [
                        { text: "Доллар", callback_data: "USD"},
                        { text: "Евро", callback_data: "EUR"}
                    ],
                    [
                        { text: "Сайт", url: "https://efrem005.github.io/MeteoHome/"}
                    ]
                ],
                resize_keyboard: true
            }
        })
}

module.exports = {chatAction, tempData, tempMessage, getStart, valuteMessage};

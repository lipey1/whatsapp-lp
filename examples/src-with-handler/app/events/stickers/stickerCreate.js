async function handleSticker(client, message) {

    await client.reply(message.from, 'Nice sticker! 😄', message.id)
}

module.exports = {
    type: "sticker",
    execute: handleSticker,
}
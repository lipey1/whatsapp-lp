/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function handleSticker(client, message) {

    await client.reply(message.from, 'Nice sticker! 😄', message.id)
}

module.exports = {
    type: "sticker",
    execute: handleSticker,
}
/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function hello(client, message) {
    await client.reply(message.from, '*World*! 🌎', message.id)
}

module.exports = {
    name: 'hello',
    execute: hello,
};
/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function ping(client, message) {
    const start = Date.now();
    await client.reply(message.from, 'Calculating *ping*... 🛜', message.id)
    const end = Date.now();
    const ping = end - start;
    await client.sendText(message.from, `Ping: *${ping}ms* 📶`);
}

module.exports = {
    name: 'ping',
    execute: ping,
};
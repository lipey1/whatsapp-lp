/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function groupRemove(client, message) {
    await client.sendText(message.author, "Why did you take me out of the group? 🥹")
}

module.exports = {
    subtype: 'remove',
    execute: groupRemove,
}
/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function groupAdd(client, message) {
    await client.sendText(message.from, "Oops! I can't stay in this group! 😢")
    await client.leaveGroup(message.groupInfo.id);
}

module.exports = {
    subtype: 'add',
    execute: groupAdd,
}
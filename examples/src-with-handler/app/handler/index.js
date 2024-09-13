require('colors');

/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 */

async function handler(client) {
    const eventHandler = require('../events/events')(client)
    eventHandler.init()
}

module.exports = { handler }
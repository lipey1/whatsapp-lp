const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function handleVideos(client, message) {
    const buffer = await client.decryptFile(message);
    const existsDir = fs.existsSync(path.join(__dirname, './files'));
    if (!existsDir) {
        fs.mkdirSync(path.join(__dirname, './files'));
    }
    const pathFile = path.join(__dirname, './files', `${message.id}.${mime.extension(message.mimetype)}`);
    fs.writeFileSync(pathFile, buffer)

    await client.reply(message.from, 'Video saved successfuly! 🎥', message.id)
}

module.exports = {
    type: "video",
    execute: handleVideos,
}

const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

async function handleAudio(client, message) {
    const buffer = await client.decryptFile(message);
    const pathFile = path.join(__dirname, './files', `${message.id}.${mime.extension(message.mimetype)}`);
    fs.writeFileSync(pathFile, buffer)

    await client.reply(message.from, 'Audio saved successfuly! 🎙️', message.id)
}

module.exports = {
    type: "ptt",
    execute: handleAudio,
}
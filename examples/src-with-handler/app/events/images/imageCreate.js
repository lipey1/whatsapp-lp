const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

async function handleImages(client, message) {
    const buffer = await client.decryptFile(message);
    const pathFile = path.join(__dirname, './files', `${message.id}.${mime.extension(message.mimetype)}`);
    fs.writeFileSync(pathFile, buffer)

    await client.reply(message.from, 'Image saved successfuly! 🖼️', message.id)
}

module.exports = {
    type: "image",
    execute: handleImages,
}

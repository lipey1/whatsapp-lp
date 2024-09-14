const path = require('path');
const fs = require('fs');

/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

module.exports = function (client) {
    return {
        init: async function () {
            function getAllJSFiles(dirPath, arrayOfFiles) {
                const files = fs.readdirSync(dirPath);
                arrayOfFiles = arrayOfFiles || [];

                files.forEach((file) => {
                    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
                        arrayOfFiles = getAllJSFiles(path.join(dirPath, file), arrayOfFiles);
                    } else if (file.endsWith('.js')) {
                        if (path.resolve(dirPath) !== path.resolve(__dirname)) {
                            arrayOfFiles.push(path.join(dirPath, file));
                        }
                    }

                });

                return arrayOfFiles;
            }

            const parentDir = path.join(__dirname, './');
            const jsFiles = getAllJSFiles(parentDir);
            const arrayEvents = jsFiles.map(filePath => {
                const segments = filePath.split(path.sep);
                const commandsIndex = segments.findIndex(segment => segment === 'events');
                const newSegments = segments.slice(commandsIndex + 1);
                const commandModule = require(`./${path.join(...newSegments)}`)

                if (!commandModule.type) {
                    return null;
                }

                if (typeof commandModule.execute === 'function') {
                    console.log(" ○".green + ` ${path.basename(filePath, path.extname(filePath))} event was started`.white);

                    return {
                        path: path.join(...newSegments),
                        type: commandModule.type,
                        execute: commandModule.execute,
                    };
                } else {
                    console.log(` ○`.red + ` Evento inválido encontrado em:`.white + ` ${filePath}`.gray)
                }
            }).filter(Boolean)

            await client.onMessage(async (message) => {
                const event = arrayEvents.find(eve => eve.type === message.type);
                if (event) {
                    await event.execute(client, message);
                }
            });
        },
    };
};

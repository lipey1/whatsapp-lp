const path = require("path");
const fs = require("fs");

/**
 * Processa mensagens com o cliente do WhatsApp.
 *
 * @param {import('whatsapp-lp').Whatsapp} client - O cliente do WhatsApp.
 * @param {import('whatsapp-lp').Message} message - O cliente do WhatsApp.
 */

async function handleGroups(client, message) {
    function getAllJSFiles(dirPath, arrayOfFiles) {
        const files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        files.forEach((file) => {
            if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
                arrayOfFiles = getAllJSFiles(path.join(dirPath, file), arrayOfFiles);
            } else if (file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        });

        return arrayOfFiles;
    }

    const parentDir = path.join(__dirname, './events');
    const jsFiles = getAllJSFiles(parentDir);
    const arraySubTypes = jsFiles.map(filePath => {
        const segments = filePath.split(path.sep);
        const commandsIndex = segments.findIndex(segment => segment === 'events');
        const newSegments = segments.slice(commandsIndex);
        const commandModule = require(`../../${path.join(...newSegments)}`)

        if (!commandModule.subtype) {
            return null;
        }

        if (typeof commandModule.execute === 'function') {
            return {
                path: path.join(...newSegments),
                subtype: commandModule.subtype,
                execute: commandModule.execute,
            };
        } else {
            console.log(` ○`.red + ` Comando inválido encontrado em:`.white + ` ${filePath}`.gray)
        }
    }).filter(Boolean);

    const subTypeCommand = arraySubTypes.find(cmd => cmd.subtype === message.subtype);
    if (subTypeCommand) {
        await subTypeCommand.execute(client, message);
    }
}

module.exports = {
    type: "gp2",
    execute: handleGroups,
}
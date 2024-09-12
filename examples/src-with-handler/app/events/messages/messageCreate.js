const path = require('path');
const fs = require('fs');

async function handleMessages(client, message) {
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

    const parentDir = path.join(__dirname, '../../commands');
    const jsFiles = getAllJSFiles(parentDir);
    const arrayCommands = jsFiles.map(filePath => {
        const segments = filePath.split(path.sep);
        const commandsIndex = segments.findIndex(segment => segment === 'commands');
        const newSegments = segments.slice(commandsIndex);

        const commandModule = require(`../../${path.join(...newSegments)}`)

        if (commandModule.name && typeof commandModule.execute === 'function') {
            return {
                path: path.join(...newSegments),
                name: commandModule.name,
                execute: commandModule.execute,
            };
        } else {
            console.log(` ○`.red + ` Comando inválido encontrado em:`.white + ` ${filePath}`.gray)
        }
    });

    const parentDirDefault = path.join(__dirname, '../../default');
    const defaultFiles = getAllJSFiles(parentDirDefault);

    const arrayDefault = defaultFiles.map(filePath => {
        const segments = filePath.split(path.sep);
        const commandsIndex = segments.findIndex(segment => segment === 'default');
        const newSegments = segments.slice(commandsIndex);

        const commandModule = require(`../../${path.join(...newSegments)}`)

        if (commandModule.type && typeof commandModule.execute === 'function') {
            return {
                path: path.join(...newSegments),
                type: commandModule.type,
                execute: commandModule.execute,
            };
        } else {
            console.log(` ○`.red + ` Arquivo default inválido encontrado em:`.white + ` ${filePath}`.gray)
        }
    });

    const commandName = message.body.toLowerCase().trim();
    const command = arrayCommands.find(cmd => cmd.name === commandName);
    if (command) {
        await command.execute(client, message);
    } else {
        const defaultCommand = arrayDefault.find(cmd => cmd.type === message.type);
        if (defaultCommand) {
            await defaultCommand.execute(client, message);
        }
    }
}

module.exports = {
    type: "chat",
    execute: handleMessages,
}
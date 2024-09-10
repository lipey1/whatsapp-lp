WhatsApp-LP was created with the purpose of demonopolizing the automation of chatbots and e-commerce, allowing anyone to create one.

Installation:

```bash
$ npm install whatsapp-lp
```

Using bower:

```bash
$ bower install whatsapp-lp
```

Using yarn:

```bash
$ yarn add whatsapp-lp
```

Using pnpm:

```bash
$ pnpm add whatsapp-lp
```

Basic Usage:

```js
const whatsapp = require('whatsapp-lp');

whatsapp.create({
    session: 'whatsapp-lp', // Name of session
    headless: false,
    logQR: true,
})
    .then((client) => {
        start(client);
    });

async function start(client) {

    client.onMessage(async (message) => {
        if (message.content === "!ping") {
            // Reply
            await client.reply(message.from, `Pong! 🏓`, message.id)

            // Send Text
            await client.sendText(message.from, `Pong! 🏓`);
        }
    });

}
```

Using the WhatsApp-LP methods, it is possible to create a handler for text commands, images, audios, stickers, among others, these codes will be available on our GitHub.
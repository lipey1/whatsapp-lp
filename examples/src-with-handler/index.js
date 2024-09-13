const whatsapp = require('whatsapp-lp');
const { handler } = require('./app/handler')

whatsapp.create({ session: 'whatsapp', headless: true, })
    .then(async(client) => {
        await handler(client)
    })
    .catch((erro) => {
        console.log(erro);
    });

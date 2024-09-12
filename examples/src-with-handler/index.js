const whatsapp = require('whatsapp-lp');
const { handler } = require('./app/handler')

whatsapp.create({ session: 'whatsapp', headless: true, })
    .then((client) => {
        handler(client)
    })
    .catch((erro) => {
        console.log(erro);
    });

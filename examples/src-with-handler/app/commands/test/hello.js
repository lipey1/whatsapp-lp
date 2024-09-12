async function hello(client, message) {
    await client.reply(message.from, '*World*! 🌎', message.id)
}

module.exports = {
    name: 'hello',
    execute: hello,
};
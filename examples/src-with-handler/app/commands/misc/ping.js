async function ping(client, message) {
    const start = Date.now();
    await client.reply(message.from, 'Calculating *ping*... 🛜', message.id)
    const end = Date.now();
    const ping = end - start;
    await client.sendText(message.from, `Ping: *${ping}ms* 📶`);
}

module.exports = {
    name: 'ping',
    execute: ping,
};
async function defaultMessage(client, message) {
    // The code will only be accessed and activated if it does not find a command equivalent to message.content
    await client.reply(message.from, 'This is a default message! 😃', message.id)
}

module.exports = {
    type: 'chat',
    execute: defaultMessage,
};
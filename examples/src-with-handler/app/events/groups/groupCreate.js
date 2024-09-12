async function handleGroups(client, message) {
    if (message.subtype === 'add') {
        await client.sendText(message.from, "Oops! I can't stay in this group! 😢")
        await client.leaveGroup(message.groupInfo.id);
    }
}

module.exports = {
    type: "gp2",
    execute: handleGroups,
}
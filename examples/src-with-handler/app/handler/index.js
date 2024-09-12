const fs = require('fs');
const path = require('path');
require('colors');

function handler(client) {
    const eventHandler = require('../events/events')(client)
    eventHandler.init()
}

module.exports = { handler }
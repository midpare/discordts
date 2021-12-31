"use strict";
const client_1 = require("../contexts/client");
module.exports = {
    name: 'ready',
    event: () => {
        client_1.client.user.setActivity('개발');
        console.log(`Logged in as ${client_1.client.user.tag}!`);
    }
};

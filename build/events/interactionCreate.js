"use strict";
const client_1 = require("../contexts/client");
module.exports = {
    name: 'interactionCreate',
    event: (interaction) => {
        const cmd = interaction.customId;
        const events = client_1.client.interactions.get(cmd);
        if (!events)
            return;
        events.execute(interaction);
    }
};

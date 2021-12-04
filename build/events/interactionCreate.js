"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var client_1 = __importDefault(require("../clients/client"));
module.exports = {
    name: 'interactionCreate',
    event: function (interaction) {
        var cmd = interaction.customId;
        var events = client_1.default.interactions.get(cmd);
        if (!events)
            return;
        events.execute(interaction);
    }
};

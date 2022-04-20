"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Client_1 = require("../structures/Client");
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    event: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const client = interaction.client;
        if (!(client instanceof Client_1.ExtendClient) || !(interaction instanceof discord_js_1.ButtonInteraction))
            return;
        const cmd = interaction.customId;
        const events = client.interactions.get(cmd);
        if (!events)
            return;
        try {
            events.execute({ interaction, client });
        }
        catch (error) {
            console.error(error);
        }
    }),
};

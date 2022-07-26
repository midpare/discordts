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
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../managers/Event");
exports.default = new Event_1.Event({
    name: 'interactionCreate',
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const client = interaction.client;
        if (!interaction.isButton() && !interaction.isSelectMenu())
            return;
        const id = interaction.user.id;
        const options = client.interactionOptions.get(interaction.customId);
        let event = client.interactions.get(interaction.customId);
        if (!options && event) {
            event.execute({ interaction, options, client });
            return;
        }
        if (!options || options.id != id)
            return;
        event = client.interactions.get(options.cmd);
        if (!event)
            return;
        try {
            if (options.cmd != 'cancel')
                event.execute({ interaction, options, client });
            for (const id of options.customIds) {
                client.interactionOptions.delete(id);
            }
            options.message.delete();
        }
        catch (error) {
            console.error(error);
        }
    }),
});

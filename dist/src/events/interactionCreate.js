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
        if (interaction.isChatInputCommand()) {
            const { commandName, options } = interaction;
            const event = client.slashCommand.get(commandName);
            event.execute({ interaction, options: options, client });
        }
        else if (interaction.isButton() || interaction.isSelectMenu()) {
            const id = interaction.user.id;
            const options = client.interactionOptions.get(interaction.customId);
            let event = client.interactions.get(interaction.customId);
            if (!options && event) {
                event.execute({ interaction, options, client });
                return;
            }
            if (!options) {
                interaction.reply({ content: '사용되지 않거나 종료된 상호작용입니다.', ephemeral: true });
                return;
            }
            event = client.interactions.get(options.cmd);
            if (!event || !options.ids.includes(id)) {
                interaction.reply({ content: '이 상호작용을 사용할 수 없습니다.', ephemeral: true });
                return;
            }
            try {
                event.execute({ interaction, options, client });
                for (const id of options.customIds) {
                    client.interactionOptions.delete(id);
                }
                if (event.deleted) {
                    for (const msg of options.messages) {
                        msg.delete();
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }),
});

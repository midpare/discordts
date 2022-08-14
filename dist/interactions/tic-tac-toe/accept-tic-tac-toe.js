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
const discord_js_1 = require("discord.js");
const Interaction_1 = require("../../managers/Interaction");
const tic_tac_toe_1 = require("../../structures/games/tic-tac-toe");
const InteractionOptions_1 = require("../../structures/InteractionOptions");
const Utils_1 = require("../../structures/Utils");
exports.default = new Interaction_1.Interaction({
    name: 'accept-tic-tac-toe',
    deleted: true,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const messages = new Array();
        if (!options || !options.data)
            return;
        const user = (0, discord_js_1.bold)(options.data.players[0].username);
        const target = (0, discord_js_1.bold)(options.data.players[1].username);
        messages.push(yield ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send(`${user} VS ${target}`)));
        const turn = yield ((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.send(`${user}님의 턴입니다!`));
        messages.push(turn);
        const customIds = Utils_1.Utils.uuid(9);
        let index = 0;
        const buttons = new Array();
        for (let i = 0; i < 3; i++) {
            const row = new discord_js_1.ActionRowBuilder();
            for (let j = 0; j < 3; j++) {
                const button = new discord_js_1.ButtonBuilder()
                    .setCustomId(customIds[index])
                    .setStyle(discord_js_1.ButtonStyle.Secondary)
                    .setLabel('　');
                row.addComponents(button);
                index++;
            }
            const msg = yield ((_c = interaction.channel) === null || _c === void 0 ? void 0 : _c.send({ components: [row] }));
            buttons.push(msg);
            messages.push(msg);
        }
        index = 0;
        const ids = [options.data.players[0].id, options.data.players[1].id];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                client.interactionOptions.set(customIds[index], new InteractionOptions_1.InteractionOption({
                    ids,
                    guildId: options.guildId,
                    cmd: 'tic-tac-toe',
                    messages,
                    customIds: [],
                    data: {
                        players: options.data.players,
                        position: [i, j],
                        buttons,
                        turn,
                        customIds,
                    },
                }));
                index++;
            }
        }
        client.tictactoe.set(ids, new tic_tac_toe_1.TicTacToe(options.data.players));
    }),
});

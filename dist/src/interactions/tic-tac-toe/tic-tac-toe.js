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
const Interaction_1 = require("../../managers/Interaction");
const discord_js_1 = require("discord.js");
const Utils_1 = require("../../structures/Utils");
exports.default = new Interaction_1.Interaction({
    name: 'tic-tac-toe',
    deleted: false,
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!options)
            return;
        const tictactoe = client.tictactoe.get(options.etc.players);
        const row = new discord_js_1.ActionRowBuilder();
        const button = new discord_js_1.ButtonBuilder()
            .setCustomId(Utils_1.Utils.uuid());
        const position = options.etc.position;
        if (!tictactoe)
            return;
        if (tictactoe.turn.id != interaction.user.id)
            return interaction.reply({ content: '자신의 턴을 기다려주세요', ephemeral: true });
        const winner = tictactoe.set(position);
        if (winner) {
            const user = (0, discord_js_1.bold)(winner.user.username);
            options.etc.turn.edit(`${user}님이 승리했습니다!`);
            for (const id of options.etc.customIds) {
                client.interactionOptions.delete(id);
            }
        }
        interaction.deferUpdate();
        const user = (0, discord_js_1.bold)(options.etc.players[0].user.username);
        const target = (0, discord_js_1.bold)(options.etc.players[1].user.username);
        if (tictactoe.flag == 1) {
            if (!winner)
                options.etc.turn.edit(`${user}님의 턴입니다!`);
            button
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setLabel('X');
        }
        else {
            if (!winner)
                options.etc.turn.edit(`${target}님의 턴입니다!`);
            button
                .setStyle(discord_js_1.ButtonStyle.Primary)
                .setLabel('O');
        }
        const buttonMsg = options.etc.buttons[position[0]];
        for (let i = 0; i < 3; i++) {
            if (i == position[1]) {
                row.addComponents(button);
            }
            else {
                row.addComponents(buttonMsg.components[0].components[i]);
            }
        }
        buttonMsg.edit({ components: [row] });
    })
});

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
const Command_1 = require("../../managers/Command");
const InteractionOptions_1 = require("../../structures/InteractionOptions");
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '틱택토',
    aliases: ['tictactoe'],
    category: '게임',
    usage: '틱택토 <유저>',
    description: '[유저]와 틱택토 게임을 합니다.',
    options: [
        {
            name: '유저',
            description: '틱택토를 할 유저를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = options.getUser('유저', true);
        const id = interaction.user.id;
        if (target.id == id) {
            Utils_1.Utils.reply(interaction, '자신을 맨션할 수 없습니다.');
            return;
        }
        const customIds = Utils_1.Utils.uuid(2);
        const [yes, no] = customIds;
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId(yes)
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setLabel('수락'), new discord_js_1.ButtonBuilder()
            .setCustomId(no)
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setLabel('거절'));
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('⚔ 틱택토')
            .setDescription(`${(0, discord_js_1.bold)(interaction.user.username)}가 ${(0, discord_js_1.bold)(target.username)}에게 틱택토 매치를 신청했습니다!`);
        interaction.reply({ embeds: [embed], components: [row] });
        const message = yield interaction.fetchReply();
        client.interactionOptions.set(yes, new InteractionOptions_1.InteractionOptions({
            ids: [target.id],
            cmd: 'accept-tic-tac-toe',
            messages: [message],
            customIds,
            etc: {
                players: [interaction.user, target],
            },
        }));
        client.interactionOptions.set(no, new InteractionOptions_1.InteractionOptions({
            ids: [id, target.id],
            cmd: 'cancel',
            messages: [message],
            customIds,
        }));
    })
});

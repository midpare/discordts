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
const Commands_1 = require("../../managers/Commands");
const InteractionOptions_1 = require("../../structures/InteractionOptions");
const Utils_1 = require("../../structures/Utils");
exports.default = new Commands_1.Command({
    name: '틱택토',
    aliases: ['tictactoe'],
    category: '게임',
    usage: '틱택토 <유저>',
    description: '[유저]와 틱택토 게임을 합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        const id = msg.author.id;
        if (!target)
            return msg.reply(client.messages.missingMentionUser('틱택토를 '));
        if (!msg.member || target.id == id)
            return msg.reply('자신을 맨션할 수 없습니다.');
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
            .setDescription(`${(0, discord_js_1.bold)(msg.member.user.username)}가 ${(0, discord_js_1.bold)(target.user.username)}에게 틱택토 매치를 신청했습니다!`);
        const message = yield msg.channel.send({ embeds: [embed], components: [row] });
        client.interactionOptions.set(yes, new InteractionOptions_1.InteractionOptions({
            ids: [target.id],
            cmd: 'accept-tic-tac-toe',
            messages: [message],
            customIds,
            etc: {
                players: [msg.member, target],
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

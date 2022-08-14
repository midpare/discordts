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
const Command_1 = require("../../../managers/Command");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Command_1.Command({
    name: '내전시작',
    aliases: ['내전팀나누기', '내전팀'],
    category: '게임',
    usage: '내전시작',
    description: '현재 음성채팅방에 있는 유저를 1팀과 2팀으로 나눕니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = interaction.member;
        if (!(user instanceof discord_js_1.GuildMember) || !user.voice.channel) {
            Utils_1.Utils.reply(interaction, '음성채널에 접속해주시기 바랍니다.');
            return;
        }
        const members = Utils_1.Utils.shuffle(Array.from(user.voice.channel.members.values() || []));
        const civilWar = client.civilWar;
        if (members.length < 2) {
            Utils_1.Utils.reply(interaction, '현재 음성채널에 두명이상 접속해있지 않습니다.');
            return;
        }
        if (!civilWar.isEmpty()) {
            Utils_1.Utils.reply(interaction, '이미 시작한 내전이 있습니다.');
            return;
        }
        civilWar.setTeam(members);
        civilWar.setChannel(user.voice.channel);
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('팀')
            .addFields({ name: '1팀', value: `${civilWar.teams[0].join(', ')}`, inline: false }, { name: '2팀', value: `${civilWar.teams[1].join(', ')}`, inline: false });
        interaction.reply({ embeds: [embed] });
    }),
});

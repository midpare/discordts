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
const Commands_1 = require("../../../managers/Commands");
const Utils_1 = require("../../../structures/Utils");
exports.default = new Commands_1.Command({
    name: '내전 시작',
    aliases: ['내전 팀나누기', '내전 팀'],
    category: '게임',
    usage: '내전 팀 <이름> <이름> ...',
    description: '<이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
    execute: ({ msg, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!((_a = msg.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            return msg.reply('음성채널에 접속해주시기 바랍니다.');
        const members = Utils_1.Utils.shuffle(Array.from(((_b = msg.member) === null || _b === void 0 ? void 0 : _b.voice.channel.members.values()) || []));
        const civilWar = client.civilWar;
        if (members.length < 2)
            return msg.reply('현재 음성채널에 두명이상 접속해있지 않습니다.');
        if (!civilWar.isEmpty()) {
            console.log(civilWar);
            return msg.reply('이미 시작한 내전이 있습니다.');
        }
        civilWar.setTeam(members);
        civilWar.setChannel((_c = msg.member) === null || _c === void 0 ? void 0 : _c.voice.channel);
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('팀')
            .addFields({ name: '1팀', value: `${civilWar.teams[0].join(', ')}`, inline: false }, { name: '2팀', value: `${civilWar.teams[1].join(', ')}`, inline: false });
        msg.channel.send({ embeds: [embed] });
    }),
});

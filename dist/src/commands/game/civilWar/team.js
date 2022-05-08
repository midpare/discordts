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
    name: '내전 팀',
    aliases: ['내전 팀나누기'],
    category: '게임',
    usage: '내전 팀 <이름> <이름> ...',
    description: '<이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const members = Utils_1.Utils.shuffle(Array.from(((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.values()) || []));
        const team1 = new Array();
        const team2 = new Array();
        for (let i = 0; i < members.length; i += 2) {
            team1.push(members[i]);
            members[i + 1] ? team2.push(members[i + 1]) : null;
        }
        if (!team2[0])
            return msg.reply('두명 이상 맨션을 해주시기 바랍니다.');
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('팀')
            .addFields({ name: '1팀', value: `${team1.join(', ')}`, inline: false }, { name: '2팀', value: `${team2.join(', ')}`, inline: false });
        msg.channel.send({ embeds: [embed] });
        client.civilWar.allTeam = members;
        client.civilWar.team1 = team1;
        client.civilWar.team2 = team2;
    }),
});

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
const school_1 = require("../../../models/school");
const Commands_1 = require("../../../structures/Commands");
exports.default = new Commands_1.Command({
    name: '학교 정보확인',
    aliases: ['학교 정보'],
    category: '학교',
    usage: '학교 정보확인',
    description: '현재 자신의 학교 정보를 확인합니다.',
    execute: ({ msg, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = msg.author.id;
        const user = yield school_1.school.findOne({ id });
        const embed = new discord_js_1.MessageEmbed();
        if (!user)
            return msg.reply('정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.');
        embed
            .setTitle(`${msg.author.username}님의 학교정보`)
            .setDescription(`${user.cityName} ${user.schoolName} ${user.grade}학년 ${user.class}반`)
            .setColor('GREEN');
        msg.channel.send({ embeds: [embed] });
    }),
});

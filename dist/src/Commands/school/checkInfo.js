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
const Utils_1 = require("../../structures/Utils");
exports.default = new Command_1.Command({
    name: '학교정보확인',
    aliases: ['학교 정보'],
    category: '학교',
    usage: '학교정보확인',
    description: '현재 자신의 학교 정보를 확인합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guildId, user: { id, username } } = interaction;
        const user = yield client.models.school.findOne({ id, guildId });
        const embed = new discord_js_1.EmbedBuilder();
        if (!user) {
            Utils_1.Utils.reply(interaction, '학교등록이 되지 않은 유저입니다.');
            return;
        }
        embed
            .setTitle(`${username}님의 학교정보`)
            .setDescription(`${user.cityName} ${user.schoolName} ${user.grade}학년 ${user.class}반`)
            .setColor(0x32CD32);
        interaction.reply({ embeds: [embed] });
    }),
});

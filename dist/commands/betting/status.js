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
    name: '베팅현황',
    category: '베팅',
    usage: '베팅현황',
    description: '현재 베팅의 현황을 확인합니다.',
    execute: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const guildId = (_a = interaction.guildId) !== null && _a !== void 0 ? _a : '';
        const betting = client.betting.get(guildId);
        if (!betting) {
            Utils_1.Utils.reply(interaction, '아직 베팅을 시작하지 않았습니다.');
            return;
        }
        const embed = new discord_js_1.EmbedBuilder();
        const persent = betting.persent;
        embed
            .setTitle('베팅 현황')
            .setDescription('베팅 현황을 확인합니다.')
            .setFields({ name: `${betting.bet1.name}`, value: `${betting.bet1.sum.toLocaleString()}원(${Math.round(persent.bet1)}%) \n참여인원: ${betting.bet1.user.length.toLocaleString()}명 \n배율: ${Math.round(betting.times.bet1 * 100) / 100}배`, inline: true }, { name: `${betting.bet2.name}`, value: `${betting.bet2.sum.toLocaleString()}원(${Math.round(persent.bet2)}%) \n참여인원: ${betting.bet2.user.length.toLocaleString()}명 \n배율: ${Math.round(betting.times.bet2 * 100) / 100}배`, inline: true });
        interaction.reply({ embeds: [embed] });
    }),
});

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
const Commands_1 = require("../../../structures/Commands");
const Betting_1 = require("../../../structures/Betting");
exports.default = new Commands_1.Command({
    name: '현황',
    category: 'betting',
    usage: '베팅 현황',
    description: '현재 베팅의 현황을 확인합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Betting_1.betting.betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        const embed = new discord_js_1.MessageEmbed();
        let persent;
        if (Betting_1.bet1.sum == 0)
            persent = 0;
        else
            persent = (Betting_1.bet1.sum / (Betting_1.bet1.sum + Betting_1.bet2.sum) * 100);
        Betting_1.bet1.times = Math.round(100 / (persent) * 100) / 100;
        if (persent == 100)
            Betting_1.bet2.times = 0;
        else
            Betting_1.bet2.times = Math.round(100 / (100 - persent) * 100) / 100;
        embed
            .setTitle('베팅 현황')
            .setDescription('베팅 현황을 확인합니다.')
            .setFields({ name: `${Betting_1.bet1.name}`, value: `${Betting_1.bet1.sum.toLocaleString()}원(${Math.round(persent)}%) \n참여인원: ${Betting_1.bet1.list.length.toLocaleString()}명 \n배율: ${Betting_1.bet1.times}배`, inline: true }, { name: `${Betting_1.bet2.name}`, value: `${Betting_1.bet2.sum.toLocaleString()}원(${Math.round(100 - persent)}%) \n참여인원: ${Betting_1.bet2.list.length.toLocaleString()}명 \n배율: ${Betting_1.bet2.times}배`, inline: true });
        msg.channel.send({ embeds: [embed] });
    }),
});

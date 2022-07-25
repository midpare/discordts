"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../managers/Commands");
const discord_js_1 = require("discord.js");
exports.default = new Commands_1.Command({
    name: '코인 현황',
    aliases: ['코인 시세', '코인 가격'],
    category: '코인',
    usage: '코인 현황',
    description: '현재 코인들의 현황을 업비트에서 확인합니다.',
    execute: ({ msg }) => {
        const coinRow = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setURL('https://upbit.com/exchange')
            .setStyle('LINK')
            .setLabel('거래소'));
        msg.channel.send({ content: '이곳을 눌러 현황을 확인하세요', components: [coinRow] });
    },
});

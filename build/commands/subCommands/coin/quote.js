"use strict";
var discord_js_1 = require("discord.js");
module.exports = {
    name: '현황',
    aliases: ['시세', '가격'],
    category: 'coin',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        var coinRow = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setURL('https://upbit.com/exchange')
            .setStyle('LINK')
            .setLabel('거래소'));
        msg.channel.send({ content: '이곳을 눌러 현황을 확인하세요', components: [coinRow] });
    }
};

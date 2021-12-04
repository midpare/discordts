"use strict";
var discord_js_1 = require("discord.js");
var betting_1 = require("../../../typings/betting");
module.exports = {
    name: '현황',
    category: 'betting',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        if (!betting_1.betting.betting)
            return msg.reply('아직 베팅을 시작하지 않았습니다.');
        var embed = new discord_js_1.MessageEmbed();
        var persent;
        if (betting_1.bet1.sum == 0)
            persent = 0;
        else
            persent = (betting_1.bet1.sum / (betting_1.bet1.sum + betting_1.bet2.sum) * 100);
        betting_1.bet1.times = Math.round(100 / (persent) * 100) / 100;
        if (persent == 100)
            betting_1.bet2.times = 0;
        else
            betting_1.bet2.times = Math.round(100 / (100 - persent) * 100) / 100;
        embed
            .setTitle("베팅 현황")
            .setDescription("베팅 현황을 확인합니다.")
            .setFields({ name: "" + betting_1.bet1.name, value: betting_1.bet1.sum.toLocaleString() + "\uC6D0(" + Math.round(persent) + "%) \n\uCC38\uC5EC\uC778\uC6D0: " + betting_1.bet1.list.length.toLocaleString() + "\uBA85 \n\uBC30\uC728: " + betting_1.bet1.times + "\uBC30", inline: true }, { name: "" + betting_1.bet2.name, value: betting_1.bet2.sum.toLocaleString() + "\uC6D0(" + Math.round(100 - persent) + "%) \n\uCC38\uC5EC\uC778\uC6D0: " + betting_1.bet2.list.length.toLocaleString() + "\uBA85 \n\uBC30\uC728: " + betting_1.bet2.times + "\uBC30", inline: true });
        msg.channel.send({ embeds: [embed] });
    }
};

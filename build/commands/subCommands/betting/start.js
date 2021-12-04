"use strict";
var betting_1 = require("../../../typings/betting");
var discord_js_1 = require("discord.js");
module.exports = {
    name: '시작',
    aliases: ['스타트'],
    category: 'betting',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        if (betting_1.betting.betting)
            return msg.reply('이미 시작한 베팅이 있습니다.');
        if (!args[1])
            return msg.reply('제목을 입력해주시기바랍니다.');
        if (!args[2] || !args[3])
            return msg.reply('베팅 이름을 입력해주시기바랍니다.');
        var embed = new discord_js_1.MessageEmbed();
        betting_1.betting.title = args[1];
        betting_1.bet1.name = args[2];
        betting_1.bet2.name = args[3];
        embed
            .setTitle(betting_1.betting.title)
            .setDescription(betting_1.bet1.name + "\uC640 " + betting_1.bet2.name + "\uC911 \uBCA0\uD305\uD574\uC8FC\uC2DC\uAE30\uBC14\uB78D\uB2C8\uB2E4.")
            .addFields({ name: "" + betting_1.bet1.name, value: "!\uBCA0\uD305 " + betting_1.bet1.name + " \uB85C \uBCA0\uD305\uD574\uC8FC\uC2DC\uAE30\uBC14\uB78D\uB2C8\uB2E4.", inline: true }, { name: "" + betting_1.bet2.name, value: "!\uBCA0\uD305 " + betting_1.bet2.name + " \uB85C \uBCA0\uD305\uD574\uC8FC\uC2DC\uAE30\uBC14\uB78D\uB2C8\uB2E4.", inline: true });
        msg.channel.send({ embeds: [embed] });
        betting_1.betting.betting = true;
    }
};

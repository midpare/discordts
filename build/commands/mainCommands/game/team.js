"use strict";
var discord_js_1 = require("discord.js");
module.exports = {
    name: "팀",
    aliases: ['팀'],
    category: 'game',
    use: '팀 <이름> <이름> ...',
    description: '적은 <이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        var embed = new discord_js_1.MessageEmbed()
            .setTitle("팀");
        if (!args[0])
            return msg.reply("기입할 이름을 입력해주세요");
        var team = new Array();
        for (var i = 0; i < args.length / 2; i++) {
            var random = Math.round(Math.random() * args.length);
            team.push(args[random]);
            args.splice(random, 1);
        }
        team.forEach(function (element) {
            embed.addField('1팀', "" + element, false);
        });
        args.forEach(function (element) {
            embed.addField('2팀', "" + element, false);
        });
        msg.channel.send({ embeds: [embed] });
    }
};

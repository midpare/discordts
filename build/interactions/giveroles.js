"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var client_1 = __importDefault(require("../clients/client"));
module.exports = {
    name: 'giveRole',
    execute: function (interaction) {
        interaction.member.roles.add('910521119713394743');
        interaction.member.roles.remove('910521119713394739');
        interaction.channel.send('성공적으로 역할을 지급받았습니다!').then(function () {
            setTimeout(function () { return interaction.channel.bulkDelete(1); }, 2000);
        });
        client_1.default.channels.cache.get('910521192039989288').send(interaction.user.username + "#" + interaction.user.discriminator + "\uB2D8\uC774 \uC11C\uBC84\uC5D0 \uC785\uC7A5\uD558\uC600\uC2B5\uB2C8\uB2E4!");
    }
};

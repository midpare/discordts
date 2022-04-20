"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = require("../../structures/Commands");
exports.default = new Commands_1.Command({
    name: 'test',
    category: '기본',
    usage: '테스트',
    description: '테스트',
    execute: ({ msg, args }) => {
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setCustomId('test customId')
            .setLabel('test label')
            .setStyle('PRIMARY'));
        msg.channel.send({ components: [row] });
    },
});

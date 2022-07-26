"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = require("../../managers/Commands");
const rules_1 = require("../../language/rules");
exports.default = new Commands_1.Command({
    name: '규칙',
    aliases: ['룰', '법전'],
    category: '기본',
    usage: '규칙',
    description: '서버 규칙을 확인합니다.',
    execute: ({ msg }) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('규칙');
        const rules = new rules_1.Rules();
        for (const [name, value] of Object.entries(rules)) {
            embed.addFields({ name, value: value.join('\n'), inline: false });
        }
        msg.channel.send({ embeds: [embed] });
    },
});

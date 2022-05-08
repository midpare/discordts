"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = require("../../managers/Commands");
const rules_json_1 = __importDefault(require("../../language/rules.json"));
exports.default = new Commands_1.Command({
    name: '규칙',
    aliases: ['룰', '법전'],
    category: '기본',
    usage: '규칙',
    description: '서버 규칙을 확인합니다.',
    execute: ({ msg, args, client }) => {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('규칙');
        const rules = Object.assign(rules_json_1.default);
        for (const i in rules) {
            embed.addField(i, rules[i].join('\n'), false);
        }
        msg.channel.send({ embeds: [embed] });
    },
});

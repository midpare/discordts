"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../../managers/Commands");
exports.default = new Commands_1.Command({
    name: 'ping',
    category: '기본',
    usage: 'ping',
    description: '봇의 작동가능여부를 확인합니다.',
    execute: ({ msg, args }) => {
        msg.reply('pong!');
    },
});

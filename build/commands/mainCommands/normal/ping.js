"use strict";
module.exports = {
    name: 'ping',
    category: 'normal',
    usage: 'ping',
    description: '봇의 작동가능여부를 확인합니다.',
    execute: ({ msg, args }) => {
        msg.reply('pong!');
    }
};

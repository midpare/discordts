"use strict";
module.exports = {
    name: 'ping',
    category: 'normal',
    use: 'ping',
    description: '봇의 작동가능여부를 확인합니다.',
    execute: function (_a) {
        var msg = _a.msg, args = _a.args;
        msg.reply('pong!');
    }
};
